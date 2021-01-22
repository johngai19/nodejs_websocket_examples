"use strict";
exports.__esModule = true;
var WebSocket = require("ws");
var wseventdata_1 = require("./wseventdata");
var server = new WebSocket.Server({ port: 18000 });
var socketData = { 'event': 'null', 'data': 'null' };
server.on('connection', function (ws) {
    console.log('NEW CONNECT');
    ws.send(JSON.stringify(wseventdata_1.helloWs), function (err) {
        if (err) {
            console.log(err);
        }
    });
    ws.on('message', function (message) {
        console.log('received: %s', message);
        if (typeof message === 'string') {
            socketData = JSON.parse(message);
        }
        if (socketData.event === 'response') {
            ws.send(JSON.stringify({ 'event': 'end', 'data': socketData.data }), function (err) {
                if (err) {
                    console.log(err);
                }
            });
        }
    });
    ws.on('close', function () {
        console.log('DISCONNECTED');
    });
});
