
/* global Phaser */

export default class ScrollableContainer extends Phaser.GameObjects.Container {

    constructor(scene, x, y, width, height) {
        super(scene, x, y);
        scene.input.on('pointermove', this.onPointerMove.bind(this));
        scene.input.on('pointerdown', this.onPointerDown.bind(this));
        scene.input.on('pointerup', this.onPointerUp.bind(this));        
        let graphics = scene.make.graphics();        
        graphics.fillStyle(0xFFFFFF, 1.0);
        graphics.fillRect(x,y,width,height);
        let scrollableContainerMask = new Phaser.Display.Masks.GeometryMask(scene, graphics);
        this.setMask(scrollableContainerMask);

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
                },
                pointerStartPosition: {
                    x: x,
                    y: y
                }
            };
            console.log('start dragging scene', this.dragContext);
        }
    }

    onPointerUp(event) {
        if(this.dragContext) {
            delete this.dragContext;
            console.log('stop dragging scene');
        }
    }

    onPointerMove(event) {
        if (this.dragContext) {
            let x = event.position.x;
            let y = event.position.y;
            let deltaX = x - this.dragContext.pointerStartPosition.x;
            let deltaY = y - this.dragContext.pointerStartPosition.y;            
            this.setPosition(this.dragContext.containerStartPosition.x + deltaX, this.dragContext.containerStartPosition.y + deltaY);
        }
    }    

}

