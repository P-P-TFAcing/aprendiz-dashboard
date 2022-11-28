
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
    
    addEventHandlerHoverIn(handler) {
        this.eventHandlerHoverIn = handler;
    }
    
    addEventHandlerHoverOut(handler) {
        this.eventHandlerHoverOut = handler;
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
                if(object.isDraggable) {
                    console.log('drag object', object);
                    dragContext.dragObject = object;
                    dragContext.dragObjectStartPos = {
                        x: object.x,
                        y: object.y
                    };
                }
                break;
            }
        }
        if(!this.selectedObject) {
            dragContext.dragObjectStartPos = {
                    x: this.x,
                    y: this.y
            };            
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
    
    setHoverContainer(hoverContainer) {
        this.hoverContainerId = hoverContainer.containerId;
        this.hoverContainerObject = hoverContainer;        
    }

    onPointerMove(event) {
        let x = event.position.x;
        let y = event.position.y;
        x -= this.x;
        y -= this.y;
        x /= this.scaleX;
        y /= this.scaleY;        
        
        //console.log('pointer move', x, y);
        let mouseInObject = false;
        for (const object of this.draggableObjects) {
            if (object.isPointIn(x, y)) {
                //console.log('hover', object);
                if( object.containerId && (object.containerId !== this.hoverContainerId)) {
                    //console.log('hover in', object);
                    this.hoverContainerObject = object;
                    this.hoverContainerId = object.containerId;                       
                    if(this.eventHandlerHoverIn) {
                        this.eventHandlerHoverIn(object);
                    }                    
                }
                mouseInObject = true;
            }
        }
        if(!mouseInObject) {
            if(this.hoverContainerId) {
                let hoverOutObject = this.hoverContainerObject                
                delete this.hoverContainerId;
                delete this.hoverContainerObject;
                //console.log('hover out', hoverOutObject);      
                if(this.eventHandlerHoverOut) {
                    this.eventHandlerHoverOut(hoverOutObject);
                }
            }
        }
        if (this.dragContext) {
            let deltaX = event.position.x - this.dragContext.startPosition.x;
            let deltaY = event.position.y - this.dragContext.startPosition.y;
            if(this.selectedObject) {
                // dragging the object
                this.selectedObject.setPosition(this.dragContext.dragObjectStartPos.x + deltaX, this.dragContext.dragObjectStartPos.y + deltaY);
            } else {
                // dragging the scene
                this.setPosition(this.dragContext.dragObjectStartPos.x + deltaX, this.dragContext.dragObjectStartPos.y + deltaY);
            }            
        } 
    }

}

