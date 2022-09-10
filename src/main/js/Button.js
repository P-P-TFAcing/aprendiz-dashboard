/**
 * button component
 */
export default class Button {

    constructor(scene, x, y, caption) {
        this.scene = scene;
        this.container = scene.add.container(x, y);
        this.container.depth = 2;
        this.x = x;
        this.y = y;
        let text = scene.add.text(8, 8, caption, {font: "20px Arial", color: '#000000'});
        text.setOrigin(0, 0);
        text.depth = 1;
        this.container.add(text);
        this.width = text.width + 16;
        this.height = text.height + 16;
        let rectangle = scene.add.rectangle(0, 0, this.width, this.height);
        rectangle.setOrigin(0, 0);
        rectangle.depth = 0;
        rectangle.setStrokeStyle(2, 0xEEEEEE, 2);
        rectangle.setFillStyle(0xAAAAAA);
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
        if (this.onButtonClick) {
            this.buttonRectangle.setFillStyle(0xDDDDDD, 0.8);
            this.onButtonClick();
        }
    }

}

