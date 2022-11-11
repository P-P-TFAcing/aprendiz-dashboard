
export default class CourseWorkInfoPanel extends Phaser.GameObjects.Container {
        
    setVisible(visible) {
        this.container.setVisible(visible);
    }
        
    constructor(scene, x, y, course, courseWork) {
        super(scene, x, y);
        this.course = course;
        this.courseWork = courseWork;
        this.scene = scene;        
        let infoPanelRect = scene.add.rectangle(x + 20, y + 20, x + 400, y + 400);
        let text = scene.add.text(x + 24, y + 24, courseWork.description, { font: "0.8em Arial", color: '#cccccc' });
        infoPanelRect.setOrigin(0, 0);
        infoPanelRect.setStrokeStyle(2, 0x00ff00, 2);
        infoPanelRect.setFillStyle(0x800000, 0.6);
        this.infoPanelRect = infoPanelRect;
        this.infoPanelText = text;
    }
    
    destroy() {
        this.infoPanelText.destroy();
        this.infoPanelRect.destroy();
    }
}



