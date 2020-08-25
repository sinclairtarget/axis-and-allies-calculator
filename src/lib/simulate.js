import * as util from './util.js';
import SimulationResults,
       { ATTACKER_KEY, DEFENDER_KEY } from './simulation-results.js';

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

function assignHits(units, numHits) {
  // TODO: BATTLESHIP? What if we don't use all hits? Need to double back for
  // BB?
  for (let i = 0; i < units.length; i++)
  {
    let u = units[i];
    if (numHits > 0)
    {
      u.takeHit();
      numHits--;
    }
  }
}

function simulateOneBattle(attackingUnits,
                           defendingUnits,
                           battleDomain)
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
  while (attackingUnits.length > 0 && defendingUnits.length > 0) {
    // Calculate hits for attackers
    let atkHits = util.sum(attackingUnits, u => u.rollAttack());

    // Calculate hits for defenders
    let defHits = util.sum(defendingUnits, u => u.rollDefense());

    // Assign hits
    assignHits(attackingUnits, defHits);
    assignHits(defendingUnits, atkHits);

    // Remove dead units
    lostAttackingUnits.push(...util.remove(attackingUnits, u => u.hp <= 0));
    lostDefendingUnits.push(...util.remove(defendingUnits, u => u.hp <= 0));
  }

  // Add back removed last if any defenders left (otherwise they're dead)
  if (defendingUnits.length > 0)
    defendingUnits.push(...removeLast);
  else
    lostDefendingUnits.push(...removeLast);

  // Count up IPC loss
  let atkIPCLoss = -util.sum(lostAttackingUnits, u => u.cost);
  let defIPCLoss = -util.sum(lostDefendingUnits, u => u.cost);

  return {
    [ATTACKER_KEY]: atkIPCLoss,
    [DEFENDER_KEY]: defIPCLoss,
    conquest: wasConquest(attackingUnits, battleDomain)
  };
}

function simulate(oob, n) {
  console.time('simulate');

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
    results.push(simulateOneBattle(atkThisSim, defThisSim, battleDomain));
  }

  console.timeEnd('simulate');

  console.log('results', results);

  return new SimulationResults(n, results, oob);
}

export default function simulateAsync(oob, n)
{
  // Don't do any work until after React render
  // Gives us a chance to render "in progress" UI
  // Long-running simulation still blocks main thread, but there's nothing else
  // the user can interact with anyway
  return new Promise(resolve => setTimeout(resolve)) // send to back of queue
             .then(() => simulate(oob, n));
}
