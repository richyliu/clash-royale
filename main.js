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
    let game = new Game(2000);
    let cir = new Entity(game, 0, 0);
    
    Helper.loop(() => {
        cir.move(10, 10);
    }, 250, 4000);
}