class Spawner {
    /**
     * Spawn entity
     * @type {Entity} entity - Entity to spawn. Can be a subclass of Entity
     * @type {Number} count - Number of entity to spawn. Spawns as close as
     * possible to x,y
     * @type {Number} x - X position to spawn.
     * @type {Number} y - Y position to spawn.
     */
    static spawn(entity, count, x, y) {
        setTimeout(() => {
            for (let i = 0; i < count; i++) {
                new entity(x, y);
            }
        }, entity.deploySpeed);
    }
}