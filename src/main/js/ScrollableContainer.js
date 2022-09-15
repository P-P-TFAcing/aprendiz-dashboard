
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
        console.log('pointer down', x, y);        
        x -= this.x;
        y -= this.y;
        x /= this.scaleX;
        y /= this.scaleY;        
        let dragContext = {
            // used to calculate pointer delta so maintain global position
            startPosition: {
                x: event.downX,
                y: event.downY
            }
        };        
        this.dragContext = dragContext;
        console.log('drag context', this.dragContext);
        // is an object selected? deselect it
        if(this.selectedObject) {
            this.selectedObject.deselectObject();
            delete this.selectedObject;
        }
        // is an object being selected?
        for (const object of this.draggableObjects) {
            if (object.isPointIn(x, y)) {
                console.log('select object', object);
                object.selectObject();
                this.selectedObject = object;
                dragContext.dragObject = object;
                dragContext.dragObjectStartPos = {
                    x: object.x,
                    y: object.y
                };
                break;
            }
        }
    }

    onPointerUp(event) {
        let x = event.position.x;
        let y = event.position.y;
        console.log('pointer up', x, y);
        if (this.dragContext) {
            delete this.dragContext;
            console.log('destroyed drag context');
        }
    }

    onPointerMove(event) {
        let x = event.position.x;
        let y = event.position.y;
        console.log('pointer move', x, y);
//        if (this.sceneDragContext) {
//            let deltaX = x - this.sceneDragContext.pointerStartPosition.x;
//            let deltaY = y - this.sceneDragContext.pointerStartPosition.y;
//            this.setPosition(this.sceneDragContext.containerStartPosition.x + deltaX, this.sceneDragContext.containerStartPosition.y + deltaY);
//        } else if (this.selectedObject) {
//            // an object is selected.
//            x -= this.x;
//            y -= this.y;
//            x /= this.scaleX;
//            y /= this.scaleY;
////            if (!this.selectedObject.isPointIn(x, y)) {
////                if (!this.objectDragContext) {
////                    // only deselect if we're not dragging
////                    this.selectedObject.deselectObject();
////                    delete this.selectedObject;
////                }
////            }
//            if (this.objectDragContext) {
//                // drag object?
//                let deltaX = x - this.objectDragContext.pointerStartPosition.x;
//                let deltaY = y - this.objectDragContext.pointerStartPosition.y;
//                this.selectedObject.setPosition(this.objectDragContext.objectStartPosition.x + deltaX, this.objectDragContext.objectStartPosition.y + deltaY);
//            }
////        } else {
////            // select the object we're hovering
////            x -= this.x;
////            y -= this.y;
////            x /= this.scaleX;
////            y /= this.scaleY;
////            for (const draggableObject of this.draggableObjects) {
////                if (draggableObject.isPointIn(x, y)) {
////                    console.log('select object', draggableObject);
////                    draggableObject.selectObject();
////                    this.selectedObject = draggableObject;
////                    break;
////                }
////            }
//        }
    }

}

