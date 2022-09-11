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
        this.progressBar.fillRect(50, 100, 800 * (position / count), 50);
    }

    create() {
        console.log('created LoaderScene');
        let text = this.add.text(50, 50, 'Welcome to Aprendiz Dashboard. Loading Classroom data...', {fontSize: '24px'});
        text.setOrigin(0, 0);
        this.progressBar = this.add.graphics();
        this.progressBox = this.add.graphics();
        this.progressBox.fillStyle(0x888888, 0.8);
        this.progressBox.fillRect(50, 100, 800, 50);
    }
}
;

import CourseWorkRect from './CourseWorkRect.js';
import Button from './Button.js';
import ButtonPanel from './ButtonPanel.js';
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

class FullScreenButton extends Button {

    onButtonClick() {
        console.log('full screen');
        this.scene.scale.startFullscreen();
    }
}
;

class ZoomInButton extends Button {

    onButtonClick() {
        console.log('zoom in');
        if (this.scene.data.sceneScale <= 2.0) {
            this.scene.data.sceneScale += 0.1;
            console.log('scene zoom', this.scene.data.sceneScale);
            for (const object of this.scene.data.sceneObjects) {
                object.container.setScale(this.scene.data.sceneScale);
                let newX = (object.x * this.scene.data.sceneScale) + this.scene.data.sceneOffset.x;
                let newY = (object.y * this.scene.data.sceneScale) + this.scene.data.sceneOffset.y;
                object.container.setPosition(newX, newY);
            }
        }
    }
}

class ZoomOutButton extends Button {

    onButtonClick() {
        console.log('zoom out');
        if (this.scene.data.sceneScale >= 0.1) {
            this.scene.data.sceneScale -= 0.1;
            console.log('scene zoom', this.scene.data.sceneScale);
            if (!this.scene.data.sceneOffset) {
                this.scene.data.sceneOffset = {x: 0, y: 0};
            }
            for (const object of this.scene.data.sceneObjects) {
                object.container.setScale(this.scene.data.sceneScale);
                let newX = (object.x * this.scene.data.sceneScale) + this.scene.data.sceneOffset.x;
                let newY = (object.y * this.scene.data.sceneScale) + this.scene.data.sceneOffset.y;
                object.container.setPosition(newX, newY);
            }
        }
    }
}

import ScrollableContainer from './ScrollableContainer.js';
import ScrollableContainerPlugin from './ScrollableContainerPlugin.js';

export default class TextObject extends DraggableContainer {

    constructor(scene, x, y) {
        super(scene, x, y, 'TextObject');
        let text = scene.add.text(0, 0, 'this is text', {fontSize: '32px'});
        text.setOrigin(0, 0);
        this.width = text.width;
        this.height = text.height;
        this.container.add(text);
    }

}


class MainScene extends Phaser.Scene {

    preload() {
        this.load.setBaseURL('https://aprendiz-dashboard.pptpdx.com');
        console.log('preloaded MainScene');
    }

    onWebSocketOpen() {
        console.log('host websocket opened');
    }

    pointerDownHandler(event) {
        // mouse down
        console.log('pointerdown', event.downX, event.downY);
        this.data.mainScrollableContainer.setOffset(event.downX, event.downY);
//        let rect = this.data.testRect;
//        rect.setPosition(rect.x + 1, rect.y + 1);
    }

    pointerUpHandler(event) {
        console.log('pointerup', event.upX, event.upY);

    }

    pointerMoveHandler(event) {
        console.log('pointermove', event.worldX, event.worldY);

    }

    loadCourseIntoScene(course) {

        console.log('loading course', course);

//        let courseTitle = new CourseTitle(this, course, 16, 16);
//        this.data.courseTitle = courseTitle;
//        this.data.sceneObjects.push(courseTitle);

//        let buttonPanel = new ButtonPanel(this, 4, 4, 'Aprendiz Dashboard');
//        buttonPanel.addButton(new SaveButton(this, 800, 20, 'Save'));
//        buttonPanel.addSpacer(48);
//        buttonPanel.addButton(new ZoomInButton(this, 1100, 20, '+'));
//        buttonPanel.addButton(new ZoomOutButton(this, 1150, 20, '-'));
//        buttonPanel.addSpacer(96);
//        buttonPanel.addButton(new FullScreenButton(this, 1450, 20, 'Full-Screen'));

//        let ypos = 200;
//        let xpos = 100;
//        for (const courseWork of course.courseWork) {
//            this.data.sceneObjects.push(new CourseWorkRect(this, course, courseWork, xpos, ypos));
//            ypos += 100;
//            xpos += 80;
//        }
        // mouse down in client area
        this.input.on('pointerdown', function (event) {
            console.log('pointerdown', event);
            //console.log('pointer down in desktop', event);
//            if (!this.scene.data.buttonClicked) {
//                if (!this.scene.data.dragContext) {
//                    if (!this.scene.data.sceneDragContext) {
//                        this.scene.data.sceneDragContext = {
//                            pointerX: event.downX,
//                            pointerY: event.downY
//                        };
//                        console.log('set scene drag context', this.scene.data.sceneDragContext);
//                    }
//                }
//            }
        });
        this.input.on('pointermove', function (event) {
            console.log('pointermove', event);
//            let dragContext = this.scene.data.dragContext;
//            if (dragContext) {
//                let x = event.worldX;
//                let y = event.worldY;
//                dragContext.dragRect.setPosition(x + dragContext.deltaX, y + dragContext.deltaY);
//            } else if (this.scene.data.sceneDragContext) {
//                // drag scene
//                if (!this.scene.data.sceneOffset) {
//                    this.scene.data.sceneOffset = {x: 0, y: 0};
//                }
//                let pointerX = event.worldX;
//                let pointerY = event.worldY;
//                console.log('drag scene mouse move', pointerX, pointerY);
//                let offsetX = pointerX - this.scene.data.sceneDragContext.pointerX;
//                let offsetY = pointerY - this.scene.data.sceneDragContext.pointerY;
//                if ((offsetX !== 0) && (offsetY !== 0)) {
////                    this.scene.data.sceneOffset.x += offsetX;
////                    this.scene.data.sceneOffset.y += offsetY;
//                    console.log('scene offset', this.scene.data.sceneOffset);
//                    for (const object of this.scene.data.sceneObjects) {
//                        // update containers
//                        let newX = (object.x * this.scene.data.sceneScale) + offsetX;
//                        let newY = (object.y * this.scene.data.sceneScale) + offsetY;
//                        object.container.setPosition(newX, newY);
//                    }
//                }
//            }
        });
        this.input.on('pointerup', function (event) {
            console.log('pointerup', event);
//            if (this.scene.data.buttonClicked) {
//                delete this.scene.data.buttonClicked;
//            }
//            let x = event.worldX;
//            let y = event.worldY;
//            let dragContext = this.scene.data.dragContext;
//            if (dragContext) {
//                console.log('drag context mouse up', x, y, dragContext);
//                let newX = x + dragContext.deltaX;
//                let newY = y + dragContext.deltaY;
//                dragContext.container.setPosition(newX, newY);
//                dragContext.parentObject.x = newX;
//                dragContext.parentObject.y = newY;
//
//                // update metadata (to save on server if save button is pushed)
//                let metadata;
//                if (dragContext.parentObject.course) {
//                    metadata = dragContext.parentObject.course.metadata;
//                } else {
//                    metadata = dragContext.parentObject.scene.globalMetadata;
//                }
//                if (!metadata) {
//                    metadata = {containerPositions: {}};
//                    dragContext.parentObject.course.metadata = metadata;
//                }
//                let containerId = dragContext.parentObject.containerId;
//                if (dragContext.parentObject.course) {
//                    // course metadata                    
//                    let containerPosition = metadata.containerPositions[containerId];
//                    if (!containerPosition) {
//                        metadata.courseId = dragContext.parentObject.course.id;
//                        metadata.containerPositions[containerId] = {x: newX, y: newY};
//                    } else {
//                        containerPosition.x = newX;
//                        containerPosition.y = newY;
//                    }
//                } else {
//                    // global metadata                    
//                    let containerPosition = metadata.containerPositions[containerId];
//                    if (!containerPosition) {
//                        metadata.containerPositions[containerId] = {x: newX, y: newY};
//                    } else {
//                        containerPosition.x = newX;
//                        containerPosition.y = newY;
//                    }
//                }
//                console.log('update course configuration', metadata);
//                dragContext.dragRect.destroy();
//                // update configuration
//                delete this.scene.data.dragContext;
//            } else if (this.scene.data.sceneDragContext) {
//                //this.scene.data.courseTitle.container.setPosition(10,10);
//                console.log('pointer up scene drag', this.scene.data.sceneDragContext);
//                let pointerX = event.upX;
//                let pointerY = event.upY;
//                let offsetX = pointerX - this.scene.data.sceneDragContext.pointerX;
//                let offsetY = pointerY - this.scene.data.sceneDragContext.pointerY;
//                if ((offsetX !== 0) && (offsetY !== 0)) {
//                    delete this.scene.data.sceneDragContext;
//                    console.log('drag scene', offsetX, offsetY);
//                    if (!this.scene.data.sceneOffset) {
//                        this.scene.data.sceneOffset = {x: 0, y: 0};
//                    }
//                    this.scene.data.sceneOffset.x = offsetX;
//                    this.scene.data.sceneOffset.y = offsetY;
//                    console.log('scene offset', this.scene.data.sceneOffset);
//                }
//            }
        });
    }

    create(config) {
        console.log('created MainScene', config);
        this.globalMetadata = config.global;
        this.courses = config.courses;
        if (!this.globalMetadata) {
            this.globalMetadata = {
                containerPositions: {}
            };
        }
        // open websocket
        this.websocket = new WebSocketContext(this.sys.game.scene, this.onWebSocketOpen.bind(this));
        this.data.sceneObjects = [];
        this.data.sceneScale = 1.0;
        // graphics
        //this.data.mainContainer = this.add.container(0, 64);
        this.input.on('pointerdown', this.pointerDownHandler.bind(this));
        this.input.on('pointerup', this.pointerUpHandler.bind(this));
        this.input.on('pointermove', this.pointerMoveHandler.bind(this));

        //let testText = new TextObject(this, 100, 100);
        this.data.mainScrollableContainer = this.add.scrollableContainer(0, 100);        

        let rectangle = this.add.rectangle(0, 0, 500, 200);
        rectangle.setOrigin(0, 0);
        rectangle.setStrokeStyle(2, 0x0000EE, 2);
        rectangle.setFillStyle(0xAAAAAA);
        this.data.mainScrollableContainer.add(rectangle);
        this.data.testRect = rectangle;

        // now we have access to courses
//        for (const course of this.courses) {
//            this.loadCourseIntoScene(course);
//        }
//        // legend rect
//        this.data.sceneObjects.push(new LegendRect(this, this.courses, 16, 64));
    }
}

angular.module("AprendizApplication", ['ngCookies']);

require('./ClassroomDataLoaderService.js');

angular.module("AprendizApplication").controller('MainViewController', function (ClassroomDataLoaderService) {

    console.log('started main view controller');

    let screenWidth = window.screen.width;
    let screenHeight = window.screen.height;

    console.log('screen resoution', screenWidth, screenHeight);

    let config = {
        type: Phaser.AUTO,
        parent: 'aprendiz-block',
        plugins: {
            global: [
                {key: 'ScrollableContainerPlugin', plugin: ScrollableContainerPlugin, start: true}
            ]
        },
        width: screenWidth / 2,
        height: screenHeight / 2
    };

    let game = new Phaser.Game(config);
    console.log('started new Phaser game');
    game.scene.add('LoaderScene', LoaderScene, true);
    console.log('started Loader Scene');
    // load data
    ClassroomDataLoaderService.loadData(game);

});


