class PreloaderScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloaderScene' });
  }

  create() {
    this.scene.start('GameScene');
  }
}