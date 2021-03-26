import 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';
import sprBtnPlay from '../assets/content/sprBtnPlay.png';
import sprBtnPlayHover from '../assets/content/sprBtnPlayHover.png';
import sprBtnPlayDown from '../assets/content/sprBtnPlayDown.png';
import sprBtnRestart from '../assets/content/sprBtnRestart.png';
import sprBtnRestartHover from '../assets/content/sprBtnRestartHover.png';
import sprBtnRestartDown from '../assets/content/sprBtnRestartDown.png';

import sndBtnOver from '../assets/content/sndBtnOver.wav';
import sndBtnDown from '../assets/content/sndBtnDown.wav';

export default class GameOverScene extends Phaser.Scene {
  constructor () {
    super('GameOver');
  }

  preload() {
    this.load.image("sprBtnPlay", sprBtnPlay);
    this.load.image("sprBtnPlayHover", sprBtnPlayHover);
    this.load.image("sprBtnPlayDown", sprBtnPlayDown);
    this.load.image("sprBtnRestart", sprBtnRestart);
    this.load.image("sprBtnRestartHover", sprBtnRestartHover);
    this.load.image("sprBtnRestartDown", sprBtnRestartDown);

    this.load.audio("sndBtnOver", sndBtnOver);
    this.load.audio("sndBtnDown", sndBtnDown);
  }

  create() {
    this.sfx = {
      btnOver: this.sound.add("sndBtnOver"),
      btnDown: this.sound.add("sndBtnDown")
    };

    this.title = this.add.text(this.game.config.width * 0.5, 128, 'GAME OVER', {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
    });
    this.title.setOrigin(0.5);

    this.btnRestart = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      "sprBtnRestart"
    );

    this.btnRestart.setInteractive();

    this.btnRestart.on("pointerover", function() {
      this.btnRestart.setTexture("sprBtnRestartHover"); // set the button texture to sprBtnPlayHover
      this.sfx.btnOver.play(); // play the button over sound
    }, this);

    this.btnRestart.on("pointerout", function() {
      this.setTexture("sprBtnRestart");
    });

    this.btnRestart.on("pointerdown", function() {
      this.btnRestart.setTexture("sprBtnRestartDown");
      this.sfx.btnDown.play();
    }, this);

    this.btnRestart.on("pointerup", function() {
      this.btnRestart.setTexture("sprBtnRestart");
      this.scene.start("Game");
    }, this);

  }


}