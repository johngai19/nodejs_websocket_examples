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

## 3. Examples

### 3.1 nodejs ws example

This example contains WebSocket server and client example implemented with nodejs. The server folder contains a normal server ,install and run `npm run start` to start it. There is another `ws` server wrapped in a `httpServer` in the server folder named `server2.ts`, run `npm run start2` to start it, to make the example simple, the two servers run on the same port `18000`(the http server listens port 3000).

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
### 3.2 nodejs socketio example

This example contains `socket.io` server and client implemented with `nodejs`. Install and `npm run start` in server and client folder to start each.  There is another `socket.io` server wrapped in a `httpServer` in the server folder named `server2.ts`, run `npm run start2` to start it, to make the example simple, the two servers run on the same port `18000`

There is also a `index.html` file which implemented a brawser client:
- As socket.io is not compatible with native WebSocket, there is a `socket.io.js` file (a `socket.io.js.map` may also needed, both files can be found on `socket.io` library `client-dist` folder) which is replied by the html file. 
- Using the obsolete `socket.io.js v2` file to connect `v3` server may cause `400 error`.
- As `socket.io v3` uses `CORS`, simply open the `index.html` file in a brawser cannot visit the server. We installed `http-server` here (which uses index.html as default page), and config the `CORS` option in the server (see below), run `npm run startweb` and visit `http://localhost:8081` in a brawser to connect to the server.

**NOTICE：**

This repository uses `socket.io v3` and not compatible with `socket.io`. See [Socket.io Document][8] for the detailed differences between the two version. Some import feature are as follows:

- As `socket.io v3 ` is rewritten by `TypeScript`, there is no need to import `@types/socket.io` or `@types/socket.io-client`library to use `socket.io` in `TypeSctipt`, import the above libraries in your code may cause mistake.
- `CORS` needs to be explicitly announced as follows：
```typescript
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "https://example.com",
    methods: ["GET", "POST"]
  }
});
```
- `socket.io` support autoreconnection mechanism which is enabled by default, if you want to test the function, just comment the `setTimeout` function in client, stop and start the server again, the client will reconnect to the server automatically.
- `socket.io` support message acknowledgement mechanism, the `response` event in this example added it, the server will give an acknowledgement message through callback function when it receives a response message.
- The content of `socket.io` event are highly customised ,you need to decide and encode/decode the content and avoid possible mistakes.

### 3.3 nestjs ws example

This example contains both WebSocket server and client implementation with popular `Nestjs` framework using `ws` library. As Nestjs is a server framework itself, a `html` file is added with nestjs serve Static function and MVC service. the communication interfaces in this example is similar to  `1. nodejs ws example`, so the servers and clients can connect with each other. However, for test purpose, the functions a modifed in this example so as to keep the client keep connected with the server until there is an order to terminate：
- The server will not send an `end` message when it received a `response` message, instead, it sends a same `response` message to the client.
- A `response` message listener is added to the client, it will print the message it received.
- A `terminate` message will be send from the client trigged by a http request `sendTerminate`, the server will send the old `end` message when it received the `terminate` message.

The client httpServer works on port 3001, two apis were added to update data and terminate connection
-`Get http://localhost:3001/ws-client/getdata`  to send `response` and update the data it received.
-`Get http://localhost:3001/ws-client/sendTerminate` 用to send `terminate`message，**This will also terminate the client app, you need restart it again**

A `client.http` file is created in client folder to test http requests, which can be used by `vscode` plugin `REST Client`.

no `cors` configuration when use `ws` library.

**To Use:**
- In the `server` and `client` run `npm run start` to start them and see the result.
- In a brawser visit `http://localhost:3001`, to see and update data in console and in the page.
- To work with `1. nodejs ws example` servers and clients, you need to pay attention to the API difference.

## References
1.  [HTML Living Standard][1]
2. [Official WebSocket Protocal in MDN][2]
3. [ws library][3]
4. [socket.io library][4]
5. [websocket library][5]
6. [isomorphic-ws library][6]
7. [socket.io-client library][7]
8. [socket.io website][8

[1]: <https://html.spec.whatwg.org/multipage/web-sockets.html#handler-websocket-onmessage> "HTML Living Standard"

[2]: <https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket> "Official WebSocket Protocal in MDN"

[3]: <https://www.npmjs.com/package/ws> "ws library"

[4]: <https://www.npmjs.com/package/socket.io> "socket.io library"

[5]: <https://www.npmjs.com/package/websocket> "websocket library"

[6]: <https://github.com/heineiuo/isomorphic-ws> "isomorphic-ws library"

[7]: <https://github.com/socketio/socket.io-client> "socket.io-client library"

[8]: <https://socket.io/docs/v3/migrating-from-2-x-to-3-0/#The-Socket-IO-codebase-has-been-rewritten-to-TypeScript> "socket.io website"