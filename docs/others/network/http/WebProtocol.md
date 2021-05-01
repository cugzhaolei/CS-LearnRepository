# 《Web协议详解与抓包实战》

https://github.com/geektime-geekbang/geektime-webprotocol



#### 第四节 ADNF 语言

```

GET /HTTP/1.1
Host: www.baidu.com

HTTP/1.1 200 OK
Date:Tue,13 Mar 2021 02:12:15 GMT
Transfer-Encoding:chunked
Connection:Keep-alive
```

##### ANBF（扩充巴科斯-瑙尔范式）操作符

	*  空白字符：用来分隔定义中的各个元素
 *  选择/：表示多个规则都是可供选择的规则
    * start-line = request-line/status-line
 *  值范围%c##-##
    * OCTAL = "0"/"1"/"2/"3/"4"/"5"/"6"/"7"与OCTAL = %x30-37等价
	*  序列组合`()`:将规则组合起来，视为单个元素
 *  不定量重复`m*n`:
    * `*`元素表示零个或更多元素：`*`（header-field CRLF）
    * 1* 元素表示一个或者更多元素，2*4元素表示两个至四个元素
 *  可选序列[]
    * [message-body]
	*  

