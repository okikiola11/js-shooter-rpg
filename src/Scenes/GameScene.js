/* eslint-disable no-plusplus */
/* eslint-disable eqeqeq */
import Phaser from 'phaser';
import Player from '../js/Player';
import EnemyGunShip from '../js/EnemyGunShip';
import Carrier from '../js/Carrier';
import EnemyLaserChaser from '../js/EnemyLaserChaser';
import score from '../js/Score';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  init() {
    this.score = 0;
  }

  create() {
    this.add.tileSprite(0, 0, 1800, 1400, 'starfield1');

    this.scoreText = this.add.text(16, 16, `Score: ${this.score}`, {
      fontSize: 20,
      align: 'left',
    });

    this.anims.create({
      key: 'sprEnemy51',
      frames: this.anims.generateFrameNumbers('sprEnemy51'),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: 'sprEnemy91',
      frames: this.anims.generateFrameNumbers('sprEnemy91'),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: 'sprExplosion',
      frames: this.anims.generateFrameNumbers('sprExplosion'),
      frameRate: 20,
      repeat: 0,
    });

    this.anims.create({
      key: 'sprPlayer',
      frames: this.anims.generateFrameNumbers('sprPlayer'),
      frameRate: 20,
      repeat: -1,
    });

    this.topScoreApi = this.add.text(
      200,
      10,
      'Top Score: ',
      {
        fontSize: 20,
        align: 'left',
      },
    );

    // Add sounds
    this.sfx = {
      explosions: [
        this.sound.add('sndExplode0'),
        this.sound.add('sndExplode1'),
      ],
      laser: this.sound.add('sndLaser'),
    };

    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'sprPlayer',
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
      callback() {
        let enemy = null;

        if (Phaser.Math.Between(0, 10) >= 3) {
          enemy = new EnemyGunShip(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0,
          );
        } else if (Phaser.Math.Between(0, 10) >= 5) {
          if (this.getEnemiesByType('EnemyLaserChaserShip').length < 5) {
            enemy = new EnemyLaserChaser(
              this,
              Phaser.Math.Between(0, this.game.config.width),
              0,
            );
          }
        } else {
          enemy = new Carrier(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0,
          );
        }

        if (enemy !== null) {
          enemy.setScale(Phaser.Math.Between(10, 20) * 0.1);
          this.enemies.add(enemy);
        }
      },
      callbackScope: this,
      loop: true,
    });

    // ADD COLLISION BETWEEN THE TWO GAME OBJECTS
    this.physics.add.collider(this.playerLasers, this.enemies, (playerLaser, enemy) => {
      if (enemy) {
        if (enemy.onDestroy !== undefined) {
          enemy.onDestroy();
        }

        enemy.explode(true);
        playerLaser.destroy();
      }
    });

    this.physics.add.overlap(this.player, this.enemies, (player, enemy) => {
      if (!player.getData('isDead')
          && !enemy.getData('isDead')) {
        player.explode(false);
        enemy.explode(true);
        player.onDestroy();
      }
    });

    this.physics.add.overlap(this.player, this.enemyLasers, (player, laser) => {
      if (!player.getData('isDead')
          && !laser.getData('isDead')) {
        player.explode(false);
        laser.destroy();
        player.onDestroy();
      }
    });

    // this.topScore()
  }

  addScore(amount) {
    this.score = score(this.score, amount);
    this.scoreText.setText(`Score: ${this.score}`);
  }


  update() {
    if (!this.player.getData('isDead')) {
      this.player.update();
      if (this.keyW.isDown) {
        this.player.moveUp();
      } else if (this.keyS.isDown) {
        this.player.moveDown();
      }
      if (this.keyA.isDown) {
        this.player.moveLeft();
      } else if (this.keyD.isDown) {
        this.player.moveRight();
      }

      if (this.keySpace.isDown) {
        this.player.setData('isShooting', true);
      } else {
        this.player.setData('timerShootTick', this.player.getData('timerShootDelay') - 1);
        this.player.setData('isShooting', false);
      }

      localStorage.setItem('gameScore', this.score);
    }

    for (let i = 0; i < this.enemies.getChildren().length; i++) {
      const enemy = this.enemies.getChildren()[i];

      enemy.update();


      if (enemy.x < -enemy.displayWidth
        || enemy.x > this.game.config.width + enemy.displayWidth
        || enemy.y < -enemy.displayHeight * 4
        || enemy.y > this.game.config.height + enemy.displayHeight) {
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }
          enemy.destroy();
        }
      }
    }

    for (let i = 0; i < this.enemyLasers.getChildren().length; i++) {
      const laser = this.enemyLasers.getChildren()[i];
      laser.update();

      if (laser.x < -laser.displayWidth
        || laser.x > this.game.config.width + laser.displayWidth
        || laser.y < -laser.displayHeight * 4
        || laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    }

    for (let i = 0; i < this.playerLasers.getChildren().length; i++) {
      const laser = this.playerLasers.getChildren()[i];
      laser.update();

      if (laser.x < -laser.displayWidth
        || laser.x > this.game.config.width + laser.displayWidth
        || laser.y < -laser.displayHeight * 4
        || laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    }
  }

  getEnemiesByType(type) {
    const arr = [];
    for (let i = 0; i < this.enemies.getChildren().length; i++) {
      const enemy = this.enemies.getChildren()[i];
      if (enemy.getData('type') == type) {
        arr.push(enemy);
      }
    }
    return arr;
  }
}