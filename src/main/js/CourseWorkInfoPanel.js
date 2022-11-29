import DraggableContainer from './DraggableContainer.js';

export default class CourseWorkInfoPanel extends DraggableContainer {
        
    setVisible(visible) {
        this.container.setVisible(visible);
    }
        
    constructor(scene, scrollableContainer, x, y, course, courseWork) {
        super(scene, scrollableContainer, 'COURSEWORK_INFO_PANEL', course.metadata, x, y);
        this.course = course;
        this.courseWork = courseWork;
        this.scene = scene;        
        let infoPanelRect = scene.add.rectangle(x + 20, y + 20, x + 800, y + 800);   
        this.width = 780;
        this.height = 780;
        var style = { font: '14pt Arial', fill: 'white', align: 'left', wordWrap: { width: 700 } };
        let text = scene.add.text(x + 24, y + 24, courseWork.description, style);
        infoPanelRect.setOrigin(0, 0);
        infoPanelRect.setStrokeStyle(2, 0x00cccc, 2);
        infoPanelRect.setFillStyle(0x222222, 0.8);
        // clip text
        const textMaskShape = scene.make.graphics();
        textMaskShape.beginPath();
        textMaskShape.fillRect(x + 20, y + 20, x + 800, y + 800);        
        let textMask = textMaskShape.createGeometryMask();
        text.setMask(textMask);
        this.infoPanelRect = infoPanelRect;
        this.infoPanelText = text;        
        this.add(this.infoPanelRect);
        this.add(text);
    }
    
    destroy() {
        this.infoPanelText.destroy();
        this.infoPanelRect.destroy();
    }
}



