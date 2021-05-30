(window.webpackJsonp=window.webpackJsonp||[]).push([[123],{471:function(s,a,n){"use strict";n.r(a);var t=n(42),e=Object(t.a)({},(function(){var s=this,a=s.$createElement,n=s._self._c||a;return n("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[n("h1",{attrs:{id:"devops"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#devops"}},[s._v("#")]),s._v(" DevOps")]),s._v(" "),n("h2",{attrs:{id:"cicd"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#cicd"}},[s._v("#")]),s._v(" cicd")]),s._v(" "),n("h2",{attrs:{id:"jenkins"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#jenkins"}},[s._v("#")]),s._v(" jenkins")]),s._v(" "),n("h3",{attrs:{id:"windows-docker-安装-jenkins"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#windows-docker-安装-jenkins"}},[s._v("#")]),s._v(" Windows Docker 安装 Jenkins")]),s._v(" "),n("ul",[n("li",[s._v("Windows在命令行下执行如下命令")])]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[s._v("docker run ^\n  -u root ^\n  -d ^\n  -p "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("8080")]),s._v(":8080 ^\n  -p "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("50000")]),s._v(":50000 ^\n  -v jenkins-data:/var/jenkins_home ^\n  -v /var/run/docker.sock:/var/run/docker.sock ^\n  jenkinsci/blueocean\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br")])]),n("ul",[n("li",[s._v("在浏览器下面输入设置的端口（上面映射的是8080端口，因此本地输入 localhost:8080,看到如下页面")]),s._v(" "),n("li",[n("img",{attrs:{src:"https://i.loli.net/2021/02/04/Wj6fYLTPsynFx3o.png",alt:"Jenkins-install-1"}})]),s._v(" "),n("li",[s._v("在docker中Jenkins的命令行中输入以下命令")])]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[s._v("/ "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# cat /var/jenkins_home/secrets/initialAdminPassword")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 96759353a2354c199e0f0d2367c0348d 这里就是密钥")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br")])]),n("ul",[n("li",[s._v("将密钥输入上面的输入框中，看到以下界面")]),s._v(" "),n("li",[n("img",{attrs:{src:"https://i.loli.net/2021/02/04/uUQNaJL6TbGiK1h.png",alt:"Jenkins-install-2"}})])]),s._v(" "),n("p",[s._v("安装推荐的插件（Jenkinsci/blueocean里面集成了java的环境，因此这里直接可以减少配置")]),s._v(" "),n("p",[n("img",{attrs:{src:"https://i.loli.net/2021/02/04/DvmKdJM6kn8PUVE.png",alt:"Jenkins-install-3"}})]),s._v(" "),n("p",[s._v("创建一个管理员用户")]),s._v(" "),n("p",[n("img",{attrs:{src:"https://i.loli.net/2021/02/04/rt3GKzjINklLq4X.png",alt:"Jenkins-install-4"}})]),s._v(" "),n("p",[n("img",{attrs:{src:"https://i.loli.net/2021/02/04/5FlD1zugdN2mkq3.png",alt:"Jenkins-install-6"}})]),s._v(" "),n("p",[s._v("重启Jenkins")]),s._v(" "),n("p",[n("img",{attrs:{src:"https://i.loli.net/2021/02/04/d5D7MYqlVyjTk93.png",alt:"Jenkins-install-7"}})]),s._v(" "),n("p",[s._v("重新登录进入系统")]),s._v(" "),n("p",[n("img",{attrs:{src:"https://i.loli.net/2021/02/04/ifHW3cC6KJxwjLy.png",alt:"Jenkins-install-8"}})]),s._v(" "),n("p",[s._v("创建一个任务（选择一个自由风格")]),s._v(" "),n("p",[n("img",{attrs:{src:"https://i.loli.net/2021/02/04/jG4RnEqywQzeAJp.png",alt:"Jenkins-install-9"}})]),s._v(" "),n("p",[s._v("在源代码管理中添加git的仓库（我使用的是码云")]),s._v(" "),n("p",[n("img",{attrs:{src:"https://i.loli.net/2021/02/04/jG4RnEqywQzeAJp.png",alt:""}})]),s._v(" "),n("p",[s._v("设置触发条件")]),s._v(" "),n("p",[n("code",[s._v("H/2 * * * *")]),s._v("是每隔2分钟触发一次")]),s._v(" "),n("p",[s._v("设置构建环境")]),s._v(" "),n("p",[n("img",{attrs:{src:"https://i.loli.net/2021/02/04/dmz9pNLFaXQAhrn.png",alt:"Jenkins-install-11"}})]),s._v(" "),n("p",[n("img",{attrs:{src:"https://i.loli.net/2021/02/04/axyQM3hoIrtBm8P.png",alt:"Jenkins-install-12"}})]),s._v(" "),n("p",[s._v("构建 选择构建环境")]),s._v(" "),n("p",[n("img",{attrs:{src:"https://i.loli.net/2021/02/04/Gu5a4zRf1HedF2O.png",alt:"Jenkins-install-13"}})]),s._v(" "),n("p",[n("img",{attrs:{src:"https://i.loli.net/2021/02/04/x5v8q9cs1bWg2oy.png",alt:"Jenkins-install-14"}})]),s._v(" "),n("p",[s._v("在命令里面增加以下脚本")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token shebang important"}},[s._v("#!/bin/bash")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 获取短版本号")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# projectname替换为自己的项目")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("GITHASH")]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),n("span",{pre:!0,attrs:{class:"token variable"}},[n("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")]),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" rev-parse --short HEAD"),n("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")])]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" ---------------Remove-Orphans------------------\ndocker-compose -f ./docker-compose.yml -f ./docker-compose.override.yml  -p projectname down --rmi "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("local")]),s._v(" --remove-orphans\n"),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" ------------------Config-----------------------\ndocker-compose -f ./docker-compose.ci.build.yml -p projectname config\n"),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" ------------------Build------------------------\ndocker-compose -f ./docker-compose.ci.build.yml -p Jenkins.Demo up --build\n"),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" ---------------Publishing"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v(".------------------\ndocker-compose -f "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"./docker-compose.yml"')]),s._v(" -f "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"./docker-compose.override.yml"')]),s._v("  -p projectname up -d --build\n\n"),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" ---------------Clear-Images"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v(".------------------\n"),n("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("clearImagesList")]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),n("span",{pre:!0,attrs:{class:"token variable"}},[n("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$(")]),s._v("docker images -f "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"dangling=true"')]),s._v(" -q"),n("span",{pre:!0,attrs:{class:"token variable"}},[s._v(")")])]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!")]),s._v(" -n "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"'),n("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$clearImagesList")]),s._v('"')]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("then")]),s._v("\n  "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"No need to clean up images."')]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("else")]),s._v("\n  docker rmi "),n("span",{pre:!0,attrs:{class:"token variable"}},[n("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$(")]),s._v("docker images -f "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"dangling=true"')]),s._v(" -q"),n("span",{pre:!0,attrs:{class:"token variable"}},[s._v(")")])]),s._v("\n  "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v('"clear success."')]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("fi")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" ---------------Clear-Containers"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v(".------------------\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# docker rm projectname_ci-build_1 #删除当前运行的容器")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br"),n("span",{staticClass:"line-number"},[s._v("19")]),n("br"),n("span",{staticClass:"line-number"},[s._v("20")]),n("br"),n("span",{staticClass:"line-number"},[s._v("21")]),n("br"),n("span",{staticClass:"line-number"},[s._v("22")]),n("br"),n("span",{staticClass:"line-number"},[s._v("23")]),n("br")])]),n("p",[s._v("保存后回到工作区，选择立即构建")]),s._v(" "),n("p",[n("img",{attrs:{src:"https://i.loli.net/2021/02/04/OIa7LbUWvthcylk.png",alt:"Jenkins-install-15"}})]),s._v(" "),n("p",[s._v("点击立即构建会出现下面的构建历史")]),s._v(" "),n("p",[n("img",{attrs:{src:"https://i.loli.net/2021/02/04/Z3v9UtxwcDdT8zI.png",alt:"Jenkins-install-16"}})]),s._v(" "),n("p",[n("img",{attrs:{src:"https://i.loli.net/2021/02/04/Ihq9Yz6pFlk3ebM.png",alt:"Jenkins-install-17"}})]),s._v(" "),n("p",[s._v("在项目中提交后，重新构建（使用blueocean查看")]),s._v(" "),n("p",[n("img",{attrs:{src:"https://i.loli.net/2021/02/04/Dry6kce3J7G8B4i.png",alt:"Jenkins-install-18"}})]),s._v(" "),n("p",[s._v("项目构建成功（但是缺少docker-compose，需要安装-Windows版本的docker中含有，Linux需要自己安装")])])}),[],!1,null,null,null);a.default=e.exports}}]);