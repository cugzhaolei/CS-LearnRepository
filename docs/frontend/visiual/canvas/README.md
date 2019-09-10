::: tip
# canvas 

## 常用API

1. fillRect(x,y,width,height)实心矩形
2. strokeRect(x,y,width,height)空心矩形
3. fillText("Hello world",200,200);实心文字
4. strokeText("Hello world",200,300)空心文字

## canvas和svg的区别

* svg绘制出来的图片有独立dom节点，可以绑定事件，是矢量图，放大图片不会有锯齿。 
* canvas绘制出来的图片是一个画布，等于就是一张图，放大会产生锯齿。
:::

## [canvas图层](https://www.cnblogs.com/cornlin/p/7653468.html)
（1）globalAlpha 用于设置所有绘制的透明度，默认值为0。
``` js
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

context.fillStyle = 'rgba(280,187,188,1)';
context.fillRect(10,10,100,100);

context.globalAlpha = 0.5;//透明度为0.5

context.fillStyle = 'rgba(180,187,188,1)';
context.fillRect(20,20,80,80);
```
（2）globalCompositionOperation 表示后绘制的图形怎样与先绘制的图形结合。
``` js
context.fillStyle = 'rgba(280,187,188,1)';
context.fillRect(150,150,100,100);

context.globalCompositeOperation = 'source-in';//重叠部分可见，其他透明。

context.fillStyle = 'rgba(180,187,188,1)';
context.fillRect(160,160,80,80);
```

注：（1）globalCompositionOperation 可能值。

source-over（默认）：后绘制图层位于前图层上方。
source-in：图层重叠部分可见，其他透明。
source-out：图层不重叠部分可见，先绘制层透明。
source-atop：图层重叠部分可见，先绘制不受影响。
destination-over：后绘制图层位于前图层下方。
destination-in：后绘制图层位于前图层下方，不重叠部分透明。
destination-out：后绘制图形擦除与先绘制图形重叠部分。
destination-atop：后绘制图层位于下方，不重叠部分，先绘制层透明。
lighter：重叠部分的值相加，使该部分变亮。
copy：后绘制图形替代与之重叠的先绘制图形。
xor：重叠部分执行“异或”操作。

（2）不同浏览器对该属性的实现存在较大差异。

## [dom渲染的性能损耗](https://www.cnblogs.com/ziyoublog/p/9989797.html)
[DOM渲染机制与常见性能优化](https://www.jianshu.com/p/a2cb1e3a79be)
重绘与重排

## canvas图层

html5中的canvas本身的API是不存在图层概念的。要想实现实现多图层功能，必须要使用多个canvas对象，不过这些canvas对象，是在内存中的，而不是在html的元素树中。每个canvas维持一个图层就可以，然后主canvas是负责显示最后的合成的效果。
js动态创建canvas对象如下：
``` js
var layer1=document.createElement('canvas');
layer1.width=800;
layer1.height=600;
var layer1_canvas=layer1.getContext('2d');
var layer2=document.createElement('canvas');
layer2.width=800;
layer2.height=600;
var layer2_canvas=layer1.getContext('2d');
layer1_canvas.drawSomething();
layer2_canvas.drawSomething();
canvas.save()//用来显示的canvas
canvas.globalCompositeOperation="destination-over";//设置多个图层如何混合，这个可以百度canvas混合模式，这个和PS是相近的
canvas.drawImage(layer1,0,0,800,600,0,0,800,600)
canvas.drawImage(layer2,0,0,800,600,0,0,800,600)
canvas.restore();
```
这样就把两个图层绘制在一个图层中，单独改变任一个图层都不会改变其他图层。

## Canvas
\<canvas> 元素负责在页面中设定一个区域，然后就可以通过 JavaScript 动态地在这个区域中绘制图形。
一、基本用法
要使用 \<canvas> 元素，必须先设置其 width 和 height 属性，指定可以绘图的区域大小。出现在开始和结束标签中的内容是后备信息，如果浏览器不支持 \<canvas> 元素，就会显示这些信息。
``` js
<canvas id="drawing" width=" 200" height="200">A drawing of something.</canvas>
```
如果不添加任何样式或者不绘制任何图形，在页面中是看不到该元素的。
要在这块画布（canvas）上绘图，需要取得绘图上下文。而取得绘图上下文对象的引用，需要调用getContext() 方法并传入上下文的名字。传入 "2d" ，就可以取得 2D 上下文对象。
``` js
var drawing = document.getElementById("drawing");
//确定浏览器支持\<canvas>元素
if (drawing.getContext) {
    var context = drawing.getContext("2d"); 
}
```
使用 toDataURL() 方法，可以导出在 \<canvas> 元素上绘制的图像。这个方法接受一个参数，即图像的 MIME 类型格式，而且适合用于创建图像的任何上下文。
取得画布中的一幅 PNG 格式的图像：
``` js
var drawing = document.getElementById("drawing");
//确定浏览器支持\<canvas>元素
if (drawing.getContext) {
    // 取得图像的数据 URI
    var imgURI = drawing.toDataURL("image/png");
    // 显示图像
    var image = document.createElement("img");
    image.src = imgURI;
    document.body.appendChild(image);
}
```
如果绘制到画布上的图像源自不同的域， toDataURL() 方法会抛出错误。
二、2D上下文
使用 2D 绘图上下文提供的方法，可以绘制简单的 2D 图形，比如矩形、弧线和路径。2D 上下文的坐标开始于 \<canvas> 元素的左上角，原点坐标是(0,0)。
1、填充和描边
2D 上下文的两种基本绘图操作是填充和描边。填充，就是用指定的样式（颜色、渐变或图像）填充图形；描边，就是只在图形的边缘画线。大多数 2D 上下文操作都会细分为填充和描边两个操作，而操作的结果取决于两个属性： fillStyle 和 strokeStyle 。
这两个属性的值可以是字符串、渐变对象或模式对象，而且它们的默认值都是 "#000000" 。如果为它们指定表示颜色的字符串值，可以使用 CSS 中指定颜色值的任何格式，包括颜色名、十六进制码、rgb 、 rgba 、 hsl 或 hsla 。
``` js
var drawing = document.getElementById("drawing");
//确定浏览器支持\<canvas>元素
if (drawing.getContext) {
    var context = drawing.getContext("2d");
    context.strokeStyle = "red";
    context.fillStyle = "#0000ff";
}
```
2、绘制矩形
与矩形有关的方法包括 fillRect() 、strokeRect() 和 clearRect() 。这三个方法都能接收 4 个参数：矩形的 x 坐标、矩形的 y 坐标、矩形宽度和矩形高度。这些参数的单位都是像素。
fillRect() 方法在画布上绘制的矩形会填充指定的颜色。填充的颜色通过 fillStyle 属性指定：
``` js
var drawing = document.getElementById("drawing");
//确定浏览器支持\<canvas>元素
if (drawing.getContext) {
    var context = drawing.getContext("2d"); 
    // 绘制红色矩形
    context.fillStyle = "#ff0000";
    context.fillRect(10, 10, 50, 50);
    // 绘制半透明的蓝色矩形
    context.fillStyle = "rgba(0,0,255,0.5)";
    context.fillRect(30, 30, 50, 50);
}
```
strokeRect() 方法在画布上绘制的矩形会使用指定的颜色描边。描边颜色通过 strokeStyle 属性指定。
``` js
var drawing = document.getElementById("drawing");
//确定浏览器支持\<canvas>元素
if (drawing.getContext) {
    var context = drawing.getContext("2d"); 
    context.strokeStyle = "#ff0000";
    context.strokeRect(10, 10, 50, 50);
    // 绘制半透明的蓝色描边矩形
    context.strokeStyle = "rgba(0,0,255,0.5)";
    context.strokeRect(30, 30, 50, 50);
}
```
描边线条的宽度由 lineWidth 属性控制，该属性的值可以是任意整数。另外，通过 lineCap 属性可以控制线条末端的形状是平头、圆头还是方头（ "butt" 、"round" 或 "square" ），通过 lineJoin 属性可以控制线条相交的方式是圆交、斜交还是斜接（ "round" 、 "bevel" 或 "miter" ）。
clearRect() 方法用于清除画布上的矩形区域。本质上，这个方法可以把绘制上下文中的某一矩形区域变透明。
``` js
var drawing = document.getElementById("drawing");
//确定浏览器支持\<canvas>元素
if (drawing.getContext) {
    var context = drawing.getContext("2d");
    //绘制红色矩形
    context.fillStyle = "#ff0000";
    context.fillRect(10, 10, 50, 50);
    //绘制半透明的蓝色矩形
    context.fillStyle = "rgba(0,0,255,0.5)";
    context.fillRect(30, 30, 50, 50);
    // 在两个矩形重叠的地方清除一个小矩形
    context.clearRect(40, 40, 10, 10);
}
``` 
3、绘制路径
通过路径可以创造出复杂的形状和线条。要绘制路径，首先必须调用 beginPath() 方法，表示要开始绘制新路径。然后，再通过调用下列方法来实际地绘制路径。
•	arc(x, y, radius, startAngle, endAngle, counterclockwise) ：以 (x,y) 为圆心绘制一条弧线，弧线半径为 radius ，起始和结束角度（用弧度表示）分别为 startAngle 和endAngle 。最后一个参数表示 startAngle 和 endAngle 是否按逆时针方向计算，值为 false表示按顺时针方向计算。
•	arcTo(x1, y1, x2, y2, radius) ：从上一点开始绘制一条弧线，到 (x2,y2) 为止，并且以给定的半径 radius 穿过 (x1,y1) 。
•	bezierCurveTo(c1x, c1y, c2x, c2y, x, y) ：从上一点开始绘制一条曲线，到 (x,y) 为止，并且以 (c1x,c1y) 和 (c2x,c2y) 为控制点。
•	lineTo(x, y) ：从上一点开始绘制一条直线，到 (x,y) 为止。
•	moveTo(x, y) ：将绘图游标移动到 (x,y) ，不画线。
•	quadraticCurveTo(cx, cy, x, y) ：从上一点开始绘制一条二次曲线，到 (x,y) 为止，并且以 (cx,cy) 作为控制点。
•	rect(x, y, width, height) ：从点 (x,y) 开始绘制一个矩形，宽度和高度分别由 width 和height 指定。这个方法绘制的是矩形路径，而不是strokeRect() 和 fillRect() 所绘制的独立的形状。
如果想绘制一条连接到路径起点的线条，可以调用closePath() 。如果路径已经完成，你想用 fillStyle 填充它，可以调用 fill() 方法。另外，还可以调用 stroke() 方法对路径描边，描边使用的是 strokeStyle 。最后还可以调用 clip() ，这个方法可以在路径上创建一个剪切区域。
绘制一个不带数字的时钟表盘：
``` js
var drawing = document.getElementById("drawing");
//确定浏览器支持\<canvas>元素
if (drawing.getContext) {
    var context = drawing.getContext("2d");
    // 开始路径
    context.beginPath();
    // 绘制外圆
    context.arc(100, 100, 99, 0, 2 * Math.PI, false);
    // 绘制内圆
    context.moveTo(194, 100);
    context.arc(100, 100, 94, 0, 2 * Math.PI, false);
    // 绘制分针
    context.moveTo(100, 100);
    context.lineTo(100, 15);
    // 绘制时针
    context.moveTo(100, 100);
    context.lineTo(35, 100);
    // 描边路径
    context.stroke();
}
```
isPointInPath() 方法接收 x 和 y 坐标作为参数，用于在路径被关闭之前确定画布上的某一点是否位于路径上。
if (context.isPointInPath(100, 100)){
    alert("Point (100, 100) is in the path.");
}
4、绘制文本
绘制文本主要有两个方法： fillText() 和 strokeText() 。这两个方法都可以接收 4 个参数：要绘制的文本字符串、x 坐标、y 坐标和可选的最大像素宽度。
两个方法都以下列 3 个属性为基础：
•	font ：表示文本样式、大小及字体，用 CSS 中指定字体的格式来指定，例如 "10px Arial" 。
•	textAlign ：表示文本对齐方式。可能的值有 "start" 、 "end" 、 "left" 、 "right" 和 "center" 。建议使用 "start" 和 "end" ，不要使用 "left" 和 "right" ，因为前两者的意思更稳妥，能同时适合从左到右和从右到左显示（阅读）的语言。
•	textBaseline ：表示文本的基线。可能的值有 "top" 、 "hanging" 、 "middle" 、 "alphabetic" 、"ideographic" 和 "bottom" 。
fillText() 方法使用fillStyle 属性绘制文本， strokeText() 方法使用 strokeStyle 属性为文本描边。
``` js
//正常
context.font = "bold 14px Arial";
context.textAlign = "center";
context.textBaseline = "middle";
context.fillText("12", 100, 20);
// 起点对齐
context.textAlign = "start";
context.fi llText("12", 100, 40);
// 终点对齐
context.textAlign = "end";
context.fi llText("12", 100, 60);
```
5、变换
通过上下文的变换，可以把处理后的图像绘制到画布上。2D 绘制上下文支持各种基本的绘制变换。创建绘制上下文时，会以默认值初始化变换矩阵，在默认的变换矩阵下，所有处理都按描述直接绘制。为绘制上下文应用变换，会导致使用不同的变换矩阵应用处理，从而产生不同的结果。
•	rotate(angle) ：围绕原点旋转图像 angle 弧度。
•	scale(scaleX, scaleY) ：缩放图像，在 x 方向乘以 scaleX ，在 y 方向乘以 scaleY 。 scaleX和 scaleY 的默认值都是 1.0。
•	translate(x, y) ：将坐标原点移动到 (x,y) 。执行这个变换之后，坐标(0,0)会变成之前由 (x,y)表示的点。
•	transform(m1_1, m1_2, m2_1, m2_2, dx, dy) ：直接修改变换矩阵，方式是乘以如下矩阵。
    m1_1    m1_2      dx
    m2_1    m2_2      dy
    0        0         1
•	setTransform(m1_1, m1_2, m2_1, m2_2, dx, dy) ：将变换矩阵重置为默认状态，然后再调用 transform() 。
把原点变换到表盘的中心：
``` js
var drawing = document.getElementById("drawing");
//确定浏览器支持\<canvas>元素
if (drawing.getContext) {
    var context = drawing.getContext("2d");
    //开始路径
    context.beginPath();
    //绘制外圆
    context.arc(100, 100, 99, 0, 2 * Math.PI, false);
    //绘制内圆
    context.moveTo(194, 100);
    context.arc(100, 100, 94, 0, 2 * Math.PI, false);
    // 变换原点
    context.translate(100, 100);
    // 绘制分针
    context.moveTo(0, 0);
    context.lineTo(0, -85);
    // 绘制时针
    context.moveTo(0, 0);
    context.lineTo(-65, 0);
    //描边路径
    context.stroke();
}
```
使用 rotate() 方法旋转时钟的表针：
``` js
var drawing = document.getElementById("drawing");
//确定浏览器支持\<canvas>元素
if (drawing.getContext) {
    var context = drawing.getContext("2d");
    //开始路径
    context.beginPath();
    //绘制外圆
    context.arc(100, 100, 99, 0, 2 * Math.PI, false);
    //绘制内圆
    context.moveTo(194, 100);
    context.arc(100, 100, 94, 0, 2 * Math.PI, false);
    //变换原点
    context.translate(100, 100);
    // 旋转表针
    context.rotate(1);
    //绘制分针
    context.moveTo(0, 0);
    context.lineTo(0, -85);
    //绘制时针
    context.moveTo(0, 0);
    context.lineTo(-65, 0);
    //描边路径
    context.stroke();
}
```
可以调用 save() 方法，调用这个方法后，当时的所有设置都会进入一个栈结构，得以妥善保管。调用 restore() 方法，在保存设置的栈结构中向前返回一级，恢复之前的状态。
save() 方法保存的只是对绘图上下文的设置和变换，不会保存绘图上下文的内容。
6、绘制图像
可以使用 drawImage()方法把一幅图像绘制到画布上。
以使用三种不同的参数组合。最简单的调用方式是传入一个 HTML \<img> 元素，以及绘制该图像的起点的 x 和 y 坐标。
var image = document.images[0];
context.drawImage(image, 10, 10);
如果想改变绘制后图像的大小，可以再多传入两个参数，分别表示目标
宽度和目标高度。通过这种方式来缩放图像并不影响上下文的变换矩阵。
context.drawImage(image, 50, 10, 20, 30);
绘制出来的图像大小会变成 20×30 像素。
可以选择把图像中的某个区域绘制到上下文中。 drawImage() 方法的这种调用方式总共需要传入 9 个参数：要绘制的图像、源图像的 x 坐标、源图像的 y 坐标、源图像的宽度、源图像的高度、目标图像的 x 坐标、目标图像的 y 坐标、目标图像的宽度、目标图像的高度。这样调用drawImage() 方法可以获得最多的控制。
context.drawImage(image, 0, 10, 50, 50, 0, 100, 40, 60);
7、阴影
2D 上下文会根据以下几个属性的值，自动为形状或路径绘制出阴影。
•	shadowColor ：用 CSS 颜色格式表示的阴影颜色，默认为黑色。
•	shadowOffsetX ：形状或路径 x 轴方向的阴影偏移量，默认为 0。
•	shadowOffsetY ：形状或路径 y 轴方向的阴影偏移量，默认为 0。
•	shadowBlur ：模糊的像素数，默认 0，即不模糊
``` js
var context = drawing.getContext("2d");
// 设置阴影
context.shadowOffsetX = 5;
context.shadowOffsetY = 5;
context.shadowBlur = 4;
context.shadowColor = "rgba(0, 0, 0, 0.5)";
//绘制红色矩形
context.fillStyle = "#ff0000";
context.fillRect(10, 10, 50, 50);
//绘制蓝色矩形
context.fillStyle = "rgba(0,0,255,1)";
context.fillRect(30, 30, 50, 50);
```
8、渐变
要创建一个新的线性渐变，可以调用 createLinearGradient() 方法。这个方法接收 4 个参数：起点的 x 坐标、起点的 y 坐标、终点的 x 坐标、终点的 y 坐标。调用这个方法后，它就会创建一个指定大小的渐变，并返回
CanvasGradient 对象的实例。
创建了渐变对象后，下一步就是使用 addColorStop() 方法来指定色标。这个方法接收两个参数：色标位置和 CSS 颜色值。色标位置是一个 0（开始的颜色）到 1（结束的颜色）之间的数字。
``` js
var context = drawing.getContext("2d");
var gradient = context.createLinearGradient(30, 30, 70, 70);
gradient.addColorStop(0, "white");
gradient.addColorStop(1, "black");

//绘制红色矩形
context.fillStyle = "#ff0000";
context.fillRect(10, 10, 50, 50);
//绘制渐变矩形
context.fillStyle = gradient;
context.fillRect(30, 30, 50, 50);
```
为了让渐变覆盖整个矩形，而不是仅应用到矩形的一部分，矩形和渐变对
象的坐标必须匹配才行。
要创建径向渐变（或放射渐变），可以使用 createRadialGradient() 方法。这个方法接收 6 个参数，对应着两个圆的圆心和半径。前三个参数指定的是起点圆的原心（x 和 y）及半径，后三个参数指定的是终点圆的原心（x 和 y）及半径。
``` js
var context = drawing.getContext("2d");

var gradient = context.createRadialGradient(55, 55, 10, 55, 55, 30);
gradient.addColorStop(0, "white");
gradient.addColorStop(1, "black");
//绘制红色矩形
context.fillStyle = "#ff0000";
context.fillRect(10, 10, 50, 50);
//绘制渐变矩形
context.fillStyle = gradient;
context.fillRect(30, 30, 50, 50);
```
9、模式
模式其实就是重复的图像，可以用来填充或描边图形。要创建一个新模式，可以调用createPattern() 方法并传入两个参数：一个 HTML \<img> 元素和一个表示如何重复图像的字符串。其中，第二个参数的值与 CSS 的 background-repeat 属性值相同，包括 "repeat" 、 "repeat-x" 、"repeat-y" 和 "no-repeat" 。
``` js
var image = document.images[0],
pattern = context.createPattern(image, "repeat");
//绘制矩形
context.fillStyle = pattern;
context.fillRect(10, 10, 150, 150);
```
createPattern() 方法的第一个参数也可以是一个 \<video> 元素，或者另一个 \<canvas> 元素。
10、使用图像数据
2D 上下文的一个明显的长处就是，可以通过 getImageData() 取得原始图像数据。这个方法接收4 个参数：要取得其数据的画面区域的 x 和 y 坐标以及该区域的像素宽度和高度。
取得左上角坐标为(10,5)、大小为 50×50 像素的区域的图像数据：
var imageData = context.getImageData(10, 5, 50, 50);
返回的对象是 ImageData 的实例。每个 ImageData 对象都有三个属性： width 、 height 和data 。其中 data 属性是一个数组，保存着图像中每一个像素的数据。
在 data 数组中，每一个像素用4 个元素来保存，分别表示红、绿、蓝和透明度值。
``` js
var data = imageData.data,
red = data[0],
green = data[1],
blue = data[2],
alpha = data[3];
```
数组中每个元素的值都介于 0 到 255 之间（包括 0 和 255）。
11、合成
还有两个会应用到 2D 上下文中所有绘制操作的属性： globalAlpha 和 globalCompositionOperation 。其中， globalAlpha 是一个介于 0 和 1 之间的值（包括 0和 1），用于指定所有绘制的透明度。默认值为 0。如果所有后续操作都要基于相同的透明度，就可以先把 globalAlpha 设置为适当
值，然后绘制，最后再把它设置回默认值 0。
``` js
//绘制红色矩形
context.fillStyle = "#ff0000";
context.fillRect(10, 10, 50, 50);
//修改全局透明度
context.globalAlpha = 0.5;
//绘制蓝色矩形
context.fillStyle = "rgba(0,0,255,1)";
context.fillRect(30, 30, 50, 50);
//重置全局透明度
context.globalAlpha = 0;
```
第二个属性 globalCompositionOperation 表示后绘制的图形怎样与先绘制的图形结合。
•	source-over （默认值）：后绘制的图形位于先绘制的图形上方。
•	source-in ：后绘制的图形与先绘制的图形重叠的部分可见，两者其他部分完全透明。
•	source-out ：后绘制的图形与先绘制的图形不重叠的部分可见，先绘制的图形完全透明。
•	source-atop ：后绘制的图形与先绘制的图形重叠的部分可见，先绘制图形不受影响。
•	destination-over ：后绘制的图形位于先绘制的图形下方，只有之前透明像素下的部分才可见。
•	destination-in ：后绘制的图形位于先绘制的图形下方，两者不重叠的部分完全透明。
•	destination-out ：后绘制的图形擦除与先绘制的图形重叠的部分。
•	destination-atop ：后绘制的图形位于先绘制的图形下方，在两者不重叠的地方，先绘制的图形会变透明。
•	lighter ：后绘制的图形与先绘制的图形重叠部分的值相加，使该部分变亮。
•	copy ：后绘制的图形完全替代与之重叠的先绘制图形。
•	xor ：后绘制的图形与先绘制的图形重叠的部分执行“异或”操作。
``` js
var drawing = document.getElementById("drawing"); 
//确定浏览器支持\<canvas>元素
if (drawing.getContext) {
    var context = drawing.getContext("2d");
    //绘制红色矩形
    context.fillStyle = "#ff0000";
    context.fillRect(10, 10, 50, 50);
    //设置合成操作
    context.globalCompositeOperation = "destination-over";
    //绘制蓝色矩形
    context.fillStyle = "rgba(0,0,255,1)";
    context.fillRect(30, 30, 50, 50);
}
``` 
