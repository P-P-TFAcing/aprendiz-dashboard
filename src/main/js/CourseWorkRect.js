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
        // stage 0 : red
        if(course.enrollmentCode === "ukxv7mb") {            
            rectColor = 0xff0000;
        // stage 1 : orange
        } else if(course.enrollmentCode === 'jdcft3j') {            
            rectColor = 0xFFA500;
        // stage 2: green
        } else if(course.enrollmentCode === '7khg5iv') {            
            rectColor = 0x00ff00;
        } else if(course.enrollmentCode === '2oksark') {
            // stage 3: violet
            rectColor = 0xEE82EE;
        }
        rectangle.setStrokeStyle(2, rectColor, 2);
        this.container.add(rectangle);
        this.draggable(rectangle);
    }
}

