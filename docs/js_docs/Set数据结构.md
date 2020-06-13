# ES6 Set 数据结构
> 作为ES6提供的一种新数据结构, ```Set```    类似于数组,但其成员却是唯一的,不会有重复的成员出现.```Set```    本身是一个构造函数,可以生成*Set*数据结构

### 实例化
- 方法1
```
// 接受数组作为参数
const arr = [1,2,3]
const s0 = new Set(arr)
console.log(s0)  //Set(3) {1, 2, 3}
```
- 方法2
```
// html
<span>1</span>
<span>2</span>
<span>3</span>
```
```
// 接受类似数组的对象作为参数
const spans = document.querySelectorAll('span')
console.log(spans)
console.log(new Set(spans))  //Set(3) {span, span, span}

```

- 方法3
```
// 实例化后通过add()方法添加元素
const s = new Set()
s.add(1).add(2).add(2).add('2')
console.log(s) //Set(3) {1, 2, "2"}
```
由此还可以看出来```Number```类型的```2```和```String```类型的 ```'2'```是不一样的.Set内部判断两个值是否相等的算法类似于 全等运算符( === ) ,最主要的区别在于Set里面 NaN等于自身, 但是 === 比较中认为 NaN !== NaN,这个从下面的代码中可以看出来
```
s.add(NaN)
console.log(s)  //Set(4) {1, 2, "2", NaN}
s.add(NaN)
console.log(s)  //Set(4) {1, 2, "2", NaN}
```
第二次add(NaN)之后再次打印set的数据结构,发现没有变化,印证了上面的结论

### 实例方法

#### 操作方法

- add(value) 
    说明: 添加值,返回Set本身,因此add可以链式调用
- delete(value)
    说明: 删除值,返回一个Boolean表示删除是否成功
- has(value)
    说明: 表示是否有这个成员,返回Boolean类型
- clear()
    说明: 清除所有成员



##### add()
```
const s2 = new Set()
s2.add(1).add(2)
console.log(s2)  //Set(2) {1, 2}
```

##### delete()
```
const isSuccess = s2.delete(2)
console.log(isSuccess)  //true
console.log(s2)  //Set(1) {1}
```

##### has()
```
console.log(s2.has(1))  //true
console.log(s2.has(2))  //false
```

##### clear()
```
s2.clear()
console.log(s2)  //Set(0) {}
```

#### 遍历方法
- keys()
说明: 返回键名
- values()
说明: 返回键值
- entries()
说明: 返回键值对
- forEach()
说明: 使用回调遍历每个成员

##### keys()
```
const nameArr = ['zhangsan','lisi','wangwu']
const nameSet = new Set(nameArr)
console.log(nameSet.keys())  //SetIterator {"zhangsan", "lisi", "wangwu"}
for(let item of nameSet.keys()){
  console.log(item)
}
// zhangsan
// lisi
// wangwu
```

##### values()
```
console.log(nameSet.values())  //SetIterator {"zhangsan", "lisi", "wangwu"}
for(let item of nameSet.values()){
  console.log(item)
}
// zhangsan
// lisi
// wangwu
```

##### entries()
```
console.log(nameSet.entries())  //SetIterator {"zhangsan" => "zhangsan", "lisi" => "lisi", "wangwu" => "wangwu"}
for(let item of nameSet.entries()){
  console.log(item)
}
// ["zhangsan", "zhangsan"]
// ["lisi", "lisi"]
// ["wangwu", "wangwu"]
```

```
for(let item of nameSet){
  console.log(item)
}
// zhangsan
// lisi
// wangwu
```
>  *实例默认就可以被遍历,默认的就是values()方法*

##### forEach()
```
nameSet.forEach((v,k) => console.log('key: %s, value: %s',k,v))
// key: zhangsan, value: zhangsan
// key: lisi, value: lisi
// key: wangwu, value: wangwu
```

### Set实现数组去重
-   方法1
```
const tmpArr = [1,2,2,3]
console.log([...new Set(tmpArr)])  // [1, 2, 3]
```
- 方法2
```
const tmpArr = [1,2,2,3]
console.log(Array.from(new Set(tmpArr)))  // [1, 2, 3]
```

### WeakSet
> WeakSet()的成员只能是对象,而不能是其他的数据类型,这是它与Set()的第一点区别
```
const wSet = new WeakSet()
console.log(wSet)  // WeakSet {}

try{
  wSet.add(1) 
}catch(e){
  console.warn(e)  //TypeError: Invalid value used in weak set
}

wSet.add({}) 
console.log(wSet)  //WeakSet {{…}}
```
> 第二点区别是WeakSet中对象都是弱引用,垃圾回收机制不考虑WeakSet对该对象的引用,因此WeakSet也是不可遍历的
```
const wArr = [3,4]
try{
  console.log(new WeakSet(wArr))  //TypeError: Invalid value used in weak set
}catch(e){
  console.warn(e)
}

const wArr2 = [[1],[2]]
console.log(new WeakSet(wArr2)) //WeakSet {Array(1), Array(1)}
```
上面的例子说明数组的成员只能是对象

### 总结
```Set```和 ```WeakSet```    的关系类似于 ```Map```    和 ```WeakMap``` 的关系,想要了解 ```Map```  数据结构,可以看另外一篇文章 链接: [ES6 Map 数据结构](https://juejin.im/post/5e54eec9e51d4526cf47fa5d)