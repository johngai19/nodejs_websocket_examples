import { io } from 'socket.io-client';
import IWsevent,{resWs} from './wseventdata';

const socket = io("ws://localhost:18000/");

socket.on("connect", () => {
    console.log(`connect ${socket.id}`);
});

socket.on("disconnect", () => {
    console.log(`DISCONNECTED`);
});

socket.on("hello", (message) => {
    console.log(`received: ${message.data}`);
    resWs.data='response: '+Math.random();
    socket.emit('response',resWs,(res)=>{
        console.log(`response acknowledgment ${res.status}`);
    });
});

socket.on('end',(message)=>{
    console.log(`received: ${JSON.stringify(message)}`);
    setTimeout(()=>{
        socket.close();
        process.exit(0);
    },3000);
})