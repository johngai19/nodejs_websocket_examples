# Nodejs WebSocket 示例

[English](./README.md) | [中文](./README_ZH.md)


大部分基于`JavaScript`的`WebSocket`协议示例都是基于`nodejs`作为服务端，浏览器作为客户端，很少有`nodejs`的客户端实现。同时，由于大部分`nodejs`客户端的`WebSocket`协议和浏览器原生的`WebSocket`并不完全兼容，因此他们无法很好地在一起工作。

本仓库包含了一系列`WebSocket`协议在`nodejs`下的不同实现，包括纯的`TypeScript`语言实现以及`Express`或`Nestjs`框架的实现。

每个例子在单独的示例文件夹下，其子文件夹用以区分不同的客户端和服务器。

## 1. Websocket 基础

WebSocket是用于[*"在网络应用中保持和服务器端进程双边通讯的"*][1],这一功能和传统的`http`协议仅能由客户端发起请求服务器进行响应有所区别。 在实现上，websocket协议分为 [官方实现][2] 和非官方实现

`npmjs`上3个最流行的`websocket`库分别是 [ws][3]、[socket.io][4]、and [websocket][5](其他常见的`websocket`库还有`WebSocket-Node`、`µWebSockets`等). 我们在这里使用了前两个，因为他们各自有其优点和不足。 

 `ws`库是最流行的`websoket`库，它完全支持官方协议。在浏览器中可以不用引入额外的包，直接用浏览器原生`Websocket`实现功能，然而，如果你要在`nodejs`上使用`ws`作为客户端，你还需要一个类似像我们这里用的 [isomorphic-ws][6] 的包装器。

`socket.io`虽然和官方库实现不兼容，但有有其自身的特点，在负载均衡、穿过防火墙以及自动重连方面都有其优势。使用该库时需要在服务器和客户端同时引入，**注意**,在客户端要引入[socket.io-client y][7]库而不是 `socket.io`.

## 2. 示例的基础功能

示例用以说明websocket的不同实现，因此不会实现更复杂的功能共，每个示例在库文件功能允许的情况下包含以下功能,示例中部分代码来自各库的官方示例：

- 一个纯nodejs的服务器或者基于网络框架的服务器
- 一个浏览器实现的客户端和一个nodejs（包含或者不包含框架）实心的客户端
- 运行服务器和客户端(网页浏览器只需要在网页中打开client.html文件)，客户端将自动连接服务器
- 客户端连接后，服务器向客户端发送一个 `hello` 消息，包含 `hello client` 数据
- 客户端收到 `message`消息后发送一个 `response` 消息，包含 `response + 随机数` 到服务器
- 服务器收到 `response` 消息后，发送 `end`消息并包含其收到的消息内容。
- 客户端收到`end`消息后z延时3秒断开连接
- 服务器和客户端均需要在终端打印其收到的所有消息
- 服务器和客户端均需要打印连接状态变化信息
- 服务器和客户端均需要打印错误信息

## 3. 示例文件说明

### 3.1 nodejs ws example

本文件夹包括使用纯`nodejs`实现的`WebSocket`服务器和客户端示例。
其中`server`文件夹包括了服务器文件，安装并通过`npm run start`即可编译启动。

`client`文件夹包括了：
- 一个纯浏览器的客户端实现`client.html`，使用浏览器打开即可
- 一个使用`ws`实现的客户端`client.ts`，运行`npm run start`运行
- 一个兼容浏览器标准协议的客户端`client2.ts`，运行`npm run start2`运行

**说明：**

原生`ws`和兼容浏览器标准的`WebSocket`协议之间的主要区别.在原生`ws`中函数格式为

```javascript
ws.on('message', (message)=>{
    console.log('received: %s', message);
});
```
在兼容浏览器标准的`WebSocket`协议中书写格式为：
```javascript
ws.onmessage=(message)=>{
    console.log('received: %s', message);
}
```
除此之外，两个协议中`message`的类型和内容也不同，原生协议的`message`类型为`WebSocket.data`，而浏览器标准的协议中`message`类型为`WebSocket.MessageEvent`，后者的结构类似如下，而前者仅包含其中`data`的内容：
 ```javascript
  MessageEvent {
   target: [WebSocket],
   type: 'message',
   data: '{"event":"end","data":"response: 0.3416359669492526"}'
  }
```

### 3.2 nodejs socketio example

本文件夹包括使用纯`nodejs`实现的`socket.io`服务器和客户端示例。
其中`server`文件夹包括了服务器文件，安装并通过`npm run start`即可编译启动。

**说明：**
本仓库`socket.io v3`，`socket.io`从版本2到3的升级过程中有很大变动，因此本仓库示例并不适用于`socket.io v2`版本。参考[官方文档][8]跟本仓库示例有关的几点说明如下。

- 由于`socket.io v3`代码库使用`TypeScript`重写，因此在使用`TypeSctipt`时不需要再引入`@types/socket.io`或`@types/socket.io-client`库，如果继续引入可能会在编译时出错。
- 在版本3中，跨域请求`CORS`需要在新建服务器时明确声明，例如：
```typescript
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "https://example.com",
    methods: ["GET", "POST"]
  }
});
```


## 参考资料
1. [HTML在线标准][1]
2. [官方WebSocket协议][2]
3. [ws库][3]
4. [socket.io 库][4]
5. [websocket 库][5]
6. [isomorphic-ws 库][6]
7. [socket.io-client 库][7]
8. [socket.io website][8]

[1]: <https://html.spec.whatwg.org/multipage/web-sockets.html#handler-websocket-onmessage> "HTML Living Standard"

[2]: <https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket> "Official WebSocket Protocal in MDN"

[3]: <https://www.npmjs.com/package/ws> "ws library"

[4]: <https://www.npmjs.com/package/socket.io> "socket.io library"

[5]: <https://www.npmjs.com/package/websocket> "websocket library"

[6]: <https://github.com/heineiuo/isomorphic-ws> "isomorphic-ws library"

[7]: <https://github.com/socketio/socket.io-client> "socket.io-client library"

[8]: <https://socket.io/docs/v3/migrating-from-2-x-to-3-0/#The-Socket-IO-codebase-has-been-rewritten-to-TypeScript> "socket.io website"