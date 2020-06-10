# EventTarget介绍
>EventTarget是一个DOM接口,由可以接收事件并且可以创建侦听器的对象实现
`Element`,`document`,`window`是最常见的event target,但其他对象如`XMLHttpRequest`等

## 构造函数
创建一个新的`EventTarget`对象实例
```javascript
class T extends EventTarget {
  constructor(name){
    super()
    this._name = name
  }
  get name(){
    return this._name
  }
}
let t = new T('zhangsan')
console.log(t.name)  // zhangsan
t.addEventListener('good',function(e){
  // 接口CustomEvent的只读属性detail 返回在初始化事件对象时传递过来的任何类型数据
  this._name = e.detail
})
// CustomEvent创建一个自定义事件
let e = new CustomEvent('good',{detail:'lisi'})
t.dispatchEvent(e)
console.log(t.name)  // lisi
```

## 方法
EventTarget提供了三个实例方法:
 - EventTarget.addEventListener()
 - EventTarget.removeEventListener()
 - EventTarget.dispatchEvent()

### EventTarget.addEventListener()
语法:
> EventTarget.addEventListener(type, listener, useCapture)

该方法接收三个参数:
- type 事件名称,大小写敏感
- listener 监听函数
- useCapture 布尔类型,监听函数是否在d捕获阶段触发(默认为false)

我们以前给元素添加事件的时候,很多时候使用的是`onEvent`的方法,我们先来看下面的例子:
```html
<button id="btn1">click me</button>
```
```javascript
let btn1 = document.querySelector('#btn1')
btn1.onclick = function(){
  console.log('first')
}
btn1.onclick = function(){
  console.log('second')
}
```
如果给同一个元素绑定了两次,则后面的会覆盖前面的.点击按钮控制台只会打印出`second`.
而我们用`addEventListener`来看下效果
```javascript
let btn1 = document.querySelector('#btn1')
btn1.addEventListener('click',function(){
  console.log(1)
})
function log2(){
  console.log(2)
}
btn1.addEventListener('click',log2)
```
此时我们点击按钮,控制台会打印出`1`和`2`,
addEventListener的第二个参数,也可以是一个具有`handleEvent`方法的对象,下面的代码打印出`handleEvent`
```javascript
let btn1 = document.querySelector('#btn1')
btn1.addEventListener('click',{
  handleEvent:function(){
    console.log('handleEvent')
  }
})
```
addEventListener的第三个参数,也可以是一个属性配置对象.假如只希望事件监听函数只执行一次,可以设置`once`属性为true
```javascript
let btn1 = document.querySelector('#btn1')
btn1.addEventListener('click',{
  handleEvent:function(){
    console.log('handleEvent')
  }
},{once:true})
```
`addEventListener`方法可以为一个对象添加多个不同的监听函数,若添加了多次同个监听函数也只会执行一次
```javascript
let btn1 = document.querySelector('#btn1')
function log(){
  console.log('log')
}
btn1.addEventListener('click',() => {
  console.log(1)
})
btn1.addEventListener('click',() => {
  console.log(2)
})
btn1.addEventListener('click',log)
btn1.addEventListener('click',log)
```
若要向监听函数传参,则可以使用匿名函数包装监听函数
```javascript
let btn1 = document.querySelector('#btn1')
function log(t){
  console.log(t)
}
btn1.addEventListener('click',function(){
  log(1)
})
```
### EventTarget.removeEventListener()
语法:
> EventTarget.removeEventListener(type, listener, useCapture)

`removeEventListener`可以删除使用`EventTarget.addEventListener()`方法添加的事件
```javascript
let btn1 = document.querySelector('#btn1')
function log(){
  console.log(1)
}
function log2(){
  console.log(2)
}
btn1.addEventListener('click',log)
btn1.addEventListener('click',log2)
btn1.removeEventListener('click',log2)
```
上面的代码只会打印出`1`,因为`log2`事件已经被删除了

### EventTarget.dispatchEvent()
语法:
> target.dispatchEvent(event)

- target 触发目标
- event 要被派发的事件对象,是一个`Event`对象的实例

```html
<button id="btn1">按钮1</button>
<button id="btn2">按钮2</button>
```
```javascript
let btn1 = document.querySelector('#btn1')
let btn2 = document.querySelector('#btn2')
btn1.addEventListener('click',function(){
  console.log('btn1')
})
btn2.onclick = function(){
  btn1.dispatchEvent(new Event('click'))
}
```









