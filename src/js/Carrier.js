import Phaser from 'phaser';
import Entity from './Entity';

export default class Carrier extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'sprEnemy91', 'Carrier');
    this.play('sprEnemy91');

    this.body.velocity.y = Phaser.Math.Between(50, 100);
  }
}