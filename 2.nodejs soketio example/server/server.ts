import { Server, Socket } from 'socket.io';
import IWsevent,{helloWs,endWs} from './wseventdata';

const io = new Server(18000);

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