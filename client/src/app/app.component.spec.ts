import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TranslateModule, TranslateService, TranslateLoader } from '@ngx-translate/core';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { WebsocketService } from './shared/services/websocket/websocket.service';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

export function fakeTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

describe('AppComponent', () => {
  beforeEach(async(() => {
    const config: SocketIoConfig = {
      url: 'http://localhost:3000',
      options: {}
    };

    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        HttpClientTestingModule,
        MatToolbarModule,
        RouterTestingModule,
        SocketIoModule.forRoot(config),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: (fakeTranslateLoader),
            deps: [HttpClient]
          },
          isolate: true
        })
      ],
      providers: [
        TranslateService,
        WebsocketService
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
