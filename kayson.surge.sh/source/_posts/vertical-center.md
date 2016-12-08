---
layout: post
title: vertical-align与内容垂直居中
category : CSS
description: 理解vertical-align的用法，以及实现内容垂直居中的方法。
keyword: vertical-align,垂直居中,CSS
date: 2014-08-11
tags : [CSS布局]
---


相信大家在前端页面开发过程中碰到过这个问题：怎样让内容垂直居中？我们可能会用到`CSS`中的`vertical-align`这个属性，但有时却达不到想要的效果。这是怎么回事呢？其实，`HTML`布局设计本身没有指定垂直方向的行为，而是根据内容区域的宽度缩放到合适的高度。另外，`vertical-align`没有达到预期的效果往往是因为没有正确理解它的用法。在我看来，`CSS`规范把这个属性弄得有点含义不清了，因为根据应用的地方不同，它有两种行为。

<!--break-->

### `table`单元格中的`vertical-align`

当用在`table`单元格中时，`vertical-align`的表现跟已废弃的`valign`属性类似，可以达到预期的效果。在标准的现代浏览器中，下面三种写法的效果是一样的：

	<td valign="middle"> <!-- 不推荐使用 --> </td>
	<td style="vertical-align:middle"> ... </td>
	<div style="display:table-cell; vertical-align:middle"> ... </div>

在浏览器中的效果如下：
{% raw %}
<div id="tablecellexamples">
	<table><tbody><tr>
		<td valign="middle">&lt;td&gt; 使用 valign="middle"</td>
		<td valign="bottom">&lt;td&gt; 使用 valign="bottom"</td>
	</tr></tbody></table>
	<table><tbody><tr>
		<td style="vertical-align:middle">&lt;td&gt; 使用 vertical-align:middle</td>
		<td style="vertical-align:bottom">&lt;td&gt; 使用 vertical-align:bottom</td>
	</tr></tbody></table>
	<div style="display:table-row">
		<div style="display:table-cell; vertical-align:middle">&lt;div&gt; 使用 display:table-cell; vertical-align:middle</div>
		<div style="display:table-cell; vertical-align:bottom">&lt;div&gt; 使用 display:table-cell; vertical-align:bottom</div>
	</div>
</div>
{% endraw %}
### 内联元素中的`vertical-align`

当`vertical-align`应用在内联元素中时，它完全是另外一种含义了。这种情况下，它的行为跟`img`标签的`align`（已废弃不用）属性类似。在标准的现代浏览器中，下面三种写法的效果是一样的：

	<img align="middle" ...>
	<img style="vertical-align:middle" ...>
	<span style="display:inline-block; vertical-align:middle"> foo<br>bar </span>

这段文字中，图片使用`align:middle` <img class="align-demo" src="{{ BASE_PATH }}/image/weixin2.png" alt="" align="middle" />

这段文字中，图片使用`align:bottom` <img class="align-demo" src="{{ BASE_PATH }}/image/weixin2.png" alt="" align="bottom" style="vertical-align: initial" />

这段文字中，图片使用`vertical-align:middle` <img class="align-demo" src="{{ BASE_PATH }}/image/weixin2.png" alt="" style="vertical-align: middle"/>

这段文字中，图片使用`vertical-align:bottom` <img class="align-demo" src="{{ BASE_PATH }}/image/weixin2.png" alt="" style="vertical-align: bottom" />

<p>In this paragraph, I have a cute little <code>&lt;span&gt;</code> <span style="display:inline-block; vertical-align:middle;border: 1px solid red;">display:inline-block<br>vertical-align:middle</span> and <span style="display:inline-block; vertical-align:text-bottom;border: 1px solid red;">display:inline-block<br>vertical-align:text-bottom</span> as an example.</p>

可以看出，这里的`vertical-align`把文字当做基准线来对齐。

那么，怎样实现内容的垂直居中？

#### 方法一

1. 将包含内容的块级元素设置为`position: absolute` 或者`position: relative`。
2. 为该块级元素设定一个固定高度。
3. 为该块级元素设置`position: absolute; top: 50%`，这样它就会移动到父容器的中间位置（从它的左上角来看）。
4. 为该块级元素设置`margin-top: -yy`, 这里的`-yy`是它高度的一半。这样就真正垂直居中了。


		<style type="text/css">
			#myoutercontainer { position:relative }
			#myinnercontainer { position:absolute; top:50%; height:10em; margin-top:-5em }
		</style>
		...
		<div id="myoutercontainer">
			<div id="myinnercontainer">
				<p>看吧! 垂直居中了!</p>
				<p>How sweet is this?!</p>
			</div>
		</div>

在浏览器中的效果如下：
<div id="myoutercontainer">
		<div id="myinnercontainer">
			<p>看吧! 垂直居中了!</p>
			<p>How sweet is this?!</p>
		</div>
</div>

#### 方法二

如果内容只有一行，那么可以设置它容器的`line-height`

	<style type="text/css">
		#myoutercontainer2 { line-height:4em }
	</style>
	...
	<p id="myoutercontainer2">
		伙计，我也垂直居中了！
	</p>

看效果：
<p id="myoutercontainer2">
		伙计，我也垂直居中了！
</p>