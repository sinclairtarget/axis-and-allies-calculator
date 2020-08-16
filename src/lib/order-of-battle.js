import * as util from './util.js';

export const ATTACKER_SIDE = 'attack';
export const DEFENDER_SIDE = 'defense';

const MAX_UNITS = 99;

export class OrderOfBattle {
  constructor(unitConfig) {
    this.unitConfig = unitConfig;
    this.units = {};
    this.units[ATTACKER_SIDE] = new Map();
    this.units[DEFENDER_SIDE] = new Map();
  }

  get any() {
    return this.totalUnits(ATTACKER_SIDE) + this.totalUnits(DEFENDER_SIDE) > 0;
  }

  unitCount(side, unitKey) {
    return this.units[side].get(unitKey) || 0;
  }

  setUnitCount(side, unitKey, count) {
    let clampedCount = util.clamp(count, 0, MAX_UNITS);
    this.units[side].set(unitKey, clampedCount);
    return this;
  }

  unitCounts(side) {
    return Array.from(this.units[side].entries())
                .filter(([_, count]) => count > 0);
  }

  clear(side) {
    this.units[side] = new Map();
    return this;
  }

  configForDomain(domain) {
    return Object.fromEntries(
      Object.entries(this.unitConfig).filter(([unitKey, unit]) => {
        return unit.domain == domain;
      })
    );
  }

  totalUnits(side) {
    return this.unitCounts(side).reduce((sum, [_, count]) => {
      return sum + count;
    }, 0);
  }

  totalStat(side, accessor) {
    return this.unitCounts(side)
               .reduce((sum, [unitKey, count]) => (
                 sum + accessor(this.unitConfig[unitKey]) * count
               ), 0);
  }
}
