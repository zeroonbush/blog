# 快来和fetch玩耍吧

## fetch是什么?
`fetch` 是一种使用 `promise` 为构建块的现代异步网络请求方法.是当今进行异步网络请求的新标准.除了IE之外,在各大浏览器中的兼容性都还可以,在[caniuse](https://www.caniuse.com/#search=fetch)上查询fetch的浏览器兼容性,不支持的浏览器可以使用 [fetch polyfill](https://github.com/github/fetch).其本质是一种标准,该标准定义了请求,响应和绑定的流程,还定义了Fetch的JavaScript API.而Fetch API 提供了 `fetch()` 方法.它被定义在BOM的window对象中,返回一个 `Promise` 对象,因此我们能够对返回的结果进行检索.


## fetch怎么用?
为了方便测试,我们选择自己用 `express` 来写一个简单的接口.当然大家也可以使用[在线接口](http://jsonplaceholder.typicode.com/)来测试`fetch`的功能.这个在线接口地址的例子就是用 `fetch` 来写的.

### get请求
下面是接口代码,先是简单的定义了一个 `get` 请求,返回一个字符串.
```js
const express = require('express')
const app = new express()

// 设置接口允许跨域
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin','*')
  next()
})

// 编写一个get请求
app.get('/test', (req, res, next) => {
  res.send('Hello world')
})
const port = process.env.port || 8686
app.listen(port, () => {
  console.log('Server start in http://localhost:%s', port)
})
```

`fetch()` 的第一个参数是要获取资源的url,第二个参数可选,是个配置选项.

```js
fetch('http://localhost:8686/test').then(response => response.text()).then(res => {
  console.log(res)  // Hello world
}).catch(error => {
  console.log(error)
})
```
fetch方法的 `then` 会接收一个 `Response` 实例.但值得注意的是,fetch方面的第二个 `then` 接收的才是后台传过来的真正数据,而前一个 `then` 则是对数据进行处理或者异常捕获.在上面的例子中, `response => response.text()` 就是在第一个 `then` 里面对数据进行处理,返回一个处理后的数据.这里使用的是 `text()` 方法,它可以将主体内容作为字符串返回.其他的方法还有 `json()` , `blob()` , `formData` 和 `arrayBuffer()`. 我们再来看看 `json()` 的用处,它可以将数据反序列化为一个对象.
在接口代码中,添加如下:
```js
app.get('/test2', (req, res, next) => {
  res.json({
    name:'zhangsan',
    age:12
  })
})
```
若结果还是用 `text()` 返回的话,则是 `{"name":"zhangsan","age":12}` 字符串,但是若用 `json()` 返回,就是一个对象了 `{name: "zhangsan", age: 12}`.很明显,在这里使用 `json()` 就比 `text()` 要好.

**第一个then里面的处理方法总结**

- text() 返回一个被解析为USVString格式的Promise对象
- json() 返回一个被解析为JSON格式的Promise对象
- blob() 返回一个被解析为Blob格式的Promise对象
- formData() 返回一个被解析为FormData格式的Promise对象
- arrayBuffer() 返回一个被解析为ArrayBuffer格式的Promise对象

#### 使用async改写
上面所有的方法都会返回 `Promsie` ,所以我们可以在后面继续使用一个 `then` 和一个 `catch`.当然了,我们也可以使用 `async` 和 `await` 来改写上面的代码.
```js
!(async () => {
  const response = await fetch('http://localhost:8686/test2')
  const res = await response.json()
  console.log(res)  // {name: "zhangsan", age: 12}
})()
```


### 错误捕获
前面提到了,可以在第一个 `then` 里面对数据进行处理,也可以捕获异常.我们将请求的url改为一个不存在的地址.
```js
fetch('http://localhost:8686/test666').then(response => {
  if(!response.ok){
    throw new Error(response.statusText)  // throw an Error
    // return Promise.reject({  // rejecting a Promise
    //   status:response.status,
    //   statusText:response.statusText
    // })
  }
  return response.json()
}).then(res => {
  console.log(res)
}).catch(error => {
  console.log(error)  // Error: Not Found
})
```
上面的代码将会抛出一个异常,我们也可以通过`Promise`的 `reject` 来调用 `catch`.

### post请求
上面差不多把一个最简单的get请求讲完了,接下来我们继续说一说post请求要怎么发送.我们先修改服务端的代码如下,新增加了一个 `post` 请求的接口.这个接口将请求时发送的数据外加一个表示结果的字段一起打包返回回去.
```js
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const app = new express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 设置接口允许跨域
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin','*')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

// 编写一个get请求
app.get('/test', (req, res, next) => {
  res.send('Hello world')
})

app.get('/test2', (req, res, next) => {
  console.log(req)
  res.json({
    name:'zhangsan',
    age:12
  })
})

app.post('/create', (req, res, next) => {
  let obj = Object.assign({result:'success'}, req.body)
  res.status(200).json(obj)
})

const port = process.env.port || 8686
app.listen(port, () => {
  console.log('Server start in http://localhost:%s', port)
})
```
前端发送fetch请求的代码如下:
```js
const data = {
  name:'zhangsan',
  age:12
}

fetch('http://localhost:8686/create',{
  method:'post',
  body:JSON.stringify(data),  // 请求的body信息,get和head方法是不能包含body信息
  headers:{  // 配置请求的头信息,包含与请求关联的Headers对象
    'Content-Type':'application/json;charset=utf-8'
  }
}).then(response => {
  return response.json()
}).then(res => {
  console.log(res)  // {result: "success", name: "zhangsan", age: 12}
}).catch(error => {
  console.log(error)
})
```

### 第二个参数的配置项

在上面的代码中,我们使用了fetch方法的第二个参数,即配置选项.其中, `method` 表示请求方式,默认为 `get`, 其他的还有 `post`, `put`, `head`, `delete` 等. `body` 为请求的body信息,`get` 和 `head` 是没有 `body` 的.而 `headers` 则是请求头相关信息.在这个配置选项中,还有一些配置项目,我们来简单的说一下.

- **credentials**  要让浏览器发送包含凭证(cookie)的请求(即使是跨域源),就要将此属性设置为 `include`, `same-origin` 则是请求url和调用脚本位于同源时发送凭证,若是不想发送凭证则是 `omit`.这里就表现出了fetch和ajax的一个区别:默认情况下,fetch不会接受或者发送cookies.
- **mode** 设置请求模式,属性值有 `cros` `no-cors` `same-origin`.其中 `same-origin` 表示必须同源,禁止跨域,否则会报 ` Request mode is "same-origin" but the URL's origin is not same as the request origin xxx` 的错误.若设置了 `cros` 则需要服务端配合设置响应头 `Access-Control-Allow-Origin` 为相应的域名或 `*`.`no-cors` 的效果就是无论外域服务器是否设置了允许跨域的响应头,浏览器都 可以对外域发送请求,但是它不接受响应.
- **cache** 设置请求的缓存模式,属性值有 `default` `reload` `no-cache` `no-store` `force-cache` `only-if-cached`
- **referrer** 来源地址 `no-referrer` `client`.注意了,这里采用的 `referrer` 这种正确的拼法,而不是 `referer` 这种错误的拼写.有关 `referrer` 的拼法的历史趣闻,可看我文末的第二个参考链接.

### Request构造器函数
除了上面介绍的fetch的使用方法外,我们还可以通过一个 `Request` 构造器函数来创建一个新的请求对象.
```js
let req = new Request('http://localhost:8686/test',{
  method:'get'
})
fetch(req).then(response => response.text()).then(res => {
  console.log(res)  // Hello world
}).catch(err => {
  console.log(err)
})
```

### Headers构造器函数
我们也可以通过一个 `Headers` 构造器函数来设置我们的请求头
```js
myHeader = new Headers()
myHeader.append('Content-Type','application/json;charset=utf-8')
... 
{
    headers:myHeader
}
```


## fetch与ajax有什么关系?
fetch是 `XMLHttpRequest` 的一种替代方案,fetct就是原生的js,不是ajax的进一步封装.

### 区别
- fetch返回的promise不会拒绝http的错误状态,即使响应是`404`或者`500`,它们不被认为是网络错误.只有当网络故障或者请求被阻止时,才会标记为reject.因此成功的fetch()检查不仅要包含promise被resolve,还要包括`response.ok`属性为true,该属性是检查response的状态是否在200-299这个范围内来确定的.
- 默认情况下,fetch不会接受或者发送cookies

### fetch的优势
- fetch请求相对来说语法简洁,代码更少,更具语义化,且数据处理过程更加清晰
- 基于标准的Promise实现,且支持 `async/await`,避免了回调地狱,
- 接口更加的合理化,因为ajax是将所有不同性质的接口都放在了XHR对象身上,而fetch则是分散在不同的对象上,如 Headers, Response, Request等 
- 可以在ServiceWorker中使用

## fetch会出现reject的情况
上面说到了,只有当网络故障或者请求被阻止的时候,才会标记为 `reject`.下面我们来看下这两种情况.

### 网络故障
我们去 `Chrome` 浏览器中,将 `Network` 中的网络设置为 `Offline` 离线状态,再次调用如下代码,就会发现控制台打印出错误.请求结果进入到 `reject` 状态了.
```js
fetch('http://localhost:8686/test').then(response => response.text()).then(res => {
  console.log(res)  
}).catch(error => {
  console.log(error)  // TypeError: Failed to fetch
})
```

### 请求中止
fetch本身并没有提供中止请求的方法.但是部分浏览器有实现 `AbortController`,可以用来中止fetch请求.
```js
const controller = new AbortController()
const signal = controller.signal
setTimeout(() => { controller.abort() }, 200)  // 自己调整定时器的时长查看效果,可以配合Chrome浏览器中的Network,将网络调整为慢速3G

fetch('http://localhost:8686/test',{
  signal  // 将上面的signal加入到配置项中
}).then(response => response.text()).then(res => {
  console.log(res)  
}).catch(error => {
  console.log(error)  // DOMException: The user aborted a request.
})
```

## 总结

![fetch](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9ibG9nLTEyNTcyMzM0MTcuY29zLmFwLW5hbmppbmcubXlxY2xvdWQuY29tL2ZldGNoLnBuZw?x-oss-process=image/format,png)

参考链接:
- [https://www.jianshu.com/p/f817490796d3](https://www.jianshu.com/p/f817490796d3)
- [https://www.jianshu.com/p/3e390c88d5ef](https://www.jianshu.com/p/3e390c88d5ef)
- [https://www.jianshu.com/p/7762515f8d1a](https://www.jianshu.com/p/7762515f8d1a)
- [https://juejin.im/post/6844903903004196872](https://juejin.im/post/6844903903004196872)
- [https://www.cnblogs.com/libin-1/p/6853677.html](https://www.cnblogs.com/libin-1/p/6853677.html)
- [https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API)
- [https://developer.mozilla.org/zh-CN/docs/Web/API/FetchController](https://developer.mozilla.org/zh-CN/docs/Web/API/FetchController)
- [https://developer.mozilla.org/zh-CN/docs/Web/API/Headers](https://developer.mozilla.org/zh-CN/docs/Web/API/Headers)
- [https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch)

