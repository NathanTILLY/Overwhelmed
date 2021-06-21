import Phaser from '../lib/phaser.js'

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
        this.load.image('bordure', 'assets/lasNoches/bordure2.png');
        
        //plateformes
        this.load.image('arbreGeant', 'assets/lasNoches/plateformes/arbreGeant.png');
        this.load.image('petitePlateforme', 'assets/lasNoches/plateformes/petitePlateforme.png');
        this.load.image('moyennePlateforme', 'assets/lasNoches/plateformes/moyennePlateforme.png');
        this.load.image('grandePlateforme', 'assets/lasNoches/plateformes/grandePlateforme.png');
        this.load.image('petitePlateformeGlace', 'assets/lasNoches/plateformes/petitePlateformeGlace.png');
        this.load.image('moyennePlateformeGlace', 'assets/lasNoches/plateformes/moyennePlateformeGlace.png');
        this.load.image('grandePlateformeGlace', 'assets/lasNoches/plateformes/grandePlateformeGlace.png');
        this.load.image('paroiRocailleuse', 'assets/lasNoches/plateformes/paroiRocailleuse.png');
        this.load.image('game_over', 'assets/lasNoches/game_over.png');
        this.load.image('victoire', 'assets/lasNoches/victoire.png');
        
        this.load.image('tortueGlace', 'assets/lasNoches/tortueGlace.png');
        
        
        this.load.image('ciel', 'codeAverifier/assets/ciel.png');
        this.load.image('sol', 'assets/lasNoches/sol.png');
        this.load.image('arbres', 'assets/lasNoches/arbres.png');
        this.load.image('montagne', 'assets/lasNoches/montagne.png');
        this.load.image('pdv1', 'assets/lasNoches/pointDeVie1.png');
        this.load.image('pdv2', 'assets/lasNoches/pointDeVie2.png');
        this.load.image('pdv3', 'assets/lasNoches/pointDeVie3.png');
        this.load.spritesheet('ours', 'assets/lasNoches/ours.png', { frameWidth: 64, frameHeight: 94 });
        this.load.spritesheet('ennemi', 'assets/lasNoches/ennemi.png', { frameWidth: 64, frameHeight: 94 });
      
        
        this.load.image('bdn', 'assets/lasNoches/bdn.png');
        this.load.image('boule_de_neige', 'assets/lasNoches/bouleDeNeigeItem.png');
        this.load.image('ceinture', 'assets/lasNoches/ceinture.png');


        this.load.image('Tp', 'assets/lasNoches/shadow.png')
    }

    //----------------------- CREATE -------------------------------------------------------------------------------------------------------------------------

    create ()
    {
       //---------------------------------------------------------------------- BACKGROUND ----------------------------------------------------------------------
       this.add.image(4500, 1080, 'ciel').setScrollFactor(0.20,1);
       this.add.image(4500, 1275, 'montagne').setScrollFactor(0.30,1);
       this.add.image(4500, 1275, 'arbres').setScrollFactor(0.70,1);

 //---------------------------------------------------------------------- PLATEFORMES ----------------------------------------------------------------------
       
       
       this.platforms = this.physics.add.staticGroup();

       this.platforms.create(4500, 2160, 'sol');
       this.platforms.create(9006, 1080, 'bordure');
       
       //platforms.create(400, 700, 'ground').setScale(6).refreshBody();

       
       this.platforms.create(3040, 1225, 'arbreGeant');
       this.platforms.create(6900, 1225, 'arbreGeant');
       this.platforms.create(2450, 1750, 'moyennePlateforme');
       this.platforms.create(1800, 1525, 'petitePlateforme');
       this.platforms.create(645, 1275, 'grandePlateforme');
       this.platforms.create(1800, 1025 , 'petitePlateforme');
       this.platforms.create(2450, 775, 'petitePlateforme');
       this.platforms.create(750, 575, 'petitePlateforme');
       this.platforms.create(200, 300, 'petitePlateforme');
       this.platforms.create(5000, 500, 'paroiRocailleuse').setScale(1);
       this.platforms.create(5000, 1100, 'paroiRocailleuse').setScale(1);
       
       this.platforms.create(1450, 775, 'moyennePlateforme');
       
       this.platforms.create(3900, 1575, 'moyennePlateformeGlace');
       this.platforms.create(3562, 575, 'petitePlateformeGlace');
       this.platforms.create(4350, 975, 'grandePlateformeGlace');
       
       this.platforms.create(6562, 575, 'petitePlateformeGlace');
       this.platforms.create(6000, 975, 'petitePlateformeGlace');
       this.platforms.create(5362, 1375, 'petitePlateformeGlace');
       this.platforms.create(6000, 1705, 'petitePlateformeGlace');

 //---------------------------------------------------------------------- PLAYER ----------------------------------------------------------------------
       
    this.player = this.physics.add.sprite(100, 1910, 'ours');
    this.player.direction = 'right';
    this.player.setBounce(0);
    this.player.setCollideWorldBounds(true);
       
    this.hp = this.add.image(175,900, "pdv3").setScrollFactor(0);
 //---------------------------------------------------------------------- ENNEMI ----------------------------------------------------------------------
       
 this.ennemi = this.physics.add.sprite(1200, 500, 'ennemi');
 this.ennemi.direction = 'right';
 this.ennemi.setBounce(0);
 this.ennemi.setCollideWorldBounds(true);
 this.ennemi.pointsVie=3; 
 this.ennemi.setBounce(0);
       
 this.ennemi2 = this.physics.add.sprite(2200, 500, 'ennemi');
 this.ennemi2.direction = 'right';
 this.ennemi2.setBounce(0);
 this.ennemi2.setCollideWorldBounds(true);
 this.ennemi2.pointsVie=3; 
 this.ennemi2.setBounce(0);
       
 this.tortue = this.physics.add.group({
       key : 'tortue',
       repeat: 0
       
       });

var tortue1 = this.tortue.create(1800, 550, 'tortueGlace').setScale(2);
var tortue2 = this.tortue.create(6000, 1240, 'tortueGlace').setScale(2);
var tortue3 = this.tortue.create(1200, 3000, 'tortueGlace').setScale(2);
       
       
       
       
this.ennemi5 = this.physics.add.sprite(5200, 500, 'ennemi');
this.ennemi5.direction = 'right';
this.ennemi5.setBounce(0);
this.ennemi5.setCollideWorldBounds(true);
this.ennemi5.pointsVie=3; 
this.ennemi5.setBounce(0);
       

       
  //---------------------------------------------------------------------- CAMERA ----------------------------------------------------------------------        
       

this.cameras.main.setSize(1920, 1080);
this.cameras.main.setBounds(0, 0, 9000, 3283)
this.cameras.main.startFollow(this.player);
       
       
       

       
 //---------------------------------------------------------------------- ANIMS ----------------------------------------------------------------------   
       
       this.anims.create({
           key: 'left',
           frames: this.anims.generateFrameNumbers('ours', { start: 0, end: 3 }),
           frameRate: 10,
           repeat: 1
       });

       this.anims.create({
           key: 'turn',
           frames: [ { key: 'ours', frame: 4 } ],
           frameRate: 20
       });

       this.anims.create({
           key: 'right',
           frames: this.anims.generateFrameNumbers('ours', { start: 5, end: 8 }),
           frameRate: 11,
           repeat: 1
       });
       
       // ----------------ennemi
       
       this.anims.create({
           key: 'ennemileft',
           frames: this.anims.generateFrameNumbers('ennemi', { start: 0, end: 3 }),
           frameRate: 10,
           repeat: 13
       });

       this.anims.create({
           key: 'ennemiturn',
           frames: [ { key: 'ennemi', frame: 4 } ],
           frameRate: 2
       });

       this.anims.create({
           key: 'ennemiright',
           frames: this.anims.generateFrameNumbers('ennemi', { start: 5, end: 8 }),
           frameRate: 11,
           repeat: 17
       });
       
       var tween = this.tweens.add({
       targets: this.ennemi,
       x: 500,
       duration: 5000,
       yoyo: true,
       repeat: -1,
       onStart: function () { console.log('onStart'); console.log(arguments); this.ennemi.anims.play('ennemileft', true); },
       onComplete: function () { console.log('onComplete'); console.log(arguments);this.ennemi.anims.play('ennemileft', true); },
       onYoyo: function () { console.log('onYoyo'); console.log(arguments);this.ennemi.anims.play('ennemiright', true); },
       onRepeat: function () { console.log('onRepeat'); console.log(arguments);this.ennemi.anims.play('ennemiturn', true);ennemi.anims.play('ennemileft', true); },
       });
       
       var tween2 = this.tweens.add({
       targets: this.ennemi2,
       x: 1000,
       duration: 5000,
       yoyo: true,
       repeat: -1,
       onStart: function () { console.log('onStart'); console.log(arguments); ennemi2.anims.play('ennemileft', true); },
       onComplete: function () { console.log('onComplete'); console.log(arguments);ennemi2.anims.play('ennemileft', true); },
       onYoyo: function () { console.log('onYoyo'); console.log(arguments);ennemi2.anims.play('ennemiright', true); },
       onRepeat: function () { console.log('onRepeat'); console.log(arguments);ennemi2.anims.play('ennemiturn', true);ennemi2.anims.play('ennemileft', true); },
       });
       
      
       
       var tween5 = this.tweens.add({
       targets: this.ennemi5,
       x: 4000,
       duration: 5000,
       yoyo: true,
       repeat: -1,
       onStart: function () { console.log('onStart'); console.log(arguments); ennemi5.anims.play('ennemileft', true); },
       onComplete: function () { console.log('onComplete'); console.log(arguments);ennemi5.anims.play('ennemileft', true); },
       onYoyo: function () { console.log('onYoyo'); console.log(arguments);ennemi5.anims.play('ennemiright', true); },
       onRepeat: function () { console.log('onRepeat'); console.log(arguments);ennemi5.anims.play('ennemiturn', true);ennemi5.anims.play('ennemileft', true); },
       });

       
 //---------------------------------------------------------------------- Boule de neige ----------------------------------------------------------------------
   
    this.boule_de_neige = this.physics.add.group({
       key : 'boule_de_neige',
       repeat : 0,
       setXY: {x:150, y: 0}
   });    
       
    this.ceinture = this.physics.add.group({
       key : 'ceinture',
       repeat : 0,
       setXY: {x:8000, y: 0}
   }); 
       
   this.groupeBdn = this.physics.add.group();
   this.cursors = this.input.keyboard.createCursorKeys();
   this.boutonFeu = this.input.keyboard.addKey('A');

   this.boutonTp = this.input.keyboard.addKey('E');

   this.teleportation = this.physics.add.group();
 //---------------------------------------------------------------------- COLLIDER ----------------------------------------------------------------------
       
       this.physics.add.collider(this.player, this.platforms);
       this.physics.add.collider(this.ennemi, this.platforms);
       this.physics.add.collider(this.ennemi2, this.platforms);
       this.physics.add.collider(this.tortue, this.platforms);
      
      
       this.physics.add.collider(this.ennemi5, this.platforms);
       this.physics.add.collider(this.boule_de_neige, this.platforms);
       this.physics.add.collider(this.ceinture, this.platforms);
       this.physics.add.collider(this.groupeBdn, this.ennemi, this.hit);
       this.physics.add.collider(this.groupeBdn, this.ennemi2, this.hit);
  
     
       this.physics.add.collider(this.groupeBdn, this.ennemi5, this.hit);
       

       this.physics.add.collider(this.teleportation, this.platforms);
   
       
 //---------------------------------------------------------------------- OVERLAP ----------------------------------------------------------------------
       
       this.physics.add.overlap(this.groupeBdn, this.platforms, this.hitWall, null, this);
       this.physics.add.overlap(this.player, this.boule_de_neige, this.getBdn, null, this);
       this.physics.add.overlap(this.player, this.ceinture, this.getCeinture, null, this);
       this.physics.add.overlap(this.groupeBdn, this.ennemi, this.hit, null,this);
       this.physics.add.overlap(this.groupeBdn, this.ennemi2, this.hit, null,this);
       this.physics.add.overlap(this.player, this.tortue, this.hitTortue, null, this);

       this.physics.add.overlap(this.groupeBdn, this.ennemi5, this.hit, null,this);
       this.physics.add.overlap(this.boule_de_neige, this.ennemi, null, this);
       this.physics.add.overlap(this.player, this.ennemi, this.hitEnnemi, null, this);
       this.physics.add.overlap(this.player, this.ennemi2, this.hitEnnemi2, null, this);
       
  
       this.physics.add.overlap(this.player, this.ennemi5, this.hitEnnemi5, null, this);
       
       
       this.physics.add.overlap(this.player, this.boule_de_neige, this.getBdn, null, this);
       this.physics.add.overlap(this.boule_de_neige, this.ennemi, null, this);
   }
    //----------------------- UPDATE -------------------------------------------------------------------------------------------------------------------------
    update (t,dt)
    {
        if(boutonTp.isUp)
        {
            if (cursors.left.isDown)  {
            player.direction = 'left';
            if (player.body.touching.down){
                player.setVelocityX(-400);
            }
            else if (player.body.touching.grandePlateformeGlace){
                player.setVelocityX(-4000);
            }
            else {
                player.setVelocityX(-600);
            }
            player.anims.play('left', true);
            }
            else if (cursors.right.isDown) {
                player.direction = 'right';
                if (player.body.touching.down){
                    player.setVelocityX(400); 
                }
                else if (player.body.touching.grandePlateformeGlace){
                    player.setVelocityX(4000);
                }
                else {
                    player.setVelocityX(600);
                }
                player.anims.play('right', true);
            }
            else  {
                player.setVelocityX(0);
                player.anims.play('turn');
            }
            if (cursors.up.isDown && player.body.touching.down) {
                player.setVelocityY(-950);
            }
            if (cursors.down.isDown )
            {
                player.setVelocityY(900);
            }
        }
        else
        {
            player.setVelocityX(0);
            player.setVelocityY(400);
        }
        
        if ( Phaser.Input.Keyboard.JustDown(boutonFeu)) {
            if (boule == true){
                tirer(player);
            }       
        }

        if ( Phaser.Input.Keyboard.JustDown(boutonTp)) {
            if (shadow == true){
                shadowTP(player);
            }       
        }

        if ( Phaser.Input.Keyboard.JustUp(boutonTp) && bouttonAetePress == true) {
            if (shadow == true){
                shadowTPexecute(player, Tp, coox, cooy);
            }       
        }
        
        
        // ACTUALISATION DE LA VIE --------------------------------------------------
        
        if (vie == 3){
        hp.setTexture("pdv3");
            
        }
        else if (vie == 2){
            hp.setTexture("pdv2" );
            
        }
        
        else if (vie == 1){
            hp.setTexture("pdv1");
        }
        
        else if (vie == 0){
            this.add.image(960, 540, 'game_over').setScrollFactor(0);
        }

        if(vie <= 0){
            this.add.image(960, 540, 'game_over').setScrollFactor(0);
            player.setTint(0xff0000);
            player.anims.play('turn');//mettre une anime ou il tombe en avant
            this.physics.pause();
            gameOver = true;
        }
            
            // AJOUT CONTROLES MANETTE --------------------------------------------------
        
        this.input.gamepad.once('connected', function (pad) {
        paddleConnected = true;
        paddle = pad;
        });

        if (paddleConnected == true)
        {
            if ((paddle.A && player.body.touching.down) || (paddle.up && player.body.touching.down))
            {
            player.setVelocityY(-1800);
            }

            else if (paddle.right )
            {
                player.direction = 'right';
                player.setVelocityX(400);
                player.anims.play('right', true);
            }

            

            else if (paddle.left )
            {   
                player.direction = 'left';
                player.setVelocityX(-400);
                player.anims.play('left', true);
            }

            
            
            else if (paddle.down && !player.body.touching.down)
                {
                    player.setVelocityY(1800);
                }
            if (paddle.B){
                if(boule == true){
                tirer(player);
                }
            }
            
        }
    }
    
        
 //----------------------- FONCTIONS -------------------------------------------------------------------------------------------------------------------------

    getBdn(player, boule_de_neige){
        boule_de_neige.disableBody(true, true);
        boule = true;
    }    
    getCeinture(player, ceinture){
        ceinture.disableBody(true, true);
        boule = true;
        this.add.image(960, 340, 'victoire').setScrollFactor(0);
        player.setTint(0x008a1a);
        player.anims.play('turn');
        this.physics.pause();
        gameOver = true;
        
    }  
        
    tirer(player) {
            var coefDir;
            if (player.direction == 'left') { coefDir = -1; } else { coefDir = 1 }
            // on crée la balle a coté du joueur
            var bdn = groupeBdn.create(player.x + (25 * coefDir), player.y - 4, 'bdn');
            // parametres physiques de la balle.
            bdn.setCollideWorldBounds(false);
            bdn.body.allowGravity =true;
            bdn.setVelocity(500 * coefDir, -400); // vitesse en x et en y
    }

    shadowTP(player) {
            var coefDir2;
            
            if (player.direction == 'left') { coefDir2 = -1; } else { coefDir2 = 1 }
            // on crée la tp a coté du joueur
            this.Tp = teleportation.create(player.x + (25 * coefDir2), player.y, 'Tp');
            // parametres physiques de la balle.
            Tp.setCollideWorldBounds(false);
            Tp.body.allowGravity = false;
            if(boutonTp.isDown)
            {
                this.Tp.setVelocity(500 * coefDir2); // vitesse en x et en y
                bouttonAetePress = true;
            }
            this.coox = this.Tp.x;
            this.cooy = this.Tp.y;
    }

    shadowTPexecute(player, Tp, coox, cooy) {
        
        Tp.destroy();
        player.x = Tp.x;
        player.y = (Tp.y-20);
        

    }

    hitWall(bdn, platforms){
        bdn.destroy();
    }    

    hit (bdn, ennemi) {
        bdn.destroy();
        ennemi.pointsVie--;
        if (ennemi.pointsVie==0) {
            ennemi.destroy();
        }
    }

        //  PERTE DE VIE  --------------------------------------------------
        
    hitEnnemi (player, ennemi)
    {
        if (!invincibilite){
            vie -= 1;
            invincibilite = true;
            
            if(vie > 0){
                clignotement = this.time.addEvent({ delay : 200, repeat: 7, callback: function(){player.visible = !player.visible;}, callbackScope: this});
            }
            
            tempsInvincibilite = this.time.addEvent({ delay : 2000, callback: function(){invincibilite = false}, callbackScope: this});
        }
    

        player.anims.play('turn');
        
        

    }
        
    hitEnnemi2 (player, ennemi2)
    {
        if (!invincibilite){
            vie -= 1;
            invincibilite = true;
            
            if(vie > 0){
                clignotement = this.time.addEvent({ delay : 200, repeat: 7, callback: function(){player.visible = !player.visible;}, callbackScope: this});
            }
            
            tempsInvincibilite = this.time.addEvent({ delay : 2000, callback: function(){invincibilite = false}, callbackScope: this});
        }
    

        player.anims.play('turn');
        
        

    }

    hitEnnemi5 (player, ennemi5)
    {
        if (!invincibilite){
            vie -= 1;
            invincibilite = true;
            
            if(vie > 0){
                clignotement = this.time.addEvent({ delay : 200, repeat: 7, callback: function(){player.visible = !player.visible;}, callbackScope: this});
            }
            
            tempsInvincibilite = this.time.addEvent({ delay : 2000, callback: function(){invincibilite = false}, callbackScope: this});
        }
    

        player.anims.play('turn');
        
        

    }
        
    hitTortue (player, tortue)
    {
        
        vie -= 3;

        player.anims.play('turn');
        
        

    }    
}
