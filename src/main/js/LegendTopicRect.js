

export default class LegendTopicRect {
    constructor(scene, container, topic, x, y) {
        let legendRoundedRect = scene.add.rectangle(x, y, 400, 50);
        legendRoundedRect.setOrigin(0, 0);
        legendRoundedRect.setStrokeStyle(2, 0xffffff, 2);
        container.add(legendRoundedRect);
        //  32px radius on the corners        
        let legendTitleText = scene.add.text(x + 16, y + 16, topic.name, {fontSize: '24px'});
        container.add(legendTitleText);
        container.add(legendRoundedRect);
        this.objectHeight = legendRoundedRect.height;
        this.objectWidth = legendRoundedRect.width;
    }
}
