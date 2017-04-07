class Game {
    constructor(timeout, loopTime=200) {
        this.stage = new createjs.Stage('canvas');
        this.entities = {};
        
        this.mainLoop = setInterval(() => {
            this.stage.update();
        }, loopTime);
        
        setTimeout(() => {
            clearInterval(this.mainLoop);
        }, timeout);
    }
    
    
    add(entity) {
        this.stage.addChild(entity);
    }
    
    
    stop() {
        clearInterval(this.mainLoop);
    }
}