import 'phaser';
import explode from '../assets/explode.png';
 
export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
  }
 
  preload () {
  }
 
  create () {
    this.scene.start('Preloader');
  }
};