import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WordServiceService } from 'src/app/shared/word-service.service';

@Component({
  selector: 'app-word-game',
  templateUrl: './word-game.component.html',
  styleUrls: ['./word-game.component.scss'],
})
export class WordGame implements OnInit {
  // Get the input in order to focus it when game starts
  @ViewChild('wordsInput') input: ElementRef;
  // Standard Variables
  type: string = '';
  startText = 'Start';
  score: number = 0;
  time: number = -1;
  // Case Variables
  gameType: string = '';
  word: string = '';
  readyWordGameBoolean: boolean = true;
  readyTextGameBoolean: boolean = true;

  constructor(
    private WordServiceService: WordServiceService,
    private route: ActivatedRoute
  ) {}

  // Get the game type by the url (word-game / text-game)
  ngOnInit(): void {
    this.gameType = this.route.snapshot.routeConfig.path;
  }

  // The function that returns a new, random word to type
  changeWord() {
    this.gameType === 'word-game'
      ? (this.word = this.WordServiceService.getWord())
      : (this.word = this.WordServiceService.getText().slice(0, 250));
  }

  // Verify if what the user wrote matches the word
  verifyWords() {
    if (this.word === this.type) {
      // Word-Game case (the user only has 60 seconds to write as many words)
      if (this.gameType === 'word-game' && this.time < 60) {
        // Every time you match the word it empties what you wrote, returns a new word and increments the score
        this.type = '';
        this.changeWord();
        this.score++;
        // Text-Game case ( the user must write the whole text as fast as possible , no time limit )
      } else if (this.gameType === 'text-game') {
        // Empty the input, toggles the readyTextGameBoolean variable to false, cause the game is not ready to start again
        this.type = '';
        this.readyTextGameBoolean = true;
      }
    }
  }

  startGame() {
    if (this.startText === 'Start' || this.startText === 'Play Again') {
      // Every time you start the game :
      this.time = 0;
      this.score = 0;
      let seconds = 3;
      // Start the countdown
      this.startText = seconds.toString();
      let interval = setInterval(() => {
        if (seconds > 1) {
          seconds--;
          this.startText = seconds.toString();
        } else {
          // If the countdown ended and the game began
          this.type = '';
          this.readyTextGameBoolean = false;
          this.readyWordGameBoolean = false;
          this.increaseTime();
          this.input.nativeElement.focus();
          this.changeWord();
          clearInterval(interval);
        }
      }, 1000);
    }
  }

  increaseTime() {
    let timeInterval = setInterval(() => {
      // If the game type is word-game
      if (this.gameType === 'word-game')
        if (this.time < 60)
          // The user only has 60 seconds to type words
          this.time++;
        else {
          // If the time gets to 60 seconds
          this.readyWordGameBoolean = true;
          this.startText = 'Play Again';
          this.type = '';
          this.WordServiceService.updateScores(
            this.score,
            'word-game',
            this.time
          );
          clearInterval(timeInterval);
        }

      if (this.gameType === 'text-game') {
        if (this.readyTextGameBoolean === true) {
          this.type = '';
          this.startText = 'Play Again';
          this.WordServiceService.updateScores(
            this.score,
            'text-game',
            this.time
          );
          clearInterval(timeInterval);
        } else this.time++;
      }
    }, 1000);
  }
}
