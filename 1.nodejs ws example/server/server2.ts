import * as WebSocket from 'ws';
import {createServer} from 'http';
import IWsevent from './wseventdata';
import {helloWs,endWs} from './wseventdata';

const httpServer=createServer();
const server = new WebSocket.Server({server:httpServer});
let socketData:IWsevent={'event':'null','data':'null'};

server.on('connection', (ws)=> {
    console.log('NEW CONNECT');
    
    ws.send(JSON.stringify(helloWs), err => {
        if(err){console.log(err)}});

    ws.on('message', (message)=>{
        console.log('received: %s', message);
        if(typeof message==='string'){
            socketData=JSON.parse(message);
        }
        if(socketData.event==='response'){
            endWs.data=socketData.data;
            ws.send(JSON.stringify(endWs), err =>{
                if(err){
                    console.log(err)
                }
            } );
        }
    });

    ws.on('close', () =>{
        console.log('DISCONNECTED');
    });
});

httpServer.listen(18000);