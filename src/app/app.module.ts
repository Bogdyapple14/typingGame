import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WordGame } from './components/word-game/word-game.component';
import { ScoresComponent } from './components/scores/scores.component';
import { TextGame } from './components/text-game/text-game.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [AppComponent, WordGame, ScoresComponent, TextGame, HomeComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
