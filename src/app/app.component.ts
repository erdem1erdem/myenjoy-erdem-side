import { Component } from '@angular/core';
import i18n from '../i18n';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
    i18n.changeLanguage('en');
  }

  switchLanguage(language: string) {
    i18n.changeLanguage(language);
  }
}
