class Goblin extends Entity {
    /**
     * Creates new entity
     * @type {Number} x - X spawn point of entity
     * @type {Number} y - Y spawn point of entity
     */
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
    /**
     * Creates new entity
     * @type {Number} x - X spawn point of entity
     * @type {Number} y - Y spawn point of entity
     */
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