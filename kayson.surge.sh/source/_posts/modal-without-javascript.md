---
layout: post
title: 零JavaScript实现模态对话框
category : CSS
description: 利用HTML+CSS实现模态对话框，无需一行JavaScript
keyword: HTML模态对话框, CSS模态对话框
tags : [CSS]
date: 2014-08-08
---

在前端页面里显示模态对话框是常见的场景，通常用`JavaScript`来控制一个遮罩层`div`的显示、隐藏来模拟。那么，有没有可能摆脱`JavaScript`的依赖，只用`HTML`和`CSS`来实现呢？答案是YES。背后的原理很简单，对话框有显示和隐藏两种状态，而`checkbox`也有选中和未选中两种状态，因此可以用`checkbox`的状态来控制对话框的显示和隐藏。同时，还要利用CSS的`:checked`伪类选择器，设置相应的样式。

`HTML`

	<input type="checkbox" id="toggle" />
	<label for="toggle" class="button">Open</label>
	<label class="overlay" for="toggle"></label>
	<div class="modal">
		<label for="toggle" class="button">Close</label>
	</div>

<!--break-->

`CSS`

	.overlay {
		position: absolute;
		left: 0; top: 0; bottom: 0; right: 0;
		background-color: #ccc;
		opacity: .5;
		display: none;
	}

	.button {
		cursor: pointer;
		border: 1px solid #ccc;
	}

	.modal {
		width: 200px; height: 200px;
		position: absolute;
		left: 50%; top: 50%;
		margin-left: -100px;
		margin-top: -100px;
		background-color: #ddd;
		display: none;
	}

	#toggle {
		position: absolute;
		left: -10000px;
		margin: 0; padding: 0;
		border-width: 0;
	}

	#toggle:checked ~ .overlay,
	#toggle:checked ~ .modal {
		display: block;
	}

效果如下：

<iframe src="http://zoneky.com/studio/overlay.html" width="100%" height="480"></iframe>

当然，用JavaScript实现也很简单，不需要多少代码。这里只是提供另一种思路，CSS选择器也可以用来做简单的状态控制。另外需要注意，伪类选择器`:checked`在IE9以下的版本都不支持。

这里还要提下CSS样式的写法。`.overlay` 的样式可以让它填满容器，`.modal`的样式可以让它在垂直方向和水平方向同时居中（也就是处于屏幕正中央）。