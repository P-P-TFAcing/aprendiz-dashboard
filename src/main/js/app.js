/* global google, angular, Phaser, MainScene */

console.log('starting Aprendiz app');

import DraggableContainer from './DraggableContainer.js';
import CourseTitle from './CourseTitle.js';
import LegendTopicRect from './LegendTopicRect.js';
import LegendRect from './LegendRect.js';

class LoaderScene extends Phaser.Scene {

    preload() {
        this.load.setBaseURL('https://aprendiz-dashboard.pptpdx.com');
        console.log('preloaded LoaderScene');
    }

    loadCompleted(courses) {
        console.log('load completed so start main scene');
        this.scene.add('MainScene', MainScene, true, courses);        
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('MainScene');
	});
        this.cameras.main.fadeOut(1000, 0, 0, 0);
    }

    loadProgress(position, count) {
        console.log('load progress ' + position + ' of ' + count);
        this.progressValue = position;
        this.progressTotalCount = count;
    }
    
    update(time, delta) {
        console.log('progress update ' + time + ' ' + this.progressValue + ' of ' + this.progressTotalCount);
    }

    create() {
        console.log('created LoaderScene');
        let text = this.add.text(50, 50, 'Welcome to Aprendiz Dashboard. Loading Classroom data...', {fontSize: '24px'});        
        text.setOrigin(0, 0);
    }
}
;

import CourseWorkRect from './CourseWorkRect.js';

class MainScene extends Phaser.Scene {

    preload() {
        this.load.setBaseURL('https://aprendiz-dashboard.pptpdx.com');
        console.log('preloaded MainScene');
    }

    create(courses) {
        console.log('created MainScene', courses);
        // now we have access to courses
        let course = courses[0];
        console.log('loading course', course);
        new CourseTitle(this, course, 16, 16);
        new LegendRect(this, course, 16, 64);
        let ypos = 200;
        let xpos = 100;
        for (const courseWork of course.courseWork) {
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
                //console.log('drag context', dragContext);
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
                // update configuration
                delete this.scene.data.dragContext;
            }
        });
    }
}
;

angular.module("AprendizApplication", ['ngCookies']);


require('./ClassroomDataLoaderService.js');

angular.module("AprendizApplication").controller('MainViewController', function ($scope, $http, $cookies, $interval, ClassroomDataLoaderService) {
    console.log('started main view controller');
    
    let config = {
        type: Phaser.AUTO,
        dom: {
            createContainer: true
        },
        fps: {
            target: 18,
            forceSetTimeOut: true
        },
        parent: 'aprendiz-block',
        width: 4000,
        height: 4000
    };
    
    let game = new Phaser.Game(config);
    console.log('started new Phaser game');
    game.scene.add('LoaderScene', LoaderScene, true);
    console.log('started Loader Scene');
    // load data
    ClassroomDataLoaderService.loadData(game);

});


