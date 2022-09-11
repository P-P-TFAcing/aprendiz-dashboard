export default class PointerEventHandler {
                
    pointerDownHandler(event) {
        console.log('pointerdown', event.downX, event.downY);
        if(this.onPointerDown) {
            this.onPointerDown(event);
        }
    }

    pointerUpHandler(event) {
        console.log('pointerup', event.upX, event.upY);
        if(this.onPointerUp) {
            this.onPointerUp(event);
        }
    }

    pointerMoveHandler(event) {
        console.log('pointermove', event.worldX, event.worldY);
        if(this.onPointerMove) {
            this.onPointerMove(event);
        }        
    }

    constructor(scene) {
        this.scene = scene;
        scene.input.on('pointermove', pointerMoveHandler.bind(scene));
        scene.input.on('pointerdown', pointerDownHandler.bind(scene));
        scene.input.on('pointerup', pointerUpHandler.bind(scene));
    }

}
