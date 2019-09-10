# 图形

在一个前端看来，画图有三种方法，Cavas，SVG 以及 CSS。至于三者优劣，将在此针对各种图形做逐一比较，有方，圆，椭圆，扇形，多边形，渐变，文本处理以及动画

# [SVG基础](https://github.com/junruchen/junruchen.github.io/wiki/SVG%E5%9F%BA%E7%A1%80)

## Svg
一、svg是什么？
SVG 意为可缩放矢量图形（Scalable Vector Graphics）。
SVG 是使用 XML 来描述二维图形和绘图程序的语言。
SVG 图像在放大或改变尺寸的情况下其图形质量不会有所损失。
SVG 是万维网联盟的标准。
二、svg的优势
与其他图像格式相比（比如 JPEG 和 GIF），使用 SVG 的优势在于：
•	SVG 图像可通过文本编辑器来创建和修改；
•	SVG 图像可被搜索、索引、脚本化或压缩；
•	SVG 是可伸缩的；
•	SVG 图像可在任何的分辨率下被高质量地打印；
•	SVG 可在图像质量不下降的情况下被放大；
三、浏览器支持情况

四、使用方式
1、可在浏览器直接打开；
2、在HTML中的使用；
SVG 文件可通过以下标签嵌入 HTML 文档：\<embed>、\<object> 、 \<iframe>和\<img>。
SVG的代码可以直接嵌入到HTML页面中，或直接链接到SVG文件。
（1）使用 \<embed> 标签
•	优势：所有主要浏览器都支持，并允许使用脚本
•	缺点：不推荐在HTML4和XHTML中使用（但在HTML5允许）
示例：
``` js
<embed width="300px" height="300px" src="img/demo.svg" type="image/svg+xml" />
```
（2）使用 \<object> 标签
•	优势：所有主要浏览器都支持，并支持HTML4，XHTML和HTML5标准
•	缺点：不允许使用脚本。
示例：
``` js
<object width="300px" height="300px" data="img/demo.svg" type="image/svg+xml"></object>
```
（3）使用 \<iframe> 标签
•	优势：所有主要浏览器都支持，并允许使用脚本
•	缺点：不推荐在HTML4和XHTML中使用（但在HTML5允许）
示例：
``` js
<iframe width="300px" height="300px" src="img/demo.svg"></iframe>
```
（4）直接在HTML嵌入SVG代码
示例：
``` js
<svg width="500px" height="500px" style="margin:50px;" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="20" rx="10" ry="10" width="300" height="300" style="fill:rgb(0,0,255);stroke-width:1;stroke:rgb(0,0,0);fill-opacity:0.1;stroke-opacity:0.9;opacity:0.9;"/> 
</svg>
```
（5）使用\<img>标签
示例：
``` js
<img src="img/demo.svg" width="300px" height="300px"/>
```
（6）链接到svg文件
示例：
``` js
<a href="img/demo.svg">查看svg</a>
```
3、在css中使用
示例：
``` js
.container{
  background: white url(img/demo.svg) repeat;
}
```

作者：ywyan
链接：https://www.jianshu.com/p/0899c6b481cd
来源：简书
简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。

一、SVG形状
SVG有一些预定义的形状元素，可被开发者使用和操作：
•	矩形 \<rect>
•	圆形 \<circle>
•	椭圆 \<ellipse>
•	线 \<line>
•	折线 \<polyline>
•	多边形 \<polygon>
•	路径 \<path>
二、基本形状
要想插入一个形状，你可以在文档中创建一个元素。不同的元素对应着不同的形状，并且使用不同的属性来定义图形的大小和位置。


示例代码：
``` css
<svg width="200" height="250" version="1.1" xmlns="http://www.w3.org/2000/svg"> 
    <rect x="10" y="10" width="30" height="30" stroke="black" fill="transparent" stroke-width="5"/>
    <rect x="60" y="10" rx="10" ry="10" width="30" height="30" stroke="black" fill="transparent" stroke-width="5"/>

    <circle cx="25" cy="75" r="20" stroke="red" fill="transparent" stroke-width="5"/>
    <ellipse cx="75" cy="75" rx="20" ry="5" stroke="red" fill="transparent" stroke-width="5"/>

    <line x1="10" x2="50" y1="110" y2="150" stroke="orange" fill="transparent" stroke-width="5"/>
    <polyline points="60 110 65 120 70 115 75 130 80 125 85 140 90 135 95 150 100 145"  stroke="orange" fill="transparent" stroke-width="5"/>

    <polygon points="50 160 55 180 70 180 60 190 65 205 50 195 35 205 40 190 30 180 45 180"  stroke="green" fill="transparent" stroke-width="5"/>

    <path d="M20,230 Q40,205 50,230 T90,230" fill="none" stroke="blue" stroke-width="5"/>
</svg>
```
三、坐标系统
SVG使用的坐标系统或者说网格系统是：以页面的左上角为(0,0)坐标点，坐标以像素为单位，x轴正方向是向右，y轴正方向是向下。注意，这和你小时候所教的绘图方式是相反的。但是在HTML文档中，元素都是用这种方式定位的。

四、SVG实例
（一）矩形 \<rect>
示例代码及效果：

 
矩形.png
``` css
<svg width="500px" height="500px" style="margin:50px;" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <rect x="95" y="95" rx="20" ry="20" width="200" height="200" style="fill:rgb(99,99,99);stroke-width:2;stroke:rgb(33,33,33);fill-opacity:0.1;stroke-opacity:0.9;opacity:0.9;"></rect>
</svg>
```
解析：
x
    矩形左上角的x位置
y
    矩形左上角的y位置
rx
    圆角的x方位的半径
ry
    圆角的y方位的半径
width
    矩形的宽度
height
    矩形的高度
fill
    设置对象内部的填充颜色
fill-opacity
    控制填充色的不透明度（范围：0 - 1）
stroke
    定义矩形边框的颜色
stroke-opacity
    控制描边的不透明度（范围：0 - 1）
stroke-width
    定义矩形边框的宽度
（二）圆形 \<circle>
示例代码及效果：
``` css
<!--圆形--> 
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
    <circle cx="100" cy="50" r="40" stroke="black" stroke-width="2" fill="#FF8C00" />
</svg>
```
解析：
r
    圆的半径
cx
    圆点的x坐标
cy
    圆点的y坐标
（三）椭圆 \<ellipse>
示例代码及效果：

``` js
<!--椭圆-->
<svg width="500px" height="500px" style="margin:50px;" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="275" cy="125" rx="100" ry="50" style="fill:#7D9EC0;stroke:#6B6B6B;stroke-width:2;"></ellipse>
</svg>
```
解析：
cx
    椭圆中心的x坐标
cy
    椭圆中心的y坐标
rx
    定义的水平半径
ry
    定义的垂直半径
（四）线条 \<line>
\<line>绘制直线。它取两个点的位置作为属性，指定这条线的起点和终点位置。利用两点确定一条直线的原理。
示例代码及效果：
```` css
<!--直线-->
<svg width="600px" height="600px"  version="1.1"  xmlns="http://www.w3.org/2000/svg">
    <line x1="0" y1="0" x2="100" y2="100" style="stroke:rgb(99,99,99);stroke-width:2;"></line>
    <line x1="100" y1="100" x2="0" y2="200" style="stroke:rgb(99,99,99);stroke-width:2;"></line>
</svg>
````

解析：
x1
    起点的x位置
y1
    起点的y位置
x2
    终点的x位置
y2
    终点的y位置
（五）折线 \<polyline>
\<polyline>是一组连接在一起的直线。因为它可以有很多的点，折线的的所有点位置都放在一个points属性中。
示例代码及效果：

``` js
<!--五星  未填充颜色-->
<svg style="height:300px;width:300px;" xmlns="http://www.w3.org/2000/svg" version="1.1">
    <polygon points="100 10,40 180,190 60,10 60,160 180" style="fill:none;stroke:black;stroke-width:3"/>
</svg>
<!--五星  填充颜色-->
<svg style="height:300px;width:300px;" xmlns="http://www.w3.org/2000/svg" version="1.1">
    <polyline points="100 10,40 180,190 60,10 60,160 180" style="fill:#EE2C2C;stroke:#EE2C2C;stroke-width:3" />
</svg>
</svg>
```
解析：
points
    每个点必须包含2个数字，一个是x坐标，一个是y坐标。所以点列表 (0,0), (1,1) 和(2,2)可以写成这样：“0 0, 1 1, 2 2”。
（六）多边形 \<polygon>
\<polygon>和折线很像，它们都是由连接一组点集的直线构成。不同的是，\<polygon> 的路径在最后一个点处自动回到第一个点。
\<polygon> 标签用来创建含有不少于三个边的图形。 多边形是由直线组成，其形状是"封闭"的（所有的线条 连接起来）。
示例代码及效果：
``` css
<svg width="300px" height="300px" version="1.1"  xmlns="http://www.w3.org/2000/svg">
    <polygon points="220,100 300,210 170,250 123,234" style="fill:#cccccc;stroke:#000000;stroke-width:1"/>
</svg>
```

解析：
points
    每个点必须包含2个数字，一个是x坐标，一个是y坐标。所以点列表 (0,0), (1,1) 和(2,2)可以写成这样：“0 0, 1 1, 2 2”。路径绘制完后闭合图形，所以最终的直线将从位置(2,2)连接到位置(0,0)。
（七）路径 \<path>
path元素是SVG基本形状中最强大的一个，它不仅能创建其他基本形状，还能创建更多其他形状。你可以用path元素绘制矩形（直角矩形或者圆角矩形）、圆形、椭圆、折线形、多边形，以及一些其他的形状，例如贝塞尔曲线、2次曲线等曲线。
path元素的形状是通过属性d来定义的，属性d的值是一个“命令+参数”的序列。
每一个命令都用一个关键字母来表示，比如，字母“M”表示的是“Move to”命令，当解析器读到这个命令时，它就知道你是打算移动到某个点。跟在命令字母后面的，是你需要移动到的那个点的x和y轴坐标。比如移动到(10,10)这个点的命令，应该写成“M 10 10”。这一段字符结束后，解析器就会去读下一段命令。每一个命令都有两种表示方式，一种是用大写字母，表示采用绝对定位。另一种是用小写字母，表示采用相对定位
因为属性d采用的是用户坐标系统，所以不需标明单位


作者：ywyan
链接：https://www.jianshu.com/p/8ddb4ba85594
来源：简书
简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。

