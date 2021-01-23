# Nodejs_WebSocket_Examples

[English](./README.md) | [中文](./README_ZH.md)

Most WebSocket Examples in JavaScript are of nodejs in server side and web brawser in client side, and not that easy to move these client to a nodejs implementation. Besides, as most nodejs WebSocket client are not compatible with native brawser WebSocket client, few examples can work well both in nodejs and web brawser.

This repository contains a list of examples to illustrate the implementation of WebSocket protocal in nodejs, both pure TypeScript or with frameworks like Express or Nestjs.

Each example folder contains independent example, with subfolders to distinguish server and client.  

## 1. Websocket Basics

WebSocket is [*"To enable web applications to maintain bidirectional communications with server-side processes"*][1], there are [official implementation][2] and unofficial ones.

The top three popular websocket libraries on npmjs are [ws][3]、[socket.io][4]、and [websocket][5]( There are also other implementations like `WebSocket-Node`or `µWebSockets`). We use both ws and socket.io in this repository because they each has there advantages and disadvantages. 

The `ws` library is the most popular one and it is fully compatible with the `Official WebSocket` protocal, however, if you want to use `ws` as client in nodejs, a wrapper like [isomorphic-ws][6] is necessary, which is also used in the examples.

The `socket.io` library has its own features like load balance and auto-reconnection functions although it is not compatible with the `Official WebSocket` protocal and you need to install it both in server side and client side. In client side, you need [socket.io-client library][7] instead of `socket.io`.

## 2. Basic Example Functions

The examples are used to illustrate implementations of websocket, thus no complex functions will not be apllied here. The basic functions of each example contains following functions (unless the library has no relative function),and some of the example code are from original library examples:

- A websocket server in pure nodejs or with a http framework
- Two websocket client in brawser and in nodejs (with or without framework)
- Start both server and client side(open the html file in a web brawser for the brawser client), the client will try to connect to the server
- When the client connect to the Server, the server send an `message` event with `hello client` to the client
- When the client receives the `message` event, it send an `response` event with `response + randmon number` to the server
- When the Server receives the `response` event, it send an `end` event with the content it received.
- When the Client receives the `end` event, it closes the connection after 3s delay.
- Both server and client print every event content it received in the console.
- Both server and client print the connect and disconnect status change in the console.
- Both server and client print error messages in the console.

## 3. Example Notes

### 3.1 nodejs ws example

This example contains WebSocket server and client example implemented with nodejs. The server folder contains a normal server ,install and run `npm run start` to start it.

`client` folder contains:
- A pure brawser client `client.html`, open with a brawser to start
- A `ws` client with native ws library, run `npm run start`
- A `ws` client compatible with native WebSocket protocol, run `npm run start2`

**Note:**

The function format are different from `ws` and native WebSocket, in `ws` library:

```javascript
ws.on('message', (message)=>{
    console.log('received: %s', message);
});
```
In native WebSocket compatible format:

```javascript
ws.onmessage=(message)=>{
    console.log('received: %s', message);
}
```

Besides, the `message` in the two protocols are also different, in the `ws` library it is `WebSocket.data` while in the native WebSocket protocol is `WebSocket.MessageEvent`, the latter structure is similar as below as the former contains only the `data` part.

 ```javascript
  MessageEvent {
   target: [WebSocket],
   type: 'message',
   data: '{"event":"end","data":"response: 0.3416359669492526"}'
  }
```

## References
- [HTML Living Standard][1]
- [Official WebSocket Protocal in MDN][2]
- [socket.io library][4]
- [websocket library][5]
- [isomorphic-ws library][6]
- [socket.io-client library][7]

[1]: <https://html.spec.whatwg.org/multipage/web-sockets.html#handler-websocket-onmessage> "HTML Living Standard"

[2]: <https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket> "Official WebSocket Protocal in MDN"

[3]: <https://www.npmjs.com/package/ws> "ws library"

[4]: <https://www.npmjs.com/package/socket.io> "socket.io library"

[5]: <https://www.npmjs.com/package/websocket> "websocket library"

[6]: <https://github.com/heineiuo/isomorphic-ws> "isomorphic-ws library"

[7]: <https://github.com/socketio/socket.io-client> "socket.io-client library"
