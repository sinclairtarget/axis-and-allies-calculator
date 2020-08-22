import { ATTACKER_SIDE, DEFENDER_SIDE } from './order-of-battle.js';

/*
 * Figures out unit affordances!
 *
 * Don't want people to be able add units to battles that the units should not
 * be able to participate in, e.g. a destroyer participating in a land battle.
 *
 * These functions all represent constraints on when a certain kind of unit
 * can be added to a battle on a given side. Return true if yes, false if no.
 *
 * What are all the cases we want to prevent?
 * - Any land unit attacking a sea unit
 * - Any sea unit (other than battleships and cruisers) attacking a land unit
 * - Non-bombard sea units and land units appearing together in an attack
 * - Land units and sea units appearing together in a defense
 *
 * What don't we care about?
 * - Bombard units appearing without a transport. Technically not allowed, but
 *   since transports aren't involved in battle at all we should permit users
 *   to ignore them.
 */

export function always(oob, side) {
  return true;
}

export function antiair(oob, side) {
  return side == DEFENDER_SIDE && landUnit(oob, side);
}

export function landUnit(oob, side) {
  let isSeaZoneBattle = oob.hasAny(DEFENDER_SIDE, 'sea');
  let hasAttackingSeaOnlyUnits = oob.hasAnyOf(ATTACKER_SIDE,
    'destroyer', 'carrier', 'submarine'
  );

  return !(isSeaZoneBattle || hasAttackingSeaOnlyUnits);
}

export function seaUnit(oob, side) {
  return !(oob.hasAny(DEFENDER_SIDE, 'land') || oob.hasAny(ATTACKER_SIDE, 'land'));
}

export function amphibious(oob, side) {
  return side == ATTACKER_SIDE || seaUnit(oob, side);
}
