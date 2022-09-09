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

    loadCompleted(global, courses) {
        console.log('load completed so start main scene');
        this.scene.add('MainScene', MainScene, true, {courses: courses, global: global});
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('MainScene');
        });
        this.cameras.main.fadeOut(1000, 0, 0, 0);
    }

    loadProgress(position, count) {
        console.log('load progress ' + position + ' of ' + count);
        this.progressValue = position;
        this.progressTotalCount = count;
        this.progressBar.clear();
        this.progressBar.fillStyle(0xffffff, 1);
        this.progressBar.fillRect(50, 100, 100 * position, 50);
    }

    create() {
        console.log('created LoaderScene');
        let text = this.add.text(50, 50, 'Welcome to Aprendiz Dashboard. Loading Classroom data...', {fontSize: '24px'});
        text.setOrigin(0, 0);
        this.progressBar = this.add.graphics();
        this.progressBox = this.add.graphics();
        this.progressBox.fillStyle(0x888888, 0.8);
        this.progressBox.fillRect(50, 100, 500, 50);
    }
}
;

import CourseWorkRect from './CourseWorkRect.js';

import Button from './Button.js';

import WebSocketContext from './WebSocketContext.js';

class SaveButton extends Button {

    onButtonClick() {
        console.log('save configuration', this.scene.globalMetadata);
        if (this.scene.globalMetadata) {
            this.scene.websocket.sendMessage('SAVE_GLOBAL_CONFIGURATION', this.scene.globalMetadata);
        }
        for (const course of this.scene.courses) {
            let metadata = course.metadata;
            if (metadata) {
                this.scene.websocket.sendMessage('SAVE_COURSE_CONFIGURATION', metadata);
            }
        }
    }
}
;

class MainScene extends Phaser.Scene {

    preload() {
        this.load.setBaseURL('https://aprendiz-dashboard.pptpdx.com');
        console.log('preloaded MainScene');
    }

    onWebSocketOpen() {
        console.log('host websocket opened');
    }

    loadCourseIntoScene(course) {

        console.log('loading course', course);
        new CourseTitle(this, course, 16, 16);

        new SaveButton(this, 1000, 20, 'Save Changes');

        let ypos = 200;
        let xpos = 100;
        for (const courseWork of course.courseWork) {
            new CourseWorkRect(this, course, courseWork, xpos, ypos);
            ypos += 100;
            xpos += 80;
        }
        // mouse down in client area
        this.input.on('pointerdown', function (event) {
            //console.log('pointer down in desktop', event);
            if(!this.scene.data.sceneDragContext) {
                this.scene.data.sceneDragContext = {
                    pointerX: event.downX,
                    pointerY: event.downY
                };
                console.log('set scene drag context', this.scene.data.sceneDragContext);
            }
        });
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
                let newX = x + dragContext.deltaX;
                let newY = y + dragContext.deltaY;
                dragContext.container.setPosition(newX, newY);
                dragContext.parentObject.x = newX;
                dragContext.parentObject.y = newY;

                // update metadata (to save on server if save button is pushed)
                let metadata;
                if (dragContext.parentObject.course) {
                    metadata = dragContext.parentObject.course.metadata;
                } else {
                    metadata = dragContext.parentObject.scene.globalMetadata;
                }
                if (!metadata) {
                    metadata = {containerPositions: {}};
                    dragContext.parentObject.course.metadata = metadata;
                }
                let containerId = dragContext.parentObject.containerId;
                if (dragContext.parentObject.course) {
                    // course metadata                    
                    let containerPosition = metadata.containerPositions[containerId];
                    if (!containerPosition) {
                        metadata.courseId = dragContext.parentObject.course.id;
                        metadata.containerPositions[containerId] = {x: newX, y: newY};
                    } else {
                        containerPosition.x = newX;
                        containerPosition.y = newY;
                    }
                } else {
                    // global metadata                    
                    let containerPosition = metadata.containerPositions[containerId];
                    if (!containerPosition) {
                        metadata.containerPositions[containerId] = {x: newX, y: newY};
                    } else {
                        containerPosition.x = newX;
                        containerPosition.y = newY;
                    }
                }
                console.log('update course configuration', metadata);
                dragContext.dragRect.destroy();
                // update configuration
                delete this.scene.data.dragContext;
            } else {
                console.log('pointer up in desktop', event);
            }
        });
    }

    create(config) {
        console.log('created MainScene', config);
        this.globalMetadata = config.global;
        this.courses = config.courses;
        if (!this.globalMetadata) {
            this.globalMetadata = {containerPositions: {}};
        }
        // open websocket
        this.websocket = new WebSocketContext(this.sys.game.scene, this.onWebSocketOpen.bind(this));

        // now we have access to courses
        for (const course of this.courses) {
            this.loadCourseIntoScene(course);
        }
        // legend rect
        new LegendRect(this, this.courses, 16, 64);
    }
}
;

angular.module("AprendizApplication", ['ngCookies']);

require('./ClassroomDataLoaderService.js');

angular.module("AprendizApplication").controller('MainViewController', function (ClassroomDataLoaderService) {
    
    console.log('started main view controller');

    let config = {
        type: Phaser.AUTO,
        dom: {
            createContainer: true
        },
        fps: {
            target: 20,
            forceSetTimeOut: true
        },
        parent: 'aprendiz-block',
        width: 1280,
        height: 720
    };

    let game = new Phaser.Game(config);
    console.log('started new Phaser game');
    game.scene.add('LoaderScene', LoaderScene, true);
    console.log('started Loader Scene');
    // load data
    ClassroomDataLoaderService.loadData(game);

});


