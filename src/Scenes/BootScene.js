import Phaser from 'phaser';
 
export default class BootScene extends Phaser.Scene {
  constructor () {
    super('Boot');
  }
 
  preload () {
    // this.load.image("sprBtnPlay", "../assets/content/sprBtnPlay.png");
    // this.load.image("sprBtnPlayHover", "../assets/content/sprBtnPlayHover.png");
    // this.load.image("sprBtnPlayDown", "../assets/content/sprBtnPlayDown.png");
    // this.load.image("sprBtnRestart", "../assets/content/sprBtnRestart.png");
    // this.load.image("sprBtnRestartHover", "../assets/content/sprBtnRestartHover.png");
    // this.load.image("sprBtnRestartDown", "../assets/content/sprBtnRestartDown.png");

    // this.load.audio("sndBtnOver", "../assets/content/sndBtnOver.wav");
    // this.load.audio("sndBtnDown", "../assets/content/sndBtnDown.wav");
  }
  
  create () {
    // this.sfx = {
    //   btnOver: this.sound.add("sndBtnOver"),
    //   btnDown: this.sound.add("sndBtnDown")
    // };

    // this.btnPlay = this.add.sprite(
    //   this.game.config.width * 0.5,
    //   this.game.config.height * 0.5,
    //   "sprBtnPlay"
    // );
    // this.btnPlay.setInteractive();

    // this.btnPlay.on("pointerover", function() {
    //   this.btnPlay.setTexture("sprBtnPlayHover"); // set the button texture to sprBtnPlayHover
    //   this.sfx.btnOver.play(); // play the button over sound
    // }, this);
    this.scene.start('Preloader');
  }
};