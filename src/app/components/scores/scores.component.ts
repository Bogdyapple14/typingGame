import { Component, OnInit } from '@angular/core';
import { Score } from 'src/app/shared/score.model';
import { WordServiceService } from 'src/app/shared/word-service.service';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.scss'],
})
export class ScoresComponent implements OnInit {
  scores: Score[];

  constructor(private WordServiceService: WordServiceService) {}

  ngOnInit(): void {
    this.scores = this.WordServiceService.getScore();
  }
}
