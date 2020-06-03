# js中容易忽略的参数
## parseInt()
parseInt()函数可解析一个字符串,并返回一个整数
语法: 

```
parseInt(string, radix)
```
`radix`可选,表示要解析的数字的基数,介于2 ~ 36之间,若省略该参数或该参数为0,则为10.若要解析的数字以`0x`或`0X`开头,则将以16为基数

```javascript
console.log(parseInt('10',2))  // 2
console.log(parseInt(16,8))  // 14
console.log(parseInt(0x25))  // 37
console.log(parseInt(10))  // 10
console.log(parseInt(10,0))  // 10
```


## toString()
```
number.toString(radix)
```
`radix`可选,规定表示数字的基数,是2~36之间的整数,若省略该参数,则使用基数10
```javascript
var num = 15
console.log(num.toString())  // 15
console.log(num.toString(2))  // 1111
console.log(num.toString(8))  // 17
console.log(num.toString(16))  // f
```

```javascript
var num = 1
console.log(num.toString())  // 1
console.log(1.1.toString())  // 1.1
console.log(1..toString())  // 1
console.log(1.0.toString())  // 1
console.log(1. .toString())  // 1
console.log(1 .toString())  // 1
console.log((1).toString())  // 1
console.log(1.toString())  // Uncaught SyntaxError: Invalid or unexpected token
```
`1.toString()`为什么会报错? 
因为JS引擎无法确定这里的`.`是什么意思,是`浮点数`还是`点运算符`?
当整行只有一个`.`时,可以选择用`()`包裹起来,或者用空格和后面的`.toString()`隔开

## forEach()
```
array.forEach(function(currentValue. index, arr), thisValue)
```
`thisValue`可选,可以用来绑定回调函数的`this`关键字

```javascript
let obj = {
  name:'an object'
}
let name = 'global name'
let arr = ['zhangsan', 'lisi']

arr.forEach(function(item){
 console.log(item, this.name) 
},obj)

// zhangsan an object
// lisi an object
```
其实除了forEach,数组的其他迭代方法如:`every()`,`some()`,`find()`,`map()`,`filter()`等都有可选的第二参数

## console.log()
console.log()支持占位符,比如:字符(%s) ,整数(%d或%i),浮点数(%f),样式(%c)等.第二个参数开始(可能会有第三个第四个)填入的是要去填坑占位符的内容或样式
```javascript
console.log('hello %s,hi %s','JS','Dart')  // hello JS,hi Dart
console.log('I\'m %d years old', 12)  // I'm 12 years old
console.log('My weight is %f',66.6)  // My weight is 66.6
console.log('%c我是一段有%c颜色的话','color:red;','font-size:18px;color:blue')
```















