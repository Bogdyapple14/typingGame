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
  lettersArray: any = [];
  word: string = '';

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
    this.lettersArray = this.word.split('');
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
      if (this.time < 60) this.time++;
      else {
        this.type = '';
        this.readyBoolean = false;
        this.startText = 'Play Again';
        this.WordServiceService.updateScores(this.score, 'word-game');
        clearInterval(timeInterval);
      }
    }, 1000);
  }
}
