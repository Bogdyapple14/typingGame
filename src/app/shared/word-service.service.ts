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
    `Computer programming is the process of designing and building an executable computer program to accomplish a 
    specific computing result or to perform a specific task. Programming involves tasks such as: analysis, generating 
    algorithms, profiling algorithms' accuracy and resource consumption, and the implementation of algorithms in a 
    chosen programming language (commonly referred to as coding). The source code of a program is written in 
    one or more languages that are intelligible to programmers, rather than machine code, which is directly executed
     by the central processing unit.`,
  ];
  private scores: Score[] = [];

  getWord() {
    return this.words[Math.floor(Math.random() * this.words.length)];
  }

  getText() {
    return this.texts[Math.floor(Math.random() * this.texts.length)];
  }

  updateScores(score: number, gameType: string) {
    this.scores.push({
      date: {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        day: new Date().getDate(),
      },
      score: score,
      gameType: gameType,
    });
  }

  constructor() {}
}
