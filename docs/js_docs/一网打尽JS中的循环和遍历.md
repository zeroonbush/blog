# 一网打尽JS中的循环和遍历

> JS中的循环和遍历提供给我们一种简单快速的方法去做一些重复的事情.学会在不同的场景中使用不同的方法能够帮助我们有效的编写各类代码.在这里整理了一些常见的方法,今天就让我们大家一些来学习一波.

## for
for循环有3个表达式
1. 声明循环变量
2. 判断循环条件
3. 更新循环变量

其中,三个表达式都是可以省略的,但是两个`;`却是不能省略的.
```javascript
let arr = ['a','b','c']
for(let i = 0; i < arr.length; i++){
    console.log(arr[i])  // a b c
}
```
我们有时候会使用一个临时变量将数组的长度缓存下来,以免每次循环的时候都去获取一遍
```javascript
let arr = ['a','b','c']
for(let i = 0, len = arr.length; i < len; i++){
    console.log(arr[i])  // a b c
}
```
这样写在某些浏览器中确实会有一定的性能提升.但是在基于V8引擎的Chrome浏览器中,上面两种写法性能基本一致,因为浏览器会在底层自动帮我们优化.大致就是会将那些在循环体中不变的语句拿出来放到循环体的外部.伪代码如下:
```javascript
for(let i = 0; i < arr.length; i++){
    total = a + b
    arr[i] = i + total * 2
}
```
将上面的代码编译优化成下面的代码:
```javascript
total = a + b
total2 = total * 2
n = arr.length
for(let i = 0; i < n; i++){
    arr[i] = i + total2
}
```
因此,大家在平时写代码的时候，是否存储变量就视情况而定吧.

for循环可以循环字符串,数组,类数组,DOM节点等
```javascript
// 遍历类数组
(function(){
    for(let i=0;i<arguments.length;i++){
        console.log(arguments[i])  // a b
    }
})('a','b')
```
JS中的循环除了`for`循环外,其他的还有`while`循环,`do-while`循环,我们就不说了.

## forEach
不会改变原数组,不会返回新数组
```javascript
let arr = ['a','b','c']
let arr2 = arr.forEach((item, index, arr) => {
    return item + '2'
})
console.log(arr)  // ["a", "b", "c"]
console.log(arr2)  // undefined
```
forEach还可以传入第二个参数,用来绑定回调函数内部的`this`变量
```javascript
let arr = ['a','b','c']
let arr2 = ['d','e','f']
arr.forEach(function(item, index, arr){
    console.log(this[index])  // d e f
}, arr2)

```

## map
不会改变原数组,会返回新数组
```javascript
let arr = [2,'a','b','c',undefined,null]
let arr2 = arr.map((item, index, arr) => {
    item = item + '1'
    return item + '2'
})
console.log(arr)  // [2, "a", "b", "c", undefined, null]
console.log(arr2)  // ["212", "a12", "b12", "c12", "undefined12", "null12"]
```
可以链式调用
```javascript
let arr = [1,2,3]
let tmp = arr.map(item => item + 1).map(item => item + 1)
console.log(tmp)  // [3, 4, 5]
```
map还可以传入第二个参数,用来绑定回调函数内部的`this`变量
```javascript
let arr = [1,2]
let arr2 = [3,4]
let tmp = arr.map(function(item, index){
    return this[index]
}, arr2)
console.log(tmp)  // [3, 4]
```

## filter
不会改变原数组,会返回新数组
```javascript
let arr = [1,2,3,4,5,6]
let tmp = arr.filter(item => {
    return item % 2 === 0
})
console.log(tmp)  // [2, 4, 6]
```
filter还可以传入第二个参数,用来绑定回调函数内部的`this`变量
```javascript
let arr = ['a','b','c']
let arr2 = ['aa','bb','cc']
let tmp = arr.filter(function(item, index){
    return this[index] === 'bb'
}, arr2)
console.log(tmp)  // ["b"]
```

还有一个通常用来移除数组中假值(`undefined`, `null`, `false`, `0`, `''`, `NaN`等)的操作
```javascript
let arr = [1,undefined,2,null,3,false,0,'',4,NaN]
let tmp = arr.filter(Boolean)
console.log(tmp)  // [1, 2, 3, 4]
```


## for...in
可以用来遍历字符串,数组,对象等.
```javascript
let arr = ['a','b']
for(let key in arr){
    console.log(arr[key])  // a b
}
```

遍历对象的可枚举属性,不遍历对象的不可枚举属性
```javascript
let obj = Object.create(null,{
    name:{
        value:'zhangsan',
        enumerable: true
    },
    // age 是不可枚举属性,不会被for...in循环遍历
    age:{
        value:12,
        enumerable: false
    }
})
console.log(obj)  // {name: "zhangsan", age: 12}
for(let p in obj){
    console.log(p)  // name
    console.log(obj[p])  // zhangsan
}
```
遍历原型对象上的属性,若是不想要原型对象上的属性怎么办? 使用`hasOwnProperty()`方法来判断过滤
```javascript
class Person {
    constructor(name){
        this.name = name
    }
}
// gender是原型对象上的属性
Person.prototype.gender = 'male'
let obj = new Person('zhangsan')
for(let p in obj){
    if(obj.hasOwnProperty(p)){
        console.log(p)  // name
    }
    console.log(p)  // name gender 
}
```
`for...in`也会遍历数组自身的属性.由于历史遗留问题,它遍历的实际上是对象的属性名.数组也是对象,其中每个元素的索引也被当作一个属性.所以当我们给数组手动添加额外属性的时候,它会被遍历出来.
```javascript
let arr = [1,2]
arr.name = 'array1'
for(let p in arr){
    console.log(arr[p])  // 1 2 array1
}
```
`for...in`循环会输出name属性.但是`length`属性却不包括在内.`for...of`循环则修复了这些问题,下面我们来看这个在ES6出来的家伙.

## for...of
遍历具有`Iterator`迭代器的对象,比如字符串,数组,类数组(arguments对象,DOM NodeList对象),Map,Set,Generator等,并且可以响应`break`,`continue`和`return`语句.
遍历一个Map类型的
```javascript
let arr = [['name','zhangsan'],['age',12]]
let map = new Map(arr)
for(let [key, value] of map){
    console.log(key)  // name age
    console.log(value)  // zhangsan 12
}
```
使用`continue`语句来控制流程,就像是在`for`循环中使用一样
```javascript
let arr = [1,2,3,4,5,6]
for(let item of arr){
    if(item % 2 === 0){
        continue
    }
    console.log(item)  // 1 3 5
}
```
既然讲到了`for...of`,那就有必要提一嘴`Iterator`这个东西了.`Iterator`是一个接口,为不同的数据结构提供了统一访问机制,主要用来给`for...of`消费.我们先来看下面的代码
```javascript
let obj = {}
for(let item of obj){
    console.log(item)  // Uncaught TypeError: obj is not iterable
}
```
代码爆红了,提示说obj不是可以迭代的.这是因为obj没有内置`Iterator`,无法供`for...of`使用.但假如我们想要使用`for...of`来遍历obj对象要怎么办?

这里提供了一个方法,就是对象的`Symbol.iterator`属性指向对象的默认迭代器方法.那么只要我们给对象手动加上一个`Symbol.iterator`属性就可以了
```javascript
let obj = {}
obj[Symbol.iterator] = function*(){
    yield 'a'
    yield 'b'
}
for(let item of obj){
    console.log(item)  // a b
}
```
可以看到,此时的obj对象已经可以被遍历了,变得更像一个数组了.假如我们再在后面加上一句代码,观察结果.此时大家感觉是不是越来越像了.
```javascript
console.log([...obj])  // ["a", "b"]
```

## for await...of
`for await...of` 可在一个可迭代对象上创建迭代循环,只能在 `async function` 内部使用.假如现在有一个数组,内部是有多个异步执行的函数,而我们想要同步执行每个函数
```js
(async function fun(){
    let fn1 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('fn1')
        }, 1500)
    })
    let fn2 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('fn2')
        }, 200)
    })
    let fnArr = [fn1, fn2]
    for await (let fn of fnArr){
        console.log(fn)  // fn1 fn2 依次输出fn1,然后才是fn2
    }
})()
```


## every
对数组中的每一项进行函数运算,只有每一项都返回`true`,最后结果才会返回`true`.通俗的讲就是大家都满足要求才行.
```javascript
let arr = [1,2,3]
let res = arr.every(item => item > 0)
console.log(res)  // true
```

## some
对数组中的每一项进行函数运算,只要有任一项返回`true` ,最后结果就会返回`true`.通俗的讲就是只要有一个人满足要求就行.
```javascript
let arr = [1,2,3]
let res = arr.some(item => item > 2)
console.log(res)  // true
```
`every`和`some`这俩方法都接受一个函数作为参数,这个参数函数又接受三个参数,分别是数组当前成员,当前索引和整个数组.这个接受参数的形式和`map`,`forEach`,`map`等方法基本一致.


## find
返回符合函数测试条件的第一个元素,并停止查找后面的,若没有符合的,则返回`undefined`
```javascript
let arr = [1,2,3]
let res = arr.find(item => item > 1)
console.log(res)  // 2
```

## Object.keys 
这一系列有好几个兄弟,除了`Object.keys()`以外还有`Object.values()`和`Object.entries()`等
使用上面几个方法可以分别获取对象的属性名,属性值,以及键值对.注意,`Object.keys`返回的是该对象自身的属性名,且只返回可枚举属性
```javascript
let obj = {name:'zhangsan', age:12, job:'FE engineer'} 
console.log(Object.keys(obj))  // ["name", "age", "job"]
console.log(Object.values(obj))  // ["zhangsan", 12, "FE engineer"]
console.log(Object.entries(obj))  // [["name", "zhangsan"],["age", 12],["job", "FE engineer"]]
```
我们来看下下面的代码来验证一下
```javascript
// 原型对象上的属性,在for...in中被遍历到了,在Object.keys中找不到
Object.prototype.gender = 'male'
let obj = Object.create({}, {
    name:{
        value:'zhangsan',
        enumerable:true
    },
    // age是不可枚举属性,在for...in和Object.keys中都没有
    age:{
        value:12,
        enumerable:false
    }
})
console.log(Object.keys(obj))  // ["name"]
for(let p in obj){
    console.log(p)  // name gender
}
```
此处又可以衍生出一个判断对象是否为空对象的方法
```javascript
if(Object.keys(obj).length){
    // 不是空对象
}else{
    // 是空对象
}
```


## 总结
- `forEach`本质上也是数组的循环,和`for`循环语句差不多,但是语法简单了.并且`forEach`不会改变原数组,不会返回新数组.
- `map`和`filter`都不会改变原数组,都会返回新数组.也正是因为能返回一个新数组,所以可以链式调用.不同之处在于`map`是对原数组进行加工,进行一对一的关系映射,而`filter`则是对原数组过滤,保留符合要求的数组成员.
- `for...in`则会遍历对象的可枚举属性,包括原型对象上的属性.主要是为遍历对象而设计,不适用于遍历数组.
- `for...of`遍历具有`Iterator`迭代器的对象,避开了`for...in`循环的所有缺陷,并且可以正确响应`break`,`continue`和`return`语句等.
- `for await...of` 将异步循环变成同步循环
- `every`和`some`有点类似于断言的感觉,返回布尔类型
- `Object.keys()`返回一个给定对象的所有可枚举属性的字符串数组

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91c2VyLWdvbGQtY2RuLnhpdHUuaW8vMjAyMC83LzI2LzE3MzhhMzNmNWQ0YzUwMzI?x-oss-process=image/format,png)
