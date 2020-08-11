# instanceof 和 typeof 原理回顾

## instanceof

### 概念
- 官方定义: `instanceof` 运算符用来检测构造函数的`prototype` 属性是否出现在某个实例对象的原型链上.
- 通俗的讲: `instanceof` 用来判断某个对象是否为某个构造函数的实例.
- 形象的讲: 沿着操作符左边对象的**proto**这条线查找,沿着操作符右边对象的**prototype**查找.若两条线能找到同一个引用,则返回`true`.若到终点还未相交,则返回`false`.

### 语法
```plain
object instanceof constructor  // object为要测试的实例对象    constructor为构造函数 
```
**注意:** `instanceof` 无法判断基本类型,只能判断引用类型

```js
let obj = new Object()
console.log(obj instanceof Object)  // true

class Person {}
const p = new Person()
console.log(p instanceof Person)  // true

// 判断 f 是否是 F 类的实例
function F(){}
const f = new F()
console.log(f.__proto__ === F.prototype)  // true   因为F的prototype === f的__proro__ 符合 instanceof 检测条件,所以下面为true
console.log(f instanceof F)  // true
```


下面的代码说明了 `Date` 也属于 `Object` 类型, `Date` 是由 `Object` 类派生出来的
```js
const d = new Date()
console.log(d instanceof Date)  // true
console.log(Date instanceof Object)  // true
console.log(d instanceof Object)  // true
```

### 练习解题
#### 题型1
```js
console.log(Function instanceof Function)  
console.log(Function instanceof Object)
console.log(Object instanceof Function)
console.log(Object instanceof Object)
```
思路如下:
```js
console.log(Function.__proto__ === Function.prototype)
console.log(Function.__proto__.__proto__ === Object.prototype)
console.log(Object.__proto__ === Function.prototype)
console.log(Object.__proto__.__proto__ === Object.prototype)
```
#### 题型2
```js
function Fun(){}
const f = new Fun()
console.log(f instanceof Fun)  // true

function Fun2(){return {}}
const f2 = new Fun2()
console.log(f2 instanceof Fun2)  // false
```
因为 `instanceof` 操作符是判断原型链上的对象,而当一个对象并不是通过原型构造出来的时候(直接return一个对象),此方法就失效了.


### 模拟实现`instanceof`函数
```js
function instanceOf(obj, constructor){
  if(obj === null){
    return false
  }
  if(typeof obj !== 'object' && typeof obj !== 'function' ){
     return false
  }
  let proto = obj.__proto__
  while(proto){
    if(proto === constructor.prototype){
      return true
    }
    proto = proto.__proto__
  }
  return false
}
```



## typeof

### 概念
typeof 操作符返回一个字符串,表示未经计算的操作数的类型

### 语法
```plain
typeof operand
typeof(operand)  // operand 是一个表示对象或原始值的表达式,其类型将被返回
```

### 历史发展
在很早之前,使用的32位系统,为了性能考虑使用低位存储了变量的类型信息.
- 000 对象
- 1 整数
- 010 浮点数
- 100 字符串
- 110 布尔

此外还有2个比较特殊的指: `undefined` 和 `null`
- undefined 用 (-2^30) 表示
- null 对应机器码的 NULL 指针,一般是全零

这样一来,`null` 就出了一个bug.因为它对应的空指针,低位是000,因此被判断成一个对象了.且这个bug,应该是永远都不会去修复了.


### 可检测类型
```js
console.log(typeof undefined)  // undefined
console.log(typeof null)  // object
console.log(typeof 123n)  // bigint
console.log(typeof Symbol('str'))  // symbol
console.log(typeof (() => {}))  // function
console.log(typeof {})  // object
```

在ES2015之前,`typeof` 总能保证对任何所给的操作数返回一个字符串,即使是未声明的标识符,也能返回`undefined`. 但是在有了`let` 和 `const` 块级作用域后,在其被声明之前对块中的`let` 和 `const` 变量使用 `typeof` 将会抛出一个 `ReferenceError` .
```js
console.log(typeof obj2)  // Uncaught ReferenceError: Cannot access 'obj2' before initialization
const obj2 = {}
```

当前所有的浏览器都暴露了一个类型为 `undefined` 的非标准宿主对象 `document.all` 
```js
console.log(typeof document.all)  // undefined
```

## 获取类型的终结方案
我们通过 `toString` 来获取类型,算是一个比较完美的方案.
```js
function getType(obj){
  let reg = /\[object\s(.+)\]/
  let type = Object.prototype.toString.call(obj)
  return type.replace(reg, '$1').toLowerCase()
}

// 或者下面的写法
function getType(obj){
  let type = Object.prototype.toString.call(obj)
  let reg = /\[object\s([^\s]+)\]/g
  if(reg.test(type)){
    return RegExp.$1.toLowerCase()
  }
}
```

## 总结
通常,我们使用 `typeof` 来判断基本类型 , `instanceof` 判断引用类型.

参考链接:
- [https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof)
- [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof)
- [https://developer.ibm.com/zh/articles/1306-jiangjj-jsinstanceof/](https://developer.ibm.com/zh/articles/1306-jiangjj-jsinstanceof/)
- [https://blog.csdn.net/LL18781132750/article/details/81115081](https://blog.csdn.net/LL18781132750/article/details/81115081)
- [https://juejin.im/post/6844904081803182087](https://juejin.im/post/6844904081803182087)
- [https://juejin.im/post/6844903850395058190](https://juejin.im/post/6844903850395058190)
- [https://juejin.im/post/6844904089369706504](https://juejin.im/post/6844904089369706504)
- [https://juejin.im/post/6844904199700873223](https://juejin.im/post/6844904199700873223)










