# [Flex](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout)

CSS 弹性盒子布局是 CSS 的模块之一，定义了一种针对用户界面设计而优化的 CSS 盒子模型。在弹性布局模型中，弹性容器的子元素可以在任何方向上排布，也可以“弹性伸缩”其尺寸，既可以增加尺寸以填满未使用的空间，也可以收缩尺寸以避免父元素溢出。子元素的水平对齐和垂直对齐都能很方便的进行操控。通过嵌套这些框（水平框在垂直框内，或垂直框在水平框内）可以在两个维度上构建布局。

## 基本概念

### 轴

在 flex 布局中有个主轴和交叉轴的概念 flex-direction

```bash
* row -->
* row-reverse <--
* column
* column
```

交叉轴是与主轴垂直的轴

### 起始线和终止线

如果 flex-direction 是 row ，并且我是在书写英文，那么主轴的起始线是左边，终止线是右边。

在书写阿拉伯文章的时候方向是正好相反的

## flex 容器

文档中采用了 flexbox 的区域就叫做 flex 容器。为了创建 flex 容器， 我们把一个容器的 display 属性值改为 flex 或者 inline-flex。 完成这一步之后，容器中的直系子元素就会变为 flex 元素。所有 CSS 属性都会有一个初始值，所以 flex 容器中的所有 flex 元素都会有下列行为：

- 元素排列为一行 (flex-direction 属性的初始值是 row)。
- 元素从主轴的起始线开始。
- 元素不会在主维度方向拉伸，但是可以缩小。
- 元素被拉伸来填充交叉轴大小。
- flex-basis 属性为 auto。
- flex-wrap 属性为 nowrap。

这会让你的元素呈线形排列，并且把自己的大小作为主轴上的大小。如果有太多元素超出容器，它们会溢出而不会换行。如果一些元素比其他元素高，那么元素会沿交叉轴被拉伸来填满它的大小。

```html
<style>
  .box {
    display: flex;
  }
</style>

<div class="box">
  <div>One</div>
  <div>Two</div>
  <div>Three <br />has <br />extra <br />text</div>
</div>
```

## flex flex 属性

CSS 属性 flex 规定了弹性元素如何伸长或缩短以适应 flex 容器中的可用空间。这是一个简写属性，用来设置 flex-grow, flex-shrink 与 flex-basis。

## 参考链接

1. [mdn](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex)
2. [阮一峰](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
