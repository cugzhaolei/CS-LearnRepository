# 通信信息

工业常用通信协议

## Modbus

## CORS

[1.MDN CORS](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)

跨域资源共享(CORS) 是一种机制，它使用额外的 HTTP 头来告诉浏览器  让运行在一个 origin (domain) 上的Web应用被准许访问来自不同源服务器上的指定的资源。当一个资源从与该资源本身所在的服务器不同的域、协议或端口请求一个资源时，资源会发起一个跨域 HTTP 请求。

跨域资源共享标准新增了一组 HTTP 首部字段，允许服务器声明哪些源站通过浏览器有权限访问哪些资源。另外，规范要求，对那些可能对服务器数据产生副作用的 HTTP 请求方法（特别是 GET 以外的 HTTP 请求，或者搭配某些 MIME 类型的 POST 请求），浏览器必须首先使用 OPTIONS 方法发起一个预检请求（preflight request），从而获知服务端是否允许该跨域请求。服务器确认允许之后，才发起实际的 HTTP 请求。在预检请求的返回中，服务器端也可以通知客户端，是否需要携带身份凭证（包括 Cookies 和 HTTP 认证相关数据）。

### 简单请求

- 简单请求如下：
  - GET
  - HEAD
  - POST
- 除了被用户代理自动设置的首部字段（例如 Connection ，User-Agent）和在 Fetch 规范中定义为 禁用首部名称 的其他首部，允许人为设置的字段为 Fetch 规范定义的 对 CORS 安全的首部字段集合。该集合为：
  - Accept
  - Accept-Language
  - Content-Language
  - Content-Type （需要注意额外的限制）
  - DPR
  - Downlink
  - Save-Data
  - Viewport-Width
  - Width
- Content-Type 的值仅限于下列三者之一：
  - text/plain
  - multipart/form-data
  - application/x-www-form-urlencoded

### Response Header

响应请求头

- Access-Control-Allow-Origin

``` bash
Access-Control-Allow-Origin: <origin> | *
```

其中，origin 参数的值指定了允许访问该资源的外域 URI。对于不需要携带身份凭证的请求，服务器可以指定该字段的值为通配符，表示允许来自所有域的请求。

- Access-Control-Expose-Headers

Access-Control-Expose-Headers 头让服务器把允许浏览器访问的头放入白名单，例如：

``` bash
Access-Control-Expose-Headers: X-My-Custom-Header, X-Another-Custom-Header
```

这样浏览器就能够通过getResponseHeader访问X-My-Custom-Header和 X-Another-Custom-Header 响应头了。

- Access-Control-Max-Age

Access-Control-Max-Age 头指定了preflight请求的结果能够被缓存多久，请参考本文在前面提到的preflight例子。

``` bash
Access-Control-Max-Age: <delta-seconds>
```

- Access-Control-Allow-Credentials

Access-Control-Allow-Credentials 头指定了当浏览器的credentials设置为true时是否允许浏览器读取response的内容。当用在对preflight预检测请求的响应中时，它指定了实际的请求是否可以使用credentials。请注意：简单 GET 请求不会被预检；如果对此类请求的响应中不包含该字段，这个响应将被忽略掉，并且浏览器也不会将相应内容返回给网页。

``` bash
Access-Control-Allow-Credentials: true
```

- Access-Control-Allow-Methods

Access-Control-Allow-Methods 首部字段用于预检请求的响应。其指明了实际请求所允许使用的 HTTP 方法。

``` bash
Access-Control-Allow-Methods: <method>[, <method>]*
```

- Access-Control-Allow-Headers

Access-Control-Allow-Headers 首部字段用于预检请求的响应。其指明了实际请求中允许携带的首部字段。

``` bash
Access-Control-Allow-Headers: <field-name>[, <field-name>]*
```

#### Http Request Field

HTTP请求字段

- Origin

首部字段表明预检请求或实际请求的源站。

``` bash
Origin: <origin>
```

origin 参数的值为源站 URI。它不包含任何路径信息，只是服务器名称。

::: tip
Note: 有时候将该字段的值设置为空字符串是有用的，例如，当源站是一个 data URL 时。在所有访问控制请求（Access control request）中，Origin 首部字段总是被发送。
:::

- Access-Control-Request-Method

Access-Control-Request-Method 首部字段用于预检请求。其作用是，将实际请求所使用的 HTTP 方法告诉服务器。

``` bash
Access-Control-Request-Method: <method>
```

- Access-Control-Request-Headers

Access-Control-Request-Headers 首部字段用于预检请求。其作用是，将实际请求所携带的首部字段告诉服务器。

``` bash

```