/**
 * button panel component
 */
export default class ButtonPanel {

    constructor(scene, x, y, title) {        
        this.scene = scene;
        this.container = scene.add.container(x, y);
        this.x = x;
        this.y = y;
        this.buttons = [];
        let text = scene.add.text(4, 4, title, {{ font: "40px Arial" }});
        text.setOrigin(0, 0);
        this.container.add(text);
        this.width = text.width + 512;
        this.height = text.height + 48;
        this.buttonLeftPos = text.width + 256;
        let panelRectangle = scene.add.rectangle(0, 0, this.width, this.height);
        panelRectangle.setOrigin(0, 0);
        panelRectangle.setStrokeStyle(2, 0xffffff, 2);
        panelRectangle.setFillStyle(0x333333, 0.2);        
        this.container.add(panelRectangle);
        this.panelRectangle = panelRectangle;
    }
    
    addButton(scene, button) {
        this.buttons.push(button);
        console.log('added button', button);
    }

    addSpacer(pixelCount) {
        console.log('added spacer', pixelCount);
    }

}

