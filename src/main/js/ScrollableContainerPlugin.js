export default class ScrollableContainerPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);        
        pluginManager.registerGameObject('scrollableContainer', this.createScrollableContainer);
    }

    createScrollableContainer(x, y) {
        return this.displayList.add(new ScrollableContainer(this.scene, x, y));
    }
       
}



