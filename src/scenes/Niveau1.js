import Phaser from '../lib/phaser.js'

import Player from "../class/player.js";

export default class Niveau1 extends Phaser.Scene
{
    constructor()
    {
        super('niveau1');
    }
    

    //---------------------------------------------------------------------- VARIABLES ----------------------------------------------------------------------
    

    //----------------------- PRELOAD -----------------------------------------------------------------------------------------------------------------------

    preload ()
    {
        this.load.spritesheet(
            "player",
            "./assets/Spritesheet/detective.png",
            {
              frameWidth: 48,
              frameHeight: 64
              //margin: 1,
              //spacing: 2
            }
          );
        
        this.load.image("actionner", "./assets/Objects/actionner.png");
        this.load.image('ciel', 'assets/Background/Ciel.png');
        this.load.image('brume', 'assets/Background/Brume2.png');
        this.load.image('lune', 'assets/Background/Lune.png');
        this.load.image('ville', 'assets/Background/Ville.png');

        this.load.image("villain", "./assets/Objects/villain.png");
        this.load.image("Tiles", "./assets/tiled/Tileset.png");
        this.load.tilemapTiledJSON("Map", "./assets/tiled/Niveau1.json");

        this.load.audio('Musique', 'assets/Audio/Virgule.ogg');

        this.cursors = this.input.keyboard.createCursorKeys()
        
        //plateformes
        


        
    }

    //----------------------- CREATE -------------------------------------------------------------------------------------------------------------------------

    create ()
    {

        //Setting the state of the player
        this.isPlayerDead = false;
        this.immune = false;
        this.spawn = true;
        this.spawnO = true;
        this.respawning = false;
        this.allowexit = false;
        this.storytelling = true;
        this.nbClick = 0;
        this.nbClickF = 0;
        this.storyF = false;
        this.teststory = true;

        this.skip = this.input.keyboard.addKey('SPACE');
       //---------------------------------------------------------------------- BACKGROUND ----------------------------------------------------------------------
       this.add.image(1200, 100, 'ciel').setScrollFactor(0.20,1);
       this.add.image(500, 500, 'lune').setScrollFactor(0.10,1);
       var ciel = this.add.image(1200, 100, 'ciel').setScrollFactor(0.20,1);
       this.add.image(1200, 500, 'ville').setScrollFactor(0.30,1);
       var brume = this.add.image(1200, 100, 'brume').setScrollFactor(0.70,1);

       brume.alpha = 0.20
       ciel.alpha = 0.8

     //---------------------------------------------------------------------- PLATEFORMES ----------------------------------------------------------------------
       //Setting the map
        const Map = this.make.tilemap({ key: "Map" });
        const Tiles = Map.addTilesetImage("Tileset", "Tiles");
        Map.createLayer("Props", Tiles).setDepth(-2);

        this.groundLayer = Map.createDynamicLayer("Ground", Tiles);
        

        // Using Spawn Point to get an easy way to spawn player and objects
        const spawnPoint = Map.findObject("Objects", obj => obj.name === "Spawn");
        this.player = new Player(this, spawnPoint.x, spawnPoint.y);

        const Actionner1 = Map.findObject("Actionners", obj => obj.name === "Actionner 1")
        this.CheckPoint = Map.findObject("Objects", obj => obj.name === "Checkpoint")
        const Finish = Map.findObject("Objects", obj => obj.name === "Finish")

        this.actionnerI = this.physics.add.group({allowGravity: false,immovable: true})
        

        this.actionnerI.create(Actionner1.x, Actionner1.y, 'actionner').setDepth(0).setVisible(false);
        

        this.physics.add.overlap(this.player.sprite, this.actionnerI, this.spawn1, null,this);
        


        this.checkpoint = this.physics.add.group({allowGravity: false,immovable: true})
        this.end = this.physics.add.group({allowGravity: false,immovable: true})

        this.checkpoint.create(this.CheckPoint.x, this.CheckPoint.y, 'actionner').setDepth(0).setVisible(false);
        this.end.create(Finish.x, Finish.y, 'actionner').setDepth(0).setVisible(false);

        this.physics.add.overlap(this.player.sprite, this.checkpoint, this.respawn, null,this);
        this.physics.add.overlap(this.player.sprite, this.end, this.finishing, null,this);


        // Collide the player with Tiled Layers
        this.groundLayer.setCollisionByProperty({ collides: true });
        this.physics.world.addCollider(this.player.sprite, this.groundLayer);
       
       // Spawning the ennemies and define their behaviour

        this.villainI = this.physics.add.group({allowGravity: false,immovable: true});
        this.villainII = this.physics.add.group({allowGravity: false,immovable: true});
        this.villainIII = this.physics.add.group({allowGravity: false,immovable: true});
        this.doll = this.physics.add.group({allowGravity: false,immovable: true});
        this.doll2 = this.physics.add.group({allowGravity: false,immovable: true});

        const villain1 = Map.findObject("Objects", obj => obj.name === "Monstre 1");
        const villain2 = Map.findObject("Objects", obj => obj.name === "Monstre 2");
        const villain3 = Map.findObject("Objects", obj => obj.name === "Monstre 3");

        this.villainI.create(villain1.x + 80, villain1.y - 10, 'villain').setDepth(0);
        this.villainII.create(villain2.x + 80, villain2.y - 10, 'villain').setDepth(0);
        this.villainIII.create(villain3.x + 80, villain3.y - 10, 'villain').setDepth(0);

        this.physics.add.overlap(this.player.sprite, this.villainI, this.hit, null,this);
        this.physics.add.overlap(this.player.sprite, this.villainII, this.hit, null,this);
        this.physics.add.overlap(this.player.sprite, this.villainIII, this.hit, null,this);


        this.dollsp = Map.findObject("Objects", obj => obj.name === "Vague Monstre 1");
        this.dollsp2 = Map.findObject("Objects", obj => obj.name === "Vague Monstre 2");


        this.physics.add.overlap(this.player.sprite, this.doll, this.hit, null,this);
        this.physics.add.overlap(this.player.sprite, this.doll2, this.hit, null,this);

     //---------------------------------------------------------------------- PLAYER ----------------------------------------------------------------------
       
    
     //---------------------------------------------------------------------- ENNEMI ----------------------------------------------------------------------
       
 
       

       
     //---------------------------------------------------------------------- CAMERA ----------------------------------------------------------------------        
        this.cameras.main.startFollow(this.player.sprite);
        this.cameras.main.setBounds(0, 0, Map.widthInPixels, Map.heightInPixels);
     //Setting the audio
        this.musique;  
        this.musique = this.sound.add('Musique')

        //---------------------------------------------------------------------- ANIMS ----------------------------------------------------------------------   
       
       
       // ----------------ennemi
       
 

       
        //---------------------------------------------------------------------- Boule de neige ----------------------------------------------------------------------
   
   
        //---------------------------------------------------------------------- COLLIDER ----------------------------------------------------------------------
       
  
   
       
        //---------------------------------------------------------------------- OVERLAP ----------------------------------------------------------------------
   }
    //----------------------- UPDATE -------------------------------------------------------------------------------------------------------------------------
    update (t,dt)
    {
        this.musique.play({volume : 1, loop: true})
        
        if (this.isPlayerDead) return;

        this.player.update();

        //What the game should do if game's over
        if (
          this.player.sprite.y > this.groundLayer.height) 
        {
          // Flag that the player is dead
          this.isPlayerDead = true;
    
          const cam = this.cameras.main;
          cam.shake(200, 0.05);
    
    
          // Add an effect on death
          if(this.respawning){
            this.score -= 200;
            this.scoreText.setText('Score : ' + this.score);
            this.player.sprite.setPosition(this.CheckPoint.x,this.CheckPoint.y-20);
            this.isPlayerDead = false;
          }
          
          else{
    
            cam.fade(250, 0, 0, 0);
    
            // Freeze the player
            this.player.freeze();
    
            cam.once("camerafadeoutcomplete", () => {
              
              this.musique.stop(); 
              this.player.destroy();
              this.scene.restart();
            
          });
          }
        }
        
        
    }
        
 //----------------------- FONCTIONS -------------------------------------------------------------------------------------------------------------------------

    
}
