import DraggableContainer from './DraggableContainer.js';

export default class CourseTitle extends DraggableContainer {

    constructor(scene, scrollableContainer, x, y, course) {
        super(scene, scrollableContainer, 'CourseTitle', course.metadata, x, y);        
        this.course = course;
        console.log('course title', course.name, x, y);
        let text = scene.add.text(0, 0, course.name, { font: "32px Arial", color: '#CCCCFF' });
        text.setOrigin(0, 0);
        this.width = text.width;
        this.height = text.height;
        this.titleText = text;
        this.add(text);
    }

}


