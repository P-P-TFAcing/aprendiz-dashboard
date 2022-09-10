/**
 * button component
 */
export default class Button {

    constructor(scene, x, y, caption) {
        this.scene = scene;
        this.container = scene.add.container(x, y);
        this.x = x;
        this.y = y;
        let text = scene.add.text(4, 4, caption, { font: "20px Arial" });
        text.setOrigin(0, 0);
        this.container.add(text);
        this.width = text.width + 8;
        this.height = text.height + 8;
        let rectangle = scene.add.rectangle(0, 0, this.width, this.height);
        rectangle.setOrigin(0, 0);
        rectangle.setStrokeStyle(2, 0xEEEEEE, 2);
        rectangle.setFillStyle(0xAAAAAA, 0.8);
        this.container.add(rectangle);
        rectangle.setInteractive({useHandCursor: true}).on('pointerdown', this.mouseDownHandler.bind(this));
        rectangle.setInteractive({useHandCursor: true}).on('pointerup', this.mouseUpHandler.bind(this));
        this.buttonRectangle = rectangle;
    }
    
    setPosition(x, y) {
        this.container.setPosition(x, y);
    }
    
    onButtonClick() {
        // possible override
        this.scene.data.buttonClicked = true;
    }
    
    mouseUpHandler(event) {
        this.buttonRectangle.setFillStyle(0xAAAAAA, 0.8);
    }

    mouseDownHandler(event) {
        console.log('button click');
        if(this.onButtonClick) {
            this.buttonRectangle.setFillStyle(0xDDDDDD, 0.8);
            this.onButtonClick();
        }
    }

}

