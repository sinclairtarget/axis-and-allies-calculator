export class Unit {
  constructor(attack, defense, cost, domain) {
    this.attack = attack;
    this.defense = defense;
    this.cost = cost;
    this.domain = domain;
    this.hp = 1;
  }

  rollAttack() {
    let roll = Math.floor(Math.random() * 6);
    return roll <= this.attack;
  }

  rollDefense() {
    let roll = Math.floor(Math.random() * 6);
    return roll <= this.defense;
  }

  takeHit() {
    this.hp = Math.max(this.hp - 1, 0);
  }
};

export class InfantryUnit extends Unit {
  constructor(attack, defense, cost, hasArty) {
    super(hasArty ? attack + 1 : attack, defense, cost);
  }
};
