
export default class ScrollableContainer extends Phaser.GameObjects.Container {

    constructor(scene, x, y) {
        super(scene, x, y);
        scene.input.on('pointermove', this.onPointerMove.bind(this));
        scene.input.on('pointerdown', this.onPointerDown.bind(this));
        scene.input.on('pointerup', this.onPointerUp.bind(this));        
    }
    
    onPointerDown(event) {
        let x = event.downX;
        let y = event.downY;
        if ((x >= this.x) && (y >= this.y)) {
            // mark the global start
            this.dragContext = {
                containerStartPosition: {
                    x: this.x,
                    y: this.y
                }
            };
            console.log('start dragging scene', this.dragContext);
        }
    }

    onPointerUp(event) {
        if(this.dragContext) {
            delete this.dragContext;
        }
    }

    onPointerMove(event) {
        if (this.dragContext) {
            let x = event.position.x;
            let y = event.position.y;
            if ((x >= this.x) && (y >= this.y)) {
                let deltaX = x - this.dragContext.containerStartPosition.x;
                let deltaY = y - this.dragContext.containerStartPosition.y;
                console.log('drag scene', event.position, deltaX, deltaY);
                this.setPosition(this.dragContext.containerStartPosition.x + deltaX, this.dragContext.containerStartPosition.y + deltaY);
            }
        }
    }    

}

