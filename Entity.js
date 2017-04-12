class Entity {
    /**
     * Creates new entity
     * @type {Number} x - X position of the Entity
     * @type {Number} y - Y position of the Entity
     * @type {Number} size - Radius of the Entity
     * @type {String} color - Color of entity
     */
    constructor(x, y, size, color) {
        /**
         * Radius of the circle to draw
         * @type {Number}
         */
        this.size = size;
        /**
         * Total health the Entity can have
         * @type {Number}
         */
        this.totalHealth = 1000000;
        /**
         * Current health of the Entity
         * @type {Number}
         */
        this.health = this.totalHealth;
        /**
         * Attack strength of the Entity. If splash, attack applied to all
         * Entities within targetRange;
         * @type {Number}
         */
        this.attackStrength = 0;
        /**
         * The speed at which the Entity attacks in milliseconds.
         * @type {Number}
         */
        this.attackSpeed = 0;
        /**
         * Timestamp of when Entity last attacked.
         * @type {Number}
         */
        this.lastAttack = 0;
        /**
         * Whether or not the Entity attacks with splash. If true, targetRadius
         * has to be nonzero.
         * @type {Boolean}
         */
        this.attackSplash = false;
        /**
         * Whether or not the Entity targets buildings. If true, target has to
         * be a building
         * @type {Boolean}
         */
        this.attackBuilding = false;
        /**
         * Speed at which the Entity moves. In pixels per milliseconds.
         * @type {Number}
         */
        this.speed = 0;
        /**
         * Range of the Entity attacks in pixels. If splash, the center of
         * splash circle is range away. Set to 0 for melee attacks;
         * @type {Number}
         */
        this.range = 0;
        /**
         * Radius of the splash circle of the Entity in pixels.
         * @type {Number}
         */
        this.targetRadius = 0;
        /**
         * The time it takes for the entity to be deployed. In milliseconds.
         * @type {Number}
         */
        this.deploySpeed = 0;
        /**
         * The current enemy the Entity is locked on.
         * @type {Entity}
         */
        this.target = undefined;
        /**
         * X position of the shape
         * @type {Number}
         */
        this.x = x;
        /**
         * Y position of the shape
         * @type {Number}
         */
        this.y = y;
        /**
         * Used to ensure every Entity is identical
         * @type {Number}
         */
        this.id = Math.random();
        
        
        this.shape = new createjs.Shape();
        this.shape.x = x;
        this.shape.y = y;
        this.shape.graphics.beginFill(color).drawCircle(0, 0, this.size);
        
        this.healthBar = new createjs.Shape();
        this.healthBar.x = this.x - this.size;
        this.healthBar.y = this.y - this.size - 10;
        this.healthBar.graphics.beginFill('blue').drawRect(0, 0, this.size*2, 10);
        
        Field.add(this);
    }
    
    
    
    /**
     * Request to move the entity with vector
     * @type {Number} direction - Direction to move to, where 0 is up, 90 is
     * right, 180 is down, and 270 is left.
     * @type {Number} magnitude - How far to move the entity
     */
    move(direction, magnitude) {
        console.log(direction);
        Field.requestMove(
            this,
            this.x + Math.sin(direction)*magnitude,
            this.y + Math.cos(direction)*magnitude
        );
    }
    
    
    
    /**
     * Attack entity dealing strength damage.
     * @type {Entity} entity - Entity to attack
     * @type {Number} strength - Strength of the attack.
     */
    attack(entity, strength) {
        entity.damage(strength);
        console.log(`attacking with ${strength} strength`);
    }
    
    
    
    /**
     * Recieve damage from another entity
     * @type {Number} damage - Damage recieved
     */
    damage(damage) {
        this.health -= damage;
        console.log(`recieved ${damage} damage`);
    }
    
    
    
    /**
     * Called when the Entity dies
     */
    death() {
        console.log(`Entity ${this.id} died`);
        Field.stage.removeChild(this.shape);
        Field.stage.removeChild(this.healthBar);
    }
    
    
    
    /**
     * Update the health bar.
     */
    updateHealthBar() {
        this.healthBar.graphics.clear();
        this.healthBar.x = this.x - this.size;
        this.healthBar.y = this.y - this.size - 10;
        this.healthBar.graphics.beginFill('blue').drawRect(0, 0, this.size*2 * (this.health/this.totalHealth), 10);
    }
    
    
    
    /**
     * Called every game tick
     */
    tick() {
        // if locked on target and target alive
        if (this.target && this.target.health > 0) {
            // if close enough to attack                            melee--.             ranged attack--.
            if (Field.getDistance(this, this.target) < (this.range === 0 ? this.size+this.target.size : this.range)) {
                let d = new Date();
                
                if (d - this.lastAttack > this.attackSpeed) {
                    this.attack(this.target, this.attackStrength);
                    this.lastAttack = d;
                }
            // not close enough, move into range
            } else {
                this.move(
                    Math.atan2(this.target.x-this.x, this.target.y-this.y),
                    this.speed * Field.loopTime
                );
            }
        // if not locked on target, find one
        } else {
            this.target = Field.nearestEnemy(this, this.attackBuilding);
        }
        
        
        // update xy
        this.shape.x = this.x;
        this.shape.y = this.y;
        
        
        // update health bar
        this.updateHealthBar();
    }
}