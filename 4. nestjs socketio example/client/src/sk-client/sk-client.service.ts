import { Injectable } from '@nestjs/common';
import { io } from 'socket.io-client';
import IWsevent, { helloWs, resWs, endWs } from './wseventdata';


const socket = io("ws://localhost:18000/");

socket.on("connect", () => {
    console.log(`connect ${socket.id}`);
});

socket.on("disconnect", () => {
    console.log(`DISCONNECTED`);
});

socket.on("hello", (message) => {
    console.log(`received: ${message.data}`);
    resWs.data = 'response: ' + Math.random();
    socket.emit('response', resWs, (res) => {
        console.log(`response acknowledgment ${res}`);
    });
});

socket.on("response", (message) => {
    console.log(`received: ${message.data}`);
    SkClientService.setData(message.data);
});

socket.on('end', (message) => {
    console.log(`received: ${JSON.stringify(message)}`);
    //comment the setTimeout function if you want to test the auto reconnection function
    setTimeout(() => {
        socket.close();
        process.exit(0);
    }, 3000);
})

@Injectable()
export class SkClientService {

    constructor() {
    }

    static messageData: string = 'initial data';

    getAll(): string {
        return 'The ws-client module works!'
    }


    sendTerminate() {
        socket.emit('terminate', resWs, (res) => {
            console.log(`response acknowledgment ${res}`);
        });
        return 'terminate operation was sent';
    }

    getData() {
        resWs.data = 'response: ' + Math.random();
        socket.emit('response', resWs, (res) => {
            console.log(`response acknowledgment ${res}`);
        });
        return SkClientService.messageData;
    }

    static setData(newData: string) {
        this.messageData = newData;
    }

}
