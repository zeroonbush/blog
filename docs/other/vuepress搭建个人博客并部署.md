# vuepress搭建个人博客并部署

> 想要快速搭建自己的个人博客,记录自己的工作学习心得,争取当一条有梦想的咸鱼

相信大家都了解过vue这个框架.而今天,我们的主角`vuepress` 就是vue的作者`尤大大`的一个作品.开源于大概2年前,其本意是用来为vue及其子项目写文档,现在被大部分人用来搭建个人博客.之前一直有所耳闻,vuepress可以搭建博客,但也只是有所耳闻罢了,这回趁着五一在家休息的时间,简单的学了下vuepress的用法.
今天在这里,我会从头一步步的将我的代码展示给大家看,如何从0开始搭建一个个人博客,并且部署到线上.传统的部署需要我们去购买服务器,域名,还需要做域名解析,备案之类的事情,往往需要一段时间才能完成.因此今天我们将我们的博客项目部署到github上.对的,你没有看错,github不仅仅只是一个保存我们代码的网站,它还可以帮助我们展示一些静态页面.今天我们就用`github pages` 来发布自己的静态博客.

## 搭建
### 初始化创建
首先,我们在终端输入以下命令,来创建一个空文件夹并且进入到这个文件夹
```
mkdir myblog && cd $_
```
初始化我们的项目
```
yarn init -y
```
接着是安装我们的依赖vuepress
```
yarn add -D vuepress
```
安装好依赖以后,我们可以在终端键入
```
mkdir docs
echo '# This is my blog' > docs/README.md
```
那么就可以看到在项目中有个docs的文件夹了,并且里面有个README.md的文件.
接下来我们来启动我们的项目,vuepress 提供了如下命令来启动和打包我们的项目
```
vuepress dev docs
vuepress build docs
```
我们在 package.json 中来创建两个简单的命令来代替上面的指令
```
{
  "scripts": {
    "dev": "vuepress dev docs", //启动项目
    "build": "vuepress build docs" // 编译项目
  }
}
```
至此,我们就可以通过``yarn dev`` 来启动项目了,这时打开网址可以看到我们的项目已经运行成功了,页面如下:
![初始化页面](https://img-blog.csdnimg.cn/2020050311021242.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L21vZ3V6aGFsZQ==,size_16,color_FFFFFF,t_70)
### 配置项目
接下来就是来配置我们的项目结构了,如标题,导航之类的.vuepress有个`"约定大于配置"`的思想在里面,就是说很多东西,作者已经给我们都设置好了,我们只要按照作者提供的文档一步步将我们的东西填入其中,就可以完成我们想要的东西.
我们在docs文件夹中新创建一个 `.vuepress` 文件夹 ,并在其中新建一个`config.js` 配置文件:
```
module.exports = {
    title: 'lhs的个人博客',  //标题
    keywords: '前端开发',
    description: '前端开发 lhs的个人博客',
    repo: 'https://github.com/zeroonbush/blog.git',  //仓库地址
    base: '/blog/',  // 配合部署项目
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }]
    ],
    lastUpdated: 'Last Updated',
    themeConfig: {  //主题配置
        logo: '/img/logo.png',
        nav: [  //导航栏
            { text: '首页', link: '/' },
            { text: 'JS', link: '/js_docs/' },
            { text: 'CSS', link: '/css_docs/' },
            { text: 'Vue', link: '/vue_docs/' },
            { text: 'React', link: '/react_docs/' },
            {
                text: '2020',
                ariLabel: '2020',
                items: [  //多级导航栏
                    { text: 'May', link: '/2020/5/' },
                    { text: 'June', link: '/2020/6/' }
                ]
            },
            { text: 'github', link: 'https://github.com/zeroonbush/blog.git' }
        ],
        sidebar: {  //侧边拦
            '/2020/': [
                ['/2020/5/', '5月份'],
                ['/2020/6/', '6月份']
            ]
        }
    }
}
```
在写了上面的配置之后,要记得在.vuepress文件夹中新建一个`public`文件夹,将我们的图片资源放入其中.我们在引用图片资源的时候,都是以其为根目录的.此时可以看到我们的项目已经变成下面的样子,已经有了顶部的导航栏.点击2020,可以看到还有下拉框,点击下拉框中的选项还能看到连侧边栏都已经有了.
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200503111454223.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L21vZ3V6aGFsZQ==,size_16,color_FFFFFF,t_70)

### 配置首页结构
不知道大家到这里有没有发现,这个界面和vue,vuepress的官网有点像.没错,他们就是用vuepress来写的,前面也提到了,vuepress设计之初就是为了写文档,QAQ.
现在看主页的内容是不是太空白了点呢,我们来给他添加点东西吧.
我们将刚开始创建的README.md文件内容改成如下:
```
---
home: true
heroImage: /img/banner.png
heroText: lhs的日常记录
tagline: 喜欢打王者,只会射手
features:
- title: 是个160斤的胖子
  details: 是个160多斤的胖子,想要减肥,哪天你看不到这段话了,那说明我已经瘦下来了
---
```
至此,基本的页面布局已经差不多了,
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200503121805215.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L21vZ3V6aGFsZQ==,size_16,color_FFFFFF,t_70)


## 部署
在完成我们的个人博客后,我们下一步需要做的就是将我们的个人博客部署到线上去,让其他人能够访问到.
### Github Pages
今天,我们不用传统的购买服务器域名那一套,我们使用Github Pages 来部署.在github上展示静态网站有两个方法.
#### 创建 username.github.io 仓库
第一个是创建一个 github用户名.github.io 的仓库,别人通过 yourUserName.github.io 就能访问到我们的项目.点击查看:[https://zeroonbush.github.io/](https://zeroonbush.github.io/)
.
#### 创建gh-pages 分支
第二个是创建一个项目,并且创建一个`gh-pages` 的分支,我们将打包后的代码放到这个分支,别人就能通过  https://yourUserName.github.io/yourProjectName 来访问到我们的项目,点击查看:[https://zeroonbush.github.io/blog/](https://zeroonbush.github.io/blog/)

####  如何方便快速部署?
为了方便部署,我们可以安装一个插件叫做 `gh-pages` 
```
yarn add -D gh-pages
```
然后修改package.json中的脚本命令,添加如下的两条,
```
"deploy": "gh-pages -d docs/.vuepress/dist",
"commit": "yarn build && yarn deploy"
```

然后运行`yarn commit`命令,如果出现下面的报错,则是因为你的项目还没有关联仓库地址,只要关联下问题就解决了.至于如何关联,其实我们在github创建空项目的时候,github会告诉我们该如何做.这个比较简单,这里就不做过多阐述了.
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020050312364494.png)
关联成功以后,我们再次执行下命令,如果出现如下的提示,那就证明我们已经成功了.
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200503124658542.png)
然后我们访问我们的项目,可以看到我们的个人博客已经展示出来了,如果出现`css`或`js`加载不到的情况,则注意配置中的`base` 属性,这里面需要填写我们的项目名.

至此,我们已经使用了`vuepress`搭建了一个个人博客,并且使用了`Github Pages`来部署我们的博客,今天的任务基本算是大功告成了.好了.到了该放松的时刻,选出我们的`小鲁班`,去找凯爹突突突吧!

>项目地址: [https://github.com/zeroonbush/blog](https://github.com/zeroonbush/blog)
可直接下载源代码运行以查看效果