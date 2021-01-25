import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WordGame } from './components/word-game/word-game.component';
import { ScoresComponent } from './components/scores/scores.component';

const routes: Routes = [
  {
    path: '',
    component: WordGame,
  },
  {
    path: 'scores',
    component: ScoresComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
