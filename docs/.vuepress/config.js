module.exports = {
  title: '菜鸟进阶',
  description: 'Personal Website',
  head: [
    ['link', {
      rel: 'icon',
      href: '/logo.png'
    }],
    ['link', {
      rel: 'manifest',
      href: '/manifest.json'
    }],
    ['meta', {
      name: 'theme-color',
      content: '#3eaf7c'
    }],
    ['meta', {
      name: 'apple-mobile-web-app-capable',
      content: 'yes'
    }],
    ['meta', {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'black'
    }],
    ['link', {
      rel: 'apple-touch-icon',
      href: '/icons/apple-touch-icon-152x152.png'
    }],
    ['link', {
      rel: 'mask-icon',
      href: '/icons/safari-pinned-tab.svg',
      color: '#3eaf7c'
    }],
    ['meta', {
      name: 'msapplication-TileImage',
      content: '/icons/msapplication-icon-144x144.png'
    }],
    ['meta', {
      name: 'msapplication-TileColor',
      content: '#000000'
    }]
  ],
  // serviceWorker: true, // 是否开启 PWA
  plugins: ['@vuepress/pwa', {
    serviceWorker: true,
    updatePopup: true
  }],
  base: '/CS-LearnRepository/', // 部署到github相关的配置
  markdown: {
    lineNumbers: true // 代码块是否显示行号
  },
  themeConfig: {
    nav: [ // 导航栏配置
      // {
      //   text: '个人介绍',
      //   link: '/profile/'
      // },
      {
        text: '前端基础',
        link: '/frontend/'
      },
      {
        text: '后端基础',
        link: '/backend/'
      },
      {
        text: '移动应用',
        link: '/app/'
      },
      {
        text: '诗和远方',
        link: '/others/'
      }, {
        text: 'Github',
        link: 'https://github.com/cugzhaolei/CS-LearnRepository'
      }
    ],
    // sidebar:{
    //   '/accumulate/': [
    //       {
    //         title: '前端积累',
    //         children: [
    //           '/accumulate/1.html',
    //           '/accumulate/2.html',
    //           '/accumulate/3.html',
    //           '/accumulate/4.html',
    //           '/accumulate/5.html',
    //           '/accumulate/6.html',
    //           '/accumulate/7.html',
    //           '/accumulate/8.html',
    //           '/accumulate/9.html',
    //           '/accumulate/10.html',
    //           '/accumulate/11.html',
    //         ]
    //       }
    //     ],
    //     '/algorithm/': [
    //       '/algorithm/', 
    //       {
    //         title: '第二组侧边栏下拉框的标题1',
    //         children: [
    //           '/algorithm/' 
    //         ]
    //       }
    //     ]
    // },
    sidebar: 'auto', // 侧边栏配置
    sidebarDepth: 3,
    lastUpdated: 'Last Updated', // string | boolean
  }
};