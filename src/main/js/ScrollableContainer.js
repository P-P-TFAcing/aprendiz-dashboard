import PointerEventHandler from './PointerEventHandler.js';

class RegionPointerEventHandler extends PointerEventHandler {

    constructor(scene, parentScrollableContainer) {
        super(scene);
        this.parentScrollableContainer = parentScrollableContainer;
    }

    onPointerDown(event, scene) {
        let parent = this.parentScrollableContainer;
        let x = event.downX;
        let y = event.downY;
        if ((x >= parent.x) && (y >= parent.y)) {
            // mark the global start
            this.dragContext = {
                position: {x: x, y: y}
            };
            console.log('start dragging', this.dragContext);
        }
    }

    onPointerUp(event, scene) {
        delete this.dragContext;
    }

    onPointerMove(event, scene) {
        if (this.dragContext) {
            let parent = this.parentScrollableContainer;
            let x = event.position.x;
            let y = event.position.y;
            if ((x >= parent.x) && (y >= parent.y)) {
                let deltaX = x - this.dragContext.position.x;
                let deltaY = y - this.dragContext.position.y;
                console.log('drag scene', event.position, deltaX, deltaY);
                // scroll the scene
                parent.scrollRegion(deltaX, deltaY);
                this.dragContext.position.x += deltaX;
                this.dragContext.position.y += deltaY;
            }
        }
    }

}

export default class ScrollableContainer extends Phaser.GameObjects.Container {

    constructor(scene, x, y) {
        super(scene, x, y);
        this.sceneOffset = {x: 0, y: 0};
        new RegionPointerEventHandler(scene, this);
    }

    translateObject(gameObject, deltaX, deltaY) {        
        gameObject.setPosition(gameObject.x + deltaX, gameObject.y + deltaY)
    }

    scrollRegion(deltaX, deltaY) {
        console.log('scrollRegion', deltaX, deltaY);
        this.sceneOffset.x += deltaX;
        this.sceneOffset.x += deltaY;
        this.iterate(this.translateObject, this, deltaX, deltaY);
    }

}

