import { Unit, InfantryUnit } from './unit.js';
import SimulationResults from './simulation-results.js';

function buildUnits(unitCounts, unitConfig) {
  let numArty = unitCounts.has('artillery') ? unitCounts.get('artillery') : 0;
  let units = Array.from(unitCounts.entries()).map(([unitType, count]) => {
    if (!(unitType in unitConfig))
      throw `Unknown unit type: ${unitType}`;

    let stats = unitConfig[unitType];
    return Array(count).fill(null).map(() => {
      if (unitType == 'infantry') {
        return new InfantryUnit(
          stats['attack'],
          stats['defense'],
          stats['cost'],
          numArty-- > 0              // Pair inf with available arty
        );
      }
      else {
        return new Unit(
          stats['attack'],
          stats['defense'],
          stats['cost']
        );
      }
    });
  });

  // Flatten
  return units.reduce((a, b) => a.concat(b), []);
}

export default function simulate(orderOfBattle, n)
{
  console.time('simulate');

  // Go through and validate unit lists
  // Transform into objects
  let atk = buildUnits(orderOfBattle.attackingUnits, orderOfBattle.unitConfig);
  let def = buildUnits(orderOfBattle.defendingUnits, orderOfBattle.unitConfig);

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
    let atkThisSim = atk.map(unit => {
      return new Unit(unit.attack, unit.defense, unit.cost);
    });

    let defThisSim = def.map(unit => {
      return new Unit(unit.attack, unit.defense, unit.cost);
    });

    // While there are still units on both sides:
    while (atkThisSim.length > 0 && defThisSim.length > 0) {
      // Calculate hits for attackers
      let atkHits = atkThisSim.reduce((sum, unit) => {
        return sum + (unit.rollAttack() ? 1 : 0);
      }, 0);

      // Calculate hits for defenders
      let defHits = defThisSim.reduce((sum, unit) => {
        return sum + (unit.rollDefense() ? 1 : 0);
      }, 0);

      // Assign hits
      for (let j = 0; j < defHits && j < atkThisSim.length; j++)
        atkThisSim[j].takeHit();

      for (let j = 0; j < atkHits && j < defThisSim.length; j++)
        defThisSim[j].takeHit();

      // Remove dead units
      atkThisSim = atkThisSim.filter(unit => unit.hp > 0);
      defThisSim = defThisSim.filter(unit => unit.hp > 0);
    }

    // Count up IPC worth
    let atkIPCEnd = atkThisSim.reduce((sum, unit) => sum + unit.cost, 0);
    let defIPCEnd = defThisSim.reduce((sum, unit) => sum + unit.cost, 0);

    // Append saved difference to results
    results.push({
      attackIPC: atkIPCEnd - atkIPCStart,
      defenseIPC: defIPCEnd - defIPCStart,
      win: atkThisSim.length > 0
    });
  }

  console.timeEnd('simulate');

  return new SimulationResults(n, results);
}
