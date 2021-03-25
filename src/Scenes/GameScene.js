import 'phaser';
import Player from '../js/Player';
import EnemyGunShip from '../js/EnemyGunShip';
import Carrier from '../js/Carrier'
import EnemyLaserChaser from '../js/EnemyLaserChaser'
// import sprEnemy0 from '../assets/content/sprEnemy0.png';
// import sprEnemy1 from '../assets/content/sprEnemy1.png';
// import sprEnemy2 from '../assets/content/sprEnemy2.png';


export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
  }
 
  preload() {
    // this.load.image("sprEnemy0", sprEnemy0);
    // this.load.spritesheet("sprEnemy5", '../assets/content/sprEnemy0.png', {
    //   frameWidth: 93,
    //   frameHeight: 65
    // });
    // this.load.image("sprEnemy9", '../assets/content/sprEnemy1.png');
    // this.load.spritesheet("sprEnemy2", '../assets/content/sprEnemy2.png', {
    //   frameWidth: 64,
    //   frameHeight: 64
    // });
  }
 
  create() {
    this.add.tileSprite(0, 0, 1800, 1400, 'starfield1')
    
    const sprEnemy5 = this.add.sprite(100, 100, 'sprEnemy5');
    this.anims.create({
      key: "sprEnemy5",
      frames: this.anims.generateFrameNumbers("sprEnemy5"),
      frameRate: 5,
      repeat: -1
    });

    const sprEnemy9 = this.add.sprite(100, 100, 'sprEnemy9');
    this.anims.create({
      key: "sprEnemy9",
      frames: this.anims.generateFrameNumbers('sprEnemy9'),
      //frames: this.anims.generateFrameNames('sprEnemy1', {prefix:'sprEnemy1', start: 1, end: 2, suffix:'.png' }),
      frameRate: 5,
      repeat: -1
    });

    this.anims.create({
      key: "sprExplosion",
      frames: this.anims.generateFrameNumbers("sprExplosion"),
      frameRate: 20,
      repeat: 0
    });

    this.anims.create({
      key: "sprPlayer",
      frames: this.anims.generateFrameNumbers("sprPlayer"),
      frameRate: 20,
      repeat: -1
    });

    // Add sounds
    this.sfx = {
      explosions: [
        this.sound.add("sndExplode0"),
        this.sound.add("sndExplode1")
      ],
      laser: this.sound.add("sndLaser")
    };

    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      "sprPlayer"
    ); 

    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  
    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();
    this.playerLasers = this.add.group();

    this.time.addEvent({
      delay: 1000,
      callback: function() {
        var enemy = null;

        if (Phaser.Math.Between(0, 10) >= 3) {
          enemy = new EnemyGunShip(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0
          );
        }
        else if (Phaser.Math.Between(0, 10) >= 5) {
          if (this.getEnemiesByType("EnemyLaserChaserShip").length < 5) {

            enemy = new EnemyLaserChaser(
              this,
              Phaser.Math.Between(0, this.game.config.width),
              0
            );
          }
        }
        else {
          enemy = new Carrier(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0
          );
        }

        if (enemy !== null) {
          enemy.setScale(Phaser.Math.Between(10, 20) * 0.1);
          this.enemies.add(enemy);
        }
      },
      callbackScope: this,
      loop: true
    });
    
  }

  update() {
    this.player.update();

    if (this.keyW.isDown) {
      this.player.moveUp();
    }
    else if (this.keyS.isDown) {
      this.player.moveDown();
    }

    if (this.keyA.isDown) {
      this.player.moveLeft();
    }
    else if (this.keyD.isDown) {
      this.player.moveRight();
    }

    // player can shoot now
    if (this.keySpace.isDown) {
      this.player.setData("isShooting", true);
    }
    else {
      this.player.setData("timerShootTick", this.player.getData("timerShootDelay") - 1);
      this.player.setData("isShooting", false);
    }

    for (var i = 0; i < this.enemies.getChildren().length; i++) {
      var enemy = this.enemies.getChildren()[i];

      enemy.update();

       
      if (enemy.x < -enemy.displayWidth ||
        enemy.x > this.game.config.width + enemy.displayWidth ||
        enemy.y < -enemy.displayHeight * 4 ||
        enemy.y > this.game.config.height + enemy.displayHeight) {
    
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }
          enemy.destroy();
        }
      }
    }

    for (var i = 0; i < this.enemyLasers.getChildren().length; i++) {
      var laser = this.enemyLasers.getChildren()[i];
      laser.update();

      if (laser.x < -laser.displayWidth ||
        laser.x > this.game.config.width + laser.displayWidth ||
        laser.y < -laser.displayHeight * 4 ||
        laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    }

    for (var i = 0; i < this.playerLasers.getChildren().length; i++) {
      var laser = this.playerLasers.getChildren()[i];
      laser.update();

      if (laser.x < -laser.displayWidth ||
        laser.x > this.game.config.width + laser.displayWidth ||
        laser.y < -laser.displayHeight * 4 ||
        laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    }
  }

  getEnemiesByType(type) {
    var arr = [];
    for (var i = 0; i < this.enemies.getChildren().length; i++) {
      var enemy = this.enemies.getChildren()[i];
      if (enemy.getData("type") == type) {
        arr.push(enemy);
      }
     

    }
    return arr;
  }
};