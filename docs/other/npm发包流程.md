# npm发包流程
说起node,大家都很熟悉了,随着node一起下载安装的还有我们的包管理工具`npm`(node package manager).我们平时也是一直在使用npm的,但大部分时候,我们使用的都是别人的包.假如有一天我们自己写了一个包,想要上传到npm上面去,流程是怎么样的?

## 创建项目
创建一个文件夹并且进入这个文件夹
```
mkdir publish-test && cd $_
```
## 初始化
初始化生成一个package
我用的是yarn,初始化命令如下:
 ```
 yarn init
 ```
大家如果用的是npm的话就是:
```
npm init
```
一步步的将配置信息填入,也可以直接使用下面的命令快速生成
```
yarn init -y
```
![当前项目结构](https://img-blog.csdnimg.cn/20191225095600904.png)

**注意:这里的包名是不能和npm上的包有重复的,有时候包名相似的话npm也是会提醒你的,可以去npm官方搜索你的包名,看是否已经被使用了**

## 包内容编写
新建一个index.js文件,随便写一句代码,比如:

```javascript
console.log(111)
```
## 准备发布
[npm官方地址](https://www.npmjs.com/) 点击官方地址去注册,并且通过邮箱的验证,若是不通过验证的话,后面的发布流程会提示你去验证,
注册好npm账号以后,我们的发布流程就正式开始了.第一次发布的话,我们要使用如下命令:
```
npm adduser
```
以后的话,可以使用
```
npm login
```
在输入完 npm adduser 之后,就要求输入用户名/密码/邮箱,结果输入完以后出现了一个报错
```
409 Conflict - PUT http://registry.npm.taobao.org/-/user/org.couchdb.user:ezlou - [conflict] User ezlou already exists
```
这是因为我们目前的npm源是淘宝镜像,淘宝镜像是不允许我们上传自己包的,所以我们要切回原先的npm的镜像,如何查看当前的源:
```
npm config get registry
```
![当前源是淘宝镜像](https://img-blog.csdnimg.cn/20191225101129505.png)

可以看到我们当前源是淘宝镜像,我们需要将其切换到原先的源
```
npm config set registry https://registry.npmjs.org
```
切换完以后,重新登录,出现了如下的提示,说明登录成功
![登录成功](https://img-blog.csdnimg.cn/20191225101730542.png)

## 发布
```
npm publish
```
出现如下图所示: 

![发布成功](https://img-blog.csdnimg.cn/20191225101859553.png)

可以看到 包名+版本 显示在终端上了,说明我们的包已经发布成功了,然后我们去npm个人中文看自己发布的包 [https://www.npmjs.com/settings/xxx/packages](https://www.npmjs.com/settings/xxx/packages) 这里将xxx替换成自己的用户名
#### 可能会踩到的坑
如下图:

![没有权限](https://img-blog.csdnimg.cn/20191225103900189.png)

说明你没有发布这个包的权限,很有可能就是因为你的包名和别人的包名重复了.我们修改下包名,在其后面加上一个2,然后继续发布

![包名过于相似的报错](https://img-blog.csdnimg.cn/2019122510425146.png)

这时候可能会提示包名过于类似,并且它建议我们可以使用 `@我们的用户名/包名` 这样的格式去发布自己的包.并且发布的时候命令变成了
```
npm publish --access=public
```
这句话的意思是将我们发布的包变成一个公开包,让大家都能访问到.因为现在我们的包名是 `@我们的用户名/包名`  这种格式,这种以用户名自己名字开头的包默认是当作私有包的,而私有包是需要收费的,所以如果这时候我们不加上后面的修饰的话,就会出现如下的报错:

![这是一个付费功能啊](https://img-blog.csdnimg.cn/20191225104754347.png)

我们加上 `--access=public`,将其变成一个公开包,重新发布一下,可以看到发布成功了!
自此,我们自己的包就发布成功了,过一会儿别人就可以通过命令下载安装我们的包了

## 更新
如果我们的代码有了更新,我们可以重新将包发布到npm上去,但是注意,包的版本号必须和之前是不一样的,npm不允许上传相同版本的包.这里更新包版本也有两种方式

 1. 直接在package.json 中手动修改包的版本
 2. 通过npm指令来修改
 ```
 npm version patch  //补丁版本,最后一位数加1 
 npm version minor  //增加了新功能 中间的数字加1
 npm version major //大改动,不向下兼容 第一位数字加1
 ```
我们根据这次包的修改内容,来决定我们这次更新的版本号
## 删除
假如我们要删除自己发布的包的话,使用下面的命令
```
npm unpublish --force
```
**注意:只有在发布的24小时内可以删除包**

基本上,一个包的发布流程就是以上这些啦!