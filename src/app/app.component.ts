import { Component } from '@angular/core';
import { WordServiceService } from './shared/word-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  darkThemeEnabled: boolean = true;

  constructor() {}

  ngOnInit(): void {}
}
