/* eslint-disable class-methods-use-this */
import Phaser from 'phaser';
import config from '../Config/config';
import sndBtnOver from '../assets/content/sndBtnOver.wav';
import sndBtnDown from '../assets/content/sndBtnDown.wav';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  preload() {
    this.load.audio('sndBtnOver', sndBtnOver);
    this.load.audio('sndBtnDown', sndBtnDown);
  }

  create() {
    this.sfx = {
      btnOver: this.sound.add('sndBtnOver'),
      btnDown: this.sound.add('sndBtnDown'),
    };

    this.gameButton = this.add.sprite(200, 200, 'blueButton1').setInteractive();
    this.centerButton(this.gameButton, 1);

    this.gameText = this.add.text(0, 0, 'Restart', { fontSize: '32px', fill: '#fff' });
    this.centerButtonText(this.gameText, this.gameButton);

    this.gameButton.on('pointerdown', () => {
      this.scene.start('Game');
      this.sfx.btnDown.play();
    });

    this.title = this.add.text(this.game.config.width * 0.5, 128, 'GAME OVER', {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
    });
    this.title.setOrigin(0.5);


    this.gameButton3 = this.add.sprite(395, 390, 'blueButton1').setInteractive();

    this.gameText = this.add.text(0, 0, 'Leaderboard', { fontSize: '25px', fill: '#fff' });
    this.centerButtonText(this.gameText, this.gameButton3);

    this.gameButton3.on('pointerdown', () => {
      this.scene.start('LeaderBoard');
      this.sfx.btnDown.play();
    });

    this.input.on('pointerover', (event, gameObjects) => {
      gameObjects[0].setTexture('blueButton2');
    });

    this.input.on('pointerout', (event, gameObjects) => {
      gameObjects[0].setTexture('blueButton1');
    });
  }

  centerButton(gameObject, offset = 0) {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(config.width / 2,
        config.height / 2 - offset * 100,
        config.width, config.height),
    );
  }

  centerButtonText(gameText, gameButton) {
    Phaser.Display.Align.In.Center(
      gameText,
      gameButton,
    );
  }
}