export const ATTACKER_KEY = 'attackIPC';
export const DEFENDER_KEY = 'defenseIPC';

export default class SimulationResults {
  constructor(n, results, oob) {
    this.n = n;
    this.results = results;
    this.oob = oob;
  }

  get conquestChance() {
    return this.results.filter(r => r.conquest).length / this.n;
  }

  get battleTypeLabel() {
    if (this.oob.isAmphibiousAssault)
      return 'Amphibious Assault';

    let battleDomain = this.oob.battleDomain;
    if (battleDomain == 'land')
      return 'Land Battle';
    else if (battleDomain == 'sea')
      return 'Naval Battle';
    else
      return 'Air Battle';
  }
}
