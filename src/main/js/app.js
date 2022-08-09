/* global google, angular, Phaser, MainScene */

console.log('starting Aprendiz app');

import DraggableContainer from './DraggableContainer.js';
import CourseTitle from './CourseTitle.js';

class LegendTopicRect {
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

class LegendRect extends DraggableContainer {
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

class CourseWorkRect extends DraggableContainer {

    constructor(scene, course, courseWork, x, y) {
        super(scene, x, y);
        this.courseWork = courseWork;
        let text = scene.add.text(16, 16, courseWork.title, {fontSize: '24px'});
        text.setOrigin(0, 0);
        this.container.add(text);
        this.width = text.width + 32;
        this.height = text.height + 32;
        let rectangle = scene.add.rectangle(0, 0, this.width, this.height);
        rectangle.setOrigin(0, 0);
        rectangle.setStrokeStyle(2, 0xffffff, 2);
        this.container.add(rectangle);
        this.draggable(rectangle);
    }
}

class LoaderScene extends Phaser.Scene {

    preload() {
        this.load.setBaseURL('https://aprendiz-dashboard.pptpdx.com');
        console.log('preloaded LoaderScene');
    }

    create() {
        console.log('created LoaderScene');
        let text = this.add.text(0, 0, 'Welcome to Aprendiz Dashboard. Loading Classroom data...', {fontSize: '24px'});
        text.setOrigin(0, 0);
    }
}
;

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
    
    $scope.dataLoaded = function (courses) {
        console.log('data loaded', courses);        
        // start main scene
        game.scene.add('MainScene', MainScene, true, courses);
    };

    ClassroomDataLoaderService.loadData($scope.dataLoaded);

});


