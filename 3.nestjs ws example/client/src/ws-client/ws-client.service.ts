import { Injectable } from '@nestjs/common';
import * as WebSocket from 'isomorphic-ws';
import IWsevent,{resWs} from './wseventdata';


let ws= new WebSocket('ws://localhost:18000');
ws.onopen =()=> {
    // console.log(this);
    console.log('Connected');
    //console.log(ws);
}

ws.onmessage =(message)=> {
    //let dataContent: any = JSON.parse(message.data);
    
    let socketData: IWsevent;
    
    if(typeof message.data==='string'){
        socketData=JSON.parse(message.data);
    }else{
        socketData={event:'',data:''}
    }
    console.log(socketData);
    if(socketData.event==='hello'){
        resWs.data='response: '+Math.random();
        ws.send(JSON.stringify(resWs), err =>{
            if(err){
                console.log(err)
            }
        } );
    }

    if(socketData.event==='response'){
        WsClientService.setData(socketData.data);
    }


    if(socketData.event==='end'){
        setTimeout(()=>{
            console.log('connection is to be closed');
            ws.terminate();
            //console.log(ws);
            process.exit(0);
        },3000)
    }
}

@Injectable()
export class WsClientService {

    constructor(){
    }

    static messageData:string='initial data';

    getAll():string{
        return 'The ws-client module works!'
    }


    sendTerminate(){
        ws.send(JSON.stringify({
            event: 'terminate',
            data: 'terminate',
        }),(err)=>{
            console.log(err);
        });
        return 'terminate operation was sent';
    }

    getData(){
        resWs.data='response: '+Math.random();
        if(ws.readyState===1){
            ws.send(JSON.stringify(resWs), err =>{
                if(err){
                    console.log(err)
                }
            } );
        }else{
            return 'server closed';
        }
        
        return WsClientService.messageData;
    }

    static setData(newData:string){
        this.messageData=newData;
    }

}


/* @Injectable()
export class WsClientService {
    private ws = new WebSocket('ws://localhost:18000');
    private messageData:string='';
    constructor(
    ) {
        let that=this;
        this.ws.onopen =function open() {
            // console.log(this);
            console.log('Connected');
            this.send(
                JSON.stringify({
                    event: 'events',
                    data: 'test',
                }));
        }

        this.ws.onmessage = function incoming(message) {
            //let dataContent: any = JSON.parse(message.data);
            let dataContent: any;
            if (typeof message.data === 'string') {
                dataContent = JSON.parse(message.data);
            } else {
                dataContent = {};
            }
            console.log(dataContent);
            //console.log(JSON.parse(dataContent));
            if (dataContent.event === 'result') {
                console.log(dataContent.data);
                that.messageData=JSON.stringify(dataContent.data);
            } else {
                console.log(dataContent.event === 'events');
                console.log(dataContent.data);
                this.send(JSON.stringify({
                    event: 'response',
                    data: 'this is the response',
                }));
            }
        }

    }

    getWebSocket(){
        this.ws.send(
            JSON.stringify({
                event: 'events',
                data: 'test',
            }));
        return 'operation was sent';
    }

    getData(){
        return this.messageData;
    }
}  */
