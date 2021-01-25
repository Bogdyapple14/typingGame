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
  private scores: Score[] = [];

  getWord() {
    return this.words[Math.floor(Math.random() * this.words.length)];
  }

  updateScores(score: number) {
    this.scores.push({
      date: {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        day: new Date().getDate(),
      },
      score: score,
    });
  }

  constructor() {}
}
