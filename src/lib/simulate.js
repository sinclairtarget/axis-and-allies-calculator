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

function simulateOneBattle(attackingUnits,
                           defendingUnits,
                           atkIPCStart,
                           defIPCStart,
                           battleDomain)
{
  // Handle AA
  let numAirUnits = attackingUnits.reduce((sum, next) => (
    sum + next.canBeHitByAA
  ), 0);

  let aaHits = 0;
  for (let unit of defendingUnits) {
    let [hits, airUnitsConsumed] = unit.rollAA(numAirUnits);
    aaHits += hits;
    numAirUnits -= airUnitsConsumed;
  }

  let airUnitsHit = 0;
  for (let unit of attackingUnits) {
    if (unit.canBeHitByAA && airUnitsHit < aaHits)
    {
      unit.takeHit();
      airUnitsHit++;
    }
  }
  attackingUnits = attackingUnits.filter(unit => unit.hp > 0);

  // Handle units removed last (transports / AA)
  let removeLast = defendingUnits.filter(u => u.removedLast);
  defendingUnits = defendingUnits.filter(u => !u.removedLast);

  // While there are still units on both sides:
  while (attackingUnits.length > 0 && defendingUnits.length > 0) {
    // Calculate hits for attackers
    let atkHits = attackingUnits.reduce((sum, unit) => {
      return sum + (unit.rollAttack() ? 1 : 0);
    }, 0);

    // Calculate hits for defenders
    let defHits = defendingUnits.reduce((sum, unit) => {
      return sum + (unit.rollDefense() ? 1 : 0);
    }, 0);

    // Assign hits
    for (let j = 0; j < defHits && j < attackingUnits.length; j++)
      attackingUnits[j].takeHit();

    for (let j = 0; j < atkHits && j < defendingUnits.length; j++)
      defendingUnits[j].takeHit();

    // Remove dead units
    attackingUnits = attackingUnits.filter(unit => unit.hp > 0);
    defendingUnits = defendingUnits.filter(unit => unit.hp > 0);
  }

  // Add back removed last if any defenders left
  if (defendingUnits.length > 0)
    defendingUnits = defendingUnits.concat(removeLast);

  // Count up IPC worth
  let atkIPCEnd = attackingUnits.reduce((sum, unit) => sum + unit.cost, 0);
  let defIPCEnd = defendingUnits.reduce((sum, unit) => sum + unit.cost, 0);

  return {
    [ATTACKER_KEY]: atkIPCEnd - atkIPCStart,
    [DEFENDER_KEY]: defIPCEnd - defIPCStart,
    conquest: wasConquest(attackingUnits, battleDomain),
    aaHits: aaHits
  };
}

export default function simulate(oob, n)
{
  console.time('simulate');

  let battleDomain = oob.battleDomain;

  // Go through and validate unit lists
  // Transform into objects
  let atk = buildUnits(oob.attackingUnits, oob.unitConfig);
  let def = buildUnits(oob.defendingUnits, oob.unitConfig);

  // Sort by cost, so lower cost units get hit first
  atk.sort((a, b) => a.cost > b.cost ? 1 : -1);
  def.sort((a, b) => a.cost > b.cost ? 1 : -1);

  // Save IPC worth
  let atkIPCStart = atk.reduce((sum, unit) => sum + unit.cost, 0);
  let defIPCStart = def.reduce((sum, unit) => sum + unit.cost, 0);

  let results = [];

  // Do n times:
  for (let i = 0; i < n; i++) {
    // Create copies of original arrays
    let atkThisSim = atk.map(unit => unit.clone());
    let defThisSim = def.map(unit => unit.clone());

    // Append simulated battle result
    results.push(simulateOneBattle(atkThisSim,
                                   defThisSim,
                                   atkIPCStart,
                                   defIPCStart,
                                   battleDomain));
  }

  console.timeEnd('simulate');

  console.log('results', results);

  return new SimulationResults(n, results, oob);
}
