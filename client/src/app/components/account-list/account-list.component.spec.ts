import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { AccountListComponent } from './account-list.component';
import { ConvertPipe } from '../../shared/pipes/convert.pipe';
import { AccountsService } from '../../http/accounts/accounts.service';
import { WebsocketService } from '../../shared/services/websocket/websocket.service';
import { Router } from '@angular/router';
import { SharedPipesModule } from 'src/app/shared/pipes/shared-pipes.module';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

describe('AccountListComponent', () => {
  let component: AccountListComponent;
  let fixture: ComponentFixture<AccountListComponent>;
  const routerSpy = { navigate: jasmine.createSpy('navigate') };

  beforeEach(async(() => {
    const config: SocketIoConfig = {
      url: 'http://localhost:3000',
      options: {}
    };

    TestBed.configureTestingModule({
      declarations: [
        AccountListComponent,
        ConvertPipe
      ],
      imports: [
        HttpClientTestingModule,
        MatCardModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatTableModule,
        SharedPipesModule,
        SocketIoModule.forRoot(config),
        TranslateModule.forRoot()
      ],
      providers: [
        AccountsService,
        Router,
        WebsocketService,
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
