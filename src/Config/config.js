import 'phaser';
 
export default {
  type: Phaser.AUTO,
  parent: 'space-invaders',
  width: 800,
  height: 600,
  backgroundColor: "#2d2d2d",
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 }
    }
  },
  pixelArt: true,
  roundPixels: true
};