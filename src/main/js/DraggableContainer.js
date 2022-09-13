/**
 * Draggable container is a Phaser container that also has width and height and 
 * can be dragged in the ScrollableContainer.
 */
export default class DraggableContainer extends Phaser.GameObjects.Container {

    constructor(scene, scrollableContainer, x, y, width, height, children) {
        super(scene, x, y, children);
        this.scene = scene;        
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.scrollableContainer = scrollableContainer;
        scrollableContainer.draggableObjects.push(this);        
    }

    selectObject() {
        this.selected = true;        
        let selectRect = this.scene.add.rectangle(this.x, this.y, this.width, this.height);
        selectRect.setOrigin(0,0);
        selectRect.setStrokeStyle(2, 0x00ffff, 2);
        this.selectRect = selectRect;
        this.scrollableContainer.add(selectRect);
    }
    
    deselectObject() {
        this.selected = false;
        this.selectRect.destroy();
    }
    
    isPointIn(x, y) {
        if((x >= this.x) && (y >= this.y)) {
            let x2 = this.width + this.x;
            let y2 = this. height + this.y;
            if((x <= x2) && (y <= y2)) {
                return true;
            }
        }
        return false;
    }

        //    
//    mouseDownHandler(event) {
//        // start dragging
//        event.stopPropagation();
//        let deltaX = this.container.x - event.downX;
//        let deltaY = this.container.y - event.downY;
//        let dragRect = this.scene.add.rectangle(this.container.x, this.container.y, this.width, this.height);
//        let sceneScale = this.scene.data.sceneScale;
//        dragRect.setScale(sceneScale);
//        dragRect.setStrokeStyle(2, 0x00ffff, 2);
//        dragRect.setOrigin(0, 0);
//        let dragContext = {
//            dragRect: dragRect,
//            deltaX: deltaX,
//            deltaY: deltaY,
//            container: this.container,
//            parentObject: this
//        };
//        if(this.scene.data.sceneDragContext) {
//            delete this.scene.data.sceneDragContext;
//            console.log('removed scene drag context');
//        }        
//        this.scene.data.dragContext = dragContext;
//        console.log('start drag object', this);
//    }

}


