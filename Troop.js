class Goblin extends Entity {
    constructor(x, y, team) {
        super(x, y, team);
        this.totalHealth = 100;
        this.attackStrength = 60;
        this.attackSpeed = 1100;
        this.speed = 0.15; // 10 px/ms
        this.deploySpeed = 1000;
        
        this.size = 10;
        this.color = 'green';
        
        super.setup();
    }
}



class Skeleton extends Entity {
    constructor(x, y, team) {
        super(x, y, team);
        this.totalHealth = 38;
        this.attackStrength = 38;
        this.attackSpeed = 1000;
        this.speed = 0.1; // 10 px/ms
        this.deploySpeed = 1000;
        
        this.size = 7;
        this.color = 'white';
        
        super.setup();
    }
}



class Archer extends Entity {
    constructor(x, y, team) {
        super(x, y, team);
        this.totalHealth = 175;
        this.attackStrength = 59;
        this.attackSpeed = 1200;
        this.attackAir = true;
        this.speed = 0.05; // 10 px/ms
        this.range = 100;
        this.deploySpeed = 1000;
        
        this.size = 10;
        this.color = 'pink';
        
        super.setup();
    }
}



class BabyDragon extends Entity {
    constructor(x, y, team) {
        super(x, y, team);
        this.totalHealth = 800;
        this.attackStrength = 100;
        this.attackSpeed = 1600;
        this.attackSplash = true;
        this.attackAir = true;
        this.speed = 0.05; // 10 px/ms
        this.range = 70;
        this.targetRadius = 20;
        this.deploySpeed = 1000;
        this.flyingTroop = true;
        
        this.size = 15;
        this.color = 'darkgreen';
        
        super.setup();
    }
}



class Giant extends Entity {
    constructor(x, y, team) {
        super(x, y, team);
        this.totalHealth = 2000;
        this.attackStrength = 145;
        this.attackSpeed = 1500;
        this.speed = 0.01; // 10 px/ms
        this.deploySpeed = 1000;
        this.attackBuilding = true;
        
        this.size = 20;
        this.color = 'brown';
        
        super.setup();
    }
}