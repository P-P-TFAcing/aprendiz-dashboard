
export default class CourseWorkInfoPanel {
        
    setVisible(visible) {
        this.container.setVisible(visible);
    }
        
    constructor(scene, course, courseWork) {
        this.course = course;
        this.courseWork = courseWork;
        this.scene = scene;        
        let infoPanelRect = scene.add.rectangle(20, 20, 400, 400);
        infoPanelRect.setOrigin(0, 0);
        infoPanelRect.setStrokeStyle(2, 0x00ff00, 2);
        infoPanelRect.setFillStyle(0x800000, 0.6);
    }
}



