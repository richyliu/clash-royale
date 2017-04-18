class Entity {
    /**
     * Creates new entity
     * @type {Number} x - X position of the Entity
     * @type {Number} y - Y position of the Entity
     * @type {Boolean} team - Team the Entity is on
     */
    constructor(x, y, team) {
        /**
         * Radius of the circle to draw
         * @type {Number}
         */
        this.size = 0;
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
         * Team the Entity is on. true for team on bottom, false for team on top.
         * @type {Boolean}
         */
        this.team = team;
        /**
         * Used to ensure every Entity is identical
         * @type {Number}
         */
        this.id = Math.random();
        /**
         * Timestamp of when Entity last attacked.
         * @type {Number}
         */
        this.lastAttack = 0;
        
        
        /**
         * Total health the Entity can have
         * @type {Number}
         */
        this.totalHealth = Infinity;
        /**
         * Current health of the Entity. Set to totalHealth to begin
         * @type {Number}
         */
        this.health = Infinity;
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
         * Whether or not the Entity attacks air troops. If true, target attacks
         * air and ground troops.
         * @type {Boolean}
         */
        this.attackAir = false;
        /**
         * Whether or not the Entity is a building. If true, speed has to be 0
         * @type {Boolean}
         */
        this.isBuilding = false;
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
         * Whether or not Entity can fly.
         * @type {Boolean}
         */
        this.flyingTroop = false;
    }
    
    
    
    /**
     * Setup the Entity. Call this after setting class variables but before
     * everything else
     */
    setup() {
        this.draw();
        
        
        this.health = this.totalHealth;
        
        this.healthBar = new createjs.Shape();
        this.healthBar.x = this.x - this.size;
        this.healthBar.y = this.y - this.size - 10;
        this.healthBar.graphics.beginFill(this.team ? 'blue' : 'red').drawRect(0, 0, this.size*2, 10);
        
        Field.add(this);
    }
    
    
    
    /**
     * How the entity is initialy drawn. Default is a circle of radius this.size
     * and with a color of this.color. If changing, be sure to set this.shape to
     * the shape that is drawn.
     */
    draw() {
        this.shape = new createjs.Shape();
        this.shape.x = this.x;
        this.shape.y = this.y;
        this.shape.graphics.beginFill(this.color).drawCircle(0, 0, this.size);
    }
    
    
    
    /**
     * Request to move the entity with vector
     * @type {Number} direction - Direction to move to, where 0 is up, 90 is
     * right, 180 is down, and 270 is left.
     * @type {Number} magnitude - How far to move the entity
     */
    move(direction, magnitude) {
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
    }
    
    
    
    /**
     * Recieve damage from another entity
     * @type {Number} damage - Damage recieved
     */
    damage(damage) {
        this.health -= damage;
        if (this.health <= 0) this.death();
    }
    
    
    
    /**
     * Called when the Entity dies
     */
    death() {
        // remove this from air/groundEntities
        let troops = Field[this.flyingTroop ? 'air' : 'ground' + 'Entities'];
        troops.splice(troops.indexOf(this), 1);
        
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
        this.healthBar.graphics.beginFill(this.team ? 'blue' : 'red').drawRect(0, 0, this.size*2 * (this.health/this.totalHealth), 10);
    }
    
    
    
    /**
     * Called every tick by the Field
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
            this.target = Field.nearestEnemy(this);
        }
        
        
        // update xy
        this.shape.x = this.x;
        this.shape.y = this.y;
        
        
        // update health bar
        this.updateHealthBar();
    }
}