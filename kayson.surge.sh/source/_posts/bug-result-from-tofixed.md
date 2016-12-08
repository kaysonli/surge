---
layout: post
title: toFixed函数引发的bug
category : JavaScript
description: JavaScript中的toFixed()函数行为不可预测，容易引发bug。
keyword: toFixed, JavaScript四舍五入
date: 2014-08-01
tags : [JavaScript]
---


最近在工作过程中碰到一个隐藏的bug，经调试发现竟然是toFixed函数不可靠的结果引起的。

大家都知道，Number类型的变量有个toFixed方法，该方法将Number四舍五入为指定小数位数的数字，以字符串返回。

工作项目的代码需要计算图形的坐标轴刻度，具体来说就是根据坐标轴的值域划分等距离的间隔。代码写好后在Chrome下跑的没问题，但在IE下竟然时不时地弹出终止脚本的提示框。刚开始还以为是代码的效率问题，估计在IE下性能不好。但随后初步分析了下，这么简单的运算逻辑不至于导致严重的性能问题。后来经过艰难的调试（IE下的调试工具真心难用，特别是在JS文件很多的情况下），发现一个for循环的判断条件竟然是 `i < Infinity`，死循环了！Infinity哪来的？原来是某个数字除0造成的！为什么Chrome下没问题呢？因为那个除数不为0。问题就在这里，那个除数就是通过toFixed函数返回的，就是说同一个表达式Chrome和IE的结果不同！具体就是：

<!--break-->

`IE:`

	0.6 .toFixed(0); // 0
	1.6 .toFixed(0); // 2

`Chrome:`

	0.6 .toFixed(0); // 1
	1.6 .toFixed(0); // 2

另外还发现，就算是同在Chrome里，四舍五入也不靠谱：

	( 0.035 ).toFixed( 2 ); // 0.04
	( 0.045 ).toFixed( 2 ); // 0.04

这次IE倒是靠谱了：

	( 0.035 ).toFixed( 2 ); // 0.04
	( 0.045 ).toFixed( 2 ); // 0.05

`结论`：toFixed()函数靠不住，如果有需要精确控制的情况，还是自己写个方法比较好。比如：

	function toFixed(number, decimal) {
	  decimal = decimal || 0;
	  var s = String(number);
	  var decimalIndex = s.indexOf('.');
	  if (decimalIndex < 0) {
	    var fraction = '';
	    for (var i = 0; i < decimal; i++) {
	      fraction += '0';
	    }
	    return s + '.' + fraction;
	  }
	  var numDigits = s.length - 1 - decimalIndex;
	  if (numDigits <= decimal) {
	    var fraction = '';
	    for (var i = 0; i < decimal - numDigits; i++) {
	      fraction += '0';
	    }
	    return s + fraction;
	  }
	  var digits = s.split('');
	  var pos = decimalIndex + decimal;
	  var roundDigit = digits[pos + 1];
	  if (roundDigit > 4) {
	  	//跳过小数点
	    if (pos == decimalIndex) {
	      --pos;
	    }
	    digits[pos] = Number(digits[pos] || 0) + 1;
	    //循环进位
	    while (digits[pos] == 10) {
	      digits[pos] = 0;
	      --pos;
	      if (pos == decimalIndex) {
	        --pos;
	      }
	      digits[pos] = Number(digits[pos] || 0) + 1;
	    }
	  }
	  //避免包含末尾的.符号
	  if (decimal == 0) {
	    decimal--;
	  }
	  return digits.slice(0, decimalIndex + decimal + 1).join('');
	}

代码写的有点长。