export default class ScrollableContainer extends Phaser.GameObjects.Container {

    constructor(scene, x, y) {
        super(scene, x, y);
    }
    
    updateChildOffset(gameObject) {
        console.log('update object', gameObject);
    }

    setOffset(x, y) {
        console.log('scrollable set offset', x, y);
        this.iterate(this.updateChildOffset);
    }

}

