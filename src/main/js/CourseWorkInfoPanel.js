
export default class CourseWorkInfoPanel extends Phaser.GameObjects.Container {
        
    setVisible(visible) {
        this.container.setVisible(visible);
    }
        
    constructor(scene, x, y, course, courseWork) {
        super(scene, x, y);
        this.course = course;
        this.courseWork = courseWork;
        this.scene = scene;        
        let infoPanelRect = scene.add.rectangle(x + 20, y + 20, x + 800, y + 800);        
        var style = { font: '12pt Arial', fill: 'white', align: 'left', wordWrap: { width: 700 } };
        let text = scene.add.text(x + 24, y + 24, courseWork.description, style);
        infoPanelRect.setOrigin(0, 0);
        infoPanelRect.setStrokeStyle(2, 0x00cc00, 2);
        infoPanelRect.setFillStyle(0x002200, 0.6);
        // clip text
        const textMaskShape = scene.make.graphics();
        textMaskShape.beginPath();
        textMaskShape.fillRect(x + 20, y + 20, x + 800, y + 800);        
        let textMask = textMaskShape.createGeometryMask();
        text.setMask(textMask);
        this.infoPanelRect = infoPanelRect;
        this.infoPanelText = text;        
    }
    
    destroy() {
        this.infoPanelText.destroy();
        this.infoPanelRect.destroy();
    }
}



