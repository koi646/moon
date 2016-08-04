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
项目架构采用 mongodb + vue + vuex 的形式,seesion储存在redis里面。暂时不用考虑其他形式登陆。


####问题
1.uid生成问题,现在暂时用mongo自己生成的objectId来代替。不过这特么也太丑了点,必须换掉

