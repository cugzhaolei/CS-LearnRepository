### 08 从五种架构风格推导出http 

##### 数据流风格 Data-flow styles

* 优点：简单性，可进化性，可扩展性，可配置性，可重用性
* ![image-20210428211739449](https://i.loli.net/2021/04/28/pRT3bmgf6q1NiY5.png)
* ![image-20210428211853480](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210428211853480.png)

##### 复制风格 Replication Styles

* 优点：用户可察觉的性能，可伸缩性，网络效率，可靠性
* ![image-20210428211906069](https://i.loli.net/2021/04/28/LefDgulhA9TqR2C.png)
* ![image-20210428212019456](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210428212019456.png)

##### 分层风格 Hierarchical Styles

* 优点：简单性，可进化性，可伸缩性
* ![image-20210428212051958](https://i.loli.net/2021/04/28/9bUNg4mrKAzpWZ3.png)
* ![](https://i.loli.net/2021/04/28/tB2lgi5YG8WMh6v.png)
* ![image-20210428212532380](https://i.loli.net/2021/04/28/LWphAMsuBXHrNP2.png)
* ![image-20210428212832445](https://i.loli.net/2021/04/28/UkwZRYH9eyt42SF.png)

##### 移动代码风格 Mobile Code Styles

* 可移植性，可扩展性，网络效率
* ![image-20210428212842582](https://i.loli.net/2021/04/28/ouHIEsk1UBTrfD2.png)
* ![image-20210428213137911](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210428213137911.png)

##### 点对点风格 Peer-to-Peer Styles

* 可进化性，可重用性，可扩展性，可配置性
* ![image-20210428213427197](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210428213427197.png)
* ![image-20210428213519381](https://i.loli.net/2021/04/28/7FjBTPGZ4RUC1vs.png)



#### 风格演化



![image-20210428213534577](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210428213534577.png)



#### 09 利用Chrome的network调试



#### 10 URI URL URN



![image-20210428223443356](https://i.loli.net/2021/04/28/rMhOQkXzDjB7CsU.png)

![image-20210428230710880](https://i.loli.net/2021/04/28/eDnZMju2dwQVNbp.png)

![image-20210428223751321](https://i.loli.net/2021/04/28/y9WOfi46HzhmlwI.png)

![image-20210428231031827](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210428231031827.png)

![image-20210428231101553](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210428231101553.png)

![image-20210428231604892](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210428231604892.png)



#### 11 为什么要对URL编码

![image-20210501141434248](https://i.loli.net/2021/05/01/ilBnNwcKzGFsjTZ.png)

* 传递数据中，存在分隔符

* 对可能产生歧义性的数据编码

  * 不在ASCII码范围的字符
  * ASCII码中不可显示的字符
  * URI中规定的保留字符
  * 不安全字符 空格 引导 尖括号

  ![image-20210501141807244](https://i.loli.net/2021/05/01/kEORZhCBQzFcWL7.png)

![image-20210501141942438](https://i.loli.net/2021/05/01/4n83WkHvsOLQxc6.png)



#### 12 详解HTTP的请求行

![image-20210501142202393](https://i.loli.net/2021/05/01/d6rP3V7Bt9lcRpE.png)

![image-20210501142256931](https://i.loli.net/2021/05/01/joEB3lp6am2cdIu.png)

![image-20210501142348301](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210501142348301.png)

![image-20210501142453659](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210501142453659.png)

![image-20210501144833521](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210501144833521.png)

#### 13 HTTP的正确响应码

![image-20210501145416923](https://i.loli.net/2021/05/01/RLWrAjJzNYt5gB7.png)

![image-20210501145455298](https://i.loli.net/2021/05/01/BTO5pMPAkWmG9jg.png)

![image-20210501145738745](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210501145738745.png)

![image-20210501145952934](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210501145952934.png)

![image-20210501150242192](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210501150242192.png)

![image-20210501150354481](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210501150354481.png)

#### 14 HTTP错误响应码

![image-20210501153334292](https://i.loli.net/2021/05/01/c5KrAgSGV6CPDap.png)

![image-20210501153642262](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210501153642262.png)

```bash

xxxx@xxxxxx:~$ curl www.sina.com.cn -X TRACE -I

HTTP/1.1 405 Method Not Allowed
Server: Tengine
Date: Sat, 01 May 2021 07:38:19 GMT
Content-Type: text/html
Content-Length: 261
Connection: close
Via: cache11.cn705[,0]
Timing-Allow-Origin: *
EagleId: 0000000016198546994162984e
```

![image-20210501154033048](https://i.loli.net/2021/05/01/sBunJNP4MjX7g8q.png)

![image-20210501154251492](https://i.loli.net/2021/05/01/gOQtnNPfirYvxoa.png)

![image-20210501154455744](https://i.loli.net/2021/05/01/1ERAN6flrOHhItX.png)

![image-20210501154628673](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210501154628673.png)



#### 15 如何管理跨代理服务器的长连接

![image-20210501165023135](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210501165023135.png)

![image-20210501165038889](https://i.loli.net/2021/05/01/izBcLVWtEk4RAP7.png)

![image-20210501165139448](https://i.loli.net/2021/05/01/neb59SaBIWgd4VD.png)

![image-20210501165348472](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210501165348472.png)

![image-20210501170006371](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210501170006371.png)

#### 16 HTTP消息的接受与处理

![image-20210501174012428](https://i.loli.net/2021/05/01/O4oIJCgB3MUpK9T.png)

![image-20210501174233952](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210501174233952.png)

#### 17 HTTP代理服务器转发消息时的HTTP头部

![image-20210501174646381](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210501174646381.png)

![image-20210501174632639](https://i.loli.net/2021/05/01/qxW8J4hMfjOAo9D.png)

![image-20210501175028554](https://i.loli.net/2021/05/01/h4LcNOx3ASEIWBg.png)



#### 18请求与响应的上下文

![image-20210502223221820](https://i.loli.net/2021/05/02/klr7B3iFeax9O6N.png)

![image-20210502224758434](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210502224758434.png)

![image-20210502225112639](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210502225112639.png)

![image-20210502225146102](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210502225146102.png)

![image-20210502225208484](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210502225208484.png)

#### 20 内容协商与资源表述



![image-20210503000021759](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210503000021759.png)

![image-20210503000041065](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210503000041065.png)

![image-20210503000212800](https://i.loli.net/2021/05/03/haEMTgdy4c9Ipzn.png)

![image-20210503000304824](https://i.loli.net/2021/05/03/sKwgpv4YhTxA6nP.png)

![image-20210503000646378](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210503000646378.png)

![image-20210503001404480](https://i.loli.net/2021/05/03/aUxuBqMWgOZX5wn.png)

![image-20210503001502100](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210503001502100.png)

![image-20210503001552372](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210503001552372.png)

#### 21 http body 传送方式

![image-20210513115626821](https://i.loli.net/2021/05/13/Tfa8zZ6VUKRlxj3.png)

![image-20210513115813699](https://i.loli.net/2021/05/13/eSvAH4b8Qmu5q2O.png)

![image-20210513120547548](https://i.loli.net/2021/05/13/y8jMosQhRF4Ox1I.png)

![image-20210513120846855](https://i.loli.net/2021/05/13/qlO98kbVsSxLPrg.png)

![image-20210513120949034](https://i.loli.net/2021/05/13/ZSQz4u5aPCBUHeo.png)

#### 22 HTML form提交时的格式

![image-20210513201949280](https://i.loli.net/2021/05/13/8iNTRCfaGWY3sVF.png)

![image-20210513202053617](https://i.loli.net/2021/05/13/otJ5GbYCXcQveLV.png)

![image-20210513203158375](https://i.loli.net/2021/05/13/5tjDYqoeZhKHFSN.png)

![image-20210513203223235](https://i.loli.net/2021/05/13/jk35MlPYOrRie1F.png)

#### 23 断点续传与多线程下载，随机点播

文件比较大的时候上传与下载，http range请求

![image-20210513204844552](https://i.loli.net/2021/05/13/ZX38SQNoWYLFtGO.png)

![image-20210513204934131](https://i.loli.net/2021/05/13/Qe4bJo5uIjBigxR.png)

![image-20210513205030568](https://i.loli.net/2021/05/13/Jl3HgFEAwSXzQYG.png)

断点续传的需求

![image-20210513205658655](https://i.loli.net/2021/05/13/9MJc8YbftpUIlEv.png)

```bash
curl protocol.taohui.tech/app/letter.txt -H 'Range:bytes=6-10' -I 'If-Match:"5cc3f0b5lb"'
```

如果不匹配返回 **412 precondition failed**

/* 不知道长度的情况下选择这个

![image-20210513210327169](https://i.loli.net/2021/05/13/tPMG6pE4KSWnwvb.png)

请求的范围是否符合规范

![image-20210513211228043](https://i.loli.net/2021/05/13/p7XWbvZdJABs2mQ.png)

![image-20210513211352588](https://i.loli.net/2021/05/13/H7W4eacVYKXofsL.png)

断点续传 content-range 

#### 25 cookie的格式与约束

![image-20210513213027761](https://i.loli.net/2021/05/13/frCT2kjLSgYsb9q.png)

![image-20210513213152437](https://i.loli.net/2021/05/13/sDnuM1HNhEt8gw5.png)

![image-20210513213621105](https://i.loli.net/2021/05/13/5niAqYzPGDWJ1tj.png)

![image-20210513213929517](https://i.loli.net/2021/05/13/SZJNjkRyVEfCqht.png)

![image-20210513214131803](https://i.loli.net/2021/05/13/23xueO4gopV1sPW.png)

#### 26 cookie与session的结合

![image-20210513215324515](https://i.loli.net/2021/05/13/DbGUpvh6dA5EBsC.png)

![image-20210513215511119](https://i.loli.net/2021/05/13/KjOqmb4vWtx6uB5.png)

![image-20210513215726255](https://i.loli.net/2021/05/13/JNVnzILCmqyjfkd.png)

#### 27 浏览器的同源策略

![image-20210513221930713](https://i.loli.net/2021/05/13/TKEid6BGQzRtOhM.png)

![image-20210513221252898](https://i.loli.net/2021/05/13/5DWAX3CUvShRQIl.png)

![image-20210513222225211](https://i.loli.net/2021/05/13/CSVWMJcg1pPTrIs.png)

![image-20210513222549468](https://i.loli.net/2021/05/13/vkTJHmufQ9WgF78.png)

![image-20210513225729743](https://i.loli.net/2021/05/13/UeFlQyKvi1AsnWw.png)

![image-20210513230026962](https://i.loli.net/2021/05/13/PrSme7VLzR1UKDg.png)

#### 28 条件请求的作用

每个URI对应一个资源

![image-20210515095744110](https://i.loli.net/2021/05/15/SOiP291yzBFpGQZ.png)

![image-20210515095943261](https://i.loli.net/2021/05/15/QD91IUw7EspRSBZ.png)

![image-20210515100046246](https://i.loli.net/2021/05/15/lJfh9Ea4tAYu8ex.png)

![image-20210515100158829](https://i.loli.net/2021/05/15/gTSpAXdKR45msv1.png)

![image-20210515100230344](https://i.loli.net/2021/05/15/PKkymVJ8QnhcwWl.png)

![image-20210515100427286](https://i.loli.net/2021/05/15/X5yOIQLS4wV1CnE.png)

![image-20210515100502782](https://i.loli.net/2021/05/15/tuRGrN2C9yIEajJ.png)

![image-20210515100529613](https://i.loli.net/2021/05/15/kKdgDsIYhpr8MUm.png)

![image-20210515101453018](https://i.loli.net/2021/05/15/1JAOFVrd3XNvyWe.png)

![image-20210515101636930](https://i.loli.net/2021/05/15/o3JFfqIKsBHZELR.png)

![image-20210515101656708](https://i.loli.net/2021/05/15/3cvxTHUND4Y87jF.png)

![image-20210515101920780](https://i.loli.net/2021/05/15/FZpDWJq4c1KkCmz.png)

![image-20210515102024822](https://i.loli.net/2021/05/15/PAtV4WbCvBFlwOz.png)

乐观锁 ，条件更新 etag发生变化

![image-20210515102322012](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210515102322012.png)

![image-20210515102423709](https://i.loli.net/2021/05/15/8BVQjHz9MTfr2X6.png)

![image-20210515102512227](https://i.loli.net/2021/05/15/G6dcsjgIBZpEixW.png)

#### 29 缓存的工作原理

解决http1.1性能问题的手段

![image-20210515132308160](https://tva1.sinaimg.cn/large/008i3skNgy1gqj2xsbh4nj30jj0c1acf.jpg)

![image-20210515141516920](https://tva1.sinaimg.cn/large/008i3skNgy1gqj34pvq40j30if0ccmyu.jpg)

![image-20210515142344141](https://tva1.sinaimg.cn/large/008i3skNgy1gqj3dielvoj30j80chtbl.jpg)

判断缓存来自何处

共享的过期缓存-代理服务器

![image-20210515142516070](https://tva1.sinaimg.cn/large/008i3skNgy1gqj3f3nvscj30hp0cbmz1.jpg)

缓存实现示意图

![image-20210515142619213](https://tva1.sinaimg.cn/large/008i3skNgy1gqj3h3n6cmj30mu0cn783.jpg)

[LRU链表](https://blog.csdn.net/qq_25482087/article/details/116856374)



#### 30 缓存新鲜度计算的四种方式

![image-20210515182820289](https://tva1.sinaimg.cn/large/008i3skNgy1gqjag0iqdrj30ld0d1wjk.jpg)

s-maxage用于共享缓存 优先级高于 expires



![image-20210515183013103](https://tva1.sinaimg.cn/large/008i3skNgy1gqjahzzkb9j30h10bl77b.jpg)

![image-20210515183127541](https://tva1.sinaimg.cn/large/008i3skNgy1gqjaj8dafcj30m10al0x5.jpg)

![image-20210515183144876](https://tva1.sinaimg.cn/large/008i3skNgy1gqjajld07dj30j80c5wji.jpg)

![image-20210515183443417](https://tva1.sinaimg.cn/large/008i3skNgy1gqjamniutvj30ll0d6gr0.jpg)



#### 31复杂的cache-control取值范围

![image-20210516203812856](https://tva1.sinaimg.cn/large/008i3skNgy1gqkjtk9lyzj30jb0auae8.jpg)



![image-20210516212200899](https://tva1.sinaimg.cn/large/008i3skNgy1gqkl31bwyoj30jf0cfq7a.jpg)

![image-20210516212505667](https://tva1.sinaimg.cn/large/008i3skNgy1gqkl7cseh8j30jo0cxdj9.jpg)

![image-20210516212615021](https://tva1.sinaimg.cn/large/008i3skNgy1gqkl7fz52qj30jy0c3wig.jpg)

#### 32 什么相应会被缓存

![image-20210516223702257](https://tva1.sinaimg.cn/large/008i3skNgy1gqkn94yathj30j40cjn0b.jpg)

![image-20210516224055257](https://tva1.sinaimg.cn/large/008i3skNgy1gqknd5cl7jj30jm0ad418.jpg)

![image-20210516224133466](https://tva1.sinaimg.cn/large/008i3skNgy1gqkndskkvmj30iz0bbdj0.jpg)

![image-20210516224253517](https://tva1.sinaimg.cn/large/008i3skNgy1gqknf6bs2rj30hv0ckabw.jpg)

![image-20210516224408991](https://tva1.sinaimg.cn/large/008i3skNgy1gqknghdat3j30je0bvdjd.jpg)

![image-20210516224640262](https://tva1.sinaimg.cn/large/008i3skNgy1gqknj4skt9j30f60ckjv2.jpg)

Etag if-match

![image-20210516224711829](https://tva1.sinaimg.cn/large/008i3skNgy1gqknjnmkw1j30g90b9dhi.jpg)

#### 33多种重定向跳转方式的差异

302 -》 传递 location

307-》location



![image-20210517203219965](https://tva1.sinaimg.cn/large/008i3skNgy1gqlp9nq7fej30j30ac0v6.jpg)

![image-20210517203952393](https://tva1.sinaimg.cn/large/008i3skNgy1gqlphi1k89j30j00bcdi5.jpg)

![image-20210517204115478](https://tva1.sinaimg.cn/large/008i3skNgy1gqlpiwq543j30jm07ptag.jpg)

重定向响应码

永久重定向

* 301 http 1.0 重定向请求通常使用get方法
* 308 http 1.1 重定向请求必须使用原请求的方法和body请求

![image-20210517204149710](https://tva1.sinaimg.cn/large/008i3skNgy1gqlpji93qhj30ki09wq6f.jpg)

**临时重定向，表示资源只是暂时的变更URI**

* 302 http 1.0 :重定向请求通常使用GET方法，而不管原请求究竟采用什么方法

* 303 http 1.1:不表示资源变迁，而是用新的URI的响应表述而为原请求服务，重定向请求使用GET方法

* 307 http1.1: 重定向请求必须使用原请求的方法和body发起访问

  **特殊重定向**

  * 300:响应式内容协商中，告知客户端有多种资源表述，要求客户端选择一种自认为合理的表述s
  * 304:服务器验证过期缓存有效后，要求客户端使用该缓存。

![image-20210517204323788](https://tva1.sinaimg.cn/large/008i3skNgy1gqlpl4trhwj30ll0acn1j.jpg)
