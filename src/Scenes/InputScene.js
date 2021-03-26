import 'phaser';
import config from '../Config/config';

export default class InputScene extends Phaser.Scene {
  constructor() {
    super('Input');
  }
 
  create() {
    this.title = this.add.text(this.game.config.width * 0.5, 128, 'SPACE INVADERS', {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
    });
    this.title.setOrigin(0.5);

    this.input = this.add.dom(400, 300, 'input', {
      type: 'text',
      name: 'nameField',
      fontSize: '32px',
      backgroundColor: '#ffffff',
    });
    this.gameButton = this.add.sprite(400, 300, 'blueButton1').setInteractive();

    const nameInput = document.createElement('input');
    nameInput.placeholder = 'Enter your name';
    nameInput.type = 'text';
    nameInput.id = 'username';

    document.querySelector('#game-play').appendChild(nameInput);
   

    this.title1 = this.add.text(70, 350,
      'Please use the keys W A S D and Space to play', {
        fontFamily: 'monospace',
        fontSize: 25,
        fontStyle: 'bold',
        color: '#ffffff',
      });

    this.alertMsg = this.add.text(250, 400, '', {
      fontFamily: 'monospace',
      fontSize: 25,
      fontStyle: 'bold',
      color: 'red',
    });

    this.gameText = this.add.text(0, 0, 'Start', { fontSize: '32px', fill: '#fff' });
    this.centerButtonText(this.gameText, this.gameButton);

    this.gameButton.on('pointerdown', () => {
      if (nameInput.value !== '') {
        nameInput.style.display = 'none';
        this.scene.start('Game');
      } else {
        this.alertMsg.setText('Alert: Name Required!');
      }
    });

    this.input.on('pointerover', (event, gameObjects) => {
      gameObjects[0].setTexture('blueButton2');
    });

    this.input.on('pointerout', (event, gameObjects) => {
      gameObjects[0].setTexture('blueButton1');
    });

  }

  centerButton(gameObject, offset = 0) {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(config.width / 2, config.height / 2 - offset * 100,
        config.width, config.height),
    );
  }

  centerButtonText(gameText, gameButton) {
    Phaser.Display.Align.In.Center(
      gameText,
      gameButton,
    );
  }

}