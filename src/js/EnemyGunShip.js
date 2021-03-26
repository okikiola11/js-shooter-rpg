import 'phaser';
import Entity from './Entity';
import EnemyLaser from './EnemyLaser'

export default class EnemyGunShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "sprEnemy51", "EnemyGunShip");
    
    this.body.velocity.y = Phaser.Math.Between(50, 100);
 
    this.shootTimer = this.scene.time.addEvent({
      delay: 1000,
      callback: function() {
        var laser = new EnemyLaser(
          this.scene,
          this.x,
          this.y
        );
        laser.setScale(this.scaleX);
        this.scene.enemyLasers.add(laser);
      },
      callbackScope: this,
      loop: true
    });
    this.play("sprEnemy51");
  }

  onDestroy() {
    if (this.shootTimer !== undefined) {
      if (this.shootTimer) {
        this.shootTimer.remove(false);
      }
    }
  }
}