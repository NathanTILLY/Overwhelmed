import Phaser from '../lib/phaser.js'

export default class Controles extends Phaser.Scene {
    constructor() {
        super('controles')
    }
    preload()
	{
		this.load.image('Commandes', 'assets/Menu/commandes.png');

	}
    create()
	{
        this.add.image(0, 0, 'Commandes').setOrigin(0).setDepth(0);

        this.input.keyboard.once('keydown-SPACE', () => {
			this.scene.start('menu')
		})

      
	}
}