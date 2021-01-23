"use strict";
exports.__esModule = true;
var WebSocket = require("ws");
var wseventdata_1 = require("./wseventdata");
var ws = new WebSocket('ws://localhost:18000');
var socketData = { 'event': 'null', 'data': 'null' };
ws.on('open', function () {
    console.log('CONNECTED');
});
ws.on('close', function () {
    console.log('DISCONNECTED');
});
ws.on('message', function (message) {
    console.log('received: %s', message);
    if (typeof message === 'string') {
        socketData = JSON.parse(message);
    }
    if (socketData.event === 'hello') {
        wseventdata_1.resWs.data = 'response: ' + Math.random();
        ws.send(JSON.stringify(wseventdata_1.resWs), function (err) {
            if (err) {
                console.log(err);
            }
        });
    }
    if (socketData.event === 'end') {
        setTimeout(function () {
            console.log('connection is to be closed');
            ws.close();
        }, 3000);
    }
});
