# void 0与undefined的关系
在练习TypeScript的时候,在对比.ts文件和转换后的.js文件的时候:
```javascript
//index.ts
function getInfo(name:string, age:number=10):void {
    console.log(name)
    console.log(age)
}
```
下面是转换后的文件:
```javascript
// index.js
function getInfo(name, age) {
    if (age === void 0) { age = 10; }
    console.log(name);
    console.log(age);
}
```
这里有个判断:
```javascript
age === void 0
```
在我的印象中,这里本来应该是`undefined,`但是却变成了`void 0`.所以我们来看看这两者之间有什么联系.
为什么不直接使用undefined呢.这是因为undefined虽然在ES5中,是全局对象中一个只读属性(read-only),不能被重写,但是在局部作用域中,却是可以被重写的
```javascript
(function(){
 var undefined = 1  //局部变量
 console.log(undefined)  //1
})()
 
(function(){
 undefined = 1  //全局属性
 console.log(undefined)  //undefined
})()
 
```
那么为什么可以用void 0 来代替undefined呢:
在MDN中有这么一句话:[戳我](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void )
> The void operator evaluates the given expression and then returns undefined

意思就是:void操作符计算给定的表达式,并且返回undefined.

所以我们可以这样理解,void后面随便跟着什么都是返回的undefined,又因为`void 0` 这个表达式最短,所以一般就用这个代替了.
