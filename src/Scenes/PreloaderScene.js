/* eslint-disable radix */
/* eslint-disable no-plusplus */

import Phaser from 'phaser';
import blueButton1 from '../assets/ui/blue_button02.png';
import blueButton2 from '../assets/ui/blue_button03.png';
import logo1 from '../assets/logo.png';
import box from '../assets/ui/grey_box.png';
import checkedBox from '../assets/ui/blue_boxCheckmark.png';
import bgMusic from '../assets/battleTheme.mp3';

import starfield from '../assets/starfield.png';
import background from '../assets/background2.png';

import sprBg0 from '../assets/content/sprBg0.png';
import sprBg1 from '../assets/content/sprBg1.png';
import sprExplosion from '../assets/explode.png';
import sprEnemy00 from '../assets/content/sprEnemy0.png';
import sprEnemy1 from '../assets/invader.png';
import sprEnemy2 from '../assets/invader32x32x4.png';
import sprLaserEnemy0 from '../assets/enemy-bullet.png';
import sprLaserPlayer from '../assets/bullet.png';
import sprPlayer1 from '../assets/sprPlayer.png';
import sndExplode0 from '../assets/sndExplode0.wav';
import sndExplode1 from '../assets/sndExplode1.wav';
import sndLaser from '../assets/sndLaser.wav';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    this.readyCount = 0;
  }

  preload() {
    const { width } = this.cameras.main;
    const { height } = this.cameras.main;

    this.load.image('logo', logo1);
    this.load.image('blueButton1', blueButton1);
    this.load.image('blueButton2', blueButton2);
    this.load.image('box', box);
    this.load.image('checkedBox', checkedBox);

    this.load.image('starfield', starfield);
    this.load.image('background1', background);
    this.load.image('starfield1', starfield);

    this.load.audio('bgMusic', bgMusic);
    this.load.audio('sndExplode0', sndExplode0);
    this.load.audio('sndExplode1', sndExplode1);
    this.load.audio('sndLaser', sndLaser);

    this.load.image('sprBg0', sprBg0);
    this.load.image('sprBg1', sprBg1);
    this.load.spritesheet('sprExplosion', sprExplosion, {
      frameWidth: 128,
      frameHeight: 128,
    });
    this.load.spritesheet('sprEnemy51', sprEnemy00, {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.image('sprEnemy1', sprEnemy1);
    this.load.spritesheet('sprEnemy91', sprEnemy2, {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.image('sprLaserEnemy0', sprLaserEnemy0);
    this.load.image('sprLaserPlayer', sprLaserPlayer);
    this.load.spritesheet('sprPlayer', sprPlayer1, {
      frameWidth: 32,
      frameHeight: 32,
    });

    // display progress bar
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);


    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    // update file progress text
    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    // remove progress bar when complete
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    });

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);
  }

  ready() {
    this.readyCount++;
    if (this.readyCount === 2) {
      this.scene.start('Title');
    }
  }

  create() {
    const logos = this.add.image(400, 200, 'logo');

    this.tweens.add({
      targets: logos,
      y: 450,
      duration: 1000,
      ease: 'Power2',
      yoyo: true,
      loop: -1,
    });
  }
}