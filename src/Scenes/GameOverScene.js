/* eslint-disable class-methods-use-this */
/* eslint-disable radix */

import Phaser from 'phaser';
import config from '../Config/config';
import sndBtnOver from '../assets/content/sndBtnOver.wav';
import sndBtnDown from '../assets/content/sndBtnDown.wav';
import { postScores } from '../Objects/apiScore';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOver');
    this.gameScore = 0;
    this.myScore = 0;
    this.savedScore = 0;
  }

  preload() {
    this.load.audio('sndBtnOver', sndBtnOver);
    this.load.audio('sndBtnDown', sndBtnDown);
  }

  create() {
    const width = this.game.config.width * 0.5;

    this.sfx = {
      btnOver: this.sound.add('sndBtnOver'),
      btnDown: this.sound.add('sndBtnDown'),
    };

    this.gameButton = this.add.sprite(200, 200, 'blueButton1').setInteractive();
    this.centerButton(this.gameButton, 1);

    this.gameText = this.add.text(0, 0, 'Play Again', { fontSize: '28px', fill: '#fff' });
    this.centerButtonText(this.gameText, this.gameButton);

    this.gameButton.on('pointerdown', () => {
      this.scene.start('Game');
      this.sfx.btnDown.play();
    });

    this.title = this.add.text(this.game.config.width * 0.5, 128, 'GAME OVER', {
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
    });
    this.title.setOrigin(0.5);

    this.gameScore = localStorage.getItem('gameScore');
    this.myScore = parseInt(this.gameScore);
    this.highScore = localStorage.getItem('highScore');
    this.savedScore = parseInt(this.highScore);
    this.playerName = localStorage.getItem('playersName');

    this.textScore = this.add.text(
      270,
      300,
      `Your Score: ${this.gameScore}`,
      {
        fontSize: 32,
        color: '#ffffff',
        align: 'center',
      },
    );

    this.highScore = this.add.text(
      270,
      250,
      `High Score: ${this.highScore}`,
      {
        fontSize: 32,
        color: '#ffffff',
        align: 'center',
      },
    );

    this.congrats = this.add.text(
      100,
      450,
      ' ',
      {
        fontSize: 32,
        color: '#ffffff',
        align: 'center',
      },
    );

    this.gameButton3 = this.add.sprite(width - 100, 400, 'blueButton1').setInteractive();

    this.gameText = this.add.text(0, 0, 'Leaderboard', { fontSize: '25px', fill: '#fff' });
    this.centerButtonText(this.gameText, this.gameButton3);

    this.gameButton3.on('pointerdown', () => {
      this.scene.start('LeaderBoard');
      this.sfx.btnDown.play();
    });

    this.checkHighScore();


    this.gameButton4 = this.add.sprite(width + 100, 400, 'blueButton1').setInteractive();

    this.gameText = this.add.text(0, 0, 'Credits', { fontSize: '25px', fill: '#fff' });
    this.centerButtonText(this.gameText, this.gameButton4);

    this.gameButton4.on('pointerdown', () => {
      this.scene.start('Credits');
      this.sfx.btnDown.play();
    });
    this.input.on('pointerover', (event, gameObjects) => {
      gameObjects[0].setTexture('blueButton2');
    });

    this.input.on('pointerout', (event, gameObjects) => {
      gameObjects[0].setTexture('blueButton1');
    });
  }

  checkHighScore() {
    if (this.myScore > this.savedScore) {
      this.congrats.setText('CONGRATULATIONS NEW HIGHSCORE!!!');

      this.gameButton2 = this.add.sprite(395, 530, 'blueButton1').setInteractive();
      this.centerButton(this.gameButton, 1);

      this.gameText = this.add.text(0, 0, 'Submit Score', { fontSize: '25px', fill: '#fff' });
      this.centerButtonText(this.gameText, this.gameButton2);

      this.gameButton2.on('pointerdown', () => {
        postScores(localStorage.getItem('playersName'), this.gameScore);
        this.scene.start('Title');
      });
    }
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