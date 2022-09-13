
/* global Phaser */

export default class ScrollableContainer extends Phaser.GameObjects.Container {

    constructor(scene, x, y, width, height) {
        super(scene, x, y);
        this.draggableObjects = [];
        scene.input.on('pointermove', this.onPointerMove.bind(this));
        scene.input.on('pointerdown', this.onPointerDown.bind(this));
        scene.input.on('pointerup', this.onPointerUp.bind(this));
        let graphics = scene.make.graphics();
        graphics.fillStyle(0xFFFFFF, 1.0);
        graphics.fillRect(x, y, width, height);
        let scrollableContainerMask = new Phaser.Display.Masks.GeometryMask(scene, graphics);
        this.setMask(scrollableContainerMask);

    }

    onPointerDown(event) {
        let x = event.downX;
        let y = event.downY;
        if ((x >= this.x) && (y >= this.y)) {
            // mark the global start
            this.sceneDragContext = {
                containerStartPosition: {
                    x: this.x,
                    y: this.y
                },
                pointerStartPosition: {
                    x: x,
                    y: y
                }
            };
            console.log('start dragging scene', this.x, this.y);
        }
    }

    onPointerUp(event) {
        if (this.sceneDragContext) {
            delete this.sceneDragContext;
            console.log('stop dragging scene', this.x, this.y);
        }
    }

    onPointerMove(event) {
        let x = event.position.x;
        let y = event.position.y;        
        if (this.sceneDragContext) {
            let deltaX = x - this.sceneDragContext.pointerStartPosition.x;
            let deltaY = y - this.sceneDragContext.pointerStartPosition.y;
            this.setPosition(this.sceneDragContext.containerStartPosition.x + deltaX, this.sceneDragContext.containerStartPosition.y + deltaY);
        }
        if(!this.selectedObject) {
            x -= this.x;
            y -= this.y;
            console.log('move mouse local', x, y);
            for(const draggableObject of this.draggableObjects) {
                if((x >= draggableObject.x) && (y <= draggableObject.y)) {
                    let x2 = draggableObject.width + draggableObject.x;
                    let y2 = draggableObject. height + draggableObject.y;
                    if((x <= x2) && (y <= y2)) {
                        console.log('select object', draggableObject);
                        draggableObject.selectObject();
                        this.selectedObject = draggableObject;
                        break;
                    }
                }
            }            
        } else {
            // an object is selected.
            
        }
    }

}

