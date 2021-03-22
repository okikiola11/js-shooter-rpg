import 'phaser';
import explode from '../assets/explode.png';
 
export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
  }
 
  preload () {
    // load images
    //this.load.image('logo', logoImg);
    this.load.spritesheet('logo', explode, {
      frameWidth: 142,
      frameHeight: 142
    });
  }
 
  create () {
    //this.add.image(400, 300, 'logo');
    this.scene.start('Preloader');
  }
};