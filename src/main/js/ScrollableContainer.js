import PointerEventHandler from './PointerEventHandler.js';

class RegionPointerEventHandler extends PointerEventHandler {

    constructor(scene, parentScrollableContainer) {
        super(scene);
        this.parentScrollableContainer = parentScrollableContainer;
    }

    onPointerDown(event, scene) {
        console.log('onPointerDown', event, scene);
    }

    onPointerUp(event, scene) {
        console.log('onPointerUp', event, scene);
    }
    
    onPointerMove(event, scene) {
        console.log('onPointerMove', event, scene);
    }

}

export default class ScrollableContainer extends Phaser.GameObjects.Container {

    constructor(scene, x, y) {
        super(scene, x, y);
        this.sceneOffset = { x:0, y:0 };
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

