:::tip
# CSS操作相关

## 盒模型

![](/images/html-box-mode.webp)

ie盒模型算上border、padding及自身（不算margin），标准的只算上自身窗体的大小 css设置方法如下：
``` css
/* 标准模型 */
box-sizing:content-box;
width:content+border+padding;

 /*IE模型*/
box-sizing:border-box;

```

## 获取宽高

* dom.style.width/height
  这种方式只能取到dom元素内联样式所设置的宽高，也就是说如果该节点的样式是在style标签中或外联的CSS文件中设置的话，通过这种方法是获取不到dom的宽高的。
  
* dom.currentStyle.width/height
  这种方式获取的是在页面渲染完成后的结果，就是说不管是哪种方式设置的样式，都能获取到。但这种方式只有IE浏览器支持。
  
* window.getComputedStyle(dom).width/height
  这种方式的原理和2是一样的，这个可以兼容更多的浏览器，通用性好一些。
  
* dom.getBoundingClientRect().width/height
  这种方式是根据元素在视窗中的绝对位置来获取宽高的。
  
* dom.offsetWidth/offsetHeight
  这个就没什么好说的了，最常用的，也是兼容最好的。

## CSS Reset & normalize.css

* 两者都是通过重置样式，保持浏览器样式的一致性；
* 前者几乎为所有标签添加了样式，后者保持了许多浏览器样式，保持尽可能的一致；
* 后者修复了常见的桌面端和移动端浏览器的bug：包含了HTML5元素的显示设置、预格式化文字的font-size问题、在IE9中SVG的溢出、许多出现在各浏览器和操作系统中的与表单相关的bug。
* 前者中含有大段的继承链；
* 后者模块化，文档较前者来说丰富；


## [清除浮动](https://juejin.im/post/5d6f2b845188250587727971)
不清除浮动会发生高度塌陷：
浮动元素父元素高度自适应（父元素不写高度时，子元素写了浮动后，父元素会发生高度塌陷）

* clear清除浮动（添加空div法）在浮动元素下方添加空div,并给该元素写css样式：{clear:both;height:0;overflow:hidden;}
* 给浮动元素父级设置高度；
``` css
<style type="text/css"> 
    .div1{background:#000080;border:1px solid red;/*解决代码*/height:200px;} 
    .div2{background:#800080;border:1px solid red;height:100px;margin-top:10px;} 
    .left{float:left;width:20%;height:200px;background:#DDD;} 
    .right{float:right;width:30%;height:80px;background:#DDD;} 
</style> 
    <div class="div1"> 
        <div class="left">Left</div> 
        <div class="right">Right</div> 
    </div> 
    <div class="div2"> 
        div2 
    </div>
    
    原理：父级div手动定义height，就解决了父级div无法自动获取到高度的问题。 
    优点：简单、代码少、容易掌握 
    缺点：只适合高度固定的布局，要给出精确的高度，如果高度和父级div不一样时，会产生问题 
    建议：不推荐使用，只建议高度固定的布局时使用 
```
* 父级同时浮动（需要给父级同级元素添加浮动）；
* 父级设置成inline-block，其margin: 0 auto居中方式失效；
* 利用br标签的clear属性；
``` js
    style type="text/css"> 
        .div1{background:#000080;border:1px solid red;margin-bottom:10px;zoom:1} 
        .div2{background:#800080;border:1px solid red;height:100px} 
        .left{float:left;width:20%;height:200px;background:#DDD} 
        .right{float:right;width:30%;height:80px;background:#DDD} 
        .clearfloat{clear:both} 
    </style> 
        <div class="div1"> 
            <div class="left">Left</div> 
            <div class="right">Right</div> 
            <br class="clearfloat" /> 
        </div> 
        <div class="div2"> 
             div2 
        </div>
        
    原理：父级div定义zoom:1来解决IE浮动问题，结尾处加 br标签 clear:both 
    建议：不推荐使用，只作了解。
```
* 给父级添加overflow:hidden 清除浮动方法；
``` js
    <style type="text/css"> 
        .div1{background:#000080;border:1px solid red;/*解决代码*/width:98%;overflow:hidden} 
        .div2{background:#800080;border:1px solid red;height:100px;margin-top:10px;width:98%} 
        .left{float:left;width:20%;height:200px;background:#DDD} 
        .right{float:right;width:30%;height:80px;background:#DDD} 
    </style> 
        <div class="div1"> 
            <div class="left">Left</div> 
            <div class="right">Right</div> 
        </div> 
        <div class="div2"> 
             div2 
        </div>
        
        原理：必须定义width或zoom:1，同时不能定义height，使用overflow:hidden时，浏览器会自动检查浮动区域的高度 
        优点：简单、代码少、浏览器支持好 
        缺点：不能和position配合使用，因为超出的尺寸的会被隐藏。 
        建议：只推荐没有使用position或对overflow:hidden理解比较深的朋友使用。
```
* 父级定义overflow：auto display:table
``` css
    <style type="text/css"> 
        .div1{background:#000080;border:1px solid red;/*解决代码*/width:98%;overflow:auto} 
        .div2{background:#800080;border:1px solid red;height:100px;margin-top:10px;width:98%} 
        .left{float:left;width:20%;height:200px;background:#DDD} 
        .right{float:right;width:30%;height:80px;background:#DDD} 
    </style> 
        <div class="div1"> 
            <div class="left">Left</div> 
            <div class="right">Right</div> 
        </div> 
        <div class="div2"> 
            div2 
        </div>
        
    原理：必须定义width或zoom:1，同时不能定义height，使用overflow:auto时，浏览器会自动检查浮动区域的高度 
    优点：简单、代码少、浏览器支持好 
    缺点：内部宽高超过父级div时，会出现滚动条。 
    建议：不推荐使用，如果你需要出现滚动条或者确保你的代码不会出现滚动条就使用吧。 
```
* 父级div定义 伪类:after 和 zoom
``` css
    <style type="text/css"> 
        .div1{background:#000080;border:1px solid red;} 
        .div2{background:#800080;border:1px solid red;height:100px;margin-top:10px} 
        .left{float:left;width:20%;height:200px;background:#DDD} 
        .right{float:right;width:30%;height:80px;background:#DDD} 
        /*清除浮动代码*/ 
        .clearfloat:after{display:block;clear:both;content:"";visibility:hidden;height:0;overflow:hidden;} 
        /*IE6下不支持after属性*/
        .clearfloat{zoom:1} 
    </style> 
        <div class="div1 clearfloat"> 
            <div class="left">Left</div> 
            <div class="right">Right</div> 
        </div> 
        <div class="div2">
            div2 
        </div> 
        
    原理：IE8以上和非IE浏览器才支持:after，原理和方法1有点类似，zoom(IE转有属性)可解决ie6,ie7浮动问题 
    优点：浏览器支持好、不容易出现怪问题（目前：大型网站都有使用，如：腾迅，网易，新浪等等） 
    缺点：代码多、不少初学者不理解原理，要两句代码结合使用才能让主流浏览器都支持。 
    建议：推荐使用，建议定义公共类，以减少CSS代码。 
```
* 万能清除法 after伪类 清浮动（现在主流方法，推荐使用）；
``` css
.float_div:after{
    content:".";
    clear:both;
    display:block;
    height:0;
    overflow:hidden;
    visibility:hidden;
}
.float_div{
    zoom:1
}

```


## 画三角形

``` css
    <style>
        #item {
            height: 0px;
            width: 0px;
            border-left: 50px solid transparent;
            border-right: 50px solid transparent;
            border-bottom: 50px solid transparent;
            border-top: 50px solid blue;
            background: white;
        }
        .triangle{
            height:0;
            width:0;
            border:10px solid;
            border-color:transparent #033669 transparent transparent;
        }
    </style>
    <div id="item">

    </div>

```

## [SVG CSS3D Canvas绘图](https://juejin.im/post/5b690a66f265da0f820254bd)

### 星球环绕旋转图
* SVG animationMotion + animateTransform
``` js
/*举例一个星球的动画  轨迹动画*/
<animateMotion dur="6s" begin="0" repeatCount="indefinite">
  <mpath xlinkHref="#Path-12" /> 
</animateMotion>
<animateTransform /*自身动画，靠近我的时候星球变大，远离我时变小*/
  id="first"
  attributeType="XML"
  attributeName="transform"
  type="scale"
  begin="0;second.end "
  from="1"
  to="0.512"
  dur="3s"
  fill="freeze"
/>
<animateTransform
  id="second"
  attributeType="XML"
  attributeName="transform"
  type="scale"
  begin="first.end"
  from="0.512"
  to="1"
  dur="3s"
  fill="freeze"
/>
```

* [CSS 3D](https://www.jianshu.com/p/2b85973ad1ed)
``` html
 <!-- 轨道 -->
<div class="orbit">
  <!-- 行星 -->
  <div class="planet planet1">
    <!-- <span class="name"></span> -->
  </div>
  <div class="planet planet2">
    <!-- <span class="name"></span> -->
  </div>
</div>
```
``` css
.orbit { /*轨道旋转，公转*/
    border:5px solid red;
    transform-style:preserve-3d;
    padding:65px;
    width:500px;
    height:500px;
    border-radius:50%;
    animation:orbit-rotate 10s liner infinite;
}
.planet {/*星球自传*/
    width:50px;
    height:50px;
    background:url('/images/drone.png') no-reapt;
    backgroung-size:100% 100%;
    border-radius:50%;
    animation:self-rotate 10s linear infinite;
}
/*（1）rotateX 是为了让整个面倾斜，translateZ是为了防止椭圆（border）因为倾斜发生锯齿，
（2）停顿效果的产生，其实我是走了野路子的。五个球，根据360/5=72,写了五个不同的关于orbit的class，
0 + 72，...360依次增加72，直到360，利用setimeout每隔4秒，按顺序切换一个class */
@keyframes orbit-rotate{
    0%{
        transform:rotateX(70deg) rotateZ(0deg) translateZ(0);
    }

    100%{
        transform:rotateX(70deg) rotateZ(-360deg) translateZ(0);
    }
}

@keyframes self-rotate{
    0%{
        transform:rotateX(-90deg) rotateY(-360deg) rotateZ(0deg);
    }

    100%{
        transform:rotateX(-90deg) rotateY(0deg) rotateZ(0deg);
    }
}

.planet1{/*行星1开始的位置*/
    position:absolute;
    top:65px;
    right:65px;
}
.planet2{
    position:absolute;
    bottom:65px;
    right:65px;
}

```
改进版
``` js
const orbitStyle = {
  transform: `rotateX(70deg) rotateZ(${activeCircle * -72}deg) translateZ(0)`,
};
const planetStyle = (index, l) => {
  // l是数组的长度
  const average = l / 2; // 计算平均数
  const gap = 0.8 * (average - Math.abs(Math.abs(index - (activeCircle % l)) - average)); // 先求不同球不同时间的绝对值来计算点在区间的距离，再根据距离计算改变值
  return {
    transform: `rotateX(-90deg) rotateY(${360 -
      activeCircle * 72}deg) rotateZ(0deg) scale(${gap})`,
    opacity: gap,
  };
};
```

### CSS 动画

- animation 关键帧动画
(1) transition-property：属性名称
(2) transition-duration: 间隔时间
(3) transition-timing-function: 动画曲线
(4) transition-delay: 延迟

- transform 过渡动画
(1) animation-name：动画名称
(2) animation-duration: 间隔时间
(3) animation-timing-function: 动画曲线
(4) animation-delay: 延迟
(5) animation-iteration-count：动画次数
(6) animation-direction: 方向
(7) animation-fill-mode: 禁止模式


## [水平居中](https://louiszhai.github.io/2016/03/12/css-center/)

1. 行内元素使用text-align:center 实现行内元素水平居中
2. 块级元素，设置margin:0 auto;
``` csss
.parent {
    width: -webkit-fit-content;
    width: -moz-fit-content;
    width: fit-content;
    margin: 0 auto;
}
```
3. flex布局 display：flex; justify-content:center;
``` css
// flex 2012年版本写法
.parent {
    display: flex;
    flex-direction: row;
    justify-content: center;
}

// flex 2009年版本写法
.parent {
    display: box;
    box-orient: horizontal;
    box-pack: center;
}
```
4. transform属性 position:absolute;left:50%;transform；translate(-50%,0)
``` css
.child {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
}
```
5. 绝对定位 position:absolute;width:200px;left:50%;margin-left:-100px;(需要固定宽度)
```  css
.child {
    position: absolute;
    left: 50%;
    width: 200px; // 假定宽度为200px
    margin-left: -100px; // 负值的绝对值为宽度的一半
}
```
6. 绝对定位 position:absolute;left:0;right:0;margin:0 auto;(需要固定宽度)
``` css
.child {
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 200px; // 假定宽度为200px
}
```


## 垂直居中

1. 单行文本设置line-height:父元素高度
2. 行内块级元素 display:inline-block、vertical-align:middle和伪元素让内容居中
``` css
.parent::after .son{
    display:inline-block;
    vertical-align:middle;
}
.parent::after{
    content:'';
    height：100%;
}
```
3. transform 设置父元素相对定位(position:relative),子元素如下：
``` css
.son {
    position:absolute;
    top:50%;
    transform:(-50%,-50%);
}
```
4. 设置父元素相对定位 position：relative,子元素CSS样式如下：
``` css
.son{
    position:absolute;
    height:200px;
    top:0;
    bottom:0;
    margin:auto 0;
}
```
5. 设置父元素相对定位 position：relative,子元素CSS样式如下：
``` css
.son {
    position:absolute;
    height:200px;
    top:0;
    bottom:0;
    margin:auto 0;
}
```
6. 使用vertical-align属性并且配合使用display:table和display:table-cell来让内容块居中
``` css
.parent {
    display: table;
}

.child {
    display: table-cell;
    vertical-align: middle;
}
```

7. 使用flex布局的方式，可以轻松实现垂直居中，即使子元素中存在浮动元素也同样适用
``` css
// flex 2012年版本写法
.parent {
    display: flex;
    align-items: center;
}

// flex 2009年版本写法
.parent {
    display: box;
    box-orient: vertical;
    box-pack: center;
}
```

### 水平垂直居中

1. 使用flex布局的方式同样可以轻松实现水平垂直居中
``` css
// flex 2012年版本写法
.parent {
    display: flex;
    justify-content: center;
    align-items: center;
}

// flex 2009年版本写法
.parent {
    display: box;
    box-pack: center;
    box-align: center;
}
```

2. 使用绝对定位的方式，再配合CSS3新增的transform属性
``` css
.child {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
```
3. 使用绝对定位的方式，再配合使用负值的margin-top和负值的margin-left(此方法需要同时固定宽度和高度)
``` css
.child {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -50px; // 负值的绝对值为高度的一半
    margin-left: -100px; // 负值的绝对值为宽度的一半
    width: 200px; // 假定宽度为200px
    height: 100px; // 假定高度为100px
}
```



 # [CSS定位](https://www.w3school.com.cn/cssref/pr_class_position.asp)

* position: absolute;
   * 生成绝对定位的元素，相对于 static 定位以外的第一个父元素进行定位。
   * 元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。
* position: fixed;
   * 生成绝对定位的元素，相对于浏览器窗口进行定位。
   * 元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。
* position: relative;
   * 生成相对定位的元素，相对于其正常位置进行定位。因此，"left:20" 会向元素的 LEFT 位置添加 20 像素。
* position: inherit;
   * 规定应该从父元素继承 position 属性的值。
* position: static;
   * 默认值。没有定位，元素出现在正常的流中（忽略 top, bottom, left, right 或者 z-index 声明）


## [布局](https://developer.mozilla.org/en-US/docs/Web/CSS/display)

### [flex](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool)

### [table](https://www.cnblogs.com/goloving/p/7678291.html)

### 三栏布局

1. 绝对定位
``` css
.container {
    position: relative;
    height: 200px;
    line-height: 200px;
    text-align: center;
    font-size: 20px;
    color: #fff;
}

.left {
    position: absolute;
    left: 0;
    top: 0;
    width: 150px;
    background: red;
}

.main {
    margin-left: 160px;
    margin-right: 110px;
    background: green;
}

.right {
    position: absolute;
    right: 0;
    top: 0;
    width: 100px;
    background: blue;
}

<div class="container">
    <div class="left">左</div>
    <div class="main">中</div>
    <div class="right">右</div>
</div>
```
::: tip
优点：方便快捷，简单实用，不容易出现问题，而且还可以将<div class="main"></div>元素放到最前面，使得主要内容被优先加载。
缺点：元素脱离了文档流，可能会造成元素的重叠。
:::

2. flex布局实现
``` css
.container {
    display: flex;		
    height: 200px;
    line-height: 200px;
    text-align: center;
    font-size: 20px;
    color: #fff;
}

.left {
    width: 150px;
    background: red;
}

.main {
    margin: 0 10px;
    flex: 1;
    background: green;
}

.right {
    width: 100px;
    background: blue;
}

<div class="container">
    <div class="left">左</div>
    <div class="main">中</div>
    <div class="right">右</div>
</div>
```
::: tip
优点：简单实用，是现在比较流行的方案，特别是在移动端，大多数布局都采用的这种方式，是目前比较完美的一个。
缺点：需要考虑到浏览器的兼容性，根据不同的浏览器厂商需要添加相应的前缀。
:::

3. 双飞翼布局

``` css
.content {
    float: left;
    width: 100%;
}

.main,
.left,
.right {
    height: 200px;
    line-height: 200px;
    text-align: center;
    font-size: 20px;
    color: #fff;
}

.main {
    margin-left: 160px;
    margin-right: 110px;
    background: green;
}

.left {
    float: left;
    margin-left: -100%;
    width: 150px;
    background: red;
}

.right {
    float: right;
    margin-left: -100px;
    width: 100px;
    background: blue;
}

<div class="content">
    <div class="main">中</div>
</div>
<div class="left">左</div>
<div class="right">右</div>
```
::: tip
优点：比较经典的一种方式，通用性强，没有兼容性问题，而且支持主要内容优先加载。
缺点：元素脱离了文档流，要注意清除浮动，防止高度塌陷，同时额外增加了一层DOM结构，即增加了渲染树生成的计算量。
:::

4. 圣杯布局
``` css
.container {
    margin-left: 160px;
    margin-right: 110px;
}

.left,
.main,
.right {
    height: 200px;
    line-height: 200px;
    text-align: center;
    font-size: 20px;
    color: #fff;	
}

.main {
    float: left;
    width: 100%;
    background: green;		
}

.left {
    position: relative;
    left: -160px;
    margin-left:  -100%;
    float: left;
    width: 150px;
    background: red;
}

.right {
    position: relative;
    right: -110px;
    margin-left:  -100px;
    float: left;
    width: 100px;
    background: blue;
}

<div class="container">
    <div class="main">中</div>
    <div class="left">左</div>
    <div class="right">右</div>
</div>
```
::: tip
优点：相比于双飞翼布局，结构更加简单，没有多余的DOM结构层，同样支持主要内容优先加载。
缺点：元素同样脱离了文档流，要注意清除浮动，防止高度塌陷。
:::

### 等高布局
- 伪登高
* 使用padding-bottom和负的margin-bottom
``` css
.container {
    position: relative;
    overflow: hidden;
}
    
.left,
.main,
.right {
    padding-bottom: 100%;
    margin-bottom: -100%;
    float: left;
    color: #fff;
}

.left {
    width: 20%;
    background: red;
}

.main {
    width: 60%;
    background: green;
}

.right {
    width: 20%;
    background: blue;
}
``` 
``` html
<div class="container">
    <div class="left">左侧内容</div>
    <div class="main">
        <p>中间内容</p>
        <p>中间内容</p>
        <p>中间内容</p>
    </div>
    <div class="right">右侧内容</div>
</div>
```

- 真登高
``` css
.container{
    display:flex;
}

.left,
.main,
.right{
    flex:1;
    color:#fff;
}

.left{
    background:red;
}
.main{
    background:green;
}
.right{
    background:blue;
}
```
``` html
<div>
     <div class="left">左侧内容</div>
    <div class="main">
        <p>中间内容</p>
        <p>中间内容</p>
        <p>中间内容</p>
    </div>
    <div class="right">右侧内容</div>
</div>
```

* 使用绝对定位的方式
``` css
.container {
  position: relative;
  height: 200px;
}

.left,
.main,
.right {
    position: absolute;
    top: 0;
    bottom: 0;
    color: #fff;
}

.left {
    left: 0;
    width: 20%;
    background: red;
}

.main {
    left: 20%;
    right: 20%;
    background: green;
}

.right {
    right: 0;
    width: 20%;
    background: blue;
}

```

``` html
<div class="container">
    <div class="left">左侧内容</div>
    <div class="main">
        <p>中间内容</p>
        <p>中间内容</p>
        <p>中间内容</p>
    </div>
    <div class="right">右侧内容</div>
</div>
```
* table布局
``` css
.container {
    width: 100%;
    display: table;
}

.left,
.main,
.right {
    display: table-cell;
    color: #fff;
}

.left {
    width: 20%;
    background: red;
}

.main {
    width: 60%;
    background: green;
}

.right {
    width: 20%;
    background: blue;
}

```

``` html
<div class="container">
    <div class="left">左侧内容</div>
    <div class="main">
        <p>中间内容</p>
        <p>中间内容</p>
        <p>中间内容</p>
    </div>
    <div class="right">右侧内容</div>
</div>
```

* 使用gridb布局
``` css
.container {
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr 1fr;
    color: #fff;
}

.left {
    background: red;
}

.main {
    background: green;
}

.right {
    background: blue;
}
```

``` html
<div class="container">
    <div class="left">左侧内容</div>
    <div class="main">
        <p>中间内容</p>
        <p>中间内容</p>
        <p>中间内容</p>
    </div>
    <div class="right">右侧内容</div>
</div>
```



## [CSS可继承](https://www.cnblogs.com/songchunmin/p/7789599.html)

### 1、无继承性的属性

1. display：规定元素应该生成的框的类型
2. 文本属性：
* vertical-align：垂直文本对齐
* text-decoration：规定添加到文本的装饰
* text-shadow：文本阴影效果
* white-space：空白符的处理
* unicode-bidi：设置文本的方向

3. 盒子模型的属性：width、height、margin 、margin-top、margin-right、margin-bottom、margin-left、border、border-style、border-top-style、border-right-style、border-bottom-style、border-left-style、border-width、border-top-width、border-right-right、border-bottom-width、border-left-width、border-color、border-top-color、border-right-color、border-bottom-color、border-left-color、border-top、border-right、border-bottom、border-left、padding、padding-top、padding-right、padding-bottom、padding-left

4. 背景属性：background、background-color、background-image、background-repeat、background-position、background-attachment

5. 定位属性：float、clear、position、top、right、bottom、left、min-width、min-height、max-width、max-height、overflow、clip、z-index

6. 生成内容属性：content、counter-reset、counter-increment

7. 轮廓样式属性：outline-style、outline-width、outline-color、outline

8. 页面样式属性：size、page-break-before、page-break-after

9. 声音样式属性：pause-before、pause-after、pause、cue-before、cue-after、cue、play-during

 
### 2、有继承性的属性

1. 字体系列属性
* font：组合字体
* font-family：规定元素的字体系列
* font-weight：设置字体的粗细
* font-size：设置字体的尺寸
* font-style：定义字体的风格

font-variant：设置小型大写字母的字体显示文本，这意味着所有的小写字母均会被转换为大写，但是所有使用小型大写字体的字母与其余文本相比，其字体尺寸更小。

* font-stretch：对当前的 font-family 进行伸缩变形。所有主流浏览器都不支持。
* font-size-adjust：为某个元素规定一个 aspect 值，这样就可以保持首选字体的 x-height。

2. 文本系列属性

* text-indent：文本缩进
* text-align：文本水平对齐
* line-height：行高
* word-spacing：增加或减少单词间的空白（即字间隔）
* letter-spacing：增加或减少字符间的空白（字符间距）
* text-transform：控制文本大小写
* direction：规定文本的书写方向
* color：文本颜色

3. 元素可见性：visibility

4. 表格布局属性：caption-side、border-collapse、border-spacing、empty-cells、table-layout

5. 列表布局属性：list-style-type、list-style-image、list-style-position、list-style

6. 生成内容属性：quotes

7. 光标属性：cursor

8. 页面样式属性：page、page-break-inside、windows、orphans

9. 声音样式属性：speak、speak-punctuation、speak-numeral、speak-header、speech-rate、volume、voice-family、pitch、pitch-range、stress、richness、、azimuth、elevation
 

### 3、所有元素可以继承的属性

1. 元素可见性：visibility

2. 光标属性：cursor

 
### 4、内联元素可以继承的属性

1. 字体系列属性

2. 除text-indent、text-align之外的文本系列属性

### 5、块级元素可以继承的属性

1. text-indent、text-align

## [SCSS SASS & LESS](https://www.jianshu.com/p/6489e28e548e)
什么是Sass、Less

Sass和Less都属于Css预处理器，Css预处理器定义了一种新的语言，其基本思想是用一种专门的编程语言，为Css增加一些编程的特性，将Css作为目标生成文件，然后开发者使用这种语言进行Css编码工作(用一种专门的编程语言，进行Web网页样式设计，再通过编译器转化为正常的Css文件，以供项目使用)。

### Less与Sass的共性：

* 混合(Mixins):将一个定义好的classA引入到另一个classB中，从而简单实现classB继承了classA的所有属性；
* 参数混合(Parametric):可以像函数一样传递参数的class
* 嵌套规则：class中嵌套class,从而减少重复的代码
* 运算：css中的数学计算
* 颜色功能：可以编辑你的颜色
* 命名空间：样式分组，从而方便被调用
* 作用域：局部修改样式
* JavaScript表达式：在css样式中使用javaScript表达式赋值
### Less与Sass的不同：

* Less是基于JavaScript的在客户端处理，很多开发者不会选择Less因为javaScript引擎需要额外的时间来处理代码然后输出修改过的Css到浏览器【解决：只在开发阶段使用Less,一旦开发完成，复制Less输出的到一个压缩器，然后用一个单独的css文件来代替Less文件；另一种方式是使用Less App来编译和压缩你的Less文件；这两种方式都是最小化样式输出】
Sass是基于ruby在服务器处理

## [shadow dom](https://www.jianshu.com/p/e47b103f3b60)

Shadow DOM 为 Web 组件中的 DOM 和 CSS 提供了封装。Shadow DOM 使得这些东西与主文档的 DOM 保持分离。你也可以在一个Web组件外部使用 Shadow DOM 本身。
为什么要把一些代码和网页上其他的代码分离？原因之一是，大型站点若CSS没有良好的组织，导航的样式可能就『泄露』到本不应该去的地方，如主要内容区域，反之亦然。随着站点、应用的拓展，这样的事难以避免。

可以通过element.createShadowRoot()来创建目标容器（shadow-host）对应deshadow-root。
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>shadow-dom</title>
    <style>
        h1, p {
            color: #db73ff !important;
        }
        #host {
            background-color: yellow;
        }
    </style>
</head>
<body>
<div id="host">
    <h1 class="title">I am title</h1>
    <p class="subtitle">I am subtitle</p>
</div>
<template id="temp">
    <style>
        span {
            color: red;
        }
        ::content * {
            background-color: #60d9ff;
        }
        :host {
            border: 2px solid #14ff1a;
        }
    </style>
    <p onclick="alert('hello~');" pseudo="test">template - 点我吧~~</p>
    <span>I'm the span tag of template</span>
    <!-- 绑定#host所有内容 -->
    <!--<content></content>-->

    <!-- 绑定#host p的内容 -->

    <content select=".subtitle"></content>
    <!-- 绑定#host h1的内容 -->
    <content select="h1"></content>

</template>
<script>
    var host = document.querySelector('#host');
    var root = host.createShadowRoot();
    var temp = document.querySelector('#temp');
    var clone = document.importNode(temp.content, true);

    root.appendChild(clone);
    document.addEventListener('click', function(e) {

        console.log(e.target.innerHTML + ' click!');
    });
</script>
```

* 主dom可以修改shadow-host的样式；
* 在shadow-dom中用:host选择器表示shadow-host；
* 在shadow-dom中用::content选择器表示在template标签中用到的\<content>，只能通过该选择器来操作其后代元素（即通过select来选中的元素，该元素既受主dom样式影响也受template里的style声明的样式::content影响）。；
* 要更改shadow-root里面元素的样式，可以直接在template标签内添加style标签像平时写样式一样即可。（content里面指代的元素样式要用::content更改）；
* shadow-dom 和 主dom的样式互不影响；

## [EM REM PX ](https://www.cnblogs.com/wind-lanyan/p/6978084.html)
在css中单位长度用的最多的是px、em、rem，这三个的区别是：

* px是固定的像素，一旦设置了就无法因为适应页面大小而改变。
* em和rem相对于px更具有灵活性，他们是相对长度单位，意思是长度不是定死了的，更适用于响应式布局。
* 对于em和rem的区别一句话概括：em相对于父元素，rem相对于根元素。
* rem中的r意思是root（根源），这也就不难理解了。
### em

* 子元素字体大小的em是相对于父元素字体大小
* 元素的width/height/padding/margin用em的话是相对于该元素的font-size
``` css
div {
  font-size: 40px;
  width: 10em; /* 400px */
  height: 10em;
  border: solid 1px black;
}
p {
  font-size: 0.5em; /* 20px */ 
  width: 10em; /* 200px */
  height: 10em;
  border: solid 1px red;
}
span {
  font-size: 0.5em;  //10px
  width: 10em;
  height: 10em;
  border: solid 1px blue;
  display: block;
}

<div>
    我是父元素div
    <p>
        我是子元素p
        <span>我是孙元素span</span>
    </p>
</div>
```
巩固测验：你能说出孙元素span的font-size和width吗？

答案：我猜你会说10px、100px，哈哈，其实逻辑上是正确的，但是如果你是chrome浏览器我不得不告诉你应该是12px、120px。因为chrome设置的最小

字体大小为12px，意思就是说低于12px的字体大小会被默认为12px，当然这一尬境可以由css3解决，这里就不多说了。

chrome默认的字体大小是12px，也就是1em默认为12px，如果最外层的父元素直接把font-size设为1.5em，那么该元素的字体大小为18px（12*1.5）。

### rem
rem是全部的长度都相对于根元素，根元素是谁？\<html>元素。通常做法是给html元素设置一个字体大小，然后其他元素的长度单位就为rem。

上代码：（html代码如上，只是把css代码的元素长度单位变了）
``` css
html {
    font-size: 10px;
    }
div {
    font-size: 4rem; /* 40px */
    width: 30rem;  /* 300px */
    height: 30rem;
    border: solid 1px black;
}
p {
    font-size: 2rem; /* 20px */
    width: 15rem;
    height: 15rem;
    border: solid 1px red;
}
span {
    font-size: 1.5rem;
    width: 10rem;
    height: 10rem;
    border: solid 1px blue;
    display: block;
}
```

### [line-height height](https://mp.weixin.qq.com/s/1E5Ac5_KxzubRobTmokOeA)
当line-height=height单行文本垂直居中
``` css
<!DOCTYPE html>
<html>
    <head>
    <meta charset="utf-8">
    <title>JS Bin</title>
  </head>
  <body>
    <p>Hello Oli的前端一万小时</p>
  </body>
</html>

p {
  width: 300px; 
  border: 1px solid blue;
  height: 50px;
  line-height: 50px;
}
```
line-height=line-height：200%

line-height: 2; 和 line-height: 200%; 都表示行高是字体大小的 2 倍，但是它们是有区别的。
当它们写在父容器中时，子元素的字体大小不一样的时候，区别就体现出来了：

* line-height: 2; 写在父容器中，那么子元素的行高都是自身高度的 2 倍，是相对大小。子元素的字体大小不同，行高也会不同。
* line-height: 200%; 写在父容器中，那么浏览器会立刻计算出行高的具体值，假如父容器的默认字体大小16px，那么计算得到的行高就是 2×16px=32px，子元素的行高都会继承这个 32px，是固定大小。子元素的字体大小不同，行高都是固定某个值。


## CSS选择器

### [link和@import](https://mp.weixin.qq.com/s/OQL8JVDuJopphXqAEp5AWQ)

### [元素关系](https://mp.weixin.qq.com/s/TjVivhhlOTfDA3Plk0KEPw)

#### 文档树结构
1. 父子关系元素：如果一个元素出现在文档层次结构中另一个元素的上一层，则称前者是后者的“父元素”，后者是前者的“子元素”。

2. 祖孙-后代：如果一个元素在另一个元素的直接上一层，他们是“父子关系”，而如果一个元素到另一个元素的路径要经过两层或多层，这些元素则是“祖孙-后代关系”。

3. 根元素：body 元素是浏览器默认显示的所有元素的祖先， html 元素则是整个文档的祖先（因此，html 元素又称“根元素”）。

#### 组合选择器
1. 多元素选择器：为多个元素应用同一个样式
``` css
h1,h2 {
    background:yellow;
}
```
2. 后代选择器：使一些样式、规则只在某一些指定的有“祖孙-后代关系”的后代元素上适用，其他非指定的结构中不适用；
``` css
ul li{
    text-decoration:line-through;
    background:yellow;
}
```
3. 子元素选择器：使一些样式、规则只在某一些指定的有直接的“父子关系”的子元素上适用，其他非指定的结构中不适用；
``` css
p>em{
    text-decoration:line-through;
    background:yellow;
}
```
4. 直接相邻元素选择器：前提，两个元素有共同的父元素，且后一个元素“紧接”在前一个元素后边时，你想对后一个元素添加样式；
``` css
h2+p{
    text-decoration:line-through;
    background:yellow;
}
```
5. 普通相邻元素选择器：相对于“直接相邻元素选择器”而言，两个元素也必须有共同的父元素，但后一个元素不需要“紧接”在前一个元素后边，你也可以对后一个元素添加样式;
``` css
h2~h2{
    text-decoration:
}
```
#### text属性

text-transform 用于设置要转换的字体
``` css
p {
  text-transform: 值;
}

none        防止任何转型。
uppercase   将所有文本转为大写。
lowercase   将所有文本转为小写。
capitalize  转换所有单词让其首字母大写。
full-width  将所有字形转换成固定宽度的正方形，类似于等宽字体，允许对齐。主要用于：拉丁字符以及亚洲语言字形（如中文，日文，韩文）。
```

text-decoration 设置用于加一些，下划线、上划线、穿过文本的线 
``` css
p {
  text-decoration: 值;
}

none          取消已经存在的任何文本装饰。
underline     文本下划线。
overline      文本上划线。
line-through  穿过文本的线。 

注意：text-decoration 是一个缩写形式，它由 text-decoration-line，text-decoration-style 和 text-decoration-color 构成。
所以，我们在实际工作中可以使用这些属性值的组合来实现一些效果。
```

text-shadow 文本加阴影
``` css
p {
  text-shadow: 值① 值② 值③ 值④;
}
```
这里的“值”比较特别，它需要 4 个独立的值来定义：

值①，指定阴影的基础“颜色”；
值②，指定阴影与原始文本的水平偏移“距离”，这个值必须指定。距离的长度可以使用大多数的 CSS 单位，但实际工作中用 px 最为合适。正长度值向右偏移，负长度值向左偏移。
值③，指定阴影与原始文本的垂直偏移“距离”，这个值也必须指定。正长度值向下偏移，负长度值向上偏移。
值④，指定阴影的“模糊半径”。更高的值意味着阴影分散得更广泛。这个值非必须指定，如果不指定此值，则默认为 0，即没有模糊。

6. 首行缩进
text-indent 属性用于指定文本内容的第一行前面应该留出多少的水平空间

7. 本文水平对齐
text-align:用于控制文本如何和它所在的内容盒子水平对齐。
``` css
p {
  text-align: 值;
}

left       左对齐文本。
right      右对齐文本。
center     居中文字。

justify    使文本展开，改变单词之间的距离，使所有文本行的宽度相同。
实际工作中使用时需要注意，特别是当应用于其中有很多长单词的段落时。
如果我们要使用这个，我们应该考虑一起使用别的东西，比如 hyphens 来打破一些更长的词语。
```

text-align-last:属性用于定义一段文本内容的最后一行在被强制换行之前的对齐规则。
8. 行高
line-height 属性用于设置文本每行之间的高

9. 字母和字间距
word-spacing 属性用于修改“字”与“字”之间的间隔长度；

letter-spacing 属性用于修改“字母、字符”与“字母、字符”之间间隔的长度。

10. 空白字符
white-space:用于处理'字之间'和'文本之间'的空白符显示方式
``` css
p {
  white-space: 值;
}

normal     和默认的一样，合并所有的空白符，并忽略换行符。
pre        浏览器不会合并空白符，也不会忽略换行符。
nowrap     不换行。
pre-wrap   浏览器不仅会保留空白符并保留换行符，还允许自动换行。
pre-line   浏览器会保留换行符，并允许自动换行，但是会合并空白符，这是与 pre-wrap 值的不同之处。
```

#### [float](https://mp.weixin.qq.com/s/HwG7AFf_fHc5St1nv95n5w)

假设我们需要有个东西，然后它的排版不是依照盒模型的定义——从上往下依次排列，而是从左到右这种结构，那么我们需要考虑到使用“浮动”。

1. 浮动的效果
一个“浮动盒”会向左或向右移动，直到其外边（outer edge）挨到包含块边沿或者另一个浮动盒的外边。如果没有足够的水平空间来浮动，它会向下移动，直到空间合适或者不会再出现其它浮动了。
2. 元素高度不一致
3. 浮动元素与文本重叠
4. 脱离文档流
脱离普通流是指：他的父容器在去计算宽高的时候，发现不了浮动元素。即，父容器不会被里面的浮动元素撑开；

5. 两栏布局
``` html
<div class="aside">侧边栏固定宽度</div>
<div class="main">内容区块自适应宽度</div>
```

``` css
.aside {
  color: #fff;
  width: 150px;
  height: 400px;
  background: red;
  float: left;
}
.main {
  color: #fff;
  margin-left: 160px;
/*🚀表示左边的这 160px 的范围我不用了*/

  background: blue;
  height: 500px;
}
```

6. 三栏布局
``` html
<div class="menu">侧边栏固定宽度</div>
<div class="aside">侧边栏固定宽度</div>
<div class="main">内容区块自适应宽度</div>
```
``` css
.menu {
  color: #fff;
  width: 150px;
  height: 400px;
  background: red;
  float: left;
}
.aside { 
  color: #fff;
  width: 150px;
  height: 400px;
  background: red;
  float: right;
}
.main {
  color: #fff;
  margin-right: 160px;
  margin-left: 160px;
/*🚀加左右 margin 就把位置撑开了*/
  background: blue;
  height: 500px;
}
```

7. 清除“浮动”
* 浮动对后续元素位置产生影响（渲染时，因为块元素看不见，但里边的文字看的见）
``` html
<div id="content">
  <div class="menu">侧边栏固定宽度</div>
  <div class="aside">侧边栏固定宽度</div>
  <div class="main">内容区块自适应宽度</div>
</div>
<div id="footer">我是 footer，但我的样式出现了问题</div>
```

``` css
.menu {
  color: #fff;
  width: 150px;
  height: 300px;
  background: red;
  float: left;
}
.aside { 
  color: #fff;
  width: 150px;
  height: 300px;
  background: red;
  float: right;
}
.main {
  color: #fff;
  margin-right: 160px;
  margin-left: 160px;
  background: blue;
  height: 200px;
}
#footer {
  color: #fff;
  background: grey;
}
```
* 父容器高度计算出现问题
``` css
<ul class="navbar">
  <li><a href="#">1首页</a></li>
  <li><a href="#">2产品</a></li>
  <li><a href="#">3服务</a></li>
  <li><a href="#">4关于</a></li>
</ul>
```

```  css
.navbar {
  list-style: none;
  border: 1px solid #ccc;
  /*加一个背景色也没效果：
  background: pink;*/
}
.navbar>li {
  float: left;
  margin-left: 15px;
}

/*🚀由于浮动元素脱离了文档流，所以他的父元素是看不见他的。
这里对于 navbar 来说，他认为里边没有什么 li 来把它撑开，
因为 li 已经浮动了，那没有东西撑开它，它就会认为高度为 0。*/
```

8. 清除浮动
   * clear:both
``` html
<ul class="navbar">
  <li><a href="#">1首页</a></li>
  <li><a href="#">2产品</a></li>
  <li><a href="#">3服务</a></li>
  <li><a href="#">4关于</a></li>

  <li class="clear"></li>
<!-- 🚀想解决这个没办法撑开的问题，
那么就要求这个源文档中要有一个没有被浮动的的元素——普通元素。--> 
</ul>
```
``` css
.navbar {
  list-style: none;
  border: 1px solid #ccc;
}
.navbar>li {
  float: left;
  margin-left: 15px;
}

.navbar .clear {
  float: none;
  clear: left;
}
/*🚀通过清除浮动来获得一个普通元素，进而撑开这个父容器*/
```
   * after伪元素
``` html
<ul class="navbar">
  <li><a href="#">1首页</a></li>
  <li><a href="#">2产品</a></li>
  <li><a href="#">3服务</a></li>
  <li><a href="#">4关于</a></li>
</ul>
```

``` css
.navbar {
  list-style: none;
  border: 1px solid #ccc;
}
.navbar>li {
  float: left;
  margin-left: 15px;
}

.navbar::after {
  content: '';
/*🚀写了一个元素，你必须要有 content */

  display: block;
/*🚀注意这里如果没有这个 block，是不会生效的，
因为写了 after，只是表示是一个匿名的行盒，即一个字符串。
然而他必须是块级元素，他才会下去。*/

  clear: both;
}
/*🚀用伪元素这样写就是表示：
我在源文档 navbar 的最后生成了一个 block 元素，
然后清除浮动，他就会位于浮动盒子的下方，
进而撑开了 navbar 这个父容器。*/
```

:::