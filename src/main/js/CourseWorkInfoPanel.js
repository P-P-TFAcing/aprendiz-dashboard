
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
        infoPanelRect.setOrigin(0, 0);
        infoPanelRect.setStrokeStyle(2, 0x00ff00, 2);
        infoPanelRect.setFillStyle(0x800000, 0.6);
        this.infoPanelRect = infoPanelRect;
    }
    
    destroy() {
        this.infoPanelRect.destroy();
    }
}



