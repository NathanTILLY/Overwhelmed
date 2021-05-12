import Phaser from '../lib/phaser.js'

import Phantom from '../jeu/Phantom.js '
export default class Dungeon extends Phaser.Scene
{
    constructor()
    {
        super('dungeon');
    }
    init(data){
		this.attack = data.attack
		this.life = data.health
	}

    //---------------------------------------------------------------------- VARIABLES ----------------------------------------------------------------------
    

    //----------------------- PRELOAD -----------------------------------------------------------------------------------------------------------------------

    preload ()
    {


        this.load.image('TilesetMaudit', 'assets/Serene_Village_Maudit_32x32.png');

        this.load.tilemapTiledJSON('MapMaudit', 'Dungeon.json');

        this.load.image('Pdv', 'assets/Pdv.png');
        this.load.image('PdvPerdu', 'assets/PdvPerdu.png');
        this.load.image('MonstreBleu', 'assets/monstres/monstreBleu.png');
        this.load.spritesheet('phantom', 'assets/monstres/monstrePhantom.png', { frameWidth: 22, frameHeight: 26 });
        this.load.image('swordD', 'assets/sword/swordD.png');
        this.load.image('swordL', 'assets/sword/swordL.png');
        this.load.image('swordR', 'assets/sword/swordR.png');
        this.load.image('swordU', 'assets/sword/swordU.png');
        this.load.image('Thune','assets/Argent.png')

        this.load.image('bordure2','assets/Bordure2.png')

        this.load.image('TP','assets/teleporter.png')

        this.load.image('sword','assets/Pdv.png')
        
        this.load.spritesheet('monstrePhantom', 'assets/monstres/monstrePhantom.png', { frameWidth: 22, frameHeight: 26 }); 
        this.load.spritesheet('chevalier', 'assets/chevalier.png', { frameWidth: 26, frameHeight: 31 }); // 26 ; 31 chevalier 64 ; 94 chevalier
        this.cursors = this.input.keyboard.createCursorKeys()
		this.boutonAttaque = this.input.keyboard.addKey('E');
    }

    //----------------------- CREATE -------------------------------------------------------------------------------------------------------------------------

    create ()
    {
        this.entryDungeon = true
        this.immunity = true
        
        //Vie
        if (this.life == 3){
			this.pdv1 = this.add.image(40,50,'Pdv').setScale(2).setScrollFactor(0).setDepth(3);
			this.pdv2 = this.add.image(85,50,'Pdv').setScale(2).setScrollFactor(0).setDepth(3);
			this.pdv3 = this.add.image(130,50,'Pdv').setScale(2).setScrollFactor(0).setDepth(3);
		}

		else if (this.life == 2){
			this.pdv1 = this.add.image(40,50,'Pdv').setScale(2).setScrollFactor(0).setDepth(3);
			this.pdv2 = this.add.image(92,50,'Pdv').setScale(2).setScrollFactor(0).setDepth(3);
            this.pdvDead = this.add.image(145,45,'PdvPerdu').setScale(2).setScrollFactor(0).setDepth(3);
		}
		else if (this.life == 1){
			this.pdv1 = this.add.image(40,50,'Pdv').setScale(2).setScrollFactor(0).setDepth(3);
            this.pdvDead = this.add.image(92,45,'PdvPerdu').setScale(2).setScrollFactor(0).setDepth(3);
            this.pdvDead = this.add.image(165,45,'PdvPerdu').setScale(2).setScrollFactor(0).setDepth(3);
		}

        //MAP

        let Village = this.make.tilemap({key:'MapMaudit'});

        let Terrain = Village.addTilesetImage('Serene_Village_Maudit_32x32','TilesetMaudit');

        let Background = Village.createLayer('Background', Terrain, 0, 0).setDepth(-2);
        let Layer1 = Village.createLayer('ElemDecor2', Terrain, 0, 0).setDepth(-1);
        let Layer2 = Village.createLayer('ElemDecor', Terrain, 0, 0);
        this.cursors = this.input.keyboard.createCursorKeys();

        //--COLLIDER------------------------------------------------------------------------------------------------------------------------------------- 
 

        //---------------------------------------------------------------------- PLAYER ----------------------------------------------------------------------
            
            this.player = this.physics.add.sprite(1130, 1100, 'chevalier');
            
            this.player.direction = 'right';
            this.player.setBounce(0);
            this.player.setCollideWorldBounds(true);

            this.physics.add.collider(this.player, Background);

            Background.setCollisionByProperty({collide:true});

            this.gameborder = this.physics.add.staticGroup();
            this.teleporter = this.physics.add.staticGroup();
		    this.gameborder.create(1130,1150,'bordure2').setDepth(0);
            this.teleporter.create(1116,595,'TP').setDepth(0);

            this.physics.add.collider(this.player, this.teleporter, this.YouWin, null, this);

            this.physics.add.collider(this.player, this.gameborder, this.warpingPlayerToGame, null, this);
        //---------------------------------------------------------------------- LE RESTE -------------------------------------------------------------------
            this.Argents = this.physics.add.group();
            this.sword = this.physics.add.group();
            this.phantoms = this.physics.add.group();

            new Phantom(this,500,1028,'phantom').setScale(3).setDepth(0);
            new Phantom(this,1728,140,'phantom').setScale(3).setDepth(0);
            new Phantom(this,1452,728,'phantom').setScale(3).setDepth(0);
        //---------------------------------------------------------------------- ANIMS ----------------------------------------------------------------------   
            
            this.anims.create({
                key: 'left',
                frames: this.anims.generateFrameNumbers('chevalier', { start: 0, end: 2 }),
                frameRate: 10,
               
            });

            this.anims.create({
                key: 'right',
                frames: this.anims.generateFrameNumbers('chevalier', { start: 9, end: 11 }),
                frameRate: 10,
               
            });

            this.anims.create({
                key: 'up',
                frames: this.anims.generateFrameNumbers('chevalier', { start: 3, end: 5 }),
                frameRate: 10,
               
            });
            this.anims.create({
                key: 'down',
                frames: this.anims.generateFrameNumbers('chevalier', { start: 6, end: 8 }),
                frameRate: 10,
             
            });

            this.anims.create({
                key: 'attackr',
                frames: [ { key: 'swordR', frame: 0 } ],
                frameRate: 10
            });
    
            this.anims.create({
                key: 'attackl',
                frames: [ { key: 'swordL', frame: 0 } ],
                frameRate: 8
            });
    
            this.anims.create({
                key: 'attacku',
                frames: [ { key: 'swordU', frame: 0 } ],
                frameRate: 8
            });
            this.anims.create({
                key: 'attackd',
                frames: [ { key: 'swordD', frame: 0 } ],
                frameRate: 8
            });

            //Collider
        
            this.physics.add.collider(this.player, Background);
        
            Background.setCollisionByProperty({collide:true});
    
            this.physics.add.collider(this.player, Layer1);
            
            Layer1.setCollisionByProperty({collide:true});

            this.physics.add.collider(this.player, Layer2);

            Layer2.setCollisionByProperty({collide:true});

            this.physics.add.collider(this.phantoms, Layer1);
            
            Layer1.setCollisionByProperty({collide:true});

            this.physics.add.collider(this.phantoms, Layer2);
            
            Layer2.setCollisionByProperty({collide:true});
    
            //Overlaps
            this.physics.add.overlap(this.player, this.phantoms, this.hitPhantom, null, this);
            this.physics.add.overlap(this.sword, this.phantoms, this.killPhantom, null,this);
            this.physics.add.overlap(this.player, this.Argents, this.ARGENT, null,this);
            
    /*sert à highlight les htiboxes
            const debugGraphics = this.add.graphics().setAlpha(0.75);
            Background.renderDebug(debugGraphics, {
                  tileColor: null, // Color of non-colliding tiles
                  collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
                  faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
            });
            Layer1.renderDebug(debugGraphics, {
                tileColor: null, // Color of non-colliding tiles
                collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
                faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
              });
      */      
        
        //camera
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0,0,Village.widthInPixels, Village.heightInPixels);
        this.physics.world.setBounds(0,0, Village.widthInPixels, Village.heightInPixels);
        this.player.setCollideWorldBounds(true);

         //Controller

        this.paddleConnected=false;

        this.input.gamepad.once('connected', function (pad) {
            this.paddleConnected = true;
            paddle = pad;
            });

    }
    //----------------------- UPDATE -------------------------------------------------------------------------------------------------------------------------
    update (t,dt)
    {
        const speed = 275;

        if (!this.player)
		{
			return
		}

        this.player.setVelocity(0)
		

        if (this.paddleConnected == true)
    	{

        	if (paddle.right)
        	{
            	this.player.setVelocityX(speed);
            	this.player.anims.play('right', true);
        	}
        	else if (paddle.left)
        	{
            	this.player.setVelocityX(-speed);
            	this.player.anims.play('left', true);
        	}
            else if (paddle.up)
        	{
            	this.player.setVelocityY(-speed);
            	this.player.anims.play('up', true);
        	}
            else if (paddle.down)
        	{
            	this.player.setVelocityY(speed);
            	this.player.anims.play('down', true);
        	}

			if (this.attack && paddle.A){
				this.attaquer(this.player);
			}

		}

		else if (this.cursors.up.isDown)
		{
			this.player.direction='up';
			this.player.setVelocityY(-speed)
			this.player.anims.play('up', true);
		}


		else if (this.cursors.left.isDown)
		{
			this.player.direction='left';
            this.player.setVelocityX(-speed)
			this.player.anims.play('left', true)
		}

		else if (this.cursors.right.isDown)
		{
			this.player.direction='right';
            this.player.setVelocityX(speed)
			this.player.anims.play('right', true)	
		}
        else if (this.cursors.down.isDown)
		{
			this.player.direction='down';
            this.player.setVelocityY(speed)
			this.player.anims.play('down', true)	
		}	
		
		if (this.attack && Phaser.Input.Keyboard.JustDown(this.boutonAttaque)){
			this.player.setVelocity(0)
			this.attaquer(this.player);
		}
        for(var i = 0; i < this.phantoms.getChildren().length; i++){
            var phantom = this.phantoms.getChildren()[i];

            phantom.movement(this.player);
          
        }
        

    }

    warpingPlayerToGame(){
		this.scene.start('game', { health:this.life, attack:this.attack, entryDungeon:this.entryDungeon})
	}
    YouWin(){
		this.scene.start('win', { health:this.life, attack:this.attack, entryDungeon:this.entryDungeon})
	}
    attaquer(player) {
		var peutAttaquer = true
        if (peutAttaquer)
       {
           var coefDirx = 0;
           var coefDiry = 0;
             peutAttaquer = false;
             this.time.addEvent({delay: 100, callback: function(){peutAttaquer= true;}, callbackScope: this}); 
	         if (this.player.direction == 'left') { coefDirx = -1; var sword = this.sword.create(player.x + (25 * coefDirx), player.y + (25 * coefDiry), 'swordL').setScale(1.25)} 
             else if(this.player.direction == 'right') { coefDirx = 1; var sword = this.sword.create(player.x + (25 * coefDirx), player.y + (25 * coefDiry), 'swordR').setScale(1.25)} 
			 else{coefDirx = 0}

             if(this.player.direction == 'up') { coefDiry = -1; var sword = this.sword.create(player.x + (25 * coefDirx), player.y + (25 * coefDiry), 'swordU').setScale(1.25)} 
             else if(this.player.direction == 'down') { coefDiry = 1; var sword = this.sword.create(player.x + (25 * coefDirx), player.y + (25 * coefDiry), 'swordD').setScale(1.25)} 
			 else{coefDiry = 0}

             
			 this.time.addEvent({delay: 100, callback: function(){sword.destroy()}, callbackScope: this});
        }
    }
    killPhantom(sword, phantoms)
    {
		sword.destroy();
		phantoms.destroy();
    	var argent = this.Argents.create(phantoms.x,phantoms.y,'Thune')
    }
    ARGENT(player, argent)
    {
        argent.destroy();
    }
    hitPhantom(){
		if (this.immunity){
			this.life -= 1;
			this.immunity = false;
			
			if(this.life > 0){
				this.effect = this.time.addEvent({ delay : 200, repeat: 9, callback: function(){this.player.visible = !this.player.visible;}, callbackScope: this});
			}

			this.ImmuneFrame = this.time.addEvent({ delay : 2000, callback: function(){this.immunity = true}, callbackScope: this});
			
		}
		if (this.life == 2){
			this.effect = this.time.addEvent({ delay : 200, repeat: 9, callback: function(){this.pdv3.visible = !this.pdv3.visible;}, callbackScope: this});
			this.pdv3.destroy();
            this.add.image(165,45,'PdvPerdu').setScale(2).setScrollFactor(0).setDepth(3)

		}
		if (this.life == 1){
			this.effect = this.time.addEvent({ delay : 200, repeat: 9, callback: function(){this.pdv2.visible = !this.pdv2.visible;}, callbackScope: this});
			this.pdv2.destroy();
            this.add.image(92,45,'PdvPerdu').setScale(2).setScrollFactor(0).setDepth(3)
		}

		if(this.life == 0){
			this.scene.start('game-over')
		}
	}
}