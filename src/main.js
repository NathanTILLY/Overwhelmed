import Phaser from './lib/phaser.js'


import Niveau1 from './scenes/Niveau1.js'
import Niveau2 from './scenes/Niveau2.js'
import Niveau3 from './scenes/Niveau3.js'

export default new Phaser.Game({
    type: Phaser.AUTO,
    width: 9000,
    height: 2160,
    scene: [Niveau1, Niveau2, Niveau3],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            }
          
        }
    },
    input:{gamepad:true},
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
})