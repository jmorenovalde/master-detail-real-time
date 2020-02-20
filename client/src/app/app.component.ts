import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'jamv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public rate = 9603.67;

  constructor(translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }
}
