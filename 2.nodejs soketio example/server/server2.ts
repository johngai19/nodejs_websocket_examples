import {createServer} from 'http';
import { Server, Socket } from 'socket.io';
import IWsevent,{helloWs,endWs} from './wseventdata';

const httpServer=createServer();
const io = new Server(httpServer,{
        cors: {
          origin: "http://localhost:8081",
          credentials: true,
          methods: ["GET", "POST"]
        }
});

io.on("connection", (socket: Socket) => {
    console.log(`connect ${socket.id}`);

    socket.emit('hello', helloWs);

    socket.on('response', (message,cb) => {
        console.log(`received:${JSON.stringify(message)}`);
        endWs.data=message.data.slice(9);
        socket.emit('end',endWs);
        cb({status:'OK'});
        
    })
    socket.on("disconnect", () => {
        console.log(`disconnect ${socket.id}`);
    });

});

httpServer.listen(18000);