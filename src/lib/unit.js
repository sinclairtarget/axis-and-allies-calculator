function roll() {
    return Math.floor(Math.random() * 6) + 1;
}

export class Unit {
  constructor(attack, defense, cost, domain) {
    this.attack = attack;
    this.defense = defense;
    this.cost = cost;
    this.domain = domain;
    this.hp = 1;
    this.rolledThisRound = false;
  }

  get canBeHitByAA() {
    return false;
  }

  get removedLast() {
    return false;
  }

  get detectsSubmarines() {
    return false;
  }

  get isSubmarine() {
    return false;
  }

  rollAttack() {
    if (this.rolledThisRound)
      return false;

    this.rolledThisRound = true;
    return roll() <= this.attack;
  }

  rollDefense() {
    if (this.rolledThisRound)
      return false;

    this.rolledThisRound = true;
    return roll() <= this.defense;
  }

  rollBombard() {
    return false;
  }

  rollAA(maxRolls) {
    return [0, 0];
  }

  takeHit() {
    if (this.hp > 0) {
      this.hp -= 1;
      return true;
    }

    return false;
  }

  reset() {
    this.rolledThisRound = false;
  }

  clone() {
    return new this.__proto__.constructor(this.attack, this.defense,
                                          this.cost, this.domain);
  }
};

export class InfantryUnit extends Unit {
  constructor(attack, defense, cost, domain, hasArty) {
    super(hasArty ? attack + 1 : attack, defense, cost, domain);
  }
};

export class AirUnit extends Unit {
  get canBeHitByAA() {
    return true;
  }
};

export class AAUnit extends Unit {
  get removedLast() {
    return true;
  }

  rollAA(airUnitsRemaining) {
    let hits = 0;
    let i = 0;
    for (; i < Math.min(airUnitsRemaining, 3); i++) {
      if (roll() == 1)
        hits++;
    }

    return [hits, i];
  }
};

export class BombardUnit extends Unit {
  rollBombard() {
    return this.rollAttack();
  }
};

export class BattleshipUnit extends BombardUnit {
  constructor(attack, defense, cost, domain) {
    super(attack, defense, cost, domain);
    this.hp = 2;
  }
};

export class DestroyerUnit extends Unit {
  get detectsSubmarines() {
    return true;
  }
}

export class SubmarineUnit extends Unit {
  get isSubmarine() {
    return true;
  }
}
