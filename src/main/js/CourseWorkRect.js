import DraggableContainer from './DraggableContainer.js';

export default class CourseWorkRect extends DraggableContainer {

    constructor(scene, course, courseWork, x, y) {
        super(scene, x, y, 'CourseWorkRect');
        this.courseWork = courseWork;
        let text = scene.add.text(16, 16, courseWork.title, {fontSize: '24px'});
        text.setOrigin(0, 0);
        this.container.add(text);
        this.width = text.width + 32;
        this.height = text.height + 32;
        let rectangle = scene.add.rectangle(0, 0, this.width, this.height);
        rectangle.setOrigin(0, 0);
        rectangle.setStrokeStyle(2, 0xffffff, 2);
        this.container.add(rectangle);
        this.draggable(rectangle);
    }
}

