class MainScene extends Phaser.Scene {

    preload() {
        this.load.setBaseURL('https://aprendiz-dashboard.pptpdx.com');
        console.log('preloaded MainScene');
    }

    create() {
        console.log('created MainScene');
        // now we have access to courses
        let courses = this.game.config.courses;
        let y = 32;
        for(const course of courses) {
            
            let graphics = this.add.graphics();
            graphics.lineStyle(2, 0xffff00, 2);

            //  32px radius on the corners
            graphics.strokeRoundedRect(32, 32 + y, 500, 80, 32);

            graphics.lineStyle(4, 0xff00ff, 1);

            this.add.text(48, 48 + y, course.name, { fontSize: '32px' });

            y += 96;
        }
    }

};


