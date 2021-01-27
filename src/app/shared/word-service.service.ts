import { Injectable } from '@angular/core';
import { Score } from './score.model';

@Injectable({
  providedIn: 'root',
})
export class WordServiceService {
  private words = [
    'fish',
    'egg',
    'oat',
    'truck',
    'chamber',
    'whale',
    'ape',
    'water',
    'dinosaur',
    'game',
    'league',
    'soccer',
    'baseball',
  ];
  private texts = [
    `Tasks accompanying and related to programming include: testing, debugging, source code maintenance, implementation of build systems, and management of derived artifacts, such as the machine code of computer programs.`,
  ];
  private scores: Score[] = [];

  getScore() {
    return this.scores;
  }

  getWord() {
    return this.words[Math.floor(Math.random() * this.words.length)];
  }

  getText() {
    return this.texts[Math.floor(Math.random() * this.texts.length)];
  }

  updateScores(score: number, gameType: string, time: number) {
    this.scores.push({
      date: {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        day: new Date().getDate(),
      },
      score: score,
      gameType: gameType,
      time: time,
    });
  }

  constructor() {}
}
