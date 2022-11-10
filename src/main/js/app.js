/* global google, angular, Phaser, MainScene */

console.log('starting Aprendiz app');
import DraggableContainer from './DraggableContainer.js';
import CourseTitle from './CourseTitle.js';
import LegendTopicRect from './LegendTopicRect.js';
import LegendRect from './LegendRect.js';
import CourseWorkInfoPanel from './CourseWorkInfoPanel.js';

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
        let text = this.add.text(50, 50, 'Welcome to Aprendiz Dashboard. Loading Classroom data...', { font: "24px Arial", color: '#FFFFFF' });
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
                // update the metadata with draggableobjects
                let containerPositions = {};
                for (const draggableObject of this.scene.data.mainScrollableContainer.draggableObjects) {
                    if(draggableObject.course.id === course.id) {
                        containerPositions[draggableObject.containerId] = {
                            x: draggableObject.x,
                            y: draggableObject.y
                        };
                    }
                }
                metadata.containerPositions = containerPositions;
                this.scene.websocket.sendMessage('SAVE_COURSE_CONFIGURATION', metadata);
            }
        }
    }
}

class FullScreenButton extends Button {

    onButtonClick() {
        console.log('full screen');
        this.scene.scale.startFullscreen();
    }
}

class LegendToggleButton extends Button {

    onButtonClick() {
        console.log('legend toggle');        
        let legendVisible = this.scene.legendVisible;
        this.scene.legendVisible = !legendVisible;        
        this.scene.legendPanel.setVisible(this.scene.legendVisible);                
    }
}

class ZoomInButton extends Button {

    onButtonClick() {
        console.log('zoom in');
        if (this.scene.data.sceneScale <= 2.0) {
            this.scene.data.sceneScale += 0.1;
            console.log('scene zoom', this.scene.data.sceneScale);
            this.scene.data.mainScrollableContainer.setScale(this.scene.data.sceneScale);
        }
    }
}

class ZoomOutButton extends Button {

    onButtonClick() {
        console.log('zoom out');
        if (this.scene.data.sceneScale >= 0.1) {
            this.scene.data.sceneScale -= 0.1;
            console.log('scene zoom', this.scene.data.sceneScale);
            this.scene.data.mainScrollableContainer.setScale(this.scene.data.sceneScale);
        }
    }
}

import DashboardAppPlugin from './DashboardAppPlugin.js';

class MainScene extends Phaser.Scene {

    preload() {
        this.load.setBaseURL('https://aprendiz-dashboard.pptpdx.com');
        console.log('preloaded MainScene');
    }

    onWebSocketOpen() {
        console.log('host websocket opened');
    }

    loadCourseIntoScene(course, courseIndex) {

        console.log('loading course', course, courseIndex);

        this.data.mainScrollableContainer.add(this.add.courseTitle(this.data.mainScrollableContainer, 16 + (courseIndex * 64), 16 + (courseIndex * 64), course));                
        let xpos = 50;
        let ypos = 50;
        for (const courseWork of course.courseWork) {
            this.data.mainScrollableContainer.add(this.add.courseWorkRect(this.data.mainScrollableContainer, xpos, ypos, course, courseWork));
            ypos += 100;
            xpos += 80;
        }
    }
    
    onHoverIn(object) {
        console.log('object hover in', object);
        this.hoverObject = object;        
        this.data.mainScrollableContainer.add(this.add.courseWorkInfoPanel(this.data.mainScrollableContainer, 50,50, object.course, object.courseWork));
    }
    
    onHoverOut(object) {
        console.log('object hover out', object);
        delete this.hoverObject;
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
        this.data.sceneScale = 1.0;
        // graphics
        let buttonPanel = new ButtonPanel(this, 4, 4, 'Aprendiz Dashboard');
        buttonPanel.addButton(new SaveButton(this, 800, 20, 'Save'));
        buttonPanel.addSpacer(48);
        buttonPanel.addButton(new ZoomInButton(this, 1100, 20, '+'));
        buttonPanel.addButton(new ZoomOutButton(this, 1150, 20, '-'));
        buttonPanel.addSpacer(96);
        buttonPanel.addButton(new FullScreenButton(this, 1450, 20, 'Full-Screen'));
        buttonPanel.addSpacer(96);
        buttonPanel.addButton(new LegendToggleButton(this, 1550, 20, 'Legend'));

        this.data.mainScrollableContainer = this.add.scrollableContainer(0, buttonPanel.height + 12, 10000, 5000);        
        this.data.mainScrollableContainer.addEventHandlerHoverIn(this.onHoverIn);
        this.data.mainScrollableContainer.addEventHandlerHoverOut(this.onHoverOut);
        
        let regionRect = this.add.rectangle(0, 0, 19200, 10800);
        regionRect.setOrigin(0, 0);
        regionRect.setStrokeStyle(2, 0x0000EE, 2);        
        this.data.mainScrollableContainer.add(regionRect);
       
        // now we have access to courses
        let courseIndex = 0;
        for (const course of this.courses) {
            this.loadCourseIntoScene(course, courseIndex);
            courseIndex++;
        }
        // legend rect        
        this.legendPanel = new LegendRect(this, this.courses, 1460, 80);   
        this.legendVisible = true;
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
        dom: {
          createContainer: true
        },
        scale: {          
                parent: 'aprendiz-block',
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
                width: 1920,
                height: 1080
        },
        plugins: {
            global: [
                {key: 'ScrollableContainerPlugin', plugin: DashboardAppPlugin, start: true}
            ]
        }
    };

    let game = new Phaser.Game(config);
    console.log('started new Phaser game');
    game.scene.add('LoaderScene', LoaderScene, true);
    console.log('started Loader Scene');
    // load data
    ClassroomDataLoaderService.loadData(game);

});


