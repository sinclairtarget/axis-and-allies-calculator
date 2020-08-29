import * as util from './util.js';
import { OrderOfBattle } from './order-of-battle.js';
import { ATTACKER_KEY, DEFENDER_KEY } from './simulation-results.js';

function buildUnits(unitCounts, unitConfig) {
  let numArty = unitCounts.has('artillery') ? unitCounts.get('artillery') : 0;
  let buildState = {
    numArtyLeft: numArty
  };

  let units = Array.from(unitCounts.entries()).map(([unitType, count]) => {
    if (!(unitType in unitConfig))
      throw `Unknown unit type: ${unitType}`;

    let stats = unitConfig[unitType];
    return Array(count).fill(null).map(() => (
      stats.factory(buildState)
    ));
  });

  // Flatten
  return units.reduce((a, b) => a.concat(b), []);
}

// Conquest successful if there is an attacking unit that can occupy the
// territory.
function wasConquest(attackingUnits, battleDomain) {
  if (battleDomain == 'air')
    return false;                        // Air units can't conquer territory
  else if (battleDomain == 'land')
    return attackingUnits.some(u => u.domain == 'land');
  else
    return attackingUnits.some(u => u.domain == 'sea');
}

// Hit assignment priority:
// Attacker
// 1. Battleship with 2 hp
// 2. Lowest cost unit that is not a designated survivor
// 3. "Designated survivor"--highest cost unit with the same domain as battle
//
// Defender
// 1. Battleship with 2 hp
// 2. Lowest cost unit
function assignHits(units, numHits, battleDomain = null,
                    prioritizeConquest = false)
{
  // First, hit 2 hp battleships
  for (let i = 0; i < units.length; i++) {
    let u = units[i];
    if (u.hp > 1 && numHits > 0) {
      u.takeHit();
      numHits--;
    }
  }

  // Hold out designated survivor if we have a domain
  // Highest cost unit with right domain
  let designatedSurvivor = null;
  if (prioritizeConquest && battleDomain) {
    for (let i = 0; i < units.length; i++) {
      let u = units[i];
      if (u.hp > 0 && u.domain == battleDomain)
        designatedSurvivor = u;
    }
  }

  // Now hit units in ascending cost order (array is already sorted this way)
  for (let i = 0; i < units.length; i++) {
    let u = units[i];
    if (numHits > 0 && u != designatedSurvivor && u.takeHit())
      numHits--;
  }

  // If we have hits left, designated survivor gets hit
  if (designatedSurvivor && numHits > 0)
    designatedSurvivor.takeHit();
}

// Returns true/false.
// Should be good as long as we don't have all subs on one side and all planes
// on the other.
function hitsPossible(attackingUnits, defendingUnits) {
  let allAtkSub = attackingUnits.every(u => u.isSubmarine);
  let allAtkPlanes = attackingUnits.every(u => u.domain == 'air');
  let allDefSub = defendingUnits.every(u => u.isSubmarine);
  let allDefPlanes = defendingUnits.every(u => u.domain == 'air');

  return !((allAtkSub && allDefPlanes) || (allAtkPlanes && allDefSub));
}

function simulateOneBattle(attackingUnits,
                           defendingUnits,
                           battleDomain,
                           options)
{
  let lostAttackingUnits = [];
  let lostDefendingUnits = [];

  // Handle bombardment -------------------------------------------------------
  if (battleDomain == 'land')
  {
    let numHits = util.sum(attackingUnits, u => u.rollBombard());
    assignHits(defendingUnits, numHits);

    // Sea units have played their role, time to say goodbye
    util.remove(attackingUnits, u => u.domain == 'sea');
  }

  // Handle AA ----------------------------------------------------------------
  // Roll once for each air unit but no more.
  let numAirUnits = util.sum(attackingUnits, u => u.canBeHitByAA);
  let aaHits = 0;
  for (let i = 0; i < defendingUnits.length; i++) {
    let unit = defendingUnits[i];
    let [hits, airUnitsConsumed] = unit.rollAA(numAirUnits);
    aaHits += hits;
    numAirUnits -= airUnitsConsumed;
  }

  // Hit air units get no chance to defend
  assignHits(attackingUnits.filter(u => u.canBeHitByAA), aaHits);
  lostAttackingUnits.push(...util.remove(attackingUnits, u => u.hp <= 0));

  // Battle proper ------------------------------------------------------------
  // Put units removed last aside (transports / AA)
  let removeLast = util.remove(defendingUnits, u => u.removedLast);

  // While there are still units on both sides:
  while (attackingUnits.length > 0 && defendingUnits.length > 0
          && hitsPossible(attackingUnits, defendingUnits))
  {

    // Reset rolledThisRound
    for (let i = 0; i < attackingUnits.length; i++)
      attackingUnits[i].reset();
    for (let i = 0; i < defendingUnits.length; i++)
      defendingUnits[i].reset();

    // Check for destroyers
    let isAtkDestroyer = attackingUnits.some(u => u.detectsSubmarines);
    let isDefDestroyer = defendingUnits.some(u => u.detectsSubmarines);

    // Handle submarines
    let atkSubHits = util.sum(attackingUnits.filter(u => u.isSubmarine),
                              u => u.rollAttack());
    let defSubHits = util.sum(defendingUnits.filter(u => u.isSubmarine),
                              u => u.rollDefense());

    assignHits(defendingUnits.filter(u => u.domain != 'air'),  // Can't hit air
               atkSubHits);
    assignHits(attackingUnits.filter(u => u.domain != 'air'),
               defSubHits);

    if (!isDefDestroyer) // Attacker gets surprise strike
      lostDefendingUnits.push(...util.remove(defendingUnits, u => u.hp <= 0));

    if (!isAtkDestroyer) // Defender gets surprise strike
      lostAttackingUnits.push(...util.remove(attackingUnits, u => u.hp <= 0));

    // Handle planes separately if they cannot hit subs
    if (!isAtkDestroyer) {
      let airHits = util.sum(attackingUnits.filter(u => u.domain == 'air'),
                             u => u.rollAttack());
      assignHits(defendingUnits.filter(u => !u.isSubmarine), airHits);
    }

    if (!isDefDestroyer) {
      let airHits = util.sum(defendingUnits.filter(u => u.domain == 'air'),
                             u => u.rollAttack());
      assignHits(attackingUnits.filter(u => !u.isSubmarine), airHits,
                 battleDomain, options.prioritizeConquest);
    }

    // Calculate hits for remaining attackers
    let atkHits = util.sum(attackingUnits, u => u.rollAttack());

    // Calculate hits for remaining defenders
    let defHits = util.sum(defendingUnits, u => u.rollDefense());

    // Assign hits
    assignHits(defendingUnits, atkHits);
    assignHits(attackingUnits, defHits, battleDomain,
               options.prioritizeConquest);

    // Remove dead units
    lostDefendingUnits.push(...util.remove(defendingUnits, u => u.hp <= 0));
    lostAttackingUnits.push(...util.remove(attackingUnits, u => u.hp <= 0));
  }

  // Add back removed last if any defenders left (otherwise they're dead)
  // Special case: If there are any attacking planes and every remaining def
  // unit is a sub, then all transports get destroyed
  let isTurkeyShoot = attackingUnits.some(u => u.domain == 'air')
    && defendingUnits.every(u => u.isSubmarine);

  if (defendingUnits.length > 0 && !isTurkeyShoot) {
    defendingUnits.push(...removeLast);
  }
  else {
    lostDefendingUnits.push(...removeLast);
  }

  // Count up IPC loss
  let atkIPCLoss = -util.sum(lostAttackingUnits, u => u.cost);
  let defIPCLoss = -util.sum(lostDefendingUnits, u => u.cost);

  return {
    [ATTACKER_KEY]: atkIPCLoss,
    [DEFENDER_KEY]: defIPCLoss,
    conquest: wasConquest(attackingUnits, battleDomain)
  };
}

export function simulate(units, n, options={}) {
  console.time('simulate');

  // Recreat oob, since complex obj with methods can't be passed to the worker
  let oob = new OrderOfBattle(units);

  let battleDomain = oob.battleDomain;

  // Go through and validate unit lists
  // Transform into objects
  let atk = buildUnits(oob.attackingUnits, oob.unitConfig);
  let def = buildUnits(oob.defendingUnits, oob.unitConfig);

  // Sort by cost, so lower cost units get hit first
  atk.sort((a, b) => a.cost > b.cost ? 1 : -1);
  def.sort((a, b) => a.cost > b.cost ? 1 : -1);

  let results = [];

  // Do n times:
  for (let i = 0; i < n; i++) {
    // Create copies of original arrays
    let atkThisSim = atk.map(unit => unit.clone());
    let defThisSim = def.map(unit => unit.clone());

    // Append simulated battle result
    let battleResult = simulateOneBattle(atkThisSim, defThisSim,
                                         battleDomain, options);
    results.push(battleResult);
  }

  console.timeEnd('simulate');

  return results;
}
