import DraggableContainer from './DraggableContainer.js';

export default class CourseWorkRect extends DraggableContainer {

    constructor(scene, course, courseWork, x, y) {
        super(scene, x, y, 'CourseWorkRect_' + courseWork.id);
        this.course = course;
        let metadata = course.metadata;
        if(metadata) {
            let containerMetadata = metadata.containerPositions[this.containerId];
            if(containerMetadata) {
                this.x = containerMetadata.x;
                this.y = containerMetadata.y;
                this.container.setPosition(this.x, this.y);
            }
        }        
        this.courseWork = courseWork;
        let text = scene.add.text(16, 16, courseWork.title, {fontSize: '24px'});
        text.setOrigin(0, 0);
        this.container.add(text);
        this.width = text.width + 32;
        this.height = text.height + 32;
        let rectangle = scene.add.rectangle(0, 0, this.width, this.height);
        rectangle.setOrigin(0, 0);
        let rectColor = 0xffffff;
        if(course.id === "487896080001") {
            rectColor = 0xff0000;
        }
        rectangle.setStrokeStyle(2, rectColor, 2);
        this.container.add(rectangle);
        this.draggable(rectangle);
    }
}

