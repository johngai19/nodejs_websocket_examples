import * as WebSocket from 'ws';
import IWsevent,{resWs} from './wseventdata';

const ws = new WebSocket('ws://localhost:18000');
let socketData:IWsevent={'event':'null','data':'null'};

ws.on('open', ()=> {
  console.log('CONNECTED');
});

ws.on('close', ()=> {
    console.log('DISCONNECTED');
  });

ws.on('message', (message)=>{
    console.log('received: %s', message);

    if(typeof message==='string'){
        socketData=JSON.parse(message);
    }
    if(socketData.event==='hello'){
        resWs.data='response: '+Math.random();
        ws.send(JSON.stringify(resWs), err =>{
            if(err){
                console.log(err)
            }
        } );
    }
    if(socketData.event==='end'){
        setTimeout(()=>{
            console.log('connection is to be closed');
            ws.close();
        },3000)
    }
});
