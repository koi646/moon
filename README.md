# moon
a project about finding friends
#### 安装

在根目录执行'npm install'安装服务器依赖

然后进入webapp目录,'npm install'安装vue的相关依赖

####开发

webapp的开发只需要拉取**webapp**目录,
执行 'npm install'命令,安装相关依赖。

服务端开发需拉去整个项目。

-----
>   写在开发

项目架构采用 mongodb + vue + vuex + redis的形式,seesion储存在redis里面。email登录,暂时不用考虑其他形式登陆。
邮件系统需要模块 nodemailer


####问题
1.uid生成问题,现在暂时用mongo自己生成的objectId来代替。不过这特么也太丑了点,必须换掉
2.要充分利用缓存在提升性能，
那redis中需要存的东西为:
* 用户好友关系（关注与被关注）
* 推荐的优质用户列表(热门数据缓存)
* 每个人的点赞数这种counter数据

####想法
1.用户的个人页面的数据利用h5可以做一个本地的缓存,更新数据库后,本地缓存也更新。那以后每次访问自己页面的时候就不需要再向服务器发起请求了（个人页面的数据利用本地存储来进行存储） 

本地持久化存储采用indexdb 不过需要用vue来对indexdb进行一层封装。

2.预加载,当用户访问一个页面的时候,对其他页面的数据进行预加载。

