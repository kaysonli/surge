---
title: 8 行 Node.js 代码实现代理服务器
category : Web 服务器
description: 8 行 Node.js 代码实现代理服务器
keyword: Node.js 代理
date: 2016-12-01
tags : [proxy, node.js]
---

接触 Node.js 已有多年，一直喜欢它的单线程模型和异步IO特性，以及 JavaScript 语言本身的灵活性。同时，JavaScript 前后端通吃，在全栈开发领域具有独特的优势。今天就来看看作为服务端语言的 JavaScript，完成一个简单的代理服务器功能是多么容易。

简单地说，代理服务器就是代理用户访问目标站点的中介服务器。作为前端开发人员，代理的常见用途是跨域访问后台 API。当然，还可以用来**科学上网**。今天要分享的代码，就是跟科学上网有关。

话不多说，先上 code:
```
var express = require('express');
var request = require('request');
var app = express();
app.use('/', function(req, res) {
    var url = 'https://www.baidu.com/' + req.url;
    req.pipe(request(url)).pipe(res);
});
app.listen(process.env.PORT || 3000); 
```

不到 10 行的代码，就实现了简单的代理服务器功能。是不是很神奇？
熟悉 Node.js 的话应该很容易看明白这几行代码。首先加载 `express` 模块，这个是创建 HTTP 服务器的一个流行框架。然后是 `request`，它封装了 HTTP 请求的各种方法，让发起请求变得非常容易。接下来实例化一个 `express` 对象，设置访问路由。最后监听 3000 端口。
先看效果。保存上述代码到文件 `proxy.js`，在文件所在路径执行：
```
node proxy.js
```
用浏览器打开[http://localhost:3000/](http://localhost:3000/)

![HTTP 代理](http://upload-images.jianshu.io/upload_images/1618526-2dd2c3b1dfdffc68.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

关键代码在路由处理方法内。
```
req.pipe(request(url)).pipe(res);
```
这个 `pipe` 方法很神奇，正如它的名字（管道）一样，它把浏览器的请求数据传给 `request` 客户端，然后将目标服务器的响应数据传回浏览器。这代码太TM简洁了！
那么，怎么实现科学上网呢？对，把代码放到没有网络封锁的服务器上运行，就OK了。比如，这个 [任度搜 www.rendoso.com](http://www.rendoso.com/) 背后就是 Google 代理。
欢迎拍(da)砖(shang)。