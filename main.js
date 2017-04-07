function init1() {
    let stage = new createjs.Stage('canvas');
    
    let circle = new createjs.Shape();
    circle.graphics.beginFill('DeepSkyBlue').drawCircle(0, 0, 50);
    circle.x = 100;
    circle.y = 100;
    stage.addChild(circle);
    
    stage.update();
}



function init() {
    let game = new Game(10 * 1000);
    let field = new Field(game.stage);
    
    // let goblin = new Entity(game, field, 0, 0, 'green');
    let barb = new Entity(game, field, 187, 313, 'yellow');
    
    field.add(barb);
    
    Helper.loop(() => {
        // goblin.move(20, 20);
        // barb.move(10, 0);
    }, 200, 2000);
}