export default class ScrollableContainer extends Phaser.GameObjects.Container {

    constructor(scene, x, y) {
        super(scene, x, y);
        this.sceneOffset = { x:0, y:0 };
    }
    
    updateChildOffset(gameObject) {
        console.log('update object', gameObject);
        gameObject.setOffset(this.sceneOffset.x, this.sceneOffset.y)
    }

    setOffset(x, y) {
        console.log('scrollable set offset', x, y);
        this.sceneOffset.x = x;
        this.sceneOffset.y = y;
        this.iterate(this.updateChildOffset.bind(this));
    }

}

