### vue相关

#### [new Vue](https://github.com/muwoo/blogs/blob/master/src/Vue/1.md)


#### [nexttick](https://www.cnblogs.com/tiedaweishao/p/8967127.html)
::: tip
看一段vue中使用的代码
``` js
export default {
  data () {
    return {
      msg: 0
    }
  },
  mounted () {
    this.msg = 1
    this.msg = 2
    this.msg = 3
  },
  watch: {
    msg () {
      console.log(this.msg)
    }
  }

```
这段脚本执行我们猜测会依次打印：1、2、3。但是实际效果中，只会输出一次：3。为什么会出现这样的情况？我们来一探究竟。
#### queueWatcher
  
定义watch监听msg，实际上会被Vue这样调用vm.$watch(keyOrFn, handler, options)。$watch是我们初始化的时候，为vm绑定的一个函数，用于创建Watcher对象
``` js
src/core/observser/watcher.js

this.deep = this.user = this.lazy = this.sync = false
......
    /**
   * Subscriber interface.
   * Will be called when a dependency changes.
   */
  update () {
    /* istanbul ignore else */
    if (this.lazy) {
      this.dirty = true
    } else if (this.sync) {
      this.run()
    } else {
      queueWatcher(this)
    }
  }
```
初始设定this.deep = this.user = this.lazy = this.sync = false，也就是当触发update更新的时候，会去执行queueWatcher方法：

``` js
src/core/observer/scheduler.js
/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
export function queueWatcher (watcher: Watcher) {
  const id = watcher.id
  if (has[id] == null) {
    has[id] = true
    if (!flushing) {
      queue.push(watcher)
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      let i = queue.length - 1
      while (i > index && queue[i].id > watcher.id) {
        i--
      }
      queue.splice(i + 1, 0, watcher)
    }
    // queue the flush
    if (!waiting) {
      waiting = true

      if (process.env.NODE_ENV !== 'production' && !config.async) {
        flushSchedulerQueue()
        return
      }
      nextTick(flushSchedulerQueue)
    }
  }
  ```
  这里面的nextTick(flushSchedulerQueue)中的flushSchedulerQueue函数其实就是watcher的视图更新

  ``` js
/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow()
  flushing = true
  let watcher, id

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort((a, b) => a.id - b.id)

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index]
    if (watcher.before) {
      watcher.before()
    }
    id = watcher.id
    has[id] = null
    watcher.run()
    // in dev build, check and stop circular updates.
    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? `in watcher with expression "${watcher.expression}"`
              : `in a component render function.`
          ),
          watcher.vm
        )
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  const activatedQueue = activatedChildren.slice()
  const updatedQueue = queue.slice()

  resetSchedulerState()

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue)
  callUpdatedHooks(updatedQueue)

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush')
  }
}
  ```
关于waiting变量，这是很重要的一个标志位，它保证flushSchedulerQueue回调只允许被置入callbacks一次。
接下来我们来看看nextTick函数，在说nexTick之前，需要你对Event Loop、microTask、macroTask有一定的了解，Vue nextTick 也是主要用到了这些基础原理,[EventLoop](https://github.com/muwoo/blogs/issues/14)

- microTask
``` js
* new Promise()
* new MutationObserver()
```
- macroTask
``` js
* setTimeout
* MessageChannel
* postMessage
* setImmediate
```

:::