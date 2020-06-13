# with语法
> 这两天在干活的时候,遇到了这么一个业务场景.就是后台接口返回的数据中有不少字段是我不需要的,而我只想保留几个我想要的数据字段,不想要整个对象赋值.

我们假设后台返回的数据如下:
```
{
  "code" : "200",
  "msg" : "操作成功",
  "data" : {
    "name": "zhangsan",
    "age": 12,
    "job": "FE developer",
    "like": "football"
  },
  "hasError" : false
}
```
按照以前的做法,管它三七二十一,全给我拿来.直接把整个对象赋值给``myData``
```
aInterface().then(res => {
    this.myData = res.data.data
})
```
然后在模板中使用:
```
<div>
    <ul>
      <li v-for="prop in myData">
        {{prop}}
      </li>
    </ul>
</div>
```
而我现在只想要 `name`  和 `age` 这两个字段,上面的做法会将所有的属性值全部打印出来.所以,我采用的赋值方法一般是
```
aInterface().then(res => {
    const data = res.data.data
    this.myData.name = data.name
    this.myData.age = data.age
})
```
但是这样的写法就显得有点繁琐了,每次都要写 `this.myData` 这个变量了.此时想起了以前看到过的有个叫 `with` 的语句,语法是这样的:
```
const obj = {
  name:'zhangsan',
  age:12
}
console.log(obj)  // {name: "zhangsan", age: 12}

obj.name = 'lisi'
obj.age = 15
console.log(obj)  // {name: "lisi", age: 15}

with(obj){
  name = 'wangwu'
  age = 18
  job = 'fe'
}
console.log(obj)  // {name: "wangwu", age: 18}
```
`obj.a = 11` 这种是我们最常见的给对象里面属性赋值的方式,而 `with` 后面跟了一个表达式 `obj` , 花括号里面的语句就只需要 `a = 111` 这样的赋值方式,感觉是可以少写一点代码了. 那么我们可以看出,其实 `with` 关键字改变了里面语句的作用域,在 `with` 代码块内部,变量会先被认为是一个局部变量,如果某个变量名与表达式 `obj` 中的一个属性名是一样的,那么这个局部变量就会指向 `obj` 对象中同名属性.但假如 `obj` 中没有一个属性名是与代码块中的局部变量的名字是一样的,那么此时就会发生污染全局变量的现象.不知道小伙伴们是否注意到了,上面的代码中,在代码块的最后,我加了 `job = 'fe'` 这样的一句语句.但是,console 控制台打印出来的 `obj` 中并没有包含这个属性.这就是因为此时的 `job` 这个变量已经泄漏到了全局作用域中了,我们可以继续在控制台执行下面代码
```
console.log(job === window.job)  // true
```
会发现结果是 `true` ,证明此时 `job` 已经是全局变量了.这就是 `with` 的其中一个弊端,容易数据泄漏,污染全局.而 `with` 的另外一个缺点就是会导致性能下降.我们来运行如下代码,然后在控制台查看运行结果:
```
function test(){
  console.time('test')
  const obj = {
    a:1
  }
  for(let i = 0;i < 99999; i++){
    const tmp = obj.a
  }
  console.timeEnd('test')
}
test()  // test: 1.2958984375ms

function testWith(){
  console.time('testWith')
  const obj = {
    a:1
  }
  with(obj){
    for(let i = 0;i < 99999; i++){
      const tmp = a
    }
  }
  
  console.timeEnd('testWith')
}
testWith()  // testWith: 12.7939453125ms
```
**注意:**
`console.time()` 方法是作为计算器的起始方法, `console.timeEnd() `方法作为计算器的结束方法 . 两个方法配合使用,一般是用来测试一段程序执行的时长.所以,这里两个函数的运行结果很可能是每次都不一样的,但是每次偏差应该都不会相差太大.由此,我们可以看出使用了 `with` 语句的代码所需要的时间更长.是没有使用with语句的好多倍.这是因为JavaScript引擎在编译阶段就进行一些性能优化,比如在执行之前就确定了一些变量的定义位置,然后在代码真正的执行过程中可以快速的找到标识符,而使用了 `with` 之后,因为无法知道传递到`with` 中的对象是哪个,所以JavaScript引擎它也会很懵逼,然后选择放弃,不做优化.

**总结:**
 我们代码中尽量不推荐使用 `with` 语句,并且在ES5严格模式中已经禁止该标签.但假如真的很想要用它的话,那么在 `with` 代码块的语句中,尽量使用指定对象的属性作为变量名,至少我们要保证尽量的不污染全局.

