# 5分钟回顾原生ajax的几个知识点
> 今天早上在整理笔记的时候,发现了很久之前的有关ajax的相关内容.当时主要用的还是`jQuery`的`$.ajax()`.现在`jQuery`也快要退出历史舞台了,所以今天我们就来讲讲原生的ajax吧.

## 基本用法
首先简单的介绍一下`ajax`,全称是`Asynchronous JavaScript + XML`(异步JavaScript和XML).这不是一个语言,也不是一种新技术,只是一个在2005年被提出来的新术语,其类似的技术手段最早可以追溯到上个世纪末,而最早大规模使用`ajax`技术的是Gmail.大家都知道,以前的网页提交数据是通过form表单提交的,一提交就要全局刷新,烦得很.虽然后来可以用`iframe`的方式解决这个问题,但总归是太繁琐了.而`ajax`则是解决了这个痛点,它通过`XMLHttpRequest`对象向服务器发送异步请求,获得返回的数据后,再操作DOM来将增量更新呈现在用户界面上,做到无痛刷新.

下面我们来看这段代码,这是一个发送get请求的代码示例,相信大家应该都比较熟悉了吧!其实这还是一个缩减版的代码,在红宝书第3版中,为了所谓的浏览器兼容性,它还多了一步,即选择`ActiveXObject`对象中的传入值(我们现在传入的是`Microsoft.XMLHTTP`,其实还有其他的选项).这个太遥远了,现在来看也没有啥太大意义,只是感概一下以前的老程序员不容易啊.浏览器之间神仙打架,程序员之间凡人遭殃.
```js
function ajax(method, url, async = true){
  let xhr = null
  if(window.ActiveXObject){  // IE5 IE6才有这个对象,是微软独有的,现在基本也没有这俩浏览器了,可以不用管了
    xhr = new ActiveXObject('Microsoft.XMLHTTP')
  }else if(window.XMLHttpRequest){  // 现代浏览器基本都有这个
    xhr = new XMLHttpRequest()  // 实例化一个XMLHttpRequest
  }
  xhr.open(method ,url, async)  // 启动阶段,请求还没有发送
  xhr.onreadystatechange = function(){  // 监听readyState状态变化
    if(xhr.readyState === 4){
      if(xhr.status === 200){
        console.log(xhr.responseText)
      }
    }
  }
  xhr.send(null)  // 发送阶段
}
ajax('get','http://jsonplaceholder.typicode.com/posts/1')
```
这里我们的请求链接是`http://jsonplaceholder.typicode.com/posts/1`,这是一个假数据在线接口(Fake Online REST API).这里给大家安利一个在线工具,[jsonplaceholder](http://jsonplaceholder.typicode.com/),它上面有很多的接口,允许我们跨域访问获取一些假数据.这个对于我们平时测试啥的也挺方便的.它也支持多种请求方式,除了最基本的`GET`和`POST`,其他的像什么`PUT`,`PATCH`等也都是支持的.

`open`方法有三个参数,第一个参数表示请求方式,第二个参数表示请求的url,一般我们请求自己所属域的时候,写相对路径即可,在请求访问远程链接的时候才写绝对路径.第三个参数就是是否异步,一般都是异步.这里提一点,get请求也是可以带参数的,叫做`queryString`,它是一个拼接在url中的字符串.如 `https://www.xxx.com?name=zhangsan&age=12` 这个url中,`name=zhangsan&age=12`就是这个请求带过去的参数.通过`key=value`的形式表示键值对,每个键值对之间通过`&`符号连接,第一个键值对之前则有一个`?`.这里还要介绍另外一个方法: `encodeURIComponent()` 这是一个对URI的组成部分进行编码的方法.因为在有效的URL中是不能包含某些字符的,比如像空格之类的.这时我们就可以用这个方法对空格进行转义,会变成`%20`.我们来看下面例子:
```js
let str = 'https://www.xxx.com?name=狗子'
let str2 = `https://www.xxx.com?${encodeURIComponent('name')}=${encodeURIComponent('狗子')}`
console.log(str2)  // https://www.xxx.com?name=%E7%8B%97%E5%AD%90
```
可以看到`狗子`这两个汉字已经被转义了.

`onreadystatechange`方法是监听`readyState`的变化,至于`readyState`是什么,我们下面会稍微介绍下的.

`send`方法调用了以后,请求才是被真正的发送出去.此方法里面的参数表示要发送的数据,没有的话我们也要填写`null`,不然在某些浏览器中可能会报错.下面我们来发送一个post请求
```js
function ajax(method, url, async = true){
  const xhr = new XMLHttpRequest() 
  const data = {
    title:'title1',
    body:'body1',
    userId:1
  }
  xhr.open(method ,url, async) 
  xhr.setRequestHeader('Content-Type','application/json;charset=utf-8')  // 设置个请求头呗
  xhr.onreadystatechange = function(){  // 监听readyState状态变化
    if(xhr.readyState === 4){
      console.log(xhr.responseText) 
    }
  }
  xhr.send(JSON.stringify(data))
}
ajax('post','http://jsonplaceholder.typicode.com/posts')
```
这里`post`请求为啥要设置一个请求头? 说实话,我也不是特别清楚,感觉应该和服务器的设置有关.我去查了相关资料,觉得下面的说法最靠谱吧. 因为不加这个,服务器很有可能无法获取到我们发送的信息.我们设置此内容可以确保服务器知道实体中有参数.


## readyState状态值
这个表示的是ajax请求的状态值,即一个ajax所要经历的几个阶段,无论访问是否成功都将响应.大家可以在上面ajax函数的`onreadystatechange`事件中打印`readyState`,并将请求链接随便改成一个不存在的地址既可证明.
- 0 表示请求未初始化 刚开始就是这个状态,还未调用open()方法
- 1 启动 此时已经调用了open()方法
- 2 发送 此时已经调用了send()方法
- 3 请求接收中 此时已经接受了一部分数据
- 4 请求完成 数据接受完毕

这几个状态大家了解一下就行了,不必强行记忆.我们主要关心的状态4,就是此时响应体已经下载完毕,我们可以获取响应体的内容了.通过`xhr.responseText`来获取,`responseText`获取的是字符串形式的响应数据.另外还有一个`responseXML`获取的是XML形式的响应数据,我就没用到过,不去管了 (PS: 虽然感觉没有记住全部状态码的必要,但我以前在学的时候,还是顺带着记忆了一下.我是把发送请求比作是发射火箭的过程,0就是发射前准备阶段,1就是把火箭推出来了,但还没有发射.2就是按下发射按钮,火箭接收到发射命令,起飞了.这里ajax中的调用方法也是`send`,很形象.3就是火箭升空后返回一些数据的过程,比如高度,速度,燃料情况等,4就是火箭已经进入太空,该返回的数据都返回了,一切正常,大家可以暂时放松一下了.就好像火箭发射,肯定会经历这几个阶段,ajax也一样,都会经历上面的阶段.)

## HTTP状态码
http状态码大家应该都比较熟悉了.像我们最常见的200,表示请求成功了,304表示使用缓存,404表示请求资源不存在以及500一般表示服务器错误等.http状态码有很多,但我们平时使用的估计也就10种不到吧.通常我们可以归纳为如下:
- 1xx 信息响应类
- 2xx 处理成功响应
- 3xx 重定向
- 4xx 客户端错误
- 5xx 服务器错误

具体所有的细节,大家可以在[这里](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status)看到.

## load事件
Firefox最早引入的一个事件,用来代替`readystatechange`,因为此时的`readyState`已经变成4了.
```js
xhr.onload = function(){
  console.log(xhr.readyState)  // 4
  if(xhr.status === 200){
    console.log(xhr.responseText)
  }
}
```
除了`load`事件以外,`XMLHttpRequest 2级`中还实现了很多其他事件.具体可以参考[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest).

## CORS(跨域资源共享)
全称是`Cros-Origin Resource Sharing`,跨域资源共享.因为浏览器的同源策略,同源策略中的其中一种即是`XMLHttpRequest同源策略`,它禁止使用XHR对象向不同源的服务器地址发起HTTP请求.一般情况下,只能访问同源的资源,同源指的是协议(protocol),域名(host),端口(port)等都相同.

对于`CORS`的介绍,红宝书中是这么说的.它是一个W3C标准,定义了在必须访问跨域资源时,浏览器和服务器之间应该如何沟通.其背后基本思想,就是使用自定义的 HTTP头部让浏览器与服务器进行沟通,从而决定请求或响应是应该成功,还是应该失败.

传统的跨域请求的解决方案基本就是`JSONP`和`iframe`.而现在要允许跨域访问,一般我们需要设置`Access-Control-Allow-Origin`,这是HTML5中定义的一种解决资源跨域的策略.需要浏览器和服务器同时支持.比如 `Access-Control-Allow-Origin:*`,这里的`*`表示所有域都能访问,如果只允许某个特定域访问的话,则设置如下:`Access-Control-Allow-Origin:http://www.xxx.com`,表示只有`http://www.xxx.com`这个网址下的可以正常访问该服务器,对于其他没有该标识的域则会提示禁止访问.当服务器返回的资源中加入了`Access-Control-Allow-Origin`头标识后,浏览器才允许跨域访问.我们来看下jsonplaceholder返回的响应头信息.

![response_header](https://blog-1257233417.cos.ap-nanjing.myqcloud.com/response_header.png)

当然还有一种解决跨域问题的方案就是使用代理服务器,现在我们公司项目都是前后端分离的,在vue项目中,基本都自带了http服务器.在配置项中的`proxyTable`中进行设置即可.


## 总结
其实现在基本不太会有人还在项目中使用原生ajax了.大部分人用的应该还是`jQuery`或者`Axios`等.我们今天讲原生ajax,主要还是为了巩固下相关知识点.我上面讲的东西,相信大家当初应该都学过,只是时间久了可能会忘,所以今天我们只是回顾下.所谓温故而知新,可以为师矣.
![ajax](https://img-blog.csdnimg.cn/20200629173804276.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L21vZ3V6aGFsZQ==,size_16,color_FFFFFF,t_70)





