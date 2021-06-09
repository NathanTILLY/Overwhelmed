import Phaser from '../lib/phaser.js'

export default class Lore extends Phaser.Scene {
    constructor() {
        super('lore')
    }
    preload()
	{
		this.load.image('Lore', 'assets/Lore.png')	
	}
    create()
	{
        this.entryDungeon = false;
        this.attack = false;
        this.life = 3;
        this.add.image(0, 0, 'Lore').setOrigin(0).setDepth(0);

        this.input.keyboard.once('keydown-SPACE', () => {
			this.scene.start('game' , {entryDungeon:this.entryDungeon, attack:this.attack , health:this.life})
		})
	}
}