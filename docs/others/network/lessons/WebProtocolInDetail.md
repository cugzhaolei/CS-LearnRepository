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

