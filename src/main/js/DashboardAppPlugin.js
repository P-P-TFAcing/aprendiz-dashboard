import ScrollableContainer from './ScrollableContainer.js';
import CourseTitle from './CourseTitle.js';

export default class DashboardAppPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);        
        pluginManager.registerGameObject('scrollableContainer', function(x,y) {
            return this.displayList.add(new ScrollableContainer(this.scene, x, y));
        });
        pluginManager.registerGameObject('courseTitle', function(x,y, course) {
            return this.displayList.add(new CourseTitle(this.scene, x, y, course));
        });
    }

}



