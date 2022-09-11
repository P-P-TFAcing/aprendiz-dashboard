export default class PointerEventHandler {
                
    pointerDownHandler(event) {
        console.log('pointerdown', event.downX, event.downY);
        if(this.onPointerDown) {
            this.onPointerDown(event, scene);
        }
    }

    pointerUpHandler(event) {
        console.log('pointerup', event.upX, event.upY);
        if(this.onPointerUp) {
            this.onPointerUp(event, scene);
        }
    }

    pointerMoveHandler(event) {
        console.log('pointermove', event.worldX, event.worldY);
        if(this.onPointerMove) {
            this.onPointerMove(event, scene);
        }        
    }

    constructor(scene) {
        this.scene = scene;
        scene.input.on('pointermove', this.pointerMoveHandler.bind(this));
        scene.input.on('pointerdown', this.pointerDownHandler.bind(this));
        scene.input.on('pointerup', this.pointerUpHandler.bind(this));
    }

}

