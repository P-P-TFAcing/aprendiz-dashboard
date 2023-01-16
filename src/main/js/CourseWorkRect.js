/* global Phaser */

import DraggableContainer from './DraggableContainer.js';

export default class CourseWorkRect extends DraggableContainer {

    constructor(scene, scrollableContainer, x, y, course, courseWork) {
        super(scene, scrollableContainer, 'CourseWorkRect_' + courseWork.id, course.metadata, x, y);        
        this.course = course;
        this.courseWork = courseWork;
        // title
        var text;
        if(courseWork.progressState === 'PROGRESS') {
            text = scene.add.text(16, 16, courseWork.title, { font: "24px Arial", color: '#0000FF' });
        } else if(courseWork.progressState === 'COMPLETED') {
            text = scene.add.text(16, 16, courseWork.title, { font: "24px Arial Bold", color: '#ffffff' });
        } else {
            text = scene.add.text(16, 16, courseWork.title, { font: "24px Arial", color: '#444444' });          
        }
        text.setOrigin(0, 0);        
        this.width = text.width + 32;
        this.height = text.height + 32;
        let rectangle = scene.add.rectangle(0, 0, this.width, this.height);
        rectangle.setOrigin(0, 0);
        let rectColor = 0x444466;        
        if(course.metadata) {
            if(course.metadata.courseColor) {
                let rectColorHexCode = course.metadata.courseColor;
                rectColor = Phaser.Display.Color.HexStringToColor(rectColorHexCode).color;
                console.log('course ' + course.id + ' color is ' + rectColor + ' from hexcode ' + rectColorHexCode);
            }
        }
        // solid rect
        // progress NONE is gray
        rectangle.setFillStyle(rectColor);
        
        if(courseWork.progressState === 'PROGRESS') {
            rectangle.setStrokeStyle(4, 0x0000FF, 1);
        } else if(courseWork.progressState === 'COMPLETED') {
            rectangle.setStrokeStyle(4, 0xFFFFFF, 1);
        } else {
            rectangle.setStrokeStyle(2, 0x444444, 1);            
        }
        // add to container
        this.add(rectangle);
        this.add(text);
        this.courseWorkRectangle = rectangle;
    }
}

