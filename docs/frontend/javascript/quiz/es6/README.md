# ES6

用ES6的知识解决实际开发问题
参考[前端小智](https://juejin.im/post/5e5ef2f9f265da57685dc9c1)

1. 如何隐藏所有指定的元素

``` js
const hide = (el)=>Array.from(el).forEach(e=>e.style.display = 'none')

//隐藏页面上所有'<img>'元素
hide(document.getElementById('img'))
```

dom中每个节点的的classList能够实现对元素的新增、删除、修改节点上面的CSS类。

2. 检查元素是否有指定类

``` js
const hasClass = (el,className)=>el.classList.contains(className)

//
hasClass(document.querySelector('p.special'),'special')
```

3. 切换元素的类

``` js
const toggleClass = (el,className)=>el.classList.toggle(className)

//移除P具有‘special'的special类
toggleClass(document.querySelector('p.special'),'specail')
```

4. 获取当前页面滚动位置

``` js
const getScrollPosition = (el=window)=>({
    x:el.pageXoffset!==undefined?el.pageXoffset:el.scrollLeft,
    y:el.pageYoffset==undefined?el.pageYoffset:el.scrollTop
});

getScrollPosition(); //{x:0,y:0}
```

5. 平滑滚动至页面顶部

``` js
const scrollToTop=()=>{
    const c = document.documentElement.scrollTop||document.body.scrollTop;
    if(c>0){
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0,c-c/8);
    }
}

//
scrollToTop()
```

6. 检查父元素是否包含子元素

``` js
const elementContains = (parent,child)=>parent!==child&&parent.contains(child)

//
elementContains(document.querySelector('head'),docuement.querySelector('title')); //true
elementContains(document.querySelector('body'),document.querySelector('body'));   //false
```

7. 如何检查指定元素在视口是否可见

``` js
const elementIsVisibleInViewport = (el,partiallyVisible = false)=>{
    const {top,left,botto,right} = el.getBoundingClientRect();
    const {innerHeight,innerWidth} = window;
    return partiallyVisible?((top>0&&top<innerHeight)||(bottom>0&&bottom<innerHeight))&&((left>0&&left<innerWidth)||(right>0&&right<=innerWidth)):top>=0&&left>=0&&bottom<=innerHeight&&right<=innerWidth;
};

//
elementVisibleInViewport(el); //需要左右可见
elementVisibleInViewport(el,true); //需要全屏(上下左右)可见
```

8. 如何获取元素中所有图像

``` js
const getImages = (el,includeDuplicates = false)=>{
    const images = [...el.getElementsByTagName('img')].map(img=>img.getAttribute('src'));
    return includeDuplicates?images:[...new Set(images)];
};

// 事例：includeDuplicates 为 true 表示需要排除重复元素
getImages(document, true); // ['image1.jpg', 'image2.png', 'image1.png', '...']
getImages(document, false); // ['image1.jpg', 'image2.png', '...']
```

9. 确定设备是移动设备还是台式机/笔记本

``` js
const detectDeviceType=()=>/Android|webOS|iPhone|iPad|BlackBerry|IEMobile|Opera Mini/i.test(navigator.useragent)?'mobile':'Desktop'

//
detectDeviceType(); //“mobile' or ”Desktop“
```

10. 获取当前URL

``` js
const currentURL = ()=>window.location.href

//
currentURL()
```

11. 创建一个包含当前URL参数的对象

``` js
const getURLParameters = url =>
  (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (a, v) => ((a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a),
    {}
  );

// 事例
getURLParameters('http://url.com/page?n=Adam&s=Smith'); // {n: 'Adam', s: 'Smith'}
getURLParameters('google.com'); // {}

```

12. 将表单元素转换为对象

``` js
const fromToObject = form=>
  Array.from(new FormData(form)).reduce(
      (acc,[key,value])=>({
          ...acc,
          [key]:value
      }),
      {}
  );

//
formToObject(document.querySelector("#form"));
//{name:'test',age:'25'}
```

13. 从对象检索给定选择器指示的一组属性

``` js
const get = (from,...selectors)=>
[...selectors].map(s=>
s
.replace(/\[([^\[\]]*)\]/g,"$1.")
.split('.')
.filter(t=>t!=='')
.reduce((prev,cur)=>prev&&prev[cur],from)
);

const obj = {selector:{to:{val:'val to select'}},target:[1,2,{a:'test'}]};

//
get(obj,'selector.to.val',target[0],'target[2].a');
//['val to select',1,'test']
```

14. 在等待指定时间后调用提供的函数

``` js
const delay = (fn,wait,..args)=>setTimeout(fn,wait,...args);
delay(function(text){
    console.log(text);
},1000,'later');

//1s 后打印 'later'
```

15. 如何在给定元素上触发特定时间且能选择地传递自定义数据

``` js
const triggerEvent = (el,eventType,detail)=>
el.dispatchEvent(new CustomEvent(eventType,{detail}));

//
triggerEvent(document.getElementById('myId'),'click');
triggerEvent(document.getElementById('myId'),'click',{username:'bob'})
```

自定义事件的函数有 Event、CustomEvent 和 dispatchEvent

``` js
// 向 window派发一个resize内置事件
window.dispatchEvent(new Event('resize'))

// 直接自定义事件，使用 Event 构造函数：
var event = new Event('build');
var elem = document.querySelector('#id')
// 监听事件
elem.addEventListener('build', function (e) { ... }, false);
// 触发事件.
elem.dispatchEvent(event);
```

CustomEvent 可以创建一个更高度自定义事件，还可以附带一些数据，具体用法如下：

``` js
var myEvent = new CustomEvent(eventname, options);
其中 options 可以是：
{
  detail: {
    ...
  },
  bubbles: true,    //是否冒泡
  cancelable: false //是否取消默认事件
}

```

其中 detail 可以存放一些初始化的信息，可以在触发的时候调用。其他属性就是定义该事件是否具有冒泡等等功能。

内置的事件会由浏览器根据某些操作进行触发，自定义的事件就需要人工触发。 dispatchEvent 函数就是用来触发某个事件：

``` js
element.dispatchEvent(customEvent);
```

在 element 上面触发 customEvent 这个事件。

``` js
// add an appropriate event listener
obj.addEventListener("cat", function(e) { process(e.detail) });

// create and dispatch the event
var event = new CustomEvent("cat", {"detail":{"hazcheeseburger":true}});
obj.dispatchEvent(event);
使用自定义事件需要注意兼容性问题，而使用 jQuery 就简单多了：

// 绑定自定义事件
$(element).on('myCustomEvent', function(){});

// 触发事件
$(element).trigger('myCustomEvent');
// 此外，你还可以在触发自定义事件时传递更多参数信息：

$( "p" ).on( "myCustomEvent", function( event, myName ) {
  $( this ).text( myName + ", hi there!" );
});
$( "button" ).click(function () {
  $( "p" ).trigger( "myCustomEvent", [ "John" ] );
});

```

16. 从元素移除事件监听

``` js
const off = (el,evt,fn,opts = false)=>el.removeEventListener(evt,fn,opts);

const fn =()=>console.log('!');
document.body.addEventListener('click',fn);
off(document.body,'click',fn);
```

17. 获得给定毫秒数的可读格式

``` js
const formatDuration = ms => {
  if (ms < 0) ms = -ms;
  const time = {
    day: Math.floor(ms / 86400000),
    hour: Math.floor(ms / 3600000) % 24,
    minute: Math.floor(ms / 60000) % 60,
    second: Math.floor(ms / 1000) % 60,
    millisecond: Math.floor(ms) % 1000
  };
  return Object.entries(time)
    .filter(val => val[1] !== 0)
    .map(([key, val]) => `${val} ${key}${val !== 1 ? 's' : ''}`)
    .join(', ');
};

// 事例
formatDuration(1001); // '1 second, 1 millisecond'
formatDuration(34325055574); 
// '397 days, 6 hours, 44 minutes, 15 seconds, 574 milliseconds'

```

18. 如何获得两个日期之差（按天）

``` js
const getDaysDiffBetweenDates = (dateInitial,dateFinal)=>
  (dateFinal-dateInitial)/(1000*3600*24);
//
getDaysDiffBetweenDates(new Date('2020-3-20'),new Date('2020-3-30'))  //10

```

19. 向传递的URL发出GET请求

``` js
const httpGet = (url, callback, err = console.error) => {
  const request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.onload = () => callback(request.responseText);
  request.onerror = () => err(request);
  request.send();
};

httpGet(
  'https://jsonplaceholder.typicode.com/posts/1',
  console.log
);

// {"userId": 1, "id": 1, "title": "sample title", "body": "my text"}

```

20. 向传递的URL发出POST请求

``` js
const httpPost = (url,data,callback,err=console.error)=>{
  const request = new XMLHttpRequest();
  request.open('POST',url,true);
  request.setRequestHeader('Content-type','application/json;charset=utf-8');
  request.onload=()=>callback(request.responseText);
  request.onerror=()=>err(request);
  request.send(data);
};

const newPost = {
  userId:1,
  id:1337,
  title:'foo',
  body:'bar bar bar'
};

const data = JSON.stringify(newPost);
httpPost(
  'https://jsonplaceholder.typicode.com/posts',
   data,
   console.log
   );


//
{
  "userId": 1,
  "id": 101,
  "title": "foo",
  "body": "bar bar bar"
}
```

21. 为指定选择器创建具有指定范围、步长和持续时间的计数器

``` js
const counter = (selector,start,end,step=1,duration=2000)=>{
  let current = start,
  _step = (end-start)*step<0?-step:step,
  timer = setInterval(()=>{
    current += _step;
    document.querySelector(selector).innerHTML = current;
    if(current>=end) document.querySelector(selector).innerHTML = end;
    if(current>=end) clearInterval(timer);
  },Math.abs(Math.floor(duration/(end-start))));
  return timer;
};

//
counter('#my-id',1,1000,5,2000)
// 让 `id=“my-id”`的元素创建一个2秒计时器

```

22. 将字符串复制到剪切板

``` js
const copyToClipboard => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  const selected =
    document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
}
// 事例
copyToClipboard('Lorem ipsum');
// 'Lorem ipsum' copied to clipboard


```

23. 确定页面的浏览器选项卡是否聚焦

``` js
const isBrowerTabFocused = () => !document.hidden;

//
isBrowserTabFocused(); //true
```

24. 创建目录

``` js
const fs = require('fs');
const createDirIfNotExists = dir=>(!fs.existsSync(dir)?fs.mkdirSync(dir):undefined);

//
createDirIfNotExists('test');
```
