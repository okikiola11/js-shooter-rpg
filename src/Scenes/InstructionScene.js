import Phaser from 'phaser';

export default class InstructionScene extends Phaser.Scene {
  constructor() {
    super('Instruction');
  }

  create() {
    const width = this.game.config.width * 0.5;

    this.title = this.add.text(
      270,
      80,
      'HOW TO PLAY',
      {
        fontSize: 40,
        color: '#ffffff',
        align: 'center',
      },
    );

    this.instruction1 = this.add.text(
      40,
      160,
      'Move the player up/down, left/right using arrow keys',
      {
        fontSize: 22,
        color: '#ffffff',
        align: 'center',
      },
    );

    this.instruction2 = this.add.text(
      5,
      220,
      'Use the spacebar to shoot invader enemies',
      {
        fontSize: 32,
        color: '#ffffff',
        align: 'center',
      },
    );

    this.instruction3 = this.add.text(
      270,
      300,
      'Ready to Play?',
      {
        fontSize: 32,
        color: '#ffffff',
        align: 'center',
      },
    );

    this.gameButton = this.add.sprite(width - 100, 400, 'blueButton1').setInteractive();
    this.gameText = this.add.text(this, 0, 'Play', { fontSize: 32 });
    this.centerButtonText(this.gameText, this.gameButton);
    this.gameButton.on('pointerdown', () => {
      this.scene.start('Game');
    });

    this.backButton = this.add.sprite(width + 100, 400, 'blueButton1').setInteractive();
    this.backText = this.add.text(this, 0, 'Back', { fontSize: 32 });
    this.centerButtonText(this.backText, this.backButton);
    this.backButton.on('pointerdown', () => {
      this.game.sound.stopAll();
      this.scene.start('Title');
    });

    this.input.on('pointerover', (event, gameObjects) => {
      gameObjects[0].setTexture('blueButton2');
    });

    this.input.on('pointerout', (event, gameObjects) => {
      gameObjects[0].setTexture('blueButton1');
    });
  }

  // eslint-disable-next-line class-methods-use-this
  centerButtonText(gameText, gameButton) {
    Phaser.Display.Align.In.Center(gameText, gameButton);
  }
}