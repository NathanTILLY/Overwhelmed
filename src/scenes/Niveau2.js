import Phaser from '../lib/phaser.js'

export default class Niveau1 extends Phaser.Scene
{
    constructor()
    {
        super('niveau1');
    }
    init(data){
        this.entryDungeon = data.entryDungeon
		this.attack = data.attack
		this.life = data.health
	}
}