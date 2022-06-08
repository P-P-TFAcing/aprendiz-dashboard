class CourseRect {
    constructor(scene, course, x, y) {
        let graphics = scene.add.graphics();
        graphics.lineStyle(2, 0xffff00, 2);
        this.objectHeight = 60;
        this.objectWidth = 400;        
        //  32px radius on the corners
        graphics.strokeRoundedRect(32 + x, 32 + y, this.objectWidth, this.objectHeight, 32);
        graphics.lineStyle(4, 0xff00ff, 2);
        scene.add.text(48 + x, 48 + y, course.name, { fontSize: '28px' });    
    }
}

class LegendTopicRect {
    constructor(scene, course, topic, x, y) {
        let graphics = scene.add.graphics();
        graphics.lineStyle(2, 0xffffff, 2);
        //  32px radius on the corners
        graphics.strokeRoundedRect(32 + x, 32 + y, 400, 50, 32);
        graphics.lineStyle(4, 0xff00ff, 1);
        let text = scene.add.text(48 + x, 48 + y, topic.name, { fontSize: '24px' });  
        this.objectHeight = text.height + 32;
        this.objectWidth = 400;
    }
}

class LegendRect {
    constructor(scene, course, x, y) {
        let ypos = y + 32;
        let width = 0;        
        let legendText = scene.add.text(48 + x, ypos, 'Legend', { fontSize: '28px' });  
        let height = legendText.height + 16;
        ypos += legendText.height;
        for(const topic of course.topics) {
            let legendTopicRect = new LegendTopicRect(scene, course, topic, x, ypos);
            ypos += (legendTopicRect.objectHeight + 4);            
            if(legendTopicRect.objectWidth > width) {
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
        //graphics.lineStyle(4, 0xff00ff, 1);
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
        console.log('loading course',course);
        let courseRect = new CourseRect(this, course, 16, 16);
        new LegendRect(this, course, courseRect.objectWidth + 48, 32);
    }

};


