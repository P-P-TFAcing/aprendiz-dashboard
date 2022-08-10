/**
 * button component
 */
export default class Button {

    constructor(scene, x, y, caption) {
        this.scene = scene;
        this.container = scene.add.container(x, y);
        this.x = x;
        this.y = y;
        let text = scene.add.text(16, 16, caption, {fontSize: '24px'});
        text.setOrigin(0, 0);
        this.container.add(text);
        this.width = text.width + 32;
        this.height = text.height + 32;
        let rectangle = scene.add.rectangle(0, 0, this.width, this.height);
        rectangle.setOrigin(0, 0);
        rectangle.setStrokeStyle(2, 0xffffff, 2);
        this.container.add(rectangle);
        rectangle.setInteractive({useHandCursor: true}).on('pointerdown', this.mouseDownHandler.bind(this));
    }

    mouseDownHandler(event) {
        console.log('button click');
    }

}

