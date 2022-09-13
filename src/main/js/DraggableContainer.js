/**
 * Draggable container is a Phaser container that also has width and height and 
 * can be dragged in the ScrollableContainer.
 */
export default class DraggableContainer extends Phaser.GameObjects.Container {

    constructor(scene, scrollableContainer, x, y, width, height, children) {
        super(scene, x, y, children);
        this.scene = scene;
        this.container = scene.add.container(x, y);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.scrollableContainer = scrollableContainer;
        scrollableContainer.draggableObjects.push(this);        
    }

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


