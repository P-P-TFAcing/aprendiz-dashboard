class CourseRect {
    constructor(scene, course, x, y) {
        let graphics = scene.add.graphics();
        graphics.lineStyle(2, 0xffff00, 2);
        this.objectHeight = 50;
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
        scene.add.text(48 + x, 48 + y, topic.name, { fontSize: '24px' });  
        this.objectHeight = 50;
        this.objectWidth = 400;
    }
}

class LegendRect {
    constructor(scene, course, x, y) {
        let ypos = y;
        let width = undefined;
        let height = undefined;
        for(const topic of course.topics) {
            let legendTopicRect = new LegendTopicRect(scene, course, topic, x, ypos);
            ypos += (legendTopicRect.objectHeight + 4);            
            width = legendTopicRect.objectWidth;
            height += (legendTopicRect.objectHeight + 4);
        }
        this.objectHeight = width;
        this.objectWidth = height;        
        let graphics = scene.add.graphics();
        graphics.lineStyle(2, 0xffffff, 2);
        //  32px radius on the corners
        graphics.strokeRoundedRect(16 + x, 16 + y, this.objectWidth, this.objectHeight, 16);
        graphics.lineStyle(4, 0xff00ff, 1);
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
        let courseRect = new CourseRect(this, course, 32, 32);
        new LegendRect(this, course, courseRect.objectWidth + 32, 32);
    }

};


