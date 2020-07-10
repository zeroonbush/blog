# 10分钟回顾Location对象的几个知识点
> Location对象包含有关当前URL的信息.它是一个比较特别的对象,因为它既是Window对象的一部分,可通过`window.location`属性来访问.也是document对象的属性,通过`document.location`来使用.

我的页面路径是 `http://127.0.0.1:5501/html/index.html?id=123#test`,在控制台键入`window.location`,返回一个`Location`对象.

![Location Object](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9ibG9nLTEyNTcyMzM0MTcuY29zLmFwLW5hbmppbmcubXlxY2xvdWQuY29tL0xvY2F0aW9uX29iamVjdC5wbmc?x-oss-process=image/format,png)

这其中有些是属性,有些是方法,我们来简单了解一下.

## 对象属性
我们按照上图中展开的`Location`对象,来说一说其中的一些属性

| 属性 | 描述 |
| ---- | --- |
| hash | 锚点部分,以`#`开头 |
| host | 主机名 + 端口号 |
| hostname | 主机名 如`127.0.0.1` `localhost` 等|
| href | 包含完整URL |
| origin | 协议 + 主机名 + 端口号(我们常说的跨域,跨的就是它) |
| pathname | 路径部分,以 `/` 开头 |
| port | 端口,常见的`80` `443`等 |
| protocol | URL对应的协议,注意最后是有一个`:`的,如`http:` `https:` 等   |
| search | 参数部分,以`?` 开头 |

下面这个是一个在[MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location)上的例子,比较清晰直观的展示了各个部分的内容:

![Location](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9ibG9nLTEyNTcyMzM0MTcuY29zLmFwLW5hbmppbmcubXlxY2xvdWQuY29tL2xvY2F0aW9uLmdpZg)

其中上面的属性,除了 `origin` 是个只读属性不可修改外,其余的属性都是读写兼备的.
下面是属性如何获取和设置的用法
```js
console.log(window.location.hash)  // 读取当前页面的hash 结果为 #test
window.location.hash = 'test2' // 设置当前页面的hash 此时可以观察到浏览器的url会变化
console.log(window.location.hash) // 再次读取hash,结果变成了 #test2
window.location.href = 'https://www.baidu.com'  // 页面直接跳转到百度
```
在这里顺便提一下,现在大部分的浏览器都支持 `hashchange` 事件.就是当浏览器`#` 后面的内容变化时,触发此事件.
```js
window.addEventListener('hashchange', () => {
    console.log('Hash has changed')
})
```
执行上面的代码后,当我们改变url的hash部分时,控制台就会打印出提示.当然,对于那些不兼容`hashchange`事件的浏览器,也是有办法可以模拟的,比如设置一个定时器,每隔一定时间去查询当前的hash,和之前的hash去做对比从而判断url中的hash是否改变了.
**注意:** 每次修改`location` 的属性(`hash`除外),页面都会以新URL重新加载.

### 补充案例
曾经项目中有一个需求是这样的,点击按钮复制一个带有个人邀请码的注册链接.如这种样子的:`https://www.xx.com/register?code=8888`.那么这个链接就需要我们自己去拼接了.我原先伪代码如下
```js
let inviteCode = 8888
let url = location.origin + '/register?code' + inviteCode
copy(url)
```
但是后来测试同学在兼容性测试的时候告诉我这里有问题,在IE11以下的浏览器中复制出来的路径是有问题的.于是,我去排查原因,发现`location.origin` 这个属性在IE10及其以下是不存在的,会返回`undefined`,既然发现了问题所在,那我们就好解决了.解决代码如下:
```js
if(!location.origin){
    location.origin = location.protocol + '//' + location.hostname + (location.port ? ':'+location.port : '') 
}
let inviteCode = 8888
let url = location.origin + '/register?code' + inviteCode
copy(url)
```
提交代码,于是测试同学高兴的告诉我说问题解决了.

## 对象方法
从文章最开头的图中可以看到 `Location` 对象有3个方法 (`toString`方法就不说了,就是返回一个包含完整url的字符串)

| 方法 | 描述 |
| ---- | --- |
| assign| 加载新页面 |
| reload| 重加载当前页面 |
| replace| 用一个新页面代替当前页面 |

这里来说明一下这几个方法的用法和区别.首先我们说的是`reload`方法.此方法的参数是一个可选的布尔类型,不填默认为`false`,表示可能从缓存中读取当前页面刷新,相当于普通的F5刷新,`true`表示强制浏览器从服务器去重新获取页面资源,相当于强制刷新(`Shift`+`F5` 或者 `Cmd`+`Shift`+`R`),具体用法如下:
```js
window.location.reload()  // 执行后会重新加载当前页面
```
然后是 `assign` 和 `replace` 方法,这两个方法都需要传入一个参数,表示新页面的地址.它们的区别在于,使用了 `assign` 后,会在浏览器的历史记录中留下之前老页面的地址,当我们在新页面点击回退键的时候还可以回到之前的页面.而 `replace` 则是使用新页面的地址替换老页面的地址,此时再点击回退按钮就回不到我们之前的页面去了.大家可以新开一个空白页面,然后分别将下面的代码放到控制台去执行一下,再之后点击浏览器左上角的回退按钮,观察效果.
```js
// 新开两个空白页,各执行其中一句代码
window.location.assign('https://www.baidu.com')
window.location.replace('https://www.baidu.com')
```

在[MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location)中提到,`Location` 其实是一个接口,表示链接到的对象的URL.`Document` 和 `Window` 接口都有这样一个链接的Location.所以我们可以通过`document.location` 或 `window.location` 来访问 `Location` 对象.甚至于`location` 都是一个全局变量.我们直接在控制台键入 `location` 也会返回一个 `Location` 对象 


## meta属性实现刷新和跳转
其实当我们想要实现页面的跳转或者每隔一段时间刷新当前页面,不一定非得使用定时器+location方法.我们还可以使用meta属性来达到相同的效果.假如我这是一个监控页面,想要每隔20秒刷新一次页面.使用定时器的方法代码如下:
```js
setTimeout(() => {
    window.location.reload()
},20000)
```
而使用meta标签则只需要
```html
<meta http-equiv="refresh" content="20"/>
```
又假如这是一个简单的介绍页,在10s后差不多就要自动跳到其他页面.我们也可以使用上面的meta属性.只需要在`content`里面时间的后面加上跳转的地址就可以了,等时间到了它就会自动跳转.
```html
<meta http-equiv="refresh" content="10;https://www.baidu.com"/>
```
当然使用meta有一个不好的地方就是它的刷新和跳转是不可中途取消的.因此它的使用场景要视具体的业务而定.比如一个需要权限的页面被非法访问,那么就可以控制一定时间后自动跳到其他页面去.

## 获取url中的查询字符串
很多时候,我们有这样的需求,就是获取url查询字符串中某个key对应的value.比如在一个如 `http://127.0.0.1:5501/html/index.html?id=123&name=zhangsan` 的页面中获取id对应的值,也就是`123`.那么我们也有不少方法可以来做这个事情.

### 传统方法
```js
function getUrlQuery(){
  let url = window.location.search
  let obj = Object.create(null)
  if(url.includes('?')){
    let str = url.substr(1)
    let strs = str.split('&')
    for(let i = 0;i < strs.length;i++){
        let tmp = strs[i].split('=')
        obj[decodeURIComponent(tmp[0])] = decodeURIComponent(tmp[1])
    }
  }
  return obj
}
```
注意了,上面的代码中使用了 `decodeURIComponent` 来解码,因为查询字符串一般都是被 `encodeURIComponent` 编码过的,

### URLSearchParams接口
```js
const urlParams = new URLSearchParams(window.location.search)
console.log(urlParams.get('id'))  // 123
```
`URLSearchParams` 接口定义了一些实用的方法来处理URL中的查询字符串.[这里](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams)是它的具体介绍,有兴趣的同学可以自己去看看,我们就先不展开了.

## 总结
其实对于 `Location` 对象,它的知识相对而言并不是很多.在红宝书中也只有短短的3页内容.作为BOM中的一部分,它常常也会和 `Navigator`, `History`对象一起提到,这部分内容我们后面有时间再说好了.

