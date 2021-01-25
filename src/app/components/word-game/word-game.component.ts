import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WordServiceService } from 'src/app/shared/word-service.service';

@Component({
  selector: 'app-word-game',
  templateUrl: './word-game.component.html',
  styleUrls: ['./word-game.component.scss'],
})
export class WordGame implements OnInit {
  @ViewChild('wordsInput') input: ElementRef;
  word: string = '';
  type: string = '';
  readyBoolean: boolean = false;
  startText = 'Start';
  score: number = 0;
  time: number = 0;

  constructor(private WordServiceService: WordServiceService) {}

  ngOnInit(): void {}

  changeWord() {
    this.word = this.WordServiceService.getWord();
  }

  verifyWords() {
    if (this.word === this.type && this.time < 60) {
      this.changeWord();
      this.type = '';
      this.score++;
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
        this.changeWord();
        this.readyBoolean = true;
        this.increaseTime();
        this.input.nativeElement.focus();
        clearInterval(interval);
      }
    }, 1000);
  }

  increaseTime() {
    let timeInterval = setInterval(() => {
      if (this.time < 60) this.time++;
      else {
        this.type = '';
        this.readyBoolean = false;
        this.startText = 'Play Again';
        this.WordServiceService.updateScores(this.score);
        clearInterval(timeInterval);
      }
    }, 1000);
  }
}
