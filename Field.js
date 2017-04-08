class Field {
    constructor(stage) {
        // two sides of the field
        const height = 300;
        const width = height * 5/4;
        const river = 25;
        const path = height/16;
        
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
                // vertical paths;
                .drawRect(width/5, height/5, path, height*8/5+river)
                .drawRect(width*4/5, height/5, path, height*8/5+river);
        stage.addChild(rect);
        
        stage.update();
        
        
        this.entities = [];
    }
    
    add(ent) {
        this.entities.push(ent);
    }
    
    requestMove(entity, x, y) {
        // for (let ent of this.entities) {
        //     if (Math.sqrt(ent.x**2-x + ent.y**2-y) < entity.size) return false;
        // }
        // console.log(`x: ${x}, y:${y}`);
        
        entity.shape.x = x;
        entity.shape.y = y;
        return true;
    }
}