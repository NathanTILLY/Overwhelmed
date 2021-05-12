import Phaser from '../lib/phaser.js'

export default class Menu extends Phaser.Scene {
    constructor() {
        super('menu')
    }
    preload()
	{
		this.load.image('Menu', 'assets/Menu/Menu.png');
        this.load.image('Play', 'assets/Menu/Play.png');
        this.load.image('Controles', 'assets/Menu/Controles.png');	
	}
    create()
	{
        this.add.image(0, 0, 'Menu').setOrigin(0).setDepth(0);
        let playButton = this.add.image(500, 255, 'Play').setOrigin(0).setDepth(0);
        let commandesButton = this.add.image(500, 415, 'Controles').setOrigin(0).setDepth(0);

      

        playButton.setInteractive();

        playButton.on("pointerup", () => {
            this.scene.start('lore');
        })
        
        commandesButton.setInteractive();
        
        commandesButton.on("pointerup", () => {
            this.scene.start('control');
        })
	}
}