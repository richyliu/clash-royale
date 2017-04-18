class ArenaTower extends Entity {
    constructor(x, y, team) {
        super(x, y, team);
        this.totalHealth = 1500;
        this.attackStrength = 100;
        this.attackSpeed = 1000;
        this.isBuilding = true;
        
        // set for collision detection
        this.size = 20;
        
        super.setup();
    }
    
    draw() {
        this.shape = new createjs.Shape();
        this.shape.x = this.x;
        this.shape.y = this.y;
        this.shape.graphics.beginFill('blue').drawRect(0, 0, 40, 40);
    }
}