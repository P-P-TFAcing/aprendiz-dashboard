/* global Phaser */

/**
 * This object needs to have a this.container (the thing that moves) and a graphics object
 * to represent the region like a parent rectable.
 * @type type
 */
class DraggableObject {

    constructor(scene) {
        this.scene = scene;
    }

    draggable(graphicsObject) {
        graphicsObject.setInteractive({useHandCursor: true}).on('pointerdown', this.mouseDownHandler.bind(this));
    }

    mouseDownHandler(event) {
        // start dragging
        let deltaX = this.container.x - event.downX;
        let deltaY = this.container.y - event.downY;
        let dragRect = this.scene.add.rectangle(this.container.x, this.container.y, this.width, this.height);
        dragRect.setStrokeStyle(2, 0x00ffff, 2);
        dragRect.setOrigin(0, 0);
        let dragContext = {
            dragRect: dragRect,
            deltaX: deltaX,
            deltaY: deltaY,
            container: this.container
        };
        this.scene.data.dragContext = dragContext;
    }

}


class CourseTitle extends DraggableObject {

    constructor(scene, course, x, y) {
        super(scene);
        this.container = scene.add.container(x, y);
        let text = scene.add.text(0, 0, course.name, {fontSize: '32px'});
        text.setOrigin(0, 0);
        this.width = text.width;
        this.height = text.height;
        this.titleText = text;
        this.container.add(text);
        this.draggable(text);
    }

}

class LegendTopicRect {
    constructor(scene, topic, x, y) {
        let graphics = scene.add.graphics();
        graphics.lineStyle(2, 0xffffff, 2);
        //  32px radius on the corners
        graphics.strokeRoundedRect(32 + x, 32 + y, 400, 50, 32);
        graphics.lineStyle(4, 0xff00ff, 1);
        let text = scene.add.text(48 + x, 48 + y, topic.name, {fontSize: '24px'});
        this.objectHeight = text.height + 32;
        this.objectWidth = 400;
    }
}

class LegendRect extends DraggableObject {
    constructor(scene, course, x, y) {
        super(scene);
        let ypos = y + 32;
        let width = 0;
        let legendText = scene.add.text(48 + x, ypos, 'Legend', {fontSize: '28px'});
        let height = legendText.height + 16;
        ypos += legendText.height;
        for (const topic of course.topics) {
            let legendTopicRect = new LegendTopicRect(scene, topic, x, ypos);
            ypos += (legendTopicRect.objectHeight + 4);
            if (legendTopicRect.objectWidth > width) {
                width = legendTopicRect.objectWidth;
            }
            height += (legendTopicRect.objectHeight + 4);
        }
        this.objectHeight = height;
        this.objectWidth = width;
        let graphics = scene.add.graphics();
        graphics.lineStyle(2, 0xffffff, 2);
        //  32px radius on the corners
        //graphics.fillStyle(0x5555555, 1);
        graphics.strokeRoundedRect(16 + x, 16 + y, this.objectWidth + 32, this.objectHeight + 32, 16);
        //this.draggable(graphics);        
        //graphics.lineStyle(4, 0xff00ff, 1);
    }
}

class CourseWorkRect extends DraggableObject {

    constructor(scene, course, courseWork, x, y) {
        super(scene);
        let container = scene.add.container(x, y);
        this.container = container;
        this.courseWork = courseWork;
        let text = scene.add.text(16, 16, courseWork.title, {fontSize: '24px'});
        text.setOrigin(0, 0);
        container.add(text);
        this.width = text.width + 32;
        this.height = text.height + 32;
        let rectangle = scene.add.rectangle(0, 0, this.width, this.height);
        rectangle.setOrigin(0, 0);
        rectangle.setStrokeStyle(2, 0xffffff, 2);
        container.add(rectangle);
        this.draggable(rectangle);
    }
}

class MainScene extends Phaser.Scene {

    preload() {
        this.load.setBaseURL('https://aprendiz-dashboard.pptpdx.com');
        console.log('preloaded MainScene');
    }

    create() {
        console.log('created MainScene');
        // now we have access to courses
        let courses = this.game.config.courses;
        let course = courses[0];
        console.log('loading course', course);
        new CourseTitle(this, course, 16, 16);
        new LegendRect(this, course,16, 64);
        let ypos = 200;
        let xpos = 100;
        for(const courseWork of course.courseWork) {
            new CourseWorkRect(this, course, courseWork, xpos, ypos);
            ypos += 100;
            xpos += 80;
        }
        // handle mouse inputs
        this.input.on('pointermove', function (event) {
            let x = event.worldX;
            let y = event.worldY;
            let dragContext = this.scene.data.dragContext;
            if (dragContext) {
                console.log('drag context', dragContext);
                dragContext.dragRect.setPosition(x + dragContext.deltaX, y + dragContext.deltaY);
            }
        });
        this.input.on('pointerup', function (event) {
            let x = event.worldX;
            let y = event.worldY;
            let dragContext = this.scene.data.dragContext;
            if (dragContext) {
                console.log('drag context mouse up', x, y, dragContext);
                dragContext.container.setPosition(x + dragContext.deltaX, y + dragContext.deltaY);
                dragContext.dragRect.destroy();
                delete this.scene.data.dragContext;
            }
        });
    }
}
;

