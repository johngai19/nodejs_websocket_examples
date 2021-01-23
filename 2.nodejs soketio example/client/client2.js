"use strict";
exports.__esModule = true;
var WebSocket = require("isomorphic-ws");
var ws = new WebSocket('ws://localhost:18000');
var socketData = { 'event': 'null', 'data': 'null' };
ws.onopen = function () {
    console.log('CONNECTED');
};
ws.onclose = function () {
    console.log('DISCONNECTED');
};
ws.onmessage = function (message) {
    console.log('received: %s', message);
    if (typeof message.data === 'string') {
        socketData = JSON.parse(message.data);
    }
    if (socketData.event === 'hello') {
        ws.send(JSON.stringify({ 'event': 'response', 'data': 'response: ' + Math.random() }), function (err) {
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
};
