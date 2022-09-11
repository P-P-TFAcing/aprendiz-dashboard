export default class PointerEventHandler {
                
    pointerDownHandler(event) {
        if(this.onPointerDown) {
            this.onPointerDown(event, this.scene);
        }
    }

    pointerUpHandler(event) {
        if(this.onPointerUp) {
            this.onPointerUp(event, this.scene);
        }
    }

    pointerMoveHandler(event) {
        if(this.onPointerMove) {
            this.onPointerMove(event, this.scene);
        }        
    }

    constructor(scene) {
        this.scene = scene;
        scene.input.on('pointermove', this.pointerMoveHandler.bind(this));
        scene.input.on('pointerdown', this.pointerDownHandler.bind(this));
        scene.input.on('pointerup', this.pointerUpHandler.bind(this));
    }

}

