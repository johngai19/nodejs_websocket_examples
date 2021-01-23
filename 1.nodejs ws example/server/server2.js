"use strict";
exports.__esModule = true;
var WebSocket = require("ws");
var http_1 = require("http");
var wseventdata_1 = require("./wseventdata");
var httpServer = http_1.createServer();
var server = new WebSocket.Server({ server: httpServer });
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
            wseventdata_1.endWs.data = socketData.data;
            ws.send(JSON.stringify(wseventdata_1.endWs), function (err) {
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
httpServer.listen(18000);
