---
layout: post
title: Emmet插件语法速查
category : 开发工具
description: Emmet插件语法不完全手册
keyword: Emmet语法
tags : [Emmet]
date: 2014-08-14
---

Emmet是一个超级强大的文本编辑器插件，它可以根据语法规则自动生成HTML/CSS代码，极大提高coding速度。本文收集了常用的缩写语法，方便参考。更多细节参考[Emmet官网](http://docs.emmet.io/abbreviations/syntax/)

#### Child: >
`div>ul>li`

	<div>
		<ul>
			<li></li>
		</ul>
	</div>

#### Sibling: +
`div+p+bq`

	<div></div>
	<p></p>
	<blockquote></blockquote>

#### Climb-up: ^
`div+div>p>span+em`

	<div></div>
	<div>
		<p><span></span><em></em></p>
	</div>
`div+div>p>span+em^bq`

	<div></div>
	<div>
		<p><span></span><em></em></p>
		<blockquote></blockquote>
	</div>
`div+div>p>span+em^^^bq`

	<div></div>
	<div>
		<p><span></span><em></em></p>
	</div>
	<blockquote></blockquote>

<!--break-->

#### Multiplication: *
`ul>li*5`

	<ul>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
	</ul>
#### Grouping: ()
`div>(header>ul>li*2>a)+footer>p`

	<div>
		<header>
			<ul>
				<li><a href=""></a></li>
				<li><a href=""></a></li>
			</ul>
		</header>
		<footer>
			<p></p>
		</footer>
	</div>

`(div>dl>(dt+dd)*3)+footer>p`

	<div>
		<dl>
			<dt></dt>
			<dd></dd>
			<dt></dt>
			<dd></dd>
			<dt></dt>
			<dd></dd>
		</dl>
	</div>
	<footer>
		<p></p>
	</footer>
#### ID and CLASS
`div#header+div.page+div#footer.class1.class2.class3`
	
	<div id="header"></div>
	<div class="page"></div>
	<div id="footer" class="class1 class2 class3"></div>
`td[title="Hello world!" colspan=3]`

	<td title="Hello world!" colspan="3"></td>

#### Item numbering: $
`ul>li.item$*5`
	
	<ul>
		<li class="item1"></li>
		<li class="item2"></li>
		<li class="item3"></li>
		<li class="item4"></li>
		<li class="item5"></li>
	</ul>

`ul>li.item$$$*5`

	<ul>
		<li class="item001"></li>
		<li class="item002"></li>
		<li class="item003"></li>
		<li class="item004"></li>
		<li class="item005"></li>
	</ul>
`ul>li.item$@-*5`

	<ul>
		<li class="item5"></li>
		<li class="item4"></li>
		<li class="item3"></li>
		<li class="item2"></li>
		<li class="item1"></li>
	</ul>

`ul>li.item$@3*5`

	<ul>
		<li class="item3"></li>
		<li class="item4"></li>
		<li class="item5"></li>
		<li class="item6"></li>
		<li class="item7"></li>
	</ul>

`ul>li.item$@-3*5`

	<ul>
		<li class="item7"></li>
		<li class="item6"></li>
		<li class="item5"></li>
		<li class="item4"></li>
		<li class="item3"></li>
	</ul>

#### Text: {}
`a{Click me}`

	<a href="">Click me</a>

	<!-- a{click}+b{here} -->
	<a href="">click</a><b>here</b>

	<!-- a>{click}+b{here} -->
	<a href="">click<b>here</b></a>

`p>{Click }+a{here}+{ to continue}`

	<p>Click <a href="">here</a> to continue</p>

`p{Click }+a{here}+{ to continue}`

	<p>Click </p>
	<a href="">here</a> to continue