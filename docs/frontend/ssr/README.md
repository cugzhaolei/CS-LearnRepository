# SSR 

# [Vue SSR](https://juejin.im/post/5b063962f265da0ddb63dac3)

## SSR

## [Vue-SSR Cookies问题](https://www.mmxiaowu.com/article/596cbb2d436eb550a5423c30)

### 第二种方案

思路: 将 cookies 注入到 ssr 的 context里, 然后在请求 api 时读取, 再追加到 axios 的header 里

1, 首先在 server.js 里将 cookies 加到 context里
``` js
const context = {
    title: 'M.M.F 小屋',
    description: 'M.M.F 小屋',
    url: req.url,
    cookies: req.cookies
}
renderer.renderToString(context, (err, html) => {
    if (err) {
        return errorHandler(err)
    }
    res.end(html)
})
```
之后, Vue 会把 context 加到 global.__VUE_SSR_CONTEXT__

2, 在 api.js 里读取 cookies
``` js
import axios from 'axios'
import qs from 'qs'
import md5 from 'md5'
import config from './config-server'

const SSR = global.__VUE_SSR_CONTEXT__
const cookies = SSR.cookies || {}
const parseCookie = cookies => {
    let cookie = ''
    Object.keys(cookies).forEach(item => {
        cookie+= item + '=' + cookies[item] + '; '
    })
    return cookie
}

export default {
    async post(url, data) {
        const cookie = parseCookie(cookies)
        const res = await axios({
            method: 'post',
            url: config.api + url,
            data: qs.stringify(data),
            timeout: config.timeout,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                cookie
            }
        })
        return res
    },
}
```
为什么可以这么做?
默认情况下，Vue 对于每次渲染，bundle renderer 将创建一个新的 V8 上下文并重新执行整个 bundle。应用程序代码与服务器进程隔离, 所以每个访问的用户上下文都是独立的, 不会互相影响.

但是从Vue@2.3.0开始, 在createBundleRenderer方法的选项中, 添加了runInNewContext选项, 使用 runInNewContext: false，bundle 代码将与服务器进程在同一个 global 上下文中运行，所以我们不能再将 cookies 放在 global, 因为这会让所有用户共用同一个 cookies.

为什么现在不这么做?
那我们继续将runInNewContext设置成true, 不就好了吗? 当然也是可以的, 但是重新创建上下文并执行整个 bundle 还是相当昂贵的，特别是当应用很大的时候.

以我自己的博客为例, 之前只有渲染 5 个路由组件, loadtest 的 rps, 有 50 左右, 但是后来把后台的 12 个路由组件也加到 SSR 后, rps 直接降到了个位数...

所以出现了现在的第三种方案
### 第三种方案

思路: 将 Cookies 作为参数注入到组件的asyncData方法, 然后用传参数的方法把 cookies 传给 api, 不得不说这种方法很麻烦, 但是这是个人能想到的比较好的方法
1. 步骤1:

还是在 server.js 里, 把 cookies 注入到 context 中
``` js
const context = {
    title: 'M.M.F 小屋',
    url: req.url,
    cookies: req.cookies,
}
renderer.renderToString(context, (err, html) => {
    if (err) {
        return handleError(err)
    }
    res.end(html)
})
```
2. 步骤2:

在entry-server.js里, 将cookies作为参数传给 asyncData 方法
``` js
Promise.all(matchedComponents.map(({asyncData}) => asyncData && asyncData({
    store,
    route: router.currentRoute,
    cookies: context.cookies,
    isServer: true,
    isClient: false
}))).then(() => {
    context.state = store.state
    context.isProd = process.env.NODE_ENV === 'production'
    resolve(app)
}).catch(reject)
```
3. 步骤3:

在组件里, 把 cookies 做为参数给 Vuex 的 actions
``` js
export default {
    name: 'frontend-index',
    async asyncData({store, route, cookies}, config = { page: 1}) {
        config.cookies = cookies
        await store.dispatch('frontend/article/getArticleList', config)
    }
    // .....
}
```
4. 步骤4:

在 Vuex 里将 cookies 做为参数给 api
``` js
import api from '~api'

const state = () => ({
    lists: {
        data: [],
        hasNext: 0,
        page: 1,
        path: ''
    },
})

const actions = {
    async ['getArticleList']({commit, state}, config) {
        // vuex 作为临时缓存
        if (state.lists.data.length > 0 && config.path === state.lists.path && config.page === 1) {
            return
        }
        let cookies
        if (config.cookies) {
            cookies = config.cookies
            delete config.cookies
        }
        const { data: { data, code} } = await api.get('frontend/article/list', {...config, cache: true}, cookies)
        if (data && code === 200) {
            commit('receiveArticleList', {
                ...config,
                ...data,
            })
        }
    },
}

const mutations = {
    ['receiveArticleList'](state, {list, hasNext, hasPrev, page, path}) {
        if (page === 1) {
            list = [].concat(list)
        } else {
            list = state.lists.data.concat(list)
        }
        state.lists = {
            data: list, hasNext, hasPrev, page, path
        }
    },
}

const getters = {

}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}

```
这里一定要注意, state 一定要用函数返回值来初始化 state, 不然会导致所有用户共用 state
5. 步骤5:

在 api 里接收 cookies, 并加到 axios 的 headers 里
``` js
import axios from 'axios'
import qs from 'qs'
import config from './config-server'

const parseCookie = cookies => {
    let cookie = ''
    Object.keys(cookies).forEach(item => {
        cookie+= item + '=' + cookies[item] + '; '
    })
    return cookie
}

export default {
    get(url, data, cookies = {}) {
        const cookie = parseCookie(cookies)
        return axios({
            method: 'get',
            url: config.api + url,
            data: qs.stringify(data),
            timeout: config.timeout,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                cookie
            }
        })
    },
}
```
如果你没有将 axios 重新封装, 那么也可以把第五步省略, 直接在第四部把 cookies 给 axios 即可

### 第四种方案

1. 步骤1:

还是在 server.js 里, 把 cookies 注入到 context 中
``` js
const context = {
    title: 'M.M.F 小屋',
    url: req.url,
    cookies: req.cookies,
}
renderer.renderToString(context, (err, html) => {
    if (err) {
        return handleError(err)
    }
    res.end(html)
})
```
2. 步骤2:

在entry-server.js里, 将cookies作为参数传给 api.setCookies 方法, api.setCookies 是什么东西后面会有
``` js
api.setCookies(context.cookies) // 这一句
Promise.all(matchedComponents.map(({asyncData}) => asyncData && asyncData({
  store,
  route: router.currentRoute,
  cookies: context.cookies,
  isServer: true,
  isClient: false
}))).then(() => {
  // ...
}
```
3. 步骤3:

重写 api.js
``` js
import axios from 'axios'
import qs from 'qs'
import config from './config-server'

const parseCookie = cookies => {
    let cookie = ''
    Object.keys(cookies).forEach(item => {
        cookie+= item + '=' + cookies[item] + '; '
    })
    return cookie
}

export default {
    api: null,
    cookies: {},
    setCookies(value) {
        value = value || {}
        this.cookies = value
        this.api = axios.create({
            baseURL: config.api,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                cookie: parseCookie(value)
            },
            timeout: config.timeout,
        })
    },
    post(url, data) {
        if (!this.api) this.setCookies()
        return this.api({
            method: 'post',
            url,
            data: qs.stringify(data),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            }
        }).then(res => {
            return res
        })
    },
    get(url, params) {
        if (!this.api) this.setCookies()
        return this.api({
            method: 'get',
            url,
            params,
        }).then(res => {
            return res
        })
    }
}
```

## Vue-EventBus
- 新建一个组件共享，plugin
``` js
export default{
    install(Vue){
        const EventBus = new Vue({
            data(){
                return {
                    list:[],
                    nav:[]
                }
            },
            method:{
                getList(){
                    //get list
                },
                getNav(){
                    //get nav
                }
            }
        })
        Vue.prototype.$events = EventBus
        Vue.$events = EventBus
    }
}
```
- 在main.js中export出我们的EventBus以便两个entry使用
``` js
import Vue from 'vue'
import App from './App'
import EventBus from './event'

Vue.use(EventBus)
Vue.config.devtools = true

export function createApp () {
 const app = new Vue({
   // 注入 router 到根 Vue 实例
   router,
   render: h => h(App)
 })
 
 return { app, router, eventBus: app.$events }
}
```
- 接下来是两个entry，server用来匹配组件并调用组件的asyncData方法去获取数据，client用来将渲染的数据存储到eventBus中
``` js
//server
import {createApp} from './main'

export default context =>{
    return new Promise((resolve,reject)=>{
        const{app,eventBus,App}= createApp()
        //仅app组件需要预读取数据，复杂业务可以递归遍历
        const matchedComponents = {App}

        Promise.all(matchedComponents.map(({asyncData})=>asyncData&&asyncData({
            eventBus
        }))).then(()=>{
            context.state = eventBus._data
            resolve(app)
        }).catch(reject)
    })
}


//client
import Vue from 'vue'
import { createApp } from './main'
const { app, eventBus } = createApp()

if (window.__INITIAL_STATE__) {
 eventBus._data = window.__INITIAL_STATE__
}

app.$mount('#app')
```
然后我们需要改造我们的组件了，只需要定义一个async方法去调用EventBus中的方法获取，考虑到服务端只会执行beforeCreate和created两个生命周期而beforeCreate不能拿到data，所以我们需要在created中去做数据的获取。
``` js
// 服务端渲染数据预取；
asyncData ({ store, eventBus }) {
 return eventBus.getNav()
}
// 将服务端拿到的数据混入vue组件中；
created () {
 this.nav = this.$events.nav
}
```
然后是webpack的改造了，webpack的配置其实和纯客户端应用类似，为了区分客户端和服务端两个环境我们将配置分为base、client和server三部分，base就是我们的通用基础配置，而client和server分别用来打包我们的客户端和服务端代码。
首先是webpack.server.conf.js，用于生成server bundle来传递给createBundleRenderer函数在node服务器上调用，入口文件是我们的entry-server：
``` js
const webpack = require('webpack')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const baseConfig = require('./webpack.base.conf.js')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
// 去除打包css的配置
baseConfig.module.rules[1].options = ''

module.exports = merge(baseConfig, {
 entry: './src/entry-server.js',
 // 以 Node 适用方式导入
 target: 'node',
 // 对 bundle renderer 提供 source map 支持
 devtool: '#source-map',
 output: {
   filename: 'server-bundle.js',
   libraryTarget: 'commonjs2'
 },
 externals: nodeExternals({
   whitelist: /\.css$/
 }),
 plugins: [
   new webpack.DefinePlugin({
     'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
     'process.env.VUE_ENV': '"server"'
   }),
   // 这是将服务器的整个输出
   // 构建为单个 JSON 文件的插件。
   // 默认文件名为 `vue-ssr-server-bundle.json`
   new VueSSRServerPlugin()
 ]
})
```
其次是webpack.client.conf.js，这里我们可以根据官方的配置生成clientManifest，自动推断和注入资源预加载，以及 css 链接 / script 标签到所渲染的 HTML。入口是我们的client-server:

``` js
const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.conf')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

const config = merge(base, {
 entry: {
   app: './src/entry-client.js'
 },
 plugins: [
   new webpack.DefinePlugin({
     'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
     'process.env.VUE_ENV': '"client"'
   }),
   new webpack.optimize.CommonsChunkPlugin({
     name: 'vendor',
     minChunks: function (module) {
       return (
         /node_modules/.test(module.context) &&
         !/\.css$/.test(module.request)
       )
     }
   }),
   // 这将 webpack 运行时分离到一个引导 chunk 中，
   // 以便可以在之后正确注入异步 chunk。
   // 这也为你的 应用程序/vendor 代码提供了更好的缓存。
   new webpack.optimize.CommonsChunkPlugin({
     name: 'manifest'
   }),
   new VueSSRClientPlugin()
 ]
})
```

## [Mixin Axios 内存泄漏](https://github.com/vuejs/vue/issues/5089)