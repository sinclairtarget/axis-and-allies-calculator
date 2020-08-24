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
  }

  get canBeHitByAA() {
    return false;
  }

  get removedLast() {
    return false;
  }

  rollAttack() {
    return roll() <= this.attack;
  }

  rollDefense() {
    return roll() <= this.defense;
  }

  rollBombard() {
    return false;
  }

  rollAA(maxRolls) {
    return [0, 0];
  }

  takeHit() {
    this.hp = Math.max(this.hp - 1, 0);
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
