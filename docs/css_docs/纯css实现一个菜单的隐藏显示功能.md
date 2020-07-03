# 纯css实现一个菜单的隐藏显示功能
> 实现一个点击按钮,触发菜单隐藏显示的功能

在很多时候,我们都会有这样的一个需求,就是通过点击或者触摸一个按钮来切换菜单的显示和隐藏.在大部分的情况下,我们会选择通过js来给按钮添加`click`点击事件来实现这个功能.但今天我们要说的是通过单纯的css来实现功能.

要控制菜单的隐藏显示,那么我们就需要一个东西可以用来记录当前的菜单状态.而html中的复选框就是一个可以用来记录状态的标签.而且我们也知道,`label`标签是可以配合复选框使用的.

html:
```html
<div>
  <label for="checkbox">菜单</label>
  <input id="checkbox" type="checkbox" />
  <p class="menu">我是一个菜单呀</p>
</div>
```
css:
```css
#checkbox {
  display:none;
}
#checkbox:checked ~ .menu   {
  display:block;
}
#checkbox ~ .menu {
  display:none;
}
```

我们通过`label`标签来模拟一个按钮,通过复选框来记录状态(但是复选框不好看,所以我们选择隐藏它),然后通过css选择器的兄弟选择器来设置在不同状态下,菜单的隐藏显示.这里简单的用一个`p`标签当作整个菜单,只是为了说明功能的实现原理.
