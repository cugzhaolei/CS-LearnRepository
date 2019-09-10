:::tip
# CSS操作相关

## 盒模型

![](/images/html-box-mode.webp)

ie盒模型算上border、padding及自身（不算margin），标准的只算上自身窗体的大小 css设置方法如下：
``` css
/* 标准模型 */
box-sizing:content-box;
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
## [css可继承和不可继承的元素](https://www.cnblogs.com/songchunmin/p/7789599.html)
### 一、无继承性的属性

1、display：规定元素应该生成的框的类型

2、文本属性：
* vertical-align：垂直文本对齐
* text-decoration：规定添加到文本的装饰
* text-shadow：文本阴影效果
* white-space：空白符的处理
* unicode-bidi：设置文本的方向

3、盒子模型的属性：width、height、margin 、margin-top、margin-right、margin-bottom、margin-left、border、border-style、border-top-style、border-right-style、border-bottom-style、border-left-style、border-width、border-top-width、border-right-right、border-bottom-width、border-left-width、border-color、border-top-color、border-right-color、border-bottom-color、border-left-color、border-top、border-right、border-bottom、border-left、padding、padding-top、padding-right、padding-bottom、padding-left

4、背景属性：background、background-color、background-image、background-repeat、background-position、background-attachment

5、定位属性：float、clear、position、top、right、bottom、left、min-width、min-height、max-width、max-height、overflow、clip、z-index

6、生成内容属性：content、counter-reset、counter-increment

7、轮廓样式属性：outline-style、outline-width、outline-color、outline

8、页面样式属性：size、page-break-before、page-break-after

9、声音样式属性：pause-before、pause-after、pause、cue-before、cue-after、cue、play-during

 
### 二、有继承性的属性

1、字体系列属性
* font：组合字体
* font-family：规定元素的字体系列
* font-weight：设置字体的粗细
* font-size：设置字体的尺寸
* font-style：定义字体的风格

font-variant：设置小型大写字母的字体显示文本，这意味着所有的小写字母均会被转换为大写，但是所有使用小型大写字体的字母与其余文本相比，其字体尺寸更小。

* font-stretch：对当前的 font-family 进行伸缩变形。所有主流浏览器都不支持。
* font-size-adjust：为某个元素规定一个 aspect 值，这样就可以保持首选字体的 x-height。

2、文本系列属性

* text-indent：文本缩进
* text-align：文本水平对齐
* line-height：行高
* word-spacing：增加或减少单词间的空白（即字间隔）
* letter-spacing：增加或减少字符间的空白（字符间距）
* text-transform：控制文本大小写
* direction：规定文本的书写方向
* color：文本颜色

3、元素可见性：visibility

4、表格布局属性：caption-side、border-collapse、border-spacing、empty-cells、table-layout

5、列表布局属性：list-style-type、list-style-image、list-style-position、list-style

6、生成内容属性：quotes

7、光标属性：cursor

8、页面样式属性：page、page-break-inside、windows、orphans

9、声音样式属性：speak、speak-punctuation、speak-numeral、speak-header、speech-rate、volume、voice-family、pitch、pitch-range、stress、richness、、azimuth、elevation
 

### 三、所有元素可以继承的属性

1、元素可见性：visibility

2、光标属性：cursor

 
### 四、内联元素可以继承的属性

1、字体系列属性

2、除text-indent、text-align之外的文本系列属性

### 五、块级元素可以继承的属性

1、text-indent、text-align

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

:::