class Game {
    constructor(timeout) {
        this.stage = new createjs.Stage('canvas');
        this.entities = {};
        
        this.mainLoop = setInterval(() => {
            this.stage.clear();
            for (let id in this.entities) {
                this.stage.addChild(this.entities[id]);
            }
            this.stage.update();
        }, 200);
        
        setTimeout(() => {
            clearInterval(this.mainLoop);
        }, timeout);
    }
    
    
    set(id, entity) {
        this.entities[id] = entity;
    }
    
    
    stop() {
        clearInterval(this.mainLoop);
    }
}