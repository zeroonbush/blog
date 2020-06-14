# JS生成UUID的多种方式
> UUID 是 通用唯一识别码 (Universally Unique Identifier)的缩写.其作用是让分布式系统中的所有元素,都能拥有唯一的辨识信息.目前最广泛的,是微软的全局唯一标识符(GUID).

通常,我们一般使用的UUID是个36位的字符串,其格式如下:
```
xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
```
其中第15位数是`4`,第20位是`8`到`b`这4个中的一个


#### 方法1:
```javascript
function UUID(){
  let str = '0123456789abcdef'
  let arr = []
  for(let i = 0; i < 36; i++){
    arr.push(str.substr(Math.floor(Math.random() * 0x10), 1))
  }
  arr[14] = 4;
  arr[19] = str.substr(arr[19] & 0x3 | 0x8, 1)
  arr[8] = arr[13] = arr[18] = arr[23] = '-'
  return arr.join('')
}
```

#### 方法2:
`URL.createObjectURL`静态方法会创建一个`DOMString`,其中包含一个表示参数中给出的对象的URL. [DOMString](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString)是一个UTF-16字符串.
其中返回的URL中有一段36位的字符串,且符合UUID的格式.
```javascript
function UUID(){
  let str = URL.createObjectURL(new Blob())
  URL.revokeObjectURL(str)
  return str.split('/')[1]
}
```

#### 方法3:
先设置好UUID的格式,使用正则表达式进行替换
```javascript
function UUID(){
  let str = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
  return str.replace(/[xy]/g, item => {
    const r =Math.random() * 0x10 | 0
    const v = item === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(0x10)
  })
}
```













