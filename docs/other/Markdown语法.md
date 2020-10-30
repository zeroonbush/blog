
# Markdown语法指南
> **Markdown**是一种轻量级标记语言,它允许人们使用易读易写的纯文本格式编写文档

## 标题
使用 `#` 号可表示 1-6 级标题，一级标题对应一个 `#` 号，二级标题对应两个 `#` 号，以此类推。
```Markdown
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
```

效果如下:
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题

也可以使用 `==` 来表示1级标题,`__` 来表示2级标题
```Markdown
这是一级标题
==
这是二级标题
--
```

效果如下:

这是一级标题
==
这是二级标题
--


## 字体
```Markdown
*我是斜体*
_我是斜体_
**我是粗体**
__我是粗体__
***我是粗斜体***
___我是粗斜体___
```
效果如下:

*我是斜体*  
_我是斜体_  
**我是粗体**  
__我是粗体__  
***我是粗斜体***  
___我是粗斜体___  


## 线条
```Markdown
~~我是删除~~  
<u>这是一条下划线</u>
这是一条分割线
***
这是一条分割线
* * *
这是一条分割线
- - -
这是一条分割线
--------
```
效果如下:  
~~我是删除~~  
<u>这是一条下划线</u>  
这是一条分割线
***
这是一条分割线
* * *
这是一条分割线
- - -
这是一条分割线

--------

**注意:** 三个或三个以上的 `-` 或 `*`

## 列表
### 无序列表
使用`+`, `-`, `*` 其中任何一个作为标记
```Markdown
* list1
+ list2
- list3
```


* list1
* list2
* list3


### 有序列表
使用数字 + `.`来表示
```Markdown
1. list1
2. list2
3. list3
```
1. list1
2. list2
3. list3

### 列表嵌套
```Markdown
1. list1
  - list1-1
  - list1-2
2. list2
  - list2-1
  - list2-2

```


1. list1
  - list1-1
  - list1-2
2. list2
  - list2-1
  - list2-2

## 任务列表
**注:** 此种写法在vuepress中无效,可以使用原生的复选框代替
```
- [ ] 吃饭
- [x] 睡觉  //打x的表示已完成
- [ ] 打豆豆
```


- [ ] 吃饭
- [x] 睡觉
- [ ] 打豆豆


```
<label><input type="checkbox">吃饭</label>
<label><input type="checkbox" checked>睡觉</label>
<label><input type="checkbox">打豆豆</label>
```

<label><input type="checkbox">吃饭</label>
<label><input type="checkbox" checked>睡觉</label>
<label><input type="checkbox">打豆豆</label>



## 引用
可以无限引用,但是没什么太大的意义

```Markdown
> 前言:第一层引用
>> 前言:第二层引用
```

> 前言:第一层引用
>> 前言:第二层引用


## 链接
```Markdown
[百度](https://www.baidu.com)
```
[百度](https://www.baidu.com)

```Markdown
<https://www.baidu.com>
```
<https://www.baidu.com>


## 图片

```Markdown
![alt 属性文本](图片链接)
![占位符](https://iph.href.lu/200x200)
```
![占位符](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pcGguaHJlZi5sdS8yMDB4MjAw?x-oss-process=image/format,png)


## 表格
Markdown使用 `|` 来分隔不同单元格,使用 `-` 来分隔表头和主体

```Markdown
|标题1|标题2|标题2
| :- | :-: | -: 
|行1列1|行1列2|行1列3
|行2列1|行2列2|行2列3
```
|标题1|标题2|标题2
| :- | :-: | -: 
|行1列1|行1列2|行1列3
|行2列1|行2列2|行2列3

- `:-` 设置文本居左
- `-:` 设置文本居右
- `:-:` 设置文本居中


## 代码
### 单行代码
```Markdown
`console.log(1)`
```
效果如下:  
`console.log(1)`

### 代码块
```
(```)
console.log(1)
(```)
 ```
这里在几个平台测试了一下,发现有的能显示,有的不能显示,所以这里在 ```外面包裹一层`()`只用于展示使用
效果如下:
```
console.log(1)
```
或者直接使用4个空格,也是可以展示一个代码片段

    console.log(1)
    console.log(2)


## 流程图
Markdown 还支持流程图或甘特图之类的.但是因为不同的平台对其支持都是不同的,有的支持,有的不支持,因此就不展示流程图的代码了.

## 兼容HTML
Markdown的目标是成为一种适用于网络的书写语言.它的标签较少,只对应了HTML中的一部分.不在其覆盖范围内的,我们可以使用html标签来书写.(貌似也有的平台是不支持的)
```Markdown
<span style="color:orange;">orange</span>
```
效果如下:  
<span style="color:orange;">orange</span>

使用kbd来展示按键:
```Markdown
<kbd>Ctrl</kbd>+<kbd>S</kbd>
```
<kbd>Ctrl</kbd>+<kbd>S</kbd> 来保存文档

使用反斜杠转义特殊字符:
```Markdown
\*\* 正常显示 \*\*
```
\*\* 正常显示 \*\*

## 注解
使用`[^]`来定义注解：(<span style="color: red;">vuepress中无效</span>)
```
我是一个注解[^注解1]  
我也是一个注解[^注解2]  
去[百度][1]

[^注解1]:我是注解1  

[^注解2]:我是注解2  
[1]: http://www.baidu.com
```
效果如下:

我是一个注解[^注解1]  
我也是一个注解[^注解2]  
去[百度][1]

[^注解1]:我是注解1  

[^注解2]:我是注解2  
[1]: http://www.baidu.com


