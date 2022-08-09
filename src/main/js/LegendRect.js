import DraggableContainer from './DraggableContainer.js';
import LegendTopicRect from './LegendTopicRect.js';

export default class LegendRect extends DraggableContainer {
    constructor(scene, course, x, y) {
        super(scene, x, y);
        let ypos = 24;
        let width = 0;
        let legendText = scene.add.text(16, ypos, 'Legend', {fontSize: '28px'});
        let height = legendText.height + 16;
        ypos += legendText.height + 16;
        this.container.add(legendText);
        for (const topic of course.topics) {
            let legendTopicRect = new LegendTopicRect(scene, this.container, topic, 16, ypos);
            ypos += (legendTopicRect.objectHeight + 4);
            if ((legendTopicRect.objectWidth + 32) > width) {
                width = legendTopicRect.objectWidth + 32;
            }
            height += (legendTopicRect.objectHeight + 4);
        }
        height += 24;
        this.objectHeight = height;
        this.objectWidth = width;
        let legendRect = scene.add.rectangle(0, 0, this.objectWidth, this.objectHeight);
        legendRect.setOrigin(0, 0);
        legendRect.setStrokeStyle(2, 0xffffff, 2);
        this.container.add(legendRect);
        this.container.setSize(this.objectWidth, this.objectHeight);
        this.width = width;
        this.height = height;
        this.draggable(legendRect);
    }
}



