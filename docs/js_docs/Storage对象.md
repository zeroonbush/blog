# Storage对象

> 在HTML5提供了两种在客户端储存数据的新方法:`localStorage` 和 `sessionStorage`.之前的储存功能由cookie来完成,但cookie不太适合大量数据的储存,因为每次向服务器请求都会将cookie带过去.


`localStorage` 和 `sessionStorage` 这两个存储对象可以对网页数据进行增删改查操作.它们的区别在于前者可以持续性保存数据,即数据并没有过期时间,除非我们手动清除数据,而后者是将数据保存在当前会话中,关闭当前窗口或标签页后就会消失.它们都是挂载在 `window` 对象上的.即 `window.localStorage === localStorage`.下面我们主要以 `localStorage` 来介绍它们的用法.


## 基本用法

### 检测兼容性
当我们在首次使用 `localStorage` 的时候,我们需要判断下浏览器是否支持这个属性.该属性在IE8+浏览器上就已经支持了(IE是浏览器兼容性质检员,它都能支持,其他的基本也没啥问题),所以目前主流的浏览器都是支持这个属性的.
```js
function fn(){
  if(!window.localStorage){
    return alert('当前浏览器不支持localStorage')
  }
  console.log('begin coding')
}
fn()
```

### 保存数据
使用 `localStorage` 可以创建一个本地存储的键值对,并存储在浏览器中 `Application` 中的 `Local Storage` 中.
```js
localStorage.setItem('key1', 'value1')
localStorage.setItem('key2', {
    name:'zhangsan',
    age:12
})
```

![application_localStorage](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9ibG9nLTEyNTcyMzM0MTcuY29zLmFwLW5hbmppbmcubXlxY2xvdWQuY29tL2FwcGxpY2F0aW9uX2xvY2FsU3RvcmFnZS5wbmc?x-oss-process=image/format,png)

从图中大家可以看到,当我们存进去的值是个对象的时候,它会变成 `[object Object]`.这是因为存进去的 `key/value` 都是以**字符串**的形式保存在浏览器中.当我们存进去一个对象的时候,它会调用对象的 `toStirng` 方法,将其变成 `[object Object]`.因此当我们想要存储一个对象形式的值时,我们可以使用 `JSON.stringify` 将其序列化.
```js
localStorage.setItem('key2', JSON.stringify({
  name:'zhangsan',
  age:12
}))
```
此时存进去的字符串就是原本我们对象的字符串形式了.

![application_localStorage](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9ibG9nLTEyNTcyMzM0MTcuY29zLmFwLW5hbmppbmcubXlxY2xvdWQuY29tL2FwcGxpY2F0aW9uX2xvY2FsU3RvcmFnZTIucG5n?x-oss-process=image/format,png)

### 获取键名
获取某个key名
```js
console.log(localStorage.key(0))  // 获取储存对象中第n个键值对的键名
```

### 获取数据
获取某个特定key对应的value值
```js
console.log(localStorage.getItem('key1'))  // value1
```
同样的,但我们想要取到一个JSON字符串中某个键对应的值时,可以将其取出来后使用 `JSON.parse` 反序列化
```js
localStorage.setItem('key2', JSON.stringify({
  name:'zhangsan',
  age:12
}))
console.log(JSON.parse(localStorage.getItem('key2')).name)  // zhangsan
```


### 删除数据
删除某个特定的键值对
```js
localStorage.removeItem('key1')
```

### 清除全部数据
清除全部的键值对
```js
localStorage.clear()
```

### 获取整个Storage对象
```js
console.log(localStorage)  // Storage {key2: "value1", key1: "value1", length: 2}
```
从这里可以看出来, `localStorage` 是个对象,因此还可以使用下面的方法保存,读取或删除数据.
```js
localStorage['key2'] = 'value2'
localStorage.key3 = 'value3'
console.log(localStorage['key2'])  // value2
console.log(localStorage.key3)  // value3
delete localStorage['key2']
delete localStorage.key3
```

### 获取键值对的数量
```js
console.log(localStorage.length)  // 2
```
因为 `Storage` 是个对象,所以可以使用 `Object.keys()` 来获取所有的键名,使用 `Object.values()` 来获取所有的内容值
```js
console.log(Object.keys(localStorage))  // ["key2", "key1"]
console.log(Object.values(localStorage))  // ["value2", "value1"]
```

## 其他
扩展了 `cookie` 的 4k限制,它的存储量可以高达5M(值在不同的浏览器中有可能是不一样的).且此方法的兼容性还不错,甚至连IE8都支持.`localStorage` 也是遵循同源策略的,因此不同的网站之间是不相通的.



参考链接:
- [https://juejin.im/post/6857315310908506119?utm_source=gold_browser_extension#heading-3](https://juejin.im/post/6857315310908506119?utm_source=gold_browser_extension#heading-3)
- [https://www.cnblogs.com/st-leslie/p/5617130.html](https://www.cnblogs.com/st-leslie/p/5617130.html)







