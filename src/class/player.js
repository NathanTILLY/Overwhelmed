//Player Class to export in any scene that include the player acting
export default class Player {
    constructor(scene, x, y) {
      this.scene = scene;
  
      //Animating our player
      const anims = scene.anims;
      anims.create({
        key: 'player-idle',
              frames: [ { key: 'player', frame: 1 } ],
              frameRate: 10
      });
      anims.create({
        key: 'player-shoot',
              frames: [ { key: 'player', frame: 0 } ],
              frameRate: 10
      });
      anims.create({
        key: "player-run",
        frames: anims.generateFrameNumbers("player", { start: 2, end: 8 }),
        frameRate: 12,
        repeat: -1
      });
      anims.create({
        key: 'player-jump',
              frames: [ { key: 'player', frame: 9 } ],
              frameRate: 10
      });
  
      // Base of the player's physics
      this.sprite = scene.physics.add
        .sprite(x, y, "player", 0)
        .setDrag(1000, 0)
        .setMaxVelocity(300, 600)
        .setSize(48, 64)
        
  
      // Using arrow keys and ZQSD keys
      const { LEFT, RIGHT, UP, DOWN, Z, Q, D, S } = Phaser.Input.Keyboard.KeyCodes;
      this.keys = scene.input.keyboard.addKeys({
        left: LEFT,
        right: RIGHT,
        up: UP,
        down: DOWN,
        z: Z,
        q: Q,
        s: S,
        d: D
      });
    }
  
    //Having a function that freeze the player
    freeze() {
      this.sprite.body.moves = false;
    }
  
    //Updating our player
    update() {
      const { keys, sprite } = this;
      const onGround = sprite.body.blocked.down;
      const acceleration = onGround ? 300 : 300;
  
      // Apply horizontal acceleration when left/a or right/d are applied
      if (keys.left.isDown || keys.q.isDown) {
        sprite.setAccelerationX(-acceleration);
        sprite.setFlipX(true);
      } else if (keys.right.isDown || keys.d.isDown) {
        sprite.setAccelerationX(acceleration);
        sprite.setFlipX(false);
      } else {
        sprite.setAccelerationX(0);
      }
  
      // Allow player to jump only if on ground
      if (sprite.body.blocked.down && (keys.up.isDown || keys.z.isDown)) {
        sprite.setVelocityY(-500);
        sprite.anims.stop();
        
      }
  
      // Update the animation
      if (sprite.body.blocked.down) {
        //Player Running if velocityX != 0 else Player Idle
        if (sprite.body.velocity.x != 0) {sprite.anims.play("player-run", true);}
        else {sprite.anims.play("player-idle", true);}
      } else {
        //Stopping Animation to play a Texture for the jump
        sprite.anims.stop();
        sprite.anims.play("player-jump", true);
      }
    }
  
    //Creating a function to destroy player
    destroy() {
      this.sprite.destroy();
    }
  }
  