import { ATTACKER_SIDE, DEFENDER_SIDE } from './order-of-battle.js';

/*
 * Figures out unit affordances!
 *
 * Don't want people to be able add units to battles that the units should not
 * be able to participate in, e.g. a destroyer participating in a land battle.
 *
 * These functions all return whether or not the presence of a given type of
 * unit is valid considering the current order of battle. Return true if yes,
 * false if no.
 *
 * What are all the cases we want to prevent?
 * - Any land unit attacking a sea unit
 * - Any sea unit (other than battleships and cruisers) attacking a land unit
 * - Non-bombard sea units and land units appearing together in an attack
 * - Land units and sea units appearing together in a defense
 *
 * What don't we care about?
 * - Defending aircraft in a sea zone without carriers
 */

export function always(oob, side) {
  return true;
}

export function antiair(oob, side) {
  return side == DEFENDER_SIDE && landUnit(oob, side);
}

// As long as there aren't seazone-exclusive units, we're good
export function landUnit(oob, side) {
  let isSeaZoneBattle = oob.hasAny(DEFENDER_SIDE, 'sea');
  let hasAttackingSeaOnlyUnits = oob.hasAnyOf(ATTACKER_SIDE,
    'destroyer', 'carrier', 'submarine'
  );

  return !(isSeaZoneBattle || hasAttackingSeaOnlyUnits);
}

// As long as there aren't any land units, we're good
export function seaUnit(oob, side) {
  return !(oob.hasAny(DEFENDER_SIDE, 'land') || oob.hasAny(ATTACKER_SIDE, 'land'));
}

// On the attack, always allowed
export function transport(oob, side) {
  return seaUnit(oob, side) || side == ATTACKER_SIDE;
}

// On the attack, only if amphibious assault
export function bombard(oob, side) {
  return seaUnit(oob, side) || (oob.isAmphibiousAssault && side == ATTACKER_SIDE);
}
