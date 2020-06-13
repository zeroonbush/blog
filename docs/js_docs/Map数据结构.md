# ES6 Map 数据结构
> js对象本质上是键值对的集合,但是只能用字符串作为键,虽然在定义的时候可以使用```Number```或者```Boolean```类型作为键名,但是却会改变它的类型
```
const obj = {
  true:'value1',
  2:'value2'
}
console.log(Object.keys(obj))  // ["2", "true"]
```
发现 obj 这个对象的key已经全部都变成了字符串,那么,当我们不想要改变这个key的类型的时候,有没有什么办法呢?有的,那就是今天我们的主人公 ```Map``` 以及它的兄弟 ```WeakMap```    
## Map先来
话不多说,先来一波代码,直接copy到浏览器上去看效果.
```
const keyName = {name:'key'}
const arr = [
  ['name','zhangsan'],
  ['age',18],
  [keyName,'kkk']
]
const map0 = new Map(arr)
console.log(map0)  // {"name" => "zhangsan", "age" => 18, {…} => "kkk"}

const map = new Map()
map.set('name','zhangsan')
console.log(map)  // Map(1) {"name" => "zhangsan"}
map
  .set('prop1','value1')
  .set('prop2','value')
  .set('prop2','value2')
console.log(map)  // Map(3) {"name" => "zhangsan", "prop1" => "value1", "prop2" => "value2"}
console.log(map.has('prop2'))  // true
console.log(map.has('prop3'))  // false
console.log(map.get('prop2'))  // value2
console.log(map.get('prop3'))  // undefined

console.log(map.size)  // 3
let isSuccess = map.delete('prop2')
console.log(isSuccess)  // true
let isSuccess2 = map.delete('prop3')
console.log(isSuccess2)  // false

console.log(map.size)  // 2
let s = map.clear()
console.log(map.size) // 0
```
可以看出```Map```是一种数据结构.类似于对象,也是键值对的集合,但是键名的范围更加的广阔,所有的数据类型都可以.
下面我们来一段一段分析以上的代码:
#### 生成一个map
1. 方法1(实例化传参)
```
const keyName = {name:'key'}
const arr = [
  ['name','zhangsan'],
  ['age',18],
  [keyName,'kkk']
]
const map0 = new Map(arr)
console.log(map0)  // {"name" => "zhangsan", "age" => 18, {…} => "kkk"}
```
这里是将一个二维数组当作参数在 ```Map```实例化的时候传入,这是设置```Map```的一种方式.

2. 方法2 (使用```Map```的 *set* 方法)

```
const map = new Map()
map.set('name','zhangsan')
console.log(map)  // Map(1) {"name" => "zhangsan"}
map
  .set('prop1','value1')
  .set('prop2','value')
  .set('prop2','value2')
console.log(map)  // Map(3) {"name" => "zhangsan", "prop1" => "value1", "prop2" => "value2"}
```
这里还可以看出 ```Map```还支持链式调用,因为*set* 方法返回的是当前的Map对象


#### 判断map中是否有某个属性
```
console.log(map.has('prop2'))  // true
console.log(map.has('prop3'))  // false
```

#### 获取map中的某个属性值
```
console.log(map.get('prop2'))  // value2
console.log(map.get('prop3'))  // undefined
```

#### 获取map中的长度
```
console.log(map.size)  // 3
```
#### 删除map中的键值对
```
let isSuccess = map.delete('prop2')
console.log(isSuccess)  // true
let isSuccess2 = map.delete('prop3')
console.log(isSuccess2)  // false
```
返回一个```Boolean```类型的值,如果原本存在这个属性,那么删除成功后返回 ```true```,否则返回 ```false```
此时再运行一下如下代码,发现结果已经变成2了,说明我们已经成功删除了一个键值对
```
console.log(map.size)  // 2
```
#### 清除map所有的键值对
```
let s = map.clear()
console.log(map.size) // 0
```
调用 *clear* 方法后再次查看map的长度,发现就变成0了


#### Q&A:是否看上去长的一样的就是同一个键值对?
```
map.set([1],1)
console.log(map.get([1]))  // undefined
const arr2 = [2]
map.set(arr2,1)
console.log(map.get(arr2))  // 1
```
>由此可以看出,只有对同一个对象的引用,Map结构才将其视为同一个键, 上面中的 [1] 看似值是相同的,但是内存地址是不一样的.所以,Map的键实际上是和内存地址绑定的,不同的内存地址视为不同的键


#### 总结:```Map```的方法和属性
##### 方法
```
map.set(key,value)
map.get(key)
map.has(key)
map.delete(key)
map.clear()
```
##### 属性
```
map.size
```




#### Map的3个遍历器生成函数和1个遍历方法
```
const map = new Map([
  ['name','zhangsan'],
  ['age',18]
])
```
##### keys()
```
for (let key of map.keys()){
  console.log(key)
}
// 'name'
// 'age'
```
##### values()
```
for (let value of map.values()){
  console.log(value)
}
// 'zhangsan'
// 18
```

##### entries()
```
for (let item of map.entries()){
  console.log(item)
}
// ["name", "zhangsan"]
// ["age", 18]
```
```
for (let item of map){
  console.log(item)
}
// ["name", "zhangsan"]
// ["age", 18]
```
上面最后两段代码可以看出 Map结构的默认遍历器接口就是 entries 方法
##### forEach() (map 本身没有map和filter方法)
```
map.forEach((value, key, map) => {
  console.log('key: %s, value: %s', key, value)
})
// key: name, value: zhangsan
// key: age, value: 18
```

#### 与其他数据结构的互转
- Map => Array
```
const arr = [...map]
console.log(arr)  // [["name", "zhangsan"],["age", 18]]
```
- Array => Map
```
const map2 = new Map(arr)
console.log(map2)  // Map(2) {"name" => "zhangsan", "age" => 18}
```
- Map => Object
```
// 如果Map的所有键都是字符串可以转为对象
const obj = {}
for(let [k,v] of map2){
  obj[k] = v
}
console.log(obj)  // {name: "zhangsan", age: 18}
```
- Object => Map
```
let map3 = new Map()
for(let k of Object.keys(obj)){
  map3.set(k,obj[k])
}
console.log(map3)  // Map(2) {"name" => "zhangsan", "age" => 18}
```
## WeakMap跟上
```
const wMap = new WeakMap()
const obj = {}
let valueObj = {name:'wang'}
wMap.set(obj,valueObj)
console.log(wMap.get(obj))  // {name: "wang"}
wMap.set('name','lisi')  // Uncaught TypeError: Invalid value used as weak map key
```
说明 WeakMap 的键不能是除了对象外的其他类型,否则会报错
**注意:** ```WeakMap()``` 只有4个方法可用: ```get()```   ```set()``` ```has()``` ```delete()```.这是因为某个键名是否存在是不确定的,和GC有关,所以没有 ```size```属性,没有 ```clear()```   也没有遍历的方法
## 与Map的区别主要有两点
> 1.WeakMap的键只能是对象(null除外)
2.WeakMap的键名所指向的对象不计入垃圾回收机制.即它的键名所引用的对象都是弱引用,只要所引用的对象的其他引用都被清除,GC就会释放该对象所占用的内存,不再需要手动删除引用

WeakMap的适用范围也是多样的,一个典型的例子就是可以注册监听事件,好处是一旦DOM对象消失,与之绑定的监听函数也就自动消失了,不再占用内存
```
let div1 = document.querySelector('#div1')
const listener = new WeakMap()
function fn(){
  console.log('click')
}
listener.set(div1,fn)
div1.addEventListener('click',listener.get(div1))
```

**注:** 另有一篇文章 [ES6 Set 数据结构](https://juejin.im/post/5e561a136fb9a07caf445c44) 讲的主要是ES6中的另外一个新的数据结构```Set```