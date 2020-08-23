import * as util from './util.js';
import * as valid from './valid.js';

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

  get valid() {
    if (this.totalUnits(ATTACKER_SIDE) <= 0
        || this.totalUnits(DEFENDER_SIDE) <= 0)
      return false;

    let anyInvalidAttackers =
      this.unitCounts(ATTACKER_SIDE)
          .some(([unitKey, _]) => (
            !this.unitConfig[unitKey].valid(this, ATTACKER_SIDE)
          ));

    let anyInvalidDefenders =
      this.unitCounts(DEFENDER_SIDE)
          .some(([unitKey, _]) => (
            !this.unitConfig[unitKey].valid(this, DEFENDER_SIDE)
          ));

    return !(anyInvalidAttackers || anyInvalidDefenders);
  }

  get attackingUnits() {
    return this.units[ATTACKER_SIDE];
  }

  get defendingUnits() {
    return this.units[DEFENDER_SIDE];
  }

  // The type of territory the battle takes place in, either 'land' or 'sea'
  get battleDomain() {
    // Can't determine this for sure without a valid battle
    if (!this.valid)
      throw 'Called battleDomain() on an invalid Order of Battle.';

    if (this.hasAny(DEFENDER_SIDE, 'land')
        || this.hasAny(ATTACKER_SIDE, 'land'))
      return 'land';

    if (this.hasAny(DEFENDER_SIDE, 'sea')
        || this.hasAny(ATTACKER_SIDE, 'sea'))
      return 'sea';

    return 'air';
  }

  get isAmphibiousAssault() {
    return this.hasAny(ATTACKER_SIDE, 'land') &&
           this.hasAnyOf(ATTACKER_SIDE, 'transport');
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

  hasAny(side, domain) {
    return this.unitCounts(side)
               .some(([unitKey, _]) => (
                 this.unitConfig[unitKey].domain == domain
               ));
  }

  hasAnyOf(side, ...unitKeys) {
    for (let unitKey of unitKeys) {
      if (this.units[side].get(unitKey))
        return true;
    }

    return false;
  }
}
