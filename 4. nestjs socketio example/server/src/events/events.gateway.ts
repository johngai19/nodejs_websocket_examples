import { SubscribeMessage, WebSocketGateway, WebSocketServer, ConnectedSocket, } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import IWsevent, { helloWs, resWs, endWs } from './wseventdata';

@WebSocketGateway(18000)
export class EventsGateway {

  @WebSocketServer()
  server: Server;

  async handleConnection(@ConnectedSocket() socket: Socket) {
    console.log(`CONNECT:${socket.id}`);
    socket.emit('hello', helloWs);
  }

  async handleDisconnect(@ConnectedSocket() socket: Socket) {
    console.log(`DISCONNECT:${socket.id}`)
  }

  @SubscribeMessage('response')
  handleResponse(socket: Socket, data: any): string {
    console.log(`response received:${data.data}}`);
    resWs.data=data.data.slice(9);
    socket.emit('response', resWs);
    return JSON.stringify({ status: 'OK' });
  }

  @SubscribeMessage('terminate')
  handleTerminate(socket: Socket, data: any): string {
    console.log(`received:${data.data}}`);
    socket.emit('end', endWs);
    return JSON.stringify({ status: 'OK' });
  }
  
  @SubscribeMessage('events')
  handleMessage(socket: Socket, data: any): string {
    console.log(data.data);
    // return JSON.stringify(payload);
    return JSON.stringify({ status: 'OK' });

  }

  @SubscribeMessage('identity')
  handleMessageidentity(client: any, data: string): string {
    console.log(data);
    return 'Hello world!';
  }
}