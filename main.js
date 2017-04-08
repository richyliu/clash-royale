function init1() {
    let stage = new createjs.Stage('canvas');
    
    let circle = new createjs.Shape();
    circle.graphics.beginFill('DeepSkyBlue').drawCircle(0, 0, 50);
    circle.x = 100;
    circle.y = 100;
    stage.addChild(circle);
    
    stage.update();
}



let game = new Game(100 * 1000);
let field = new Field(game.stage);

let goblin = new Entity(game, field, 0, 0, 'green');
let barb = new Entity(game, field, 100, 100, 'yellow');

field.add(barb);
field.add(goblin);

Helper.loop(() => {
    goblin.move(1, 1);
    barb.move(0.5, 0);
}, 15, 2000);


function init() {}