import DraggableContainer from './DraggableContainer.js';

export default class CourseTitle extends DraggableContainer {

    constructor(scene, course, x, y, metadata) {
        super(scene, x, y, 'CourseTitle');
        if(metadata) {
            let containerMetadata = metadata.containerPositions[this.containerId];
            if(containerMetadata) {
                this.x = containerMetadata.x;
                this.y = containerMetadata.y;
                this.container.setPosition(this.x, this.y);
            }
        }        
        let text = scene.add.text(0, 0, course.name, {fontSize: '32px'});
        text.setOrigin(0, 0);
        this.width = text.width;
        this.height = text.height;
        this.titleText = text;
        this.container.add(text);
        this.draggable(text);
    }

}


