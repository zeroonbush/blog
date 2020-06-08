# 一文了解this指向
> this的中文意思是这,在javascript中指的是当前执行代码的环境对象.在非严格模式下,总是指向一个对象,在严格模式下可以是任意值.相信很多同学在看到这个this的时候,肯定是有点脑壳疼的.所以今天我就写了一篇有关this的小文章,来梳理梳理有关this的几种用法,希望对大家都能有所帮助

## 事件调用环境
谁触发事件,函数里面的`this`就指向谁
```html
<button id="btn1">click me</button>
```
```javascript
let btn1 = document.querySelector('#btn1')
function fn(){
  console.log(this)
}
btn1.onclick = fn
```
上面的代码打印出button按钮这个对象

## 全局环境
首先我们看下在全局环境下this指向谁?
```javascript
console.log(this)
```
我们把上面的代码放到浏览器环境下执行,结果是`Window`对象
再打开终端Terminal,键入`node`指令,进入node执行环境,结果是global
新建一个`index.js`文件,使用`node index.js`运行脚本,这里的`this`指的是node的默认导出对象,我们执行如下代码
```javascript
console.log(this)  // {}
console.log(module.exports)  // {}
console.log(module.exports === this)  // true
```

## 函数环境

### 单纯函数调用
```javascript
function fn(){
  console.log(this)
}
fn()  // Window
```
但是在严格模式下,this指向的就是`undefined`了
```javascript
'use strict'
function fn(){
  console.log(this)
}
fn()  // undefined
```
可以看出单纯的调用函数时,this指向的就是全局对象

### 对象方法调用
```javascript
let obj = {
  a:1,
  fn:function(){
    console.log(this)
  }
}
obj.fn()  // {a: 1, fn: ƒ}
```
直接通过`对象.方法`的形式调用函数的时候,`this`指向的是调用这个方法的对象,即上面的`obj`对象
我们稍微改动一下上面的代码,让这个函数在对象中再深入一层,通过`对象.属性.方法`的形式去调用函数
```javascript
let obj = {
  a:1,
  b:{
    fn:function(){
      console.log(this)
    }
  }
}
obj.b.fn()  // {fn: ƒ}
```
可以看到输出的结果是`{fn: f}`,即`b`,可以得出结论: **this指向的是最终调用它的对象.当函数被多层对象所包含,且函数被最外层对象调用,`this`指向的也只是它的上一级对象**
我们再来修改下代码,如下:
```javascript
let obj = {
  a:1,
  fn:function(){
    console.log(this)
  }
}
let fn2 = obj.fn

fn2()  // Window
```
可以看出执行结果是`Window`对象,是不是觉得奇怪,这是为什么呢?
这是因为当我们进行`let fn2 = obj.fn`这步赋值操作的时候,我们将`obj.fn`这个函数的内存地址赋值给了`fn2`这个变量,而`obj.fn`这个函数干的事情就是`console.log(this)`,现在我们执行的是`fn2()`,调用这个`fn2`函数的是Window对象.那你说,window调用了一个函数,这个函数的任务就是打印出谁调用了它,那答案不是显而易见嘛

这次,我们还要来修改下代码,如下
```javascript
function fn2(){
  console.log(this)
}
let obj = {
  a:1,
  fn:fn2
}
obj.fn()  // {a: 1, fn: ƒ}
```
要解析这段代码的思路,其实和上面那段代码是一样的.`obj`调用`fn`函数,而`fn`函数指向的是`fn2`,我们可以理解其实就是`obj`调用`fn2`函数,所以执行的结果就是打印出`obj`

这次,我们还要来修改下代码,如下
```javascript
let obj = {
  a:1,
  fn:function(){
    setTimeout(function(){
      console.log(this)
    })
  }
}
obj.fn()  // Window
```
那么,这又是为何呢?我们知道`setTimeout`是定时器,作用是在一段时间之后执行,`setTimeout()`这个函数的`()`中的是它的参数,也就是说`function(){console.log(this)}`这个函数其实是被当作一个参数传入`setTimeout`当中的.这个其实有个隐式的操作就是将`function(){console.log(this)}`赋值给一个假想函数`f`,到这里的时候,其实已经和`obj`这个对象无关了.然后等待定时器的时间到了以后,执行的就是`f`这个函数.这个`f`是被当作普通函数直接调用的,所以`this`指向了`Window`对象.我们再这么一想,`function(){console.log(this)}`这是个匿名函数啊,它都没有名字,是不能被普通对象调用的,但是`Window`可以调用啊.
那我们现在要是想要用`console.log(this)`打印出`obj`这个对象该怎么办呢?有两个方案:
 - 保存this变量
 - 箭头函数

方法1:
```javascript
let obj = {
  a:1,
  fn:function(){
    let _self = this // 在这里保存好this,免得它到时候跑了
    setTimeout(function(){
      console.log(_self)
    })
  }
}
obj.fn()  // {a: 1, fn: ƒ}
```

方法2:
```javascript
let obj = {
  a:1,
  fn:function(){
    setTimeout(() => {
      console.log(this)
    })
  }
}
obj.fn()  // {a: 1, fn: ƒ}
```
我们使用箭头函数也是可以达到同样的效果的,至于原因我们后面会再提到,这里就先跳过去了
但是`setTimeout`其实还有一个点容易忽略,我们之前说过在严格模式下直接调用一个函数,它的`this`指向`undefined`.但是在`setTimeout`方法中传入函数的时候,如果这个函数没有指定`this`的话,它会有自动注入全局上下文,类似于`xxx.call(window)`这样的操作.看下面代码
```javascript
function fn(){
  'use strict'
  console.log(this)  
}
setTimeout(fn)  // Window
```
当然,如果我们在`setTimeout`中传入函数的时候绑定了`this`的话,那就不会被注入全局对象
```javascript
function fn(){
  'use strict'
  console.log(this)  
}
setTimeout(fn.bind({}))  // {}
```

### 构造函数调用
构造函数大家都应该比较熟悉了吧,我们`new`一下,就new出一个新对象的那种.其实构造函数就是普通的函数,只不过在调用的时候前面加了`new`运算符.关于`new`运算符是干嘛的,可以看我的另外一篇文章:[JS new的时候干了啥](https://juejin.im/post/5ed9f8f8e51d45789b35b01c?utm_source=gold_browser_extension)
```javascript
function Person(){
  console.log(this)
}
let p = new Person()  // Person {}
```
当我们使用构造函数调用的时候,`this`指向了这个实例化出来的对象,我们将上面的代码和下面的代码进行一个比对就能看出不同了
```javascript
function Person(){
  console.log(this)
}
let p = Person()  // Window
```
两段代码的唯一区别就是后面的代码没有`new`它,从而指向了`Window`对象.由此可见,使用了`new`之后,这个构造函数的`this`被绑定到了正在构造的新对象上.这个在 [JS new的时候干了啥](https://juejin.im/post/5ed9f8f8e51d45789b35b01c?utm_source=gold_browser_extension) 也是有讲到的,不太清楚的童鞋可以跳过去看一看
我们再来一个例子巩固下
```javascript
function Person(){
  return this
}
let p = Person()
console.log(p)  // Window
console.log(p === window)  // true
```
不使用`new`关键字,`Person`普通函数返回`this`,函数又是被`Window`调用的,所以就是返回`Window`对象,那么`p === window`返回的结果自然就是`true`了
但是在构造函数中,如果显式的返回了一个新的对象(非`null`),那么`this`就会指向那个对象
```javascript
function Person(name){
  this.name = name
  return {
    name:'lisi'
  }
}
let p = new Person('zhangsan')
console.log(p.name)  // lisi
```

### call,apply,bind 三兄弟
这三兄弟都是`Function`这个对象原型上的方法.它们可以更改函数中的`this`指向.
```javascript
let obj = {}
function fn(){
  console.log(this)
}
fn()  // Window
fn.call(obj)  // {}
fn.apply(obj)  // {}
fn.bind(obj)()  // {}
```
这里可以看出它们三兄弟确实都可以改变`this`的指向,那么它们的区别在哪里呢?
`call`和`apply`的作用基本一致,区别在于传参的方式不太一样
```javascript
let obj = {}
function fn(){
  console.log(arguments)
}
fn.call(obj,1,2)  // Arguments(2) [1, 2, callee: ƒ, Symbol(Symbol.iterator): ƒ]
fn.apply(obj,[1,2])  // Arguments(2) [1, 2, callee: ƒ, Symbol(Symbol.iterator): ƒ]
```
`call`的参数是一个个传进去的,`apply`的参数是直接传了一个数组进去
那么`call`和`bind`又有什么区别呢?
```javascript
let obj = {}
function fn(){
  console.log(arguments)
}
fn.bind(obj)(1,2)  // Arguments(2) [1, 2, callee: ƒ, Symbol(Symbol.iterator): ƒ]
fn.bind(obj,1,2)()  // Arguments(2) [1, 2, callee: ƒ, Symbol(Symbol.iterator): ƒ]
```
可以看出来,绑定`bind`的时候是不会直接调用函数的,它会返回一个新的函数,我们需要主动去`()`一下,它才会执行.相对比之下,`call`和`apply`都是会立即执行函数的.从第二个参数开始传入的都是执行函数时需要传入的参数,`call`和`bind`传参的格式一致.另外,在构造函数调用的时候,内部其实也是有通过`call`来变更`this`指向的.这个前面我们也说到了,指向了创建出来的对象.
使用`bind`方法创建的上下文为永久性的上下文环境,没法更改,`call`和`apply`也不行.
```javascript
var a = 0
let obj = {
  a:1
}
function fn(){
  console.log(this.a)
}
fn()  // 0
fn.call({})  // undefined  # 通过call改变了this
fn.bind(obj)()  // 1  # 通过bind改变了this
fn.bind(obj).call({})  // 1  # 通过bind改变了this, call再想要来更改就没门了
```
上面代码中,我们是给一个普通函数指定`this`,下面我们来看看为对象中的方法指定`this`
```javascript
let obj = {
  fn:function(){
    console.log(this)
  }
}
obj.fn.call({})  // {}
```
换成构造函数,再来看看
```javascript
function Person(){
  console.log(this)
}
let p = new Person.call({})  // Person.call is not a constructor
```
错误提示是Person.call不是一个构造函数,这是因为此时我们去`new`的是`Person.call`而不是`Person`,这当然不是一个构造函数了.我们换`bind`再来试一试,看看结果
```javascript
function Person(){
  console.log(this)
}
let P = Person.bind({a:1})
let p = new P()  // Person {}
```
发现结果是`Person {}`,这说明我们的绑定没有成功,否则结果就应该是`{a:1}`了.因此,我们也可以得到结论,在构造函数中,我们去`new`的时候,`bind`绑定的`this`是不会起效果的

### 箭头函数
箭头函数是在ES6的时候才有的,它的语法比普通的函数表达式要简洁,并且没有自己的`this`和`arguments`.它并不创建自身的上下文,其上下文在定义的时候就已经确定了,即一次绑定,便不可更改.
```javascript
let obj = {
  fn:() => console.log(this)
}
obj.fn()  //Window
```
这里为啥是`Window`而不是`obj`呢,箭头函数的`this`在定义的时候就已经确定了.在箭头函数中引用`this`,实际上调用的是定义时的上一层作用域的`this`.那么上面的代码中调用的就是`Window`对象了,因为`obj`对象是不能形成作用域的.
我们再来看下面的代码,结果也是`Window`,因为即使`fn`在函数中的位置深了一层,但是仍然没有形成作用域,箭头函数定义的时候还是指向全局对象了
```javascript
let obj = {
  a:{
    fn:() => console.log(this)
  }
}
obj.a.fn()  //Window
```
我们先看如下代码:
```javascript
let obj = {
  fn:function(){
    return function(){
      console.log(this)
    }
  }
}
obj.fn()()  // Window
```
这里函数作为对象的一个方法使用,里面有个闭包.当我们通过`对象.方法`去调用的时候,实际上就相当于是函数直接调用.此时的`this`指向`Window`
我们改动代码如下,将闭包的形式变成箭头函数
```javascript
let obj = {
  fn:function(){
    return () => console.log(this)
  }
}
obj.fn()()  // {fn: ƒ}
```
此时的输出结果变成`obj`这个对象了.因为箭头函数在定义的时候是在`fn`这个函数中,所以箭头函数中的`this`指向了`fn`的`this`,也就是`obj`.大家是否还记得前面有个地方我们留了一个悬念给大家.对了,就是定时器那里.我们说过,使用箭头函数也可以达到同样的效果,现在童鞋们是否都明白了.箭头函数的`this`在定义的时候就已经确定了,`call`,`apply`,`bind`等都无法改变它.

由于箭头函数的外部决定了上下文以及静态上下文等特性,因此最好不要在全局环境下使用箭头函数来定义方法,我们建议使用函数表达式来定义函数,可确保正确的上下文环境

> **总结:**  有关`this`的学习到这里基本就结束了.有时间的同学建议将我文章中的代码都敲一遍,加深对`this`的理解,达到事半功倍的效果

































