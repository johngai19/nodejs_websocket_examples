"use strict";
exports.__esModule = true;
var socket_io_client_1 = require("socket.io-client");
var wseventdata_1 = require("./wseventdata");
var socket = socket_io_client_1.io("ws://localhost:18000/");
socket.on("connect", function () {
    console.log("connect " + socket.id);
});
socket.on("disconnect", function () {
    console.log("DISCONNECTED");
});
socket.on("hello", function (message) {
    console.log("received: " + message.data);
    wseventdata_1.resWs.data = 'response: ' + Math.random();
    socket.emit('response', wseventdata_1.resWs, function (res) {
        console.log("response acknowledgment " + res.status);
    });
});
socket.on('end', function (message) {
    console.log("received: " + JSON.stringify(message));
    setTimeout(function () {
        socket.close();
        process.exit(0);
    }, 3000);
});
