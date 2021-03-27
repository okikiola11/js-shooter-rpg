/* eslint-disable func-names */
import Phaser from 'phaser';
import Button from '../Objects/Button';

export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super('Credits');
  }

  create() {
    const height = this.scale.height * 0.5;
    const width = this.scale.width * 0.5;
    this.creditsText = this.add.text(0, 0, 'Credits', {
      fontSize: '32px',
      fill: '#fff',
    });
    this.madeByText = this.add.text(0, 0, 'Game By: Apelehin Okikiola', {
      fontSize: '30px',
      fill: '#fff',
      fontStyle: 'bold',
    });

    this.bgByText = this.add.text(0, 0, 'Game Background by: ', {
      fontSize: '30px',
      fill: '#fff',
      fontStyle: 'bold',
    });

    this.musicByText = this.add.text(0, 0, 'Music by: Ketsa - Seeing you again', {
      fontSize: '30px',
      fill: '#fff',
      fontStyle: 'bold',
    });

    this.zone = this.add.zone(width, height, width * 2, height);

    this.titleButton = new Button(
      this,
      width,
      1000,
      'blueButton1',
      'blueButton2',
      'Back',
      'Title',
    );
    Phaser.Display.Align.In.Center(this.creditsText, this.zone);
    Phaser.Display.Align.In.Center(this.madeByText, this.zone);
    Phaser.Display.Align.In.Center(this.bgByText, this.zone);
    Phaser.Display.Align.In.Center(this.musicByText, this.zone);

    this.madeByText.setY(1000);
    this.bgByText.setY(1000);
    this.musicByText.setY(1000);

    this.creditsTween = this.tweens.add({
      targets: this.creditsText,
      y: 100,
      ease: 'Power1',
      duration: 8000,
      delay: 1000,
      onComplete() {
        // eslint-disable-next-line no-unused-expressions
        this.destroy;
      },
    });

    this.madeByTween = this.tweens.add({
      targets: this.madeByText,
      y: 200,
      ease: 'Power1',
      duration: 8000,
      delay: 1000,
      onComplete() {
        // eslint-disable-next-line no-unused-expressions
        this.madeByTween.destroy;
      },
    });

    this.bgByTween = this.tweens.add({
      targets: this.bgByText,
      y: 300,
      ease: 'Power1',
      duration: 8000,
      delay: 1000,
      onComplete() {
        // eslint-disable-next-line no-unused-expressions
        this.bgByTween.destroy;
      },
    });

    this.musicByTween = this.tweens.add({
      targets: this.musicByText,
      y: 400,
      ease: 'Power1',
      duration: 8000,
      delay: 1000,
      onComplete: function () {
        // eslint-disable-next-line no-unused-expressions
        this.musicByTween.destroy;
        this.scene.start('Title');
      }.bind(this),
    });

    this.musicByTween = this.tweens.add({
      targets: this.titleButton,
      y: 500,
      ease: 'Power1',
      duration: 8000,
      delay: 1000,
      onComplete() {},
    });
  }
}