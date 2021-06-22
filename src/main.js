import Phaser from './lib/phaser.js'

import Menu from "./scenes/menu.js";
import Controles from "./scenes/controles.js";
import Niveau1 from './scenes/Niveau1.js'
import Niveau2 from './scenes/Niveau2.js'
import Niveau3 from './scenes/Niveau3.js'

export default new Phaser.Game({
    type: Phaser.AUTO,
    width: 896,
    height: 448,
    scene: [Menu, Controles, Niveau1, Niveau2, Niveau3],
    physics: {
        default: "arcade",
    arcade: {
      gravity: { y: 1000 },
      debug: false
    }
    }
    
})