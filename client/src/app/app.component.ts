import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { WebsocketService } from './shared/services/websocket/websocket.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'jamv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public rate$: Observable<unknown>;

  constructor(private translate: TranslateService,
              public websocketService: WebsocketService) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  ngOnInit(): void {
    this.rate$ = this.websocketService.listen('new-rate');
  }
}
