# CSS操作相关



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
／／举例一个星球的动画
<animateMotion dur="6s" begin="0" repeatCount="indefinite">
  <mpath xlinkHref="#Path-12" /> //轨迹动画
</animateMotion>
<animateTransform ／／自身动画，靠近我的时候星球变大，远离我时变小
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
