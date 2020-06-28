# 常用css片段

## 隐藏滚动条
```css
::-webkit-scrollbar {
  width: 0;
}
```
对某些浏览器没作用,可以使用下面的方法模拟隐藏
```css
* {
  margin: 0;
  padding: 0;
}
html,body {
  height: 100%;
}
html {
  overflow: hidden;
}
body {
  overflow: auto;
  width: calc(100% + 20px);
}
.page {
  width: 100%;
  background-color: pink;
}
```
html:
```html
<body>
    <div class=“page”>
        <p>1</p>
          ...
    </page>
</body>
```


## calc()函数
```css
width:calc(100% - 100px);  //运算符前后都需要保留一个空格,支持 + - * / 计算
```
任何长度值都可以使用calc()函数进行计算


## 单边阴影模糊
通过设置第四个参数的数值是第三个的负数，来设置单边显示模糊效果
```css
box-shadow: 0px 5px 4px -4px rgb(255,0,0);
```
也可以通过`box-shadow: 0px 5px 4px -4px rgb(255,0,0), 0px -5px 4px -4px rgb(255,0,0);` 来设置两边的模糊效果 


## 清除浮动
```css
.clearfix::after {
  content: '';
  display: inline-block;
  clear: both;
  height: 0;
  font-size: 0;
  visibility: hidden;
}
```


## 文本超过部分省略号
```css
.text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

## 不规则圆角
```css
border-radius: 50px / 30px;  /* 这样可以让圆角呈现出非圆形 */
```

## placeholder属性
```css
input::-webkit-input-placeholder {
  font-size:16px;
}
input::-moz-placeholder {
  font-size:16px;
}
input:-ms-input-placeholder {
  font-size:16px;
}
```

## 媒体查询
```css
@media screen and (max-width: 1200px) {
  .div1 {
    color: red;
  }
}
@media screen and (min-width: 600px) {
  .div1 {
    background-color: green; 
  }
}
```

## a标签双箭头图标
```css
a::after{
  content: '\00a0\000bb';
}
```

## 自定义鼠标样式
```css
cursor: url(images/1.png), auto;
```









