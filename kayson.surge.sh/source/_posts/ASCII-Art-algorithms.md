---
layout: post
title: 图片转ASCII字符画算法
category : 程序算法
description: 将图片转换成ASCII字符画的算法分析
keyword: 图片转ASCII字符画算法,字符画,ASCII Art
tags : [算法]
date: 2014-07-10
---

字符画(ASCII Art)的历史可以追溯到几十年前了，起初是用在图形显示功能受限的设备上，用ASCII字符集里的可打印字符来拼成图片。如今，精细的显示设备早已能显示丰富多彩的图片，字符画更多的是被当做一门艺术来欣赏了。

![](http://www.zoneky.com/images/socer.jpg)

最近突然对字符画产生了极大的兴趣，前几天还专门在网上收集了300多个种类的字符画，囊括生活中各种常见的事物。具体可以点击[字符画大全](http://www.zoneky.com/ascii/)。在惊叹字符画的美轮美奂、栩栩如生的同时，作为程序员的我自然想知道，如何用程序来生成字符画。当然，作为艺术家的你完全可以手工描绘。

用了一个在线生成字符画的网页工具后，有了基本的思路。众所周知，位图是由一个个的像素组成的，每个像素的RGB值代表了它的颜色。为了简化，字符画大多表现为灰度图。将每个像素灰度化后，像素的值就在0~255之间，表现出来就是灰色的深浅。这时就可以用不同的ASCII字符来模拟灰度的大小。比如，可以用@字符代替颜色深的，X代表颜色浅的。一张图片通常包含数量可观的像素个数，每个像素用一个字符来代替显然不现实。所以，可以将图片划分成一个个的小方格，然后计算每个方格的平均灰度值，再用一个字符来代替。这样就基本上可以描绘出图片的形状了。后来在Stackoverflow上搜了一下，有个高票答案的思路跟我的不谋而合。

当然，以上只是大致的想法，具体实现的时候还可以做一些优化。

利用周末时间，用JavaScript写出了具体实现。最终效果如下：

<!--break-->

`原图：`

![](http://www.zoneky.com/images/hellogreen.png)

`转换成ASCII后：`

![](http://www.zoneky.com/images/ascii_sample.jpg)

虽然效果不是非常完美，但基本轮廓特征都有了。

####以下是具体实现步骤：

##### 添加页面元素

在页面里添加一个file标签，用来读取本地图片文件。一个img标签，用来显示图片。一个canvas，图像处理的中介。一个pre标签，用来显示最终的字符集合。

`HTML`

    <input type="file" id="input" onchange="imagesSelected(this.files)" />
    <p>
      <img id="display" style="float: left;" />
      <canvas id="canvas" style="display:none;"></canvas>
    </p>
    <div class="clear"><input type="button" id="btnASCII" value="字符画" /></div>
    <pre id="ascii"></pre>

`JavaScript`

    function imagesSelected(myFiles) {
        var imageReader = new FileReader();
        imageReader.onload = function(e) {
            var dataUrl = e.target.result;
            var display = document.getElementById('display');
            display.src = dataUrl;
        }
        imageReader.readAsDataURL(myFiles[0]);
    }

##### 图像灰度化

灰度值 = R * 0.3 + G * 0.59 + B * 0.11，也可以直接用平均值(R + G + B)/3.

```
    var canvas = document.getElementById('canvas');
    var display = document.getElementById('display');
    canvas.width = display.width;
    canvas.height = display.height;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(display, 0, 0, display.width, display.height);
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
      var R = data[i],
        G = data[i + 1],
        B = data[i + 2],
        A = data[i + 3];
      var gray = R * 0.3 + G * 0.59 + B * 0.11;
      gray = ~~gray;
      data[i] = gray;
      data[i + 1] = gray;
      data[i + 2] = gray;
      data[i + 3] = A;
    };
```

##### 构造`字符-灰度值`对应表

为了方便快速判断某个灰度值对应的字符，预先构造一个map，这样访问就非常快。

```
    function getCharsMap() {
      var chars = ['@', 'w', '#', '$', 'k', 'd', 't', 'j', 'i', '.', '&nbsp;'];
      var step = 25,
        map = {};
      for (var i = 0; i < 256; i++) {
        var index = ~~ (i / 25)
        map[i] = chars[index];
      };
      return map;
    }
```

##### 将图片分解成小块

分解得越细，最终的效果越接近原图，但相应地需要更多字符个数。可以根据需要来选择。

```
    function ascii(context, width, height, rowChars) {
      var pixels = [],
        map = getCharsMap(),
        output = "";
      var imageData = context.getImageData(0, 0, width, height),
        data = imageData.data,
        rowChars = width < rowChars ? width : rowChars,
        w = h = ~~ (width / rowChars),
        rows = ~~ (height / h),
        cols = ~~ (width / w);
      for (var r = 0; r < rows; r++) {
        for (var c = 0; c < cols; c++) {
          var x = c * w,
          y = r * h;
          // var blockImageData = context.getImageData(x, y, w, h);
          // var avg = getAvgPixel(blockImageData);
          var avg = getBlockInfo(imageData, x, y, w, h);
          var ch = map[avg.gray];
          output += ch;
        }
        output += '\r\n';
      };
      return output;
    }
```

##### 计算每个小块的平均灰度

```
    function getBlockInfo(imageData, x, y, w, h) {
      var sumGray = 0,
        sumR = 0,
        sumG = 0,
        sumB = 0;
      for (var r = 0; r < h; r++) {
        for (var c = 0; c < w; c++) {
          var cx = x + c,
            cy = y + r;
          var index = (cy * imageData.width + cx) * 4;
          var data = imageData.data,
            R = data[index],
            G = data[index + 1],
            B = data[index + 2],
            A = data[index + 3],
            gray = ~~ (R * 0.3 + G * 0.59 + B * 0.11);
          sumGray += gray;
          sumR += R;
          sumG += G;
          sumB += B;
        }
      }
      var pixelCount = w * h;
      return {
        gray: ~~(sumGray / pixelCount),
        color: [sumR / pixelCount, sumG / pixelCount, sumB / pixelCount]
      };
    }
```

##### 显示最终结果

注意，为了优化效果，最好将pre设置成等宽字体。

    pre {
      font-family: Courier New;
      font-size: 10px;
      line-height: 8px;
    }

    var text = ascii(ctx, canvas.width, canvas.height, 100);
    document.getElementById('ascii').innerHTML = text;


效果页面点击[这里](http://www.zoneky.com/studio/Photoshop.html)