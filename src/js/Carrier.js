import 'phaser';
import Entity from './Entity';

export default class Carrier extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "sprEnemy2", "Carrier");
    this.play("sprEnemy2");

    this.body.velocity.y = Phaser.Math.Between(50, 100);
  }
}