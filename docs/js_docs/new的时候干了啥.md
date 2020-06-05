# new的时候干了啥

>`new`在[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)上的定义是:new运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例

在JavaScript中,`new`是一个关键字,创建了一个对`this`的绑定.而在面向对象的语言中,`new`关键字总是用于实例化一个类,如在Dart中:

```dart
class Person {}
var p = new Person()
```

在JavaScript中,没有类的概念(ES6的`class`也只是语法糖而已),但是我们只要使用函数就能来生成对象.
我们使用构造函数来创建一个对象,构造函数与一般的函数没有什么区别,只不过是在调用的时候加上了`new`关键字.所以我觉得用`构造函数调用`来代替`构造函数`的说法可能更加能够让人接受

```javascript
function Perons(){}
let p = new Perons()
console.log(p)  // Perons {}
```

那么我们来看一下`new`的时候到底干了啥?

- 调用函数
- 自动创建一个新对象
- 将创建的对象和this进行绑定
- 如果构造函数没有显式的返回值,隐式的返回this对象

```javascript
let p = new Perons()
```

当运行这句代码的时候,内部的执行大致如下:

```javascript
// 1.创建一个空对象
var obj = new Object()
// 2.将空对象的原型赋值为构造函数的原型
obj.__proto = Perons.prototype
// 3.变更构造函数内部this,将其指向刚刚创建出来的对象
Perons.call(obj)
// 4.返回对象
return obj
```

我们先来看看这里面的第2步,将空对象的原型赋值为构造函数的原型,因此在构造函数原型上的属性和方法可以被obj这个对象调用,我们来看如下代码:

```javascript
function Person(name){
  this.name = name
}
Person.prototype.gender = 'male'
Person.prototype.action = function(){
  console.log('breath')
}
let p = new Person('zhangsan')
console.log(p.__proto__ === Person.prototype)  // true  
console.log(p.__proto__.__proto__ === Object.prototype)  // true
// 上面证明了将创建出来的对象的原型赋值为构造函数的原型的说法
console.log(p.name)  // zhangsan
console.log(p.gender)  // male
p.action()  // breath

```

再来看第4步,这里要注意的是,如果构造函数显式的设置了返回值,且返回值是一个对象的话,则上面的第4步中,返回这个对象.如果没有显式的返回一个对象的话.则第4步隐式的返回创建的对象(即obj).`null`是个例外,虽然我们认为`null`是个对象,但是返回`null`相当于没有显式返回.我们来看如下代码就明白了:
没有返回值的情况:

```javascript
function Person(name){
  this.name = name
}
let p = new Person('zhangsan')
console.log(p)  // Person {name: "zhangsan"}
```

返回一个对象:

```javascript
function Person2(name){
  this.name = name 
  return {
    age:12
  }
}
let p2 = new Person2('zhangsan')
console.log(p2)  // {age: 12}
```

返回一个非对象:

```javascript
function Person3(name){
  this.name = name
  return 666
}
let p3 = new Person3('zhangsan')
console.log(p3)  // Person3 {name: "zhangsan"}
```

返回null:

```javascript
function Person4(name){
  this.name = name
  return null
}
let p4 = new Person4('zhangsan')
console.log(p4)  // Person4 {name: "zhangsan"}
```

**总结:** `new`到底干了啥,这里我引用[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)中的话

> -  创建一个空的简单JavaScript对象（即{}）
> -  链接该对象（即设置该对象的构造函数）到另一个对象
> -  将步骤1新创建的对象作为this的上下文
> -  如果该函数没有返回对象，则返回this















