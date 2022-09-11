export default class ScrollableContainer extends Phaser.GameObjects.Container {

    constructor(scene, x, y) {
        super(scene, x, y);
    }

    setOffset(x, y) {
        console.log('scrollable set offset', x, y);
        for(const gameObject in this.list) {
            console.log('update object', gameObject);
        }
    }

}

