import { ThisReceiver } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { WordServiceService } from 'src/app/shared/word-service.service';

@Component({
  selector: 'app-word-game',
  templateUrl: './word-game.component.html',
  styleUrls: ['./word-game.component.scss'],
})
export class WordGame implements OnInit {
  @ViewChild('wordsInput') input: ElementRef;
  type: string = '';
  readyBoolean: boolean = false;
  startText = 'Start';
  score: number = 0;
  time: number = 0;

  gameType: string = '';
  word: string = '';
  textGameEnded: boolean = false;

  constructor(
    private WordServiceService: WordServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.gameType = this.route.snapshot.routeConfig.path;
  }

  changeWord() {
    this.gameType === 'word-game'
      ? (this.word = this.WordServiceService.getWord())
      : (this.word = this.WordServiceService.getText());
  }

  verifyWords() {
    if (this.word === this.type) {
      if (this.gameType === 'word-game' && this.time < 60) {
        this.type = '';
        this.changeWord();
        this.score++;
      } else if (this.gameType === 'text-game') {
        this.type = '';
        this.textGameEnded = true;
        console.log(this.textGameEnded);
      }
    }
  }

  startGame() {
    this.time = 0;
    this.score = 0;

    let seconds = 3;
    this.startText = seconds.toString();
    let interval = setInterval(() => {
      if (seconds > 1) {
        seconds--;
        this.startText = seconds.toString();
      } else {
        this.type = '';
        this.textGameEnded = false;
        this.readyBoolean = true;
        this.increaseTime();
        this.input.nativeElement.focus();
        this.changeWord();
        clearInterval(interval);
      }
    }, 1000);
  }

  increaseTime() {
    let timeInterval = setInterval(() => {
      if (this.gameType === 'word-game')
        if (this.time < 60) this.time++;
        else {
          this.readyBoolean = false;
          this.startText = 'Play Again';
          this.type = '';
          this.WordServiceService.updateScores(this.score, 'word-game');
          clearInterval(timeInterval);
        }
      if (this.gameType === 'text-game') {
        if (this.textGameEnded === true) {
          this.type = '';
          this.startText = 'Play Again';
          this.WordServiceService.updateScores(this.score, 'text-game');
          clearInterval(timeInterval);
        } else this.time++;
      }
    }, 1000);
  }
}
