export default class SimulationResults {
  constructor(n, results) {
    this.n = n;
    this.results = results;
  }

  get conquestChance() {
    return this.results.filter(r => r.win).length / this.n;
  }
}
