import Phaser from '../lib/phaser.js'

export default class Niveau3 extends Phaser.Scene
{
    constructor()
    {
        super('niveau3');
    }
    init(data){
        this.entryDungeon = data.entryDungeon
		this.attack = data.attack
		this.life = data.health
	}
}