class Goblin extends Entity {
    constructor(x, y) {
        super(x, y, 15, 'green');
        this.totalHealth = 50;
        this.health = 50;
        this.attackStrength = 10;
        this.attackSpeed = 1000;
        this.speed = 0.1; // 10 px/ms
        this.deploySpeed = 1000;
    }
}



class Skeleton extends Entity {
    constructor(x, y) {
        super(x, y, 10, 'white');
        this.totalHealth = 30;
        this.health = 30;
        this.attackStrength = 10;
        this.attackSpeed = 1000;
        this.speed = 0.15; // 10 px/ms
        this.deploySpeed = 1000;
    }
}



class Archer extends Entity {
    constructor(x, y) {
        super(x, y, 10, 'white');
        this.totalHealth = 100;
        this.health = 100;
        this.attackStrength = 20;
        this.attackSpeed = 1500;
        this.attackAir = true;
        this.speed = 0.1; // 10 px/ms
        this.deploySpeed = 1000;
    }
}



class BabyDragon extends Entity {
    constructor(x, y) {
        super(x, y, 15, 'white');
        this.totalHealth = 800;
        this.health = 800;
        this.attackStrength = 100;
        this.attackSpeed = 1000;
        this.attackSplash = true;
        this.attackAir = true;
        this.speed = 0.15; // 10 px/ms
        this.range = 50;
        this.targetRadius = 20;
        this.deploySpeed = 1500;
        this.flyingTroop = true;
    }
}