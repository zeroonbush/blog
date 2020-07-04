# 10分钟回顾CSS媒体查询

>在摸了几天鱼以后,领导派活了.需求是写一个响应式网站,兼容PC,Pad和手机.我一听哭笑不得,这可是要了我的老命啊.都知道写响应式页面烦的很.无奈,既然领导要求,那就写咯.在正式开干之前,我找出以前记录的相关笔记,想要先好好复习一下.当看到媒体查询这一块的内容时,发现了一些我脑海中没有印象的知识点.于是正好趁着周末休息的时候,简单梳理一下有关媒体查询的相关知识点.等以后再想要复习的时候,看这篇文章就可以了.

今天的主角不是响应式页面怎么写,这个话题有点广,以后有时间再写好了.今天我们就来聊一聊响应式布局中很重要的一个点:`媒体查询`.

## 媒体查询查什么?
媒体查询:`media`属性,可以针对不同的`媒体类型`或`媒体功能`

### 媒体功能
定义不同的样式.通常在设计响应式页面中,`media`属性是非常有用的.我们可以将这个属性设置在`style`标签上.下面是一个`媒体功能`查询,其作用是查询屏幕的尺寸大小,应用不同的样式.
```css
<style media="(min-width: 1000px)">
  div {
    color: red;
  }
</style>
<style media="(max-width: 1000px">
  div {
    color: green;
  }
</style>
```

### 媒体类型
再来看一个`媒体类型`查询
```css
<style media="screen">
  div {
    color: red;
  }
</style>
<style media="print">
  div {
    color: green;
  }
</style>
```
查询屏幕设备,其中`screen` 表示设备类型 通常我们的电脑,平板,手机等都属于`screen`类型.其他的还有譬如`print`表示打印设备等(使用`Ctrl+p` 就可以调出来).不给值就是默认值,默认值是`all`.

## 逻辑操作符
当屏幕宽度在400到600px之间起作用,其中用到了`and`逻辑操作符,表示两个条件都要满足
```css
<style media="screen and (min-width:400px) and (max-width:600px)"></style>
```

当是横屏或者最大宽度为768px的时候,用 `,` 逗号分隔符代表或者,表示只要是横屏(定义是输出设备中的页面可见区域高度小于宽度)或者宽度小于768px就适用
```css
<style media="screen and (orientation:landscape), screen and (max-width:768px)"></style>
```

当屏幕宽度在400到600px之间不起作用.注意了,`not` 关键字只能用于否定整个媒体查询,而不能用于否定单个表达式,所以在使用的时候,它一般放在最开头
```css
<style media="not screen and (min-width:400px) and (max-width:600px)"></style>
```

上面讲到了`and`, `,`(or的意思) 和`not` 这三种逻辑操作符,除此之外还有`only`等.only的意思就是只在支持媒体查询的浏览器中使用.真实场景是,在支持媒体查询的浏览器中,加不加only都是一样的,但在不支持媒体查询的浏览器中,因为它不认识only,所以会将本条媒体查询直接忽略掉.用法如下
```css
<style media="only screen and (min-width:400px) and (max-width:600px)"></style>
```

## media用在啥地方?
同样 media 属性也可以用在link标签中 此时不管媒体查询是否符合,css文件都会被下载下来
```css
<link rel="stylesheet" href="css/common.css">
<link media="(min-width:1000px)" rel="stylesheet" href="css/pc.css">
<link media="(max-width:750px)" rel="stylesheet" href="css/mobile.css">
<link media="screen" rel="stylesheet" href="css/screen.css">
<link media="print" rel="stylesheet" href="css/print.css">
```
对于基于html的样式表,在通过`media`属性对媒体做出限制时,其用法在`link`和`style`元素中是一样的.
而在样式表中,也可以在 `@import` 规则上限制媒体
html页面引入一个`index.css`文件,其他所有的css文件都在这个`index.css`文件中引入,引入外部文件时的媒体查询
```css
@import url(./common.css);
@import url(./pc.css) (min-width:1000px);
@import url(./mobile.css) (max-width:750px);
```

此外还有`@media`块语法,也是我们平时使用的比较多的,它允许我们在同一个样式表中为多个媒体定义不同的样式
```css
.div1 {
    background-color: orange;
}
@media only screen and (min-width: 1000px) and (max-width: 1200px){
    .div1 {
        background-color: red;
    }
}
@media only screen and (min-width: 800px) and (max-width: 1000px){
    .div1 {
        background-color: green;
    }
}
@media only screen and (max-width: 800px){
    .div1 {
        background-color: blue;
    }
}
```
上面的代码,在我们不停缩放浏览器的宽度时,可以看到不同的效果.

## 实现图片的自适应
有时,我们会有这样的需求,在不同的设备或者不同宽度的页面中展示不同的图片,或大小不一样,或内容不一样.那么要怎么做到呢?这里提供一种思路:
```html
<picture>
    <source srcset="images/horizontal.jpg" media="(min-width: 800px)">
    <source srcset="images/vertical.jpg" media="(min-width: 600px)">
    < img src="images/default.jpg" alt="">
</picture>
```
当设备宽度大于800px的时候,使用横图(horizontal.jpg),当介于600到800px之间时,使用竖图(vertical),当小于600px的时候,使用img标签中src指定的默认图(default).
`picture`元素通过包含0个或多个source元素和一个img元素来为不同的场景提供不同的图片.这里我们结合了媒体查询,实现在不同宽度下展示不同的图片,当没有符合条件的场景时,使用默认的图片.
更多有关picture标签的用法:[戳我](https://developer.mozilla.org/es/docs/Web/HTML/Elemento/picture)

## 使用JavaScript进行媒体查询
语法如下:
```js
mqList = window.matchMedia(mediaQueryString)  // 参数为一个被用于媒体查询解析的字符串 返回一个新的用来媒体查询的MediaQueryList对象
```
如:
```js
const obj = window.matchMedia('(max-width:600px)')
console.log(obj)
```
结果如下图:
![MediaQueryList](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9ibG9nLTEyNTcyMzM0MTcuY29zLmFwLW5hbmppbmcubXlxY2xvdWQuY29tL01lZGlhUXVlcnlMaXN0LnBuZw?x-oss-process=image/format,png)
可以通过 `matches` 属性来判断目前的 `document` 是否匹配媒体查询.此时因为我的页面宽度大于600px,所以matches属性的结果为false
此外如果我们想要监听查询结果值的变化的话,我们可以给这个返回对象注册监听器,添加回调函数,当改变媒体查询的状态时.触发回调.
```js
const obj = window.matchMedia('(max-width:600px)')
console.log(obj)
const callback = e => e.matches ? console.log('greater than 600px') : console.log('less than 600px')
obj.addListener(callback)
```
当浏览器的宽度从600px+到600px- 或者 从600px-到600px+ 的时候,可以看到控制台打印出了相对应的提示.当然,若是不想再继续监听,可以使用 `removeListener` 来移除.
```js
obj.removeListener(callback)
```

总结:
![Media Query](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9ibG9nLTEyNTcyMzM0MTcuY29zLmFwLW5hbmppbmcubXlxY2xvdWQuY29tL01lZGlhUXVlcnlQaWMucG5n?x-oss-process=image/format,png)