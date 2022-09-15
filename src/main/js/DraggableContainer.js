/**
 * Draggable container is a Phaser container that also has width and height and 
 * can be dragged in the ScrollableContainer.
 */
export default class DraggableContainer extends Phaser.GameObjects.Container {

    constructor(scene, scrollableContainer, containerId, metadata, x, y, width, height, children) {
        super(scene, x, y, children);
        this.containerId = containerId;
        this.scene = scene;        
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.scrollableContainer = scrollableContainer;
        scrollableContainer.draggableObjects.push(this);        
        if(metadata) {
            let containerMetadata = metadata.containerPositions[this.containerId];
            if(containerMetadata) {
                this.x = containerMetadata.x;
                this.y = containerMetadata.y;
                this.setPosition(this.x, this.y);
            }
        }                
    }

    selectObject() {
        this.selected = true;        
        let selectRect = this.scene.add.rectangle(0, 0, this.width, this.height);
        selectRect.setOrigin(0,0);
        selectRect.setStrokeStyle(2, 0x00ffff, 2);
        this.selectRect = selectRect;
        this.add(selectRect);
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

}


