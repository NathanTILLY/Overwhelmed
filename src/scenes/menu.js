export default class Menu extends Phaser.Scene {
    constructor() {
        super('menu')
    }

    preload()
	{
        this.load.image('playbutton', './assets/Menu/play.png')
        this.load.image('Titlescreen', './assets/Menu/base.png')
        this.load.image('controlbutton', './assets/Menu/controles.png')	
	}

    create() { //creating the menu screen


        this.add.image(0, 0, 'Titlescreen').setOrigin(0).setDepth(0);

        let playButton = this.add.image(448 , 220, 'playbutton');

        let commandButton = this.add.image(448 , 330, 'controlbutton');

        


        /* 
            PointerEvents:
                pointerover - hovering
                pointerout - not hovering
                pointerup - click and release
                pointerdown - just click
        */

        playButton.setInteractive();

        playButton.on("pointerup", () => {
            this.scene.start('niveau1');
        })

        commandButton.setInteractive();

        commandButton.on("pointerup", () => {
            this.scene.start('options');
        })

    }
}