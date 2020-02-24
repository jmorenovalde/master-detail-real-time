import { Logger } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WsResponse, OnGatewayConnection,
    OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

import {  Interval } from '@nestjs/schedule';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  private server: Server;
  private connectedClients: Socket[] = [];

  afterInit(server: Server) {
    this.server = server;
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.connectedClients.push(client);
    const rate = this.generateRate();
    client.emit('new-rate', rate);
  }

  handleDisconnect(client: Socket) {
    const index = this.connectedClients.findIndex((socket: Socket) => client.id === socket.id);
    if (index || index === 0) {
      this.connectedClients.splice(index, 1);
    }
  }

  @Interval(15000)
  handleCron() {
    const rate = this.generateRate();
    this.connectedClients.forEach((client: Socket) => {
      client.emit('new-rate', rate);
    });
  }

  private generateRate(): number {
    // return 9000 * (1 + ((Math.random() > 0.5 ? 1 : -1) * Math.random() * 0.1));
    // Alternative method to get the rate to have more oportunities to repeat the same value
    // than the last value of the rate
    const values = [9600.80, 9700.10, 9650.57];
    const random = Math.random();
    return random < 0.33 ? values[0] : random < 0.66 ? values[1] : values[2];
  }
}
