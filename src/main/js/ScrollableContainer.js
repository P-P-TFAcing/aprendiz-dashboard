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
                startPosition: {x: x, y: y}
            };
            console.log('start dragging', this.dragContext);
        }
    }

    onPointerUp(event, scene) {
        //console.log('onPointerUp', event, scene);
    }

    onPointerMove(event, scene) {
        //console.log('onPointerMove', event, scene);
        if (this.dragContext) {
            let parent = this.parentScrollableContainer;
            let x = event.position.x;
            let y = event.position.y;
            if ((x >= parent.x) && (y >= parent.y)) {
                let deltaX = x - this.dragContext.startPosition.x;
                let deltaY = y - this.dragContext.startPosition.y;
                console.log('drag scene', event.position, deltaX, deltaY);
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

    updateChildOffset(gameObject) {
        console.log('update object', gameObject);
        gameObject.setPosition(this.sceneOffset.x, this.sceneOffset.y)
    }

    setOffset(x, y) {
        console.log('scrollable set offset', x, y);
        this.sceneOffset.x = x;
        this.sceneOffset.y = y;
        this.iterate(this.updateChildOffset.bind(this));
    }

}

