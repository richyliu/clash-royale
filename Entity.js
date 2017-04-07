class Entity {
    constructor(game, field, x, y, color='DeepSkyBlue', size=10) {
        this.game = game;
        this.field = field;
        this.id = Math.random + '';
        this.size = size;
        
        this.shape = new createjs.Shape();
        this.shape.x = x;
        this.shape.y = y;
        this.shape.graphics.beginFill(color).drawCircle(x, y, size);
        this.game.add(this.shape);
    }
    
    move(dx, dy) {
        this.field.requestMove(this, this.shape.x+dx, this.shape.y+dy);
    }
}