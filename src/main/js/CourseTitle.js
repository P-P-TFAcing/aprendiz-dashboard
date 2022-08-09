import DraggableContainer from './DraggableContainer.js';

export default class CourseTitle extends DraggableContainer {

    constructor(scene, course, x, y) {
        super(scene, x, y);
        let text = scene.add.text(0, 0, course.name, {fontSize: '32px'});
        text.setOrigin(0, 0);
        this.width = text.width;
        this.height = text.height;
        this.titleText = text;
        this.container.add(text);
        this.draggable(text);
    }

}


