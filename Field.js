class Field {
    /**
     * Start the main game loop
     * @type {Number} timeout - Time until game loop ends in milliseconds
     * @type {Number} [loopTime=15] - Interval between each tick in milliseconds
     */
    static start(timeout, loopTime=15) {
        /**
         * The stage where everything is drawn (on canvas with id "canvas")
         * @type {createjs}
         */
        this.stage = new createjs.Stage('canvas');
        /**
         * List of Entities that are on the ground.
         * @type {Array}
         */
        this.groundEntities = [];
        /**
         * List of Entities that are in the air.
         * @type {Array}
         */
        this.airEntities = [];
        /**
         * How often each tick happens in milliseconds
         * @type {Number}
         */
        this.loopTime = loopTime;
        
        
        /**
         * Main loop of the Field, ran every tick. Use Field.stop() to stop loop
         * @private
         */
        this.mainLoop = setInterval(() => {
            this.groundEntities.concat(this.airEntities).forEach(entity => entity.tick());
            this.stage.update();
        }, this.loopTime);
        
        
        // Stop the main loop after a set amount of time.
        setTimeout(() => {
            this.stop();
        }, timeout);
        
        
        // Draw the field
        
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
    }
    
    
    
    /**
     * Add entity to the field.
     * @type {Entity} entity - Entity to add to the field
     * @type {Boolean} flying - Set to true if in air, or false if on ground
     */
    static add(entity) {
        this.stage.addChild(entity.shape);
        this.stage.addChild(entity.healthBar);
        this[(entity.flyingTroop ? 'air' : 'ground') + 'Entities'].push(entity);
    }
    
    
    
    /**
     * Stop the game loop
     */
    static stop() {
        console.log('Field has been stopped');
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
        for (let ent of this.groundEntities) {
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
     * @return {Entity} Nearest enemy
     */
    static nearestEnemy(entity) {
        let nearestDistance = Infinity;
        let nearest;
        for (let curEntity of this.groundEntities.concat(entity.attackAir ? this.airEntities : [])) {
            if (
                this.getDistance(entity, curEntity) < nearestDistance &&    // if closest so far
                curEntity.id != entity.id &&                                // enemy not itself
                curEntity.team != entity.team &&                            // enemy on a different team
                (entity.attackBuilding ? curEntity.isBuilding : true)         // has to be building if it's attacking building
            ) {
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