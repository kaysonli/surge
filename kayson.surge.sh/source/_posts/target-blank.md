---
title: target='_blank' 安全漏洞示例
category : 信息安全
description: target='_blank' 安全漏洞示例
keyword: 信息安全
date: 2016-08-30
tags : [security]
---

原文链接：[https://dev.to/ben/the-targetblank-vulnerability-by-example](https://dev.to/ben/the-targetblank-vulnerability-by-example)

**更新：** Instagram已经解决了这个问题， 很可能是因为这篇文章。Facebook和Twitter仍未解决。我用Instagram作为基本的例子，但主要结论是`target="_blank"`安全漏洞极为普遍。每个Web开发者应该警惕它，浏览器也应该考虑修改这个行为。

如果你在链接上使用 `target="_blank"`属性，并且不加上`rel="noopener"`属性，那么你就让用户暴露在一个非常简单的钓鱼攻击之下。为了告知来自于不受保护的站点的用户，我们运行一个利用了这个缺陷的脚本。

```
if  (window.opener)  {
  window.opener.location  =  "https://dev.to/phishing?referrer="+document.referrer;
}

```

我相信绝大多数站点都没有恰当地处理这个问题，但令我意外的是[Instagram.com](https://instagram.com/thepracticaldev) 也是其中一个。我们最近刚好创建了 [@ThePracticalDev Instagram账号](https://www.instagram.com/thepracticaldev)，然后就发现了这个问题。如果你在我们的资料页点击 `dev.to` 链接，然后回到原来的页面，你就会明白我的意思。Twitter也没有在Safari上防备这个安全漏洞，Chrome和Firefox也是。他们没有用 `rel="noopener"`，因此看起来他们用的安全脚本在Safari上并不起作用。

**更新：** 由于Instagram在这篇文章发表之后修复了这个问题，我把下面的例子改成了Facebook的页面。

### 弄清原委

1.  访问[The Practical Dev Facebook page](https://www.facebook.com/thepracticaldev/about/).
2.  在资料页点击`dev.to`链接。这会打开一个新的页卡或窗口。
3.  注意，原来的页面已经跳转到[这个页面](https://dev.to/phishing).

![@ThePracticalDev Instagram Account](http://upload-images.jianshu.io/upload_images/1618526-4a974bae3c4c3f39.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

当站点在链接中使用`target="_blank"`来打开新页卡或窗口时，该站点就通过window.opener API给了新页面对原有窗口的访问入口，并授予了一些权限。这其中的一些权限被跨域限制拦截了，但是window.location是漏网之鱼。

### 别急，还有更多

这不仅存在钓鱼攻击的问题，还涉及到隐私问题，因为新打开的站点对原有页卡的浏览地址有着持续的访问权。它可以轮询这个信息，并得到结果。幸亏这个行为看起来被跨域限制阻止了，因此即便我或许可以持续访问你不想让我知道的信息，完整的规范里应该包含健全的限制规则。

**更新：** 在我最开始写这个的时候，我提出了一种浏览器间谍场景，该场景中不良分子可以更彻底地侦测用户浏览历史。现在我觉得那并不准确，因此我修改了表述。

为了限制 `window.opener`的访问行为，原始页面需要在每个使用了`target="_blank"`的链接中加上一个`rel="noopener"`属性。然而，火狐不支持这个属性值，所以实际上你要用 `rel="noopener noreferrer"`来完整覆盖。尽管某些预防措施可以通过脚本实现，正如在Twitter上看到的，但这在Safari上并不起作用。

```
var  otherWindow  =  window.open();
otherWindow.opener  =  null;
otherWindow.location  =  url;

```

这段建议脚本来自于[关于该主题的一篇好文章](https://mathiasbynens.github.io/rel-noopener/).

这个问题并不知名，而且完全被低估了。它在Web Hypertext Application Technology Working Group邮件列表中被[提出](http://lists.w3.org/Archives/Public/public-whatwg-archive/2015Jan/0002.html) 在我看来，这个浏览器行为的风险远大于潜在的好处。不管怎样，Facebook和Instagram也没有理由忽视这个问题。

未来我还会谈论更多此类事情。 有兴趣可以关注我的Twitter([@bendhalpern](https://twitter.com/bendhalpern)) 或 [@ThePracticalDev](https://twitter.com/thepracticaldev)。