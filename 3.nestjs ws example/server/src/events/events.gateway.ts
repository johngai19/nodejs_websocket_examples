import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
  WsResponse,
} from '@nestjs/websockets';
import * as WebSocket from 'ws';
import { Server } from 'ws';
import {helloWs,resWs,endWs} from './wseventdata';
/* import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators'; */

@WebSocketGateway(18000)
export class EventsGateway {

  @WebSocketServer()
  server: Server;

  async handleConnection(@ConnectedSocket() client: WebSocket) {
    console.log('CONNECT');
    //client.send(JSON.stringify({'event':'events','data':'welcome to websocket'}));
    client.send(JSON.stringify(helloWs));
}

  async handleDisconnect(@ConnectedSocket() client: WebSocket) {
      console.log('DISCONNECT')
}

 //Here we changed the response method and return a same response 
 //so as not to close the connection automatically
  @SubscribeMessage('response')
  onResponse(client: any, data: any): any {
    console.log(data);
    resWs.data=data.slice(9);
    //return { event: 'result', data: 'this is the result' };
    return resWs;
  }

  //Here we added a terminate event to close the connection
  @SubscribeMessage('terminate')
  onTerminate(client: any, data: any): any {
    console.log(data);
    endWs.data='terminate';
    //return { event: 'result', data: 'this is the result' };
    return endWs;
  }
//Below is an asyn example uses an array
/*   @SubscribeMessage('events')
  onEvent(client: any, data: any): Observable<WsResponse<number>> {
    console.log(data);
    return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
  }
  */
}
