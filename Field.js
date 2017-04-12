class Field {
    /**
     * Start the main game loop
     * @type {Number} timeout - Time until game loop ends in milliseconds
     * @type {Number} [loopTime=15] - Interval between each tick in milliseconds
     */
    static start(timeout, loopTime=15) {
        this.stage = new createjs.Stage('canvas');
        this.entities = {};
        this.loopTime = loopTime;
        
        
        this.mainLoop = setInterval(() => {
            this.entities.forEach((entity, i) => {
                entity.tick();
                // remove dead entities
                if (entity.health <= 0) {
                    entity.death();
                    this.entities.splice(i, 1);
                }
            });
            this.stage.update();
        }, this.loopTime);
        
        
        setTimeout(() => {
            this.stop();
        }, timeout);
        
        
        // two sides of the field
        const height = 300;
        const width = height * 5/4;
        const river = 25;
        const path = height/16;
        this.fieldHeight = height * 2 + river;
        this.fieldWidth = width;
        
        let rect = new createjs.Shape();
        rect.graphics
            .beginFill('LimeGreen')
                .drawRect(0, 0, width, height)
                .drawRect(0, height+river, width, height)
            .beginFill('DarkTurquoise')
                .drawRect(0, height, width, river)
            .beginFill('SandyBrown')
                // horizontal paths
                .drawRect(width/5, height/5, width*3/5+path, path)
                .drawRect(width/5, height*9/5+river, width*3/5+path, path)
                // vertical paths
                .drawRect(width/5, height/5, path, height*8/5+river)
                .drawRect(width*4/5, height/5, path, height*8/5+river);
        this.stage.addChild(rect);
        
        this.stage.update();
        
        
        this.entities = [];
    }
    
    
    /**
     * Add entity to the field
     * @type {Entity} entity - Entity to add to the field
     */
    static add(entity) {
        this.stage.addChild(entity.shape);
        this.stage.addChild(entity.healthBar);
        this.entities.push(entity);
    }
    
    
    /**
     * Stop the game loop
     */
    static stop() {
        clearInterval(this.mainLoop);
    }
    
    
    /**
     * Request to move an entity
     * @type {Entity} entity - Entity requesting the move
     * @type {Number} x - X value to move to
     * @type {Number} y - Y value to move to
     * @return {boolean} Whether or not move was accepted
     */
    static requestMove(entity, x, y) {
        for (let ent of this.entities) {
            if (Math.sqrt(Math.pow(ent.x,2)-x + Math.pow(ent.y,2)-y) < entity.size+ent.size) return false;
        }
        
        if (x < entity.size || x > this.fieldWidth - entity.size || y < entity.size || y > this.fieldHeight - entity.size) {
            return false;
        }
        
        entity.x = x;
        entity.y = y;
        return true;
    }
    
    
    /**
     * Get the nearest enemy
     * @type {Entity} entity - Get nearest enemy to this entity
     * @type {boolean} attackDefense - Attack buildings or normal troop
     * @return {Entity} Nearest enemy
     */
    static nearestEnemy(entity, attackDefense) {
        let nearestDistance = Infinity;
        let nearest;
        for (let curEntity of this.entities) {
            if (this.getDistance(entity, curEntity) < nearestDistance && curEntity != entity) {
                nearestDistance = this.getDistance(entity, curEntity);
                nearest = curEntity;
            }
        }
        
        return nearest;
    }
    
    
    
    /**
     * Get distance between two entities
     * @type {Entity} a - First entity
     * @type {Entity} b - Second entity
     * @return {Number} Distance between the two entities, in pixels
     */
    static getDistance(a, b) {
        return Math.sqrt(Math.pow((a.x-b.x),2) + Math.pow((a.y-b.y),2));
    }
}