# deno入门指南

> 前不久, deno1.0 正式发布,相信大家应该都已经听过它了.毕竟deno的作者正是大名鼎鼎的nodeJS之父Ryan Dahl.他在之前声称node已经无力回天了,所以他决定新写一个deno.意为destroy node.通俗的说就是一个号练废了,现在要重新练一个号.

deno怎么发音,有说`蒂诺`的,有说`德诺`的.为此,我特意去YouTube上听了下deno作者的发音,[链接戳我](https://www.youtube.com/watch?v=z6JRlx5NC9E),但我怎么感觉听着更像是`呆诺`呢? 各位同学可以自行爱好发音.

## deno特性
Deno是使用V8引擎并内置于Rust的一个简单现代并且安全的JavaScript和TypeScript运行时(Tips: 原先是用golang开发的,后来因为性能问题改用Rust)
这里简单的列了一下其中的一些特性:

 1. 默认为安全,除非明确启用,否则没有文件,网络或环境访问权限
 2. 开箱即用的支持TypeScript
 3. 仅发送一个可执行文件
 4. 具有内置的实用程序,如依赖检查器和代码格式化(fmt)
 5. 拥有一组保证能够与deno一起使用的经过审核的标准模块:[链接戳我](https://deno.land/std)


## 安装
因为我自己是macOS系统,所以国际惯例使用homebrew来安装
```
brew install deno
```
window系统的安装方式
```
choco install deno
```
还有其他的安装方式,可以自行查看: [如何安装](https://deno.land/#installation)

## 测试安装
```
deno --version
```
如果打印了deno的版本号则证明已经安装成功了
![在这里插入描述](https://user-gold-cdn.xitu.io/2020/5/21/17236a2097f729f4?w=217&h=84&f=png&s=7062)
我这边是打印出了deno, v8引擎以及ts的版本号

## 更新deno
```
deno upgrade
```
如果想要更新到某一个特定的版本,那就
```
deno upgrade --version 1.0.1
```
但是这个更新的速度实在是太...
所以,有时候还是选择手动下包吧,自己动手,丰衣足食 [链接戳我](https://github.com/denoland/deno/releases).将下载下来的包解压缩后,替换原来的可执行文件即可.
这里可以看到我的deno版本已经更新了.
![在这里插入图片描述](https://user-gold-cdn.xitu.io/2020/5/21/17236a2098ebfcab?w=186&h=79&f=png&s=7508)

## 查看命令行
```
deno --help
```
基本上的环境都有 `--help`的指令,方便我们查看相关的指令.这里我们也是照例来简单瞧一瞧都有哪些信息.
在输出结果中,我们可以看到除了常用命令外,它还告诉了我们该如何执行一个脚本


## 运行远程文件
接下来让我们来运行下`help`信息中展示给我们看的代码:
```
deno run https://deno.land/std/examples/welcome.ts
```
![在这里插入图片描述](https://user-gold-cdn.xitu.io/2020/5/21/17236a209b3638aa?w=467&h=80&f=png&s=16609)
可以看到当我第一次运行代码的时候,它是先下载,然后再编译.
此时我们再次运行下代码,发现就只是直接编译了.
![在这里插入图片描述](https://user-gold-cdn.xitu.io/2020/5/21/17236a209f88cd6b?w=475&h=62&f=png&s=12516)
这是因为通过外部地址引入的文件或库,在第一次下载后都会缓存在本地,所以第二次就不下载,而是直接编译了.
我们可以看到在终端输出了 `Welcome to Deno 🦕`这句话.我们打开上面的[网址](https://deno.land/std/examples/welcome.ts)可以看到它上面的代码就只有一行
![在这里插入图片描述](https://user-gold-cdn.xitu.io/2020/5/21/17236a209e2ef4cd?w=1116&h=350&f=png&s=49382)
这个可爱的图标就是一只小恐龙,因为deno的标志就是一只恐龙呀

## 运行本地文件
我们新建一个`index.ts`文件
```
console.log('hello deno');
```

运行下该文件`deno run index.ts`
终端输出了`hello deno`,证明我们的本地文件也已经运行起来了

## 权限

### 文件权限
我们修改代码
```
console.log(Deno.cwd());
```
再次执行文件,会报错
```
Uncaught PermissionDenied: read access to "/Users/xxx/code/deno/deno_test", run again with the --allow-read flag
```
这是因为deno的安全策略(即上面的`特性1`),默认是没有文件,网络或环境访问权限的,除非我们明确启用.于是我们加上`--allow-read`参数,再次执行`deno run --allow-read index.ts` 可以看到我们的文件路径已经打印出来了.

### 网络权限
```
fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  .then(json => console.log(json))
```
执行运行命令`deno run index.ts`,报错
```
error: Uncaught PermissionDenied: network access to "https://jsonplaceholder.typicode.com/todos/1", run again with the --allow-net flag
```
重新执行命令`deno run --allow-net index.ts`, 可以看到输出结果了
```
{ userId: 1, id: 1, title: "delectus aut autem", completed: false }
```



## 编辑器插件
前面我们提到了引用外部库的时候,第一次是会下载的,那么我们下载下来的文件在什么地方呢?这里我使用的编辑器是`VSCode`,我们可以安装一个插件`Deno`.
![在这里插入图片描述](https://user-gold-cdn.xitu.io/2020/5/21/17236a20a02161ec?w=856&h=149&f=png&s=37403)
安装好以后,我们只要将鼠标放到引入的url上,它就会显示这个文件在我们本地的位置.
![在这里插入图片描述](https://user-gold-cdn.xitu.io/2020/5/21/17236a20b7967ed0?w=349&h=148&f=png&s=22904)

## 内置工具
可以对照`特性4`,我们先来看原代码
![在这里插入图片描述](https://user-gold-cdn.xitu.io/2020/5/21/17236a20b60ad22d?w=520&h=115&f=png&s=17518)
执行命令后:
```
deno fmt index.ts
```
![在这里插入图片描述](https://user-gold-cdn.xitu.io/2020/5/21/17236a20bd77b652?w=532&h=100&f=png&s=17134)
可以看到代码中开头的空格已经没了

## 引入标准库
我们执行上图中的代码,输出如下:
![在这里插入图片描述](https://user-gold-cdn.xitu.io/2020/5/21/17236a20c191ca92?w=156&h=71&f=png&s=8701)
这也印证了`特性5`,deno拥有一些标准库.

当然除了官方的标准库以外,还有第三方库,可以在这里看到[链接戳我](https://deno.land/x)

**总结:** deno简单的入门差不多就到这里了,对deno已经有了一个大致的概念.我估计大部分的人可能在未来的几年里面,工作中都用不到这个.宝宝心里苦啊😭,node还没学会,现在就要毁灭node了.












