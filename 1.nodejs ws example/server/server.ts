import * as WebSocket from 'ws';
import IWsevent from './wseventdata';
import {helloWs} from './wseventdata';

const server = new WebSocket.Server({ port: 18000 });
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
            ws.send(JSON.stringify({ 'event': 'end', 'data': socketData.data }), err =>{
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