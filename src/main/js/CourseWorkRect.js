import DraggableContainer from './DraggableContainer.js';

export default class CourseWorkRect extends DraggableContainer {

    constructor(scene, scrollableContainer, x, y, course, courseWork) {
        super(scene, scrollableContainer, 'CourseWorkRect_' + courseWork.id, course.metadata, x, y);        
        this.course = course;
        this.courseWork = courseWork;
        // title
        let text = scene.add.text(16, 16, courseWork.title, { font: "24px Arial", color: '#ffffff' });
        text.setOrigin(0, 0);        
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
        // solid rect
        rectangle.setFillStyle(rectColor);
        rectangle.setStrokeStyle(2, 0x888888, 2);
        // add to container
        this.add(rectangle);
        this.add(text);
    }
}

