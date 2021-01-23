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
其中`server`文件夹包括了服务器文件，安装并通过`npm run start`即可编译启动。`server`文件夹下还包括了一个运行在`http`服务器上的`ws` 服务器 `server2.ts`,通过 `npm run start2` 启动，为简化示例，两个服务器均使用 `18000`端口(http服务器监听3000端口).

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
其中`server`和`client`文件夹分别包含了服务器和客户端文件，安装并通过`npm run start`即可编译启动。`server`文件夹下还包括了一个运行在`http`服务器上的`socket.io` 服务器 `server2.ts`,通过 `npm run start2` 启动，为简化示例，两个服务器均使用 `18000`端口.

`client`文件夹同时包含了`index.html`浏览器客户端，需要注意:
- 由于`socket.io`与标准`WebSocket`协议不兼容，因此浏览器需要依赖`socket.io.js`文件运行,也可能需要`socket.io.js.map`。这两个文件在`socket.io`官方库的`client-dist`中可以找到。
- 由于版本升级，使用`v2`版本的`socket.io`文件连接`v3`版本服务器可能会出现`400`错误。
- 此外，由于`socket.io v3` 开启了`CORS`，通过浏览器直接打开`index.html`无法正常运行客户端，本案例安装了`http-server`库作为网页服务器(默认打开`index.html`文件），并在服务器中配置`CORS`（见下文），通过`npm run startweb`运行`http-server`并访问`http://localhost:8081`以通过浏览器访问。

**说明：**
本仓库`socket.io v3`，`socket.io`从版本2到3的升级过程中有很大变动，因此本仓库示例并不适用于`socket.io v2`版本。参考[官方文档][8]跟本仓库示例有关的几点说明如下。

- 由于`socket.io v3`代码库使用`TypeScript`重写，因此在使用`TypeSctipt`时不需要再引入`@types/socket.io`或`@types/socket.io-client`库，如果继续引入可能会在编译时出错。
- 在版本3中，跨域请求`CORS`需要在新建服务器时明确声明，例如：
```typescript
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "https://localhost:8081",
    credentials: true,
    methods: ["GET", "POST"]
  }
});
```
- `socket.io`通讯可配置自动重连机制，该机制默认打开，在服务器连接断开后会自动尝试重连服务器，如果要测试该功能，可注释掉客户端`setTimeout`函数内容，关闭服务器后再打开，客户端即可重新连接。
- `socket.io`支持消息确认机制，本示例的`response`消息增加了消息确认机制，服务器在收到消息后会通过回调函数进行确认。
- `socket.io`消息的内容类型可兼容`string`或`JSON`等格式，用户需要在编程时自行决定数据类型并尽心解析。

### 3.3 nestjs ws example

本文件夹基于`ws`库使用流行的`nestjs`框架分别实现了服务器和客户端的`WebSocket`服务，由于`Nestjs`是一个服务器框架，因此，在客户端部分，又通过`nestjs`内置的静态文件和`mvc`框架服务设计了一个`html`网页以便进行功能测试。本文件夹案例和 `1. nodejs ws example`文件夹中的案例接口设计基本相同，可以互相连接，但本案例为了丰富功能测试，在功能上进行了以下修改和补充：
- 服务器在收到客户端的`response`消息后，并不会立即返回`end`消息，而是同样返回一个`response`消息，以避免客户端过早断开连接影响测试。
- 客户端新增了一个`response`消息响应，将收到的消息进行打印显示
- 客户端新增了一个`terminate`消息，需要手动触发以发送，服务器收到`terminate`消息后，发送`end`消息，客户端再断开连接

为了测试客户端的`http`相应功能，在客户端新增了两个`api`分别为，为了避免客户端和服务器http端口冲突，修改客户端端口为3001：
-`Get http://localhost:3001/ws-client/getdata` 用于发送并接受`response`消息，通过随机数来更新数据
-`Get http://localhost:3001/ws-client/sendTerminate` 用于发送`terminate`消息以断开连接，**该命令会停止客户端程序运行**

在客户端根目录下新建了`client.http`文件，该文件可以通过`vscode`的`REST Client`插件运行，用于进行api功能调试。

经过测试，`ws`库可以不需要`http`服务器启用`cors`功能。

**使用步骤：**
- 分别在`server`和`client`文件夹下运行`npm run start`即可启动服务器和客户端，可以看到websocket通讯。
- 在浏览器中打开`http://localhost:3001`可以在`console`中和网页中看到数据，通过刷新按钮可以刷新数据。
- 本示例和 `1. nodejs ws example`中的示例可以互通互联，但由于`api`不同，使用时应注意区别。



## 参考资料
1. [HTML在线标准][1]
2. [官方WebSocket协议][2]
3. [ws库][3]
4. [socket.io 库][4]
5. [websocket 库][5]
6. [isomorphic-ws 库][6]
7. [socket.io-client 库][7]
8. [socket.io 网站][8]

[1]: <https://html.spec.whatwg.org/multipage/web-sockets.html#handler-websocket-onmessage> "HTML Living Standard"

[2]: <https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket> "Official WebSocket Protocal in MDN"

[3]: <https://www.npmjs.com/package/ws> "ws library"

[4]: <https://www.npmjs.com/package/socket.io> "socket.io library"

[5]: <https://www.npmjs.com/package/websocket> "websocket library"

[6]: <https://github.com/heineiuo/isomorphic-ws> "isomorphic-ws library"

[7]: <https://github.com/socketio/socket.io-client> "socket.io-client library"

[8]: <https://socket.io/docs/v3/migrating-from-2-x-to-3-0/#The-Socket-IO-codebase-has-been-rewritten-to-TypeScript> "socket.io website"