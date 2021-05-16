import { TestBed, fakeAsync, waitForAsync } from '@angular/core/testing';

import { WebsocketService } from './websocket.service';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

xdescribe('WebsocketService', () => {
  let service: WebsocketService;

  beforeEach( waitForAsync (() => {
    const config: SocketIoConfig = {
      url: 'http://localhost:3000',
      options: {}
    };

    TestBed.configureTestingModule({
      imports: [
        SocketIoModule.forRoot(config)
      ],
      providers: [
      ]
    }).compileComponents();
    service = TestBed.inject(WebsocketService);
  }));

  it('should be created', fakeAsync( () => {
    expect(service).toBeTruthy();
  }));
});
