import DraggableContainer from './DraggableContainer.js';

export default class CourseTitle extends DraggableContainer {

    constructor(scene, scrollableContainer, x, y, course) {
        super(scene, scrollableContainer, x, y);
        this.course = course;
        let metadata = course.metadata;
        if(metadata) {
            let containerMetadata = metadata.containerPositions[this.containerId];
            if(containerMetadata) {
                this.x = containerMetadata.x;
                this.y = containerMetadata.y;
                this.setPosition(this.x, this.y);
            }
        }        
        let text = scene.add.text(0, 0, course.name, { font: "32px Arial", color: '#CCCCFF' });
        text.setOrigin(0, 0);
        this.width = text.width;
        this.height = text.height;
        this.titleText = text;
        this.add(text);
    }

}


