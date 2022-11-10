
export default class CourseWorkInfoPanel {
        
    setVisible(visible) {
        this.container.setVisible(visible);
    }
        
    constructor(scene, courses, x, y) {        
        this.courses = courses;
        this.scene = scene;
        this.container = scene.add.container(x, y);
        let infoPanelRect = scene.add.rectangle(0, 0, 400, 400);
        infoPanelRect.setOrigin(0, 0);
        infoPanelRect.setStrokeStyle(2, 0x00ff00, 2);
        infoPanelRect.setFillStyle(0x800000, 0.6);
        this.container.add(infoPanelRect);            
    }
}



