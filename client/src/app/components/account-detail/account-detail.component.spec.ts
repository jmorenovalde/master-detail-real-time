import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDetailComponent } from './account-detail.component';
import { WebsocketService } from '../../shared/services/websocket/websocket.service';
import { AccountsService } from '../../http/accounts/accounts.service';
import { Router, ActivatedRoute, Params, convertToParamMap } from '@angular/router';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { SharedPipesModule } from '../../shared/pipes/shared-pipes.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

export function fakeTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

describe('AccountDetailComponent', () => {
  let component: AccountDetailComponent;
  let fixture: ComponentFixture<AccountDetailComponent>;

  const routerSpy = { navigate: jasmine.createSpy('navigate') };

  beforeEach(async(() => {
    const config: SocketIoConfig = {
      url: 'http://localhost:3000',
      options: {}
    };

    TestBed.configureTestingModule({
      declarations: [ AccountDetailComponent ],
      imports: [
        HttpClientTestingModule,
        MatCardModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatTableModule,
        SocketIoModule.forRoot(config),
        SharedPipesModule,
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
        AccountsService,
        Router,
        WebsocketService,
        TranslateService,
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: { params: of(convertToParamMap({id: 1})) }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
