
export default class CourseWorkInfoPanel {
        
    setVisible(visible) {
        this.container.setVisible(visible);
    }
        
    constructor(scene, scrollableContainer, x, y, course, courseWork) {
        this.course = course;
        this.courseWork = courseWork;
        this.scene = scene;
        this.container = scene.add.container(x, y);
        let infoPanelRect = scene.add.rectangle(20, 20, 400, 400);
        infoPanelRect.setOrigin(0, 0);
        infoPanelRect.setStrokeStyle(2, 0x00ff00, 2);
        infoPanelRect.setFillStyle(0x800000, 0.6);
        this.container.add(infoPanelRect);            
    }
}



