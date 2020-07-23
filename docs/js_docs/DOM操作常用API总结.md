# DOM操作常用API总结
> 前段时间工作中开发的项目,没有用到三大框架,也没有引入jQuery,全是原生的JS,其中涉及到了一些DOM操作,因此这两天趁着空闲的时间把DOM操作中的API回顾了一下.

这里主要将DOM操作分为了`增删改查`四部分.当然了,划分的可能不是那么准确.文末第二个链接里面的老哥对于类型的划分还是挺不错的,有兴趣的可以点进去看看.

## 查找操作

### getElementById
该方法返回一个匹配特定id(区分大小写)的元素,而又因为一个id一般在一个页面中是唯一的.因此这是一个高效查找特定元素的方法.但是如果同一个页面中有多个相同的id,那么只会返回第一个而忽略后面.
```html
<div id="div1">div1 - 1</div>    
<div id="div1">div1 - 2</div>    
```
```js
console.log(document.getElementById('div1').textContent)  // div1 - 1
```

### getElementsByTagName
该方法返回一个动态的包含所有指定标签名的元素的HTML集合 `HTMLCollection` .所谓的动态的或者即时的意思就是它会随着DOM树的变化自动更新自身.该方法可以在任何元素中查找,即可以给它一个确定的查找范围,而不仅仅只限于 `document` 对象.例如下面的代码中,我们就是在id为div1的div元素中寻找p标签.当然,标签名可以传入 `*` 代表所有元素.
```html
<div id="div1">
    <p class="p1">1</p>
    <p class="p1">2</p>
</div>
```
```js
console.log(document.getElementById('div1').getElementsByTagName('p'))  // HTMLCollection(2) [p.p1, p.p1]
```


### getElementsByClassName
该方法返回一个即时的 `HTMLCollection` ,包含所有指定 `class` 的子元素.该方法可以在任何元素中查找,即可以给它一个确定的查找范围,而不仅仅只限于 `document` 对象.
```html
<div id="div0">
    <div class="div2">0-2</div>
</div>
<div id="div1">
    <div class="div2">1-2</div>
</div>
```
```js
let ele = document.getElementById('div1').getElementsByClassName('div2')  // 我们将class为div2的元素的查询范围限制在id为div1的元素中
console.log(ele.length)  // 1
console.log(ele[0].textContent)  // 1-2
```
该方法在IE9以下浏览器不支持,但是可以通过已有的方法来封装.下面是一段兼容新老浏览器的写法,代码来自于《DOM编程艺术》这本书.
```js
function getElementsByClassName(node, className){
    if(node.getElementsByClassName){
        return node.getElementsByClassName(className)
    }else{
        var results = new Array()
        var elems = node.getElementsByTagName('*')
        for(var i = 0; i < elems.length; i++){
             if(elems[i].className.indexOf(className) != -1){
                results[results.length] = elems[i]
             }
        }
        return results
    }
}
```

### querySelector
该方法返回文档中与指定选择器或选择器组匹配的第一个html元素 `Element` ,若找不到则返回 `null`.即它里面的参数为一个 `css选择器` 形式的DOM字符串.
```html
<div id="div1">
    <p class="p1">1</p>
    <p class="p1">2</p>
</div>
```
```js
let div1 = document.querySelector('#div1')
let p1 = document.querySelector('#div1>.p1')
```
上面的第一句代码是获取id为div1的元素,我们传入其中的参数为 `#div1` ,比 `getElementById` 的参数多了一个 `#` 号.而第二句代码则是获取id为div1的元素中的class为p1的元素,这就是一个很典型的 `css选择器` 形式的写法.那么它与 `getElementById`, `getElementsByClassName` 这些有什么区别呢? 前面提到了 `getElementsByClassName` 返回的是一个即时的 `HTMLCollection`,即它返回一个动态集合,而 `querySelector` 获取返回的是一个静态集合.


### querySelectorAll
该方法返回与指定的选择器组匹配的文档中的元素列表,是一个 `NodeList` .它的参数形式和 `querySelector` 一样,只是它能返回所有的符合条件的元素.同样它返回的也是一个静态集合,而 `getElementsByClassName` 返回的是动态集合. 我们通过代码来具体了解一下两者区别.
```html
<ul id="lists">
    <li class="item">1</li>
    <li class="item">2</li>
</ul>
```
```js
let lists = document.getElementById('lists')
let items = lists.getElementsByClassName('item')
console.log(items)  // HTMLCollection(2) [li.item, li.item]
console.log(items.length)  // 2
for(let i = 3; i < 5; i++){
    let li = document.createElement('li')
    li.classList.add('item')
    li.innerText = i
    lists.appendChild(li)
}
console.log(items.length)  // 4


let lists2 = document.querySelector('#lists2')
let items2 = lists2.querySelectorAll('.item')
console.log(items2)  // NodeList(2) [li.item, li.item]
console.log(items2.length)  // 2
for(let i = 3; i < 5; i++){
    let li = document.createElement('li')
    li.classList.add('item')
    li.innerText = i
    lists.appendChild(li)
}
console.log(items2.length)  // 2
```
前一大段代码在获取class为item的li的个数后再次添加,长度会跟着动态变化,而后一大段代码中li的个数则是不变的.

### parentNode
`parentNode` 返回指定节点的父节点
```html
<div id="parent">
    <div id="children"></div>
</div>
```
```js
let parent = document.querySelector('#parent')
let children = document.querySelector('#children')
console.log(parent === children.parentNode)  // true
```

### childNodes
返回一个包含指定节点的即时更新的子节点集合, `ModeList` 类型.
我们看 `parentNode` 中的代码
```html
<div id="parent">
    <div id="children"></div>
</div>
```
```js
let parent = document.querySelector('#parent')
console.log(parent.childNodes)  // NodeList(3) [text, div#children, text]
```
可以看到返回的结果中,有好几个子节点,这是因为 `childNodes` 会返回文本节点.

### previousSibling 和 nextSibling
这两个方法分别返回指定节点的前一个兄弟节点和后一个兄弟节点,若不存在则返回null.
```html
<ul>
    <li class="item1">1</li><li class="item2">2</li><li class="item3">3</li>
</ul>
```
```js
let items1 = document.querySelector('.item1')
let items2 = document.querySelector('.item2')
let items3 = document.querySelector('.item3')
console.log(items2.previousSibling === items1)  // true
console.log(items2.nextSibling === items3)  // true
```
注意上面的代码中,三个 `li` 标签之间没有空隙,否则在使用 `previousSibling` 或 `nextSibling` 的时候可能会获取到空白文本节点.


## 创建和新增操作

### createELement
`createELement` 通过传入一个指定的标签名来创建一个元素节点,即使传入的不是一个标准的标签名,也会创建一个自定义标签.
```js
let ele = document.createElement('div')
let ele2 = document.createElement('div2')  // 会创建一个 div2 标签
```

### createTextNode
`createELement` 通过传入一个文本字符来创建一个文本节点
```js
let text = document.createTextNode('created')
```

但是上面两种节点创建后都是独立的节点,即都还不属于html文档.我们可以使用`appendChild` 或 `insertBefore` 等方法将其添加到html文档中.
```js
let ele = document.createElement('div')
let text = document.createTextNode('created')
ele.appendChild(text)
document.body.appendChild(ele)
```

### cloneNode
`cloneNode` 该方法返回一个调用该方法的节点的副本,即谁调用了 `cloneNode` ,就返回'谁'的一个复制品.它接受一个Boolean类型的参数,表示是否复制这个'谁'的子元素.为true则表示连子节点一起复制了,为false则表示只复制当前的这个'谁',而不去管它的子节点.
注意了,这里复制出来的副本节点还是一个不存在于html文档树中的独立节点.同样的,我们可以使用 `appendChild` 来将其添加到文档树中.
```html
<div id="app">
    <p class="p1">1</p>
</div>
```
```js
let ele = document.querySelector('#app')
let p1 = document.querySelector('.p1')
let newNode1 = p1.cloneNode(true) 
let newNode2 = p1.cloneNode(false)

p1.onclick = function(){
    console.log('click event')
}
p1.addEventListener('click', function(){
    console.log('addEventListener click')
})

app.appendChild(newNode1)
app.appendChild(newNode2)
```
在上面的代码中,我们生成了两个节点,即 `newNode1` 和 `newNode2`.我们可以在控制台查看页面结构,发现 `newNode2` 生成的节点是没有子节点的,而 `newNode1` 则是有的(文本节点即是它的子节点).这里最好将这个Boolean类型的参数填入,以免不同浏览器会有不同的处理表现.
并且在上面的代码中,我们不但给 `p1` 节点添加了 `click` 事件,并且还给它注册了监听器.这里简单的介绍下这两者之间的区别,`onclick` 事件在同一时间同一对象只能绑定一个,绑多了则是后面的会覆盖前面的.而 `addEventListener` 则是可以给一个事件注册多个监听器,可以绑定好多个.通过点击生成的节点我们可以发现,不管是通过 `onclick` 还是 `addEventListener` 绑定事件,在副本节点中都不会将该绑定事件复制过来.那有没有什么办法可以将事件行为也一起复制过来呢?有的,假如我们使用html标签内联绑定的方式,那么副本节点也能触发事件了.
```html
<div id="app">
    <p class="p1" onclick="log()">1</p>
</div>
```
```js
let ele = document.querySelector('#app')
let p1 = document.querySelector('.p1')
let newNode1 = p1.cloneNode(true)
function log(){
    console.log('bind html')
}
app.appendChild(newNode1)
```

### createDocumentFragment
`createDocumentFragment` 可以用来创建一个文档片段,用来存储临时的节点以便后面统一添加到DOM文档树中.一般在添加大量节点的时候,我们选择使用这个方法来优化性能.我们先来看下面的代码,循环渲染10个元素,并将其添加到文档中.
```js
let app = document.querySelector('#app')
for(let i = 0; i < 10; i++){
    let ele = document.createElement('div')
    ele.innerText = `new node ${i}`
    app.appendChild(ele)
}
```
上面的代码能够实现我们的需求,但是会有性能问题.因为浏览器内核可以分成两部分,`渲染引擎` 和 `JS引擎` .其中渲染引擎负责渲染页面,JS引擎负责JavaScript脚本的解释与执行.又因为JS是单线程的,所以它需要不停的在两个引擎之间来回切换.这个过程的耗时是比较久的,所以这就是为啥操作DOM会消耗性能的原因.
现在我们每循环一次,都会创建一个新的元素,当它被塞进DOM文档树的时候,会引起浏览器的回流.这里简单介绍下浏览器的`回流` 和 `重绘`.关于它们具体的定义我这里就不讲了.来举个简单的例子告诉大家什么时候会回流,什么时候会重绘.当我们改变一个元素的背景颜色时,会引起重绘,因为这个过程并没有实际改变元素的位置等布局信息.当我们改变一个元素的高度时,浏览器需要重新计算每个元素的位置,那么此时引起的就是回流.它们之间的包含关系是重绘不一定会引起回流,但是回流一定会引起重绘.既然我们知道了引起性能问题的原因,那么我们就用 `createDocumentFragment` 来优化它.
```js
let app = document.querySelector('#app')
let tmp = document.createDocumentFragment()
for(let i = 0; i < 10; i++){
    let ele = document.createElement('div')
    ele.innerText = `new node ${i}`
    tmp.appendChild(ele)
}
app.appendChild(tmp)
```
我们通过 `createDocumentFragment` 方法生成的对象不是文档树中的一部分,它保存在内存中.因此在进行循环生成的时候,不会造成频繁的浏览器回流.当循环结束的时候,再一次性将全部节点添加到DOM中.

### appendChild
`appendChild` 这个方法在前面的各种例子中其实已经出现了好多次了.前面说到了好几个创建节点的方法,但都只是创建节点,并没有真的将节点塞进DOM树中,而 `appendChild` 方法则是替我们干了这个事情.
`appendChild` 方法将一个节点附加到指定的父节点的原有最后一个子节点之后,若被插入的节点原先已经存在于此文档的文档树中,则它会自动从原先的位置移动到新位置.所以可以说这既是一个增的方法,也是一个改的方法.
```html
<div id="app">
    <p class="p1">1</p>
    <p class="p2">2</p>
    <p class="p3">3</p>
</div>
```
```js
let app = document.querySelector('#app')
let p2 = document.querySelector('.p2')
app.appendChild(p2)
```

### insertBefore
`appendChild` 是将节点插入到最后,而 `insertBefore` 可以帮我们将节点准确的插入我们想要的位置.
`insertBefore` 的语法如下: `parentNode.insertBefore(newNode, referenceNode)` .其中 `referenceNode` 是一个指定节点,表明我们想要将新节点插入到它之前.若新节点已经存在于文档树中,则它会自动从原先的位置移动到新位置,这点和 `appendChild` 是类似的.
```html
<div id="app">
    <p class="p1">1</p>
    <p class="p2">2</p>
    <p class="p3">3</p>
</div>
```
```js
let app = document.querySelector('#app')
let p2 = document.querySelector('.p2')
let el = document.createElement('p')
el.classList.add('p1-2')
el.innerText = '1-2'
app.insertBefore(el, p2)
```

## 删除操作

### removeChild
`removeChild` 用于删除指定元素的某个子节点,若子节点不存在则返回`null` 
```html
<ul>
    <li class="list">1</li>
    <li class="list">2</li>
    <li class="list">3</li>
</ul>
```
```js
let lists = document.querySelectorAll('.list')
let list2 = document.querySelectorAll('.list')[1]
let deleteLi = lists[0].parentNode.removeChild(list2)
console.log(deleteLi)  // <li class="list">2</li>
lists[0].parentNode.appendChild(deleteLi)
```
结果页面的顺序是 1 3 2,结合上面的 `console.log(deleteLi)` 结果,可以得出结论:被删除的节点虽然不在文档树中,但是却还在内存中,我们仍然可以对其进行操作.
此外若删除的节点不是其子节点的话,则会报错:`Uncaught DOMException: Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node`. 修改如下以确保不会报错:
```js
if(node.parentNode){
    node.parentNode.removeChild(node)
}
```

### remove
上面我们说到了通过 `removeChild` 来删除元素节点的时候,需要先找到自身元素的父节点,然后再找到父节点下面的子元素.这里我们来说一个可以直接删除自身节点的方法 `remove`.
```html
<ul>
    <li class="li1">1</li>
    <li class="li2">2</li>
</ul>
```
```js
let li1 = document.querySelector('.li1')
li1.remove()  // <li class="li1">1</li> 这个元素被删除掉了
```
但此方法的兼容性不是很好,在IE中无法使用,但是可以通过Polyfill来使IE9及以上的浏览器兼容.但是其实Polyfill的原理也还是使用 `removeChild` 来模拟实现 `remove` 的功能.


## 修改操作

### replaceChild
`replaceChild` 方法使用一个指定的节点替换当前节点的一个子节点,并返回被替换掉的节点.其语法结构为: `parentNode.replaceChild(newChild, oldChild)`
```html
<div id="app">
    <p class="p1">1</p>
    <p class="p2">2</p>
    <p class="p3">3</p>
</div>
```
```js
let app = document.querySelector('#app')
let p2 = document.querySelector('.p2')
let el = document.createElement('p')
el.classList.add('p4')
el.innerText = '4'
let r = app.replaceChild(el, p2)
console.log(r)  // <p class="p2">2</p>
```

## 总结:
参考链接:
- [https://www.liaoxuefeng.com/wiki/1022910821149312/1026162402784992](https://www.liaoxuefeng.com/wiki/1022910821149312/1026162402784992)
- [http://luopq.com/2015/11/30/javascript-dom/](http://luopq.com/2015/11/30/javascript-dom/)
- [https://developer.mozilla.org/en-US/docs/Web/API](https://developer.mozilla.org/en-US/docs/Web/API)

![DOM](https://img-blog.csdnimg.cn/20200722220558205.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L21vZ3V6aGFsZQ==,size_16,color_FFFFFF,t_70)






