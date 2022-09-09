/**
 * draggable container
 */
export default class DraggableContainer {

    setPosition(x, y) {
        this.container.setPosition(x, y);
    }

    constructor(scene, x, y, containerId) {
        this.scene = scene;
        this.container = scene.add.container(x, y);
        this.x = x;
        this.y = y;
        this.containerId = containerId;
    }

    draggable(graphicsObject) {
        graphicsObject.setInteractive({useHandCursor: true}).on('pointerdown', this.mouseDownHandler.bind(this));
    }

    mouseDownHandler(event) {
        // start dragging
        let deltaX = this.container.x - event.downX;
        let deltaY = this.container.y - event.downY;
        let dragRect = this.scene.add.rectangle(this.container.x, this.container.y, this.width, this.height);
        dragRect.setStrokeStyle(2, 0x00ffff, 2);
        dragRect.setOrigin(0, 0);
        let dragContext = {
            dragRect: dragRect,
            deltaX: deltaX,
            deltaY: deltaY,
            container: this.container,
            parentObject: this
        };
        if(this.scene.data.sceneDragContext) {
            delete this.scene.data.sceneDragContext;
            console.log('removed scene drag context');
        }
        this.scene.data.dragContext = dragContext;
    }

}


