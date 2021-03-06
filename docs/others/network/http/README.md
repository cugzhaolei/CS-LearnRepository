# http/https

大家可能都听说过 HTTPS 协议之所以是安全的是因为 HTTPS 协议会对传输的数据进行加密，而加密过程是使用了非对称加密实现。但其实，HTTPS 在内容传输的加密上使用的是对称加密，非对称加密只作用在证书验证阶段。

HTTPS 的整体过程分为证书验证和数据传输阶段，具体的交互过程如下：

[![img](https://i.loli.net/2021/03/03/SeQAXwmxhLscn4O.png)](https://static.blog.leapmie.com/2019/11/1378987910.png)





[1.终于有人把 HTTPS 原理讲清楚了！](https://juejin.cn/post/6935348080015310884)

[2.浅谈常见的七种加密算法及实现](https://blog.csdn.net/baidu_22254181/article/details/82594072)