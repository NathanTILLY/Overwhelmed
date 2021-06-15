import Phaser from '../lib/phaser.js'

export default class Niveau2 extends Phaser.Scene
{
    constructor()
    {
        super('niveau2');
    }
    init(data){
        this.entryDungeon = data.entryDungeon
		this.attack = data.attack
		this.life = data.health
	}
}