import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public isConnect = false;

  constructor(private socket: Socket) {
    this.checkStatus();
  }

  private checkStatus() {
    this.socket.on('connect', () => this.isConnect = true );
    this.socket.on('disconnect', () => this.isConnect = false );
  }

  listen( evento: string ) {
    return this.socket.fromEvent( evento );
  }
}
