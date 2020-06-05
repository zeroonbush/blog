# JS调用函数的4种方式
 - 直接作为一个函数调用
 - 函数作为方法调用
 - 使用构造函数调用函数
 - 作为函数方法调用函数

 ## 直接作为一个函数调用
 ```javascript
function fn(){
  console.log(this)
}
fn()  // Window
 ```
此时的`this`指向window

 ## 函数作为方法调用
 ```javascript
var obj = {
  a:1,
  fn:function(){
    console.log(this)
  }
}
obj.fn()  // {a: 1, fn: ƒ}
 ```
`this`指向方法的调用者

 ## 使用构造函数调用函数
 ```javascript
function Person(name){
  this.name = name
  console.log(this)
}
let p = new Person('zhangsan')  // Person {name: "zhangsan"}
 ```
`this`指向当前构造函数构建的对象


 ## 作为函数方法调用函数
 ```javascript
function fun(){
  console.log(this)
  console.log(arguments)
}
let o = {
  a:1
}
fun.call(o,1,2)
fun.apply(o,[1,2])
fun.bind(o,1,2)()
 ```
`call`, `apply`, `bind` 是所有函数都具有的方法
`call()`方法使用一个指定的`this`值和单独给出的一个或多个参数来调用一个函数
> function.call(thisArg, arg1, arg2, ...)  // 一个一个接受参数


`apply()`方法使用一个指定的`this`值和一个数组(或类数组)提供的参数来调用一个函数
> function.apply(thisArg, [argsArray])  // 接受一个数组参数

`call`, `apply`都是会立即执行,它们的区别在于接受参数的方式不一样


其中关于`thisArg`,它的指向问题:
- 若为`null`或者`undefined`,则指向window
- 若为一个数字,字符串或布尔值,则指向对应的[基本包装类型](https://zeroonbush.github.io/blog/js_docs/%E6%B5%85%E8%B0%88%E5%9F%BA%E6%9C%AC%E5%8C%85%E8%A3%85%E7%B1%BB%E5%9E%8B.html)的对象
- 若为一个对象,则指向该对象
```javascript
function fun(){
  console.log(this)
}
fun.call(null,1,2)  // Window
fun.call(undefined,1,2)  // Window
fun.call(1,1,2)  // Number {1}
fun.call('1',1,2)  // String {"1"}
fun.call(true,1,2)  // Boolean {true}

```

`bind`和`call`一样,也是一个一个接受参数,但是它会返回一个新的函数(原函数的拷贝),所以需要再次`()`调用一下











