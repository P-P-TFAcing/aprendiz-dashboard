import DraggableContainer from './DraggableContainer.js';
import LegendTopicRect from './LegendTopicRect.js';

export default class LegendRect {
    constructor(scene, courses, x, y) {        
        this.courses = courses;
        this.scene = scene;
        this.container = scene.add.container(x, y);
        // global metadata object
        let metadata = scene.globalMetadata;
        if(metadata) {
            let containerMetadata = metadata.containerPositions[this.containerId];
            if(containerMetadata) {
                this.x = containerMetadata.x;
                this.y = containerMetadata.y;
                this.container.setPosition(this.x, this.y);
            }
        }
        let ypos = 24;
        let width = 0;
        let legendText = scene.add.text(16, ypos, 'Legend', {fontSize: '28px'});
        let height = legendText.height + 16;

        let legendRect = scene.add.rectangle(0, 0, this.objectWidth, this.objectHeight);
        legendRect.setOrigin(0, 0);
        legendRect.setStrokeStyle(2, 0xffffff, 2);
        legendRect.setFillStyle(0x222222, 0.8);
        this.container.add(legendRect);
            
        ypos += legendText.height + 16;
        this.container.add(legendText);
        let courseTopicMap = { };
        for(const course of courses) {
            for (const topic of course.topics) {
                let legendTopic = courseTopicMap[topic.name];
                if(!legendTopic) {
                    let legendTopicRect = new LegendTopicRect(scene, this.container, topic, 16, ypos);
                    ypos += (legendTopicRect.objectHeight + 4);
                    if ((legendTopicRect.objectWidth + 32) > width) {
                        width = legendTopicRect.objectWidth + 32;
                    }
                    height += (legendTopicRect.objectHeight + 4);
                    courseTopicMap[topic.name] = topic;
                }
            }            
        }
        
        height += 24;
        this.objectHeight = height;
        this.objectWidth = width;
        legendRect.height = this.objectHeight;
        legendRect.width = this.objectWidth;
        this.container.setSize(this.objectWidth, this.objectHeight);
        this.width = width;
        this.height = height;
    }
}



