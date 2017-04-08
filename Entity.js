class Entity {
    constructor(game, field, x, y, color='DeepSkyBlue', size=10) {
        this.game = game;
        this.field = field;
        this.id = Math.random + '';
        this.size = size;
        
        this.health = 0;
        this.attackStrength = 0;
        this.attackSplash = false;
        this.attackDefense = false;
        
        this.shape = new createjs.Shape();
        this.shape.x = x;
        this.shape.y = y;
        this.shape.graphics.beginFill(color).drawCircle(0, 0, size);
        this.game.add(this.shape);
    }
    
    move(dx, dy) {
        this.field.requestMove(this, this.shape.x+dx, this.shape.y+dy);
    }
}