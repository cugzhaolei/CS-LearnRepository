# DevOps

## cicd

## jenkins

### Windows Docker 安装 Jenkins

* Windows在命令行下执行如下命令



```bash
docker run ^
  -u root ^
  -d ^
  -p 8080:8080 ^
  -p 50000:50000 ^
  -v jenkins-data:/var/jenkins_home ^
  -v /var/run/docker.sock:/var/run/docker.sock ^
  jenkinsci/blueocean
```

* 在浏览器下面输入设置的端口（上面映射的是8080端口，因此本地输入 localhost:8080,看到如下页面
* ![Jenkins-install-1](https://i.loli.net/2021/02/04/Wj6fYLTPsynFx3o.png)
* 在docker中Jenkins的命令行中输入以下命令

```bash
/ # cat /var/jenkins_home/secrets/initialAdminPassword
# 96759353a2354c199e0f0d2367c0348d 这里就是密钥
```



* 将密钥输入上面的输入框中，看到以下界面
* ![Jenkins-install-2](https://i.loli.net/2021/02/04/uUQNaJL6TbGiK1h.png)



安装推荐的插件（Jenkinsci/blueocean里面集成了java的环境，因此这里直接可以减少配置

![Jenkins-install-3](https://i.loli.net/2021/02/04/DvmKdJM6kn8PUVE.png)



创建一个管理员用户

![Jenkins-install-4](https://i.loli.net/2021/02/04/rt3GKzjINklLq4X.png)

![Jenkins-install-6](https://i.loli.net/2021/02/04/5FlD1zugdN2mkq3.png)

重启Jenkins

![Jenkins-install-7](https://i.loli.net/2021/02/04/d5D7MYqlVyjTk93.png)



重新登录进入系统

![Jenkins-install-8](https://i.loli.net/2021/02/04/ifHW3cC6KJxwjLy.png)



创建一个任务（选择一个自由风格

![Jenkins-install-9](https://i.loli.net/2021/02/04/jG4RnEqywQzeAJp.png)



在源代码管理中添加git的仓库（我使用的是码云

![](https://i.loli.net/2021/02/04/jG4RnEqywQzeAJp.png)

设置触发条件

`H/2 * * * *`是每隔2分钟触发一次

设置构建环境

![Jenkins-install-11](https://i.loli.net/2021/02/04/dmz9pNLFaXQAhrn.png)

![Jenkins-install-12](https://i.loli.net/2021/02/04/axyQM3hoIrtBm8P.png)



构建 选择构建环境

![Jenkins-install-13](https://i.loli.net/2021/02/04/Gu5a4zRf1HedF2O.png)

![Jenkins-install-14](https://i.loli.net/2021/02/04/x5v8q9cs1bWg2oy.png)



在命令里面增加以下脚本

```bash
#!/bin/bash
# 获取短版本号
# projectname替换为自己的项目
GITHASH=`git rev-parse --short HEAD`
echo ---------------Remove-Orphans------------------
docker-compose -f ./docker-compose.yml -f ./docker-compose.override.yml  -p projectname down --rmi local --remove-orphans
echo ------------------Config-----------------------
docker-compose -f ./docker-compose.ci.build.yml -p projectname config
echo ------------------Build------------------------
docker-compose -f ./docker-compose.ci.build.yml -p Jenkins.Demo up --build
echo ---------------Publishing...------------------
docker-compose -f "./docker-compose.yml" -f "./docker-compose.override.yml"  -p projectname up -d --build

echo ---------------Clear-Images...------------------
clearImagesList=$(docker images -f "dangling=true" -q)
if [ ! -n "$clearImagesList" ]; then
  echo "No need to clean up images."
else
  docker rmi $(docker images -f "dangling=true" -q)
  echo "clear success."
fi
echo ---------------Clear-Containers...------------------
# docker rm projectname_ci-build_1 #删除当前运行的容器
```

保存后回到工作区，选择立即构建

![Jenkins-install-15](https://i.loli.net/2021/02/04/OIa7LbUWvthcylk.png)



点击立即构建会出现下面的构建历史

![Jenkins-install-16](https://i.loli.net/2021/02/04/Z3v9UtxwcDdT8zI.png)

![Jenkins-install-17](https://i.loli.net/2021/02/04/Ihq9Yz6pFlk3ebM.png)



在项目中提交后，重新构建（使用blueocean查看

![Jenkins-install-18](https://i.loli.net/2021/02/04/Dry6kce3J7G8B4i.png)



项目构建成功（但是缺少docker-compose，需要安装-Windows版本的docker中含有，Linux需要自己安装
