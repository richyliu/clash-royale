class Entity {
    constructor(game, x, y) {
        this.id = Math.random() + '';
        this.game = game;
        
        this.shape = new createjs.Shape();
        this.shape.graphics.beginFill('DeepSkyBlue').drawCircle(0, 0, 50);
        this.shape.x = x;
        this.shape.y = y;
        this.update();
    }
    
    update() {
        this.game.set(this.id, this.shape);
    }
    
    move(dx, dy) {
        this.shape.x += dx;
        this.shape.y += dy;
        console.log(this.shape.x);
        this.update();
    }
}