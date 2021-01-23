"use strict";
exports.__esModule = true;
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var wseventdata_1 = require("./wseventdata");
var httpServer = http_1.createServer();
var io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "http://localhost:8081",
        credentials: true,
        methods: ["GET", "POST"]
    }
});
io.on("connection", function (socket) {
    console.log("connect " + socket.id);
    socket.emit('hello', wseventdata_1.helloWs);
    socket.on('response', function (message, cb) {
        console.log("received:" + JSON.stringify(message));
        wseventdata_1.endWs.data = message.data.slice(9);
        socket.emit('end', wseventdata_1.endWs);
        cb({ status: 'OK' });
    });
    socket.on("disconnect", function () {
        console.log("disconnect " + socket.id);
    });
});
httpServer.listen(18000);
