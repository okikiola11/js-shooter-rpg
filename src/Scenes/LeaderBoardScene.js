/* eslint-disable class-methods-use-this */
import Phaser from 'phaser';
import config from '../Config/config';
import { getScores } from '../Objects/apiScore';

export default class LeaderBoardScene extends Phaser.Scene {
  constructor() {
    super('LeaderBoard');
  }

  create() {
    this.title = this.add.text(this.game.config.width * 0.5, 128, 'LEADERBOARD', {
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
    });
    this.title.setOrigin(0.5);
    this.score11 = this.add.text(150, 200, 'Scores', {
      fontSize: 32,
      color: 'pink',
      align: 'center',
    });

    this.score21 = this.add.text(150, 250, 'Scores', {
      fontSize: 32,
      color: 'pink',
      align: 'center',
    });

    this.score31 = this.add.text(150, 300, 'Scores', {
      fontSize: 32,
      color: 'pink',
      align: 'center',
    });
    this.gameButton = this.add.sprite(390, 500, 'blueButton1').setInteractive();

    this.gameText = this.add.text(0, 0, 'Restart', { fontSize: '32px', fill: '#fff' });
    this.centerButtonText(this.gameText, this.gameButton);

    this.gameButton.on('pointerdown', () => {
      this.scene.start('Input');
    });

    this.topScore();
  }

  async topScore() {
    const scoreDetails = await getScores();

    if (Array.isArray(scoreDetails.result)) {
      this.scores = scoreDetails.result.sort((a, b) => ((a.score > b.score) ? -1 : 1));
      this.score11.setText(`${1} --- ${this.scores[0].user} --- ${this.scores[0].score}`);
      this.score21.setText(`${2} --- ${this.scores[1].user} --- ${this.scores[1].score}`);
      this.score31.setText(`${3} --- ${this.scores[2].user} --- ${this.scores[2].score}`);
    } else {
      this.score1.setText(scoreDetails);
    }
  }

  centerButton(gameObject, offset = 0) {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(config.width / 2,
        config.height / 2 - offset * 100,
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