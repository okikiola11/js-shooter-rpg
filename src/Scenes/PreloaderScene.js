import Phaser from 'phaser';
import blueButton1 from '../assets/ui/blue_button02.png';
import blueButton2 from '../assets/ui/blue_button03.png';
import explode from '../assets/explode.png';
// import logo from '../assets/ui/my-soldier.png';
import box from '../assets/ui/grey_box.png';
import checkedBox from '../assets/ui/blue_boxCheckmark.png';
//import bgMusic from '../assets/battleTheme.mp3';

export default class PreloaderScene extends Phaser.Scene {
  constructor () {
    super('Preloader');
  }

  init() {
    this.readyCount = 0;
  }
 
  preload () {
    // add logo image
    this.add.image(400, 200, explode);

    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    
    this.load.image('explode', explode);
    this.load.image('blueButton1', blueButton1);
    this.load.image('blueButton2', blueButton2);
    this.load.image('box', box);
    this.load.image('checkedBox', checkedBox);
    //this.load.audio('bgMusic1', bgMusic);
    this.load.spritesheet('logoImg', explode, {
      frameWidth: 16,
      frameHeight: 24,
    });

    // create animation for images
    // this.anims.create({
    //   key: "logo",
    //   frames: this.anims.generateFrameNumbers("logo"),
    //   frameRate: 20,
    //   repeat: -1
    // });
    

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
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);

    let assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    assetText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on('progress', (value) => {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    // update file progress text
    this.load.on('fileprogress', (file) => {
      assetText.setText('Loading asset: ' + file.key);
    });

    // remove progress bar when complete
    this.load.on('complete', function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    }.bind(this));

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    // this.load.image('blueButton1', blueButton1);
    // this.load.image('blueButton2', blueButton2);
    // this.load.image('phaser-Logo', explode);

    // this.load.image('box1', box);
    // this.load.image('checkedBox', blueBoxCheckMark);
    // this.load.audio('bgMusic', [battleTheme]);
  }
  
  ready() {    
    this.readyCount++;
    if (this.readyCount === 2) {
      this.scene.start('Title');
    }
  }
 
  create () {
  }
};