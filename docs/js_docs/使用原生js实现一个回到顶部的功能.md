# 使用原生js实现一个回到顶部的功能

css:
```css
.container {
  width: 900px;
  height: 3000px;
  background-color: orange;
  margin: 0 auto;
}
#btn {
  position: fixed;
  bottom: 100px;
  left: 50px;
  display: none;
}
```
html:
```html
<div class="container"></div>
<button id="btn">back to top</button>
```

javascript:
```js
window.onload = function(){
  let btn = document.querySelector('#btn')
  let clientHeight = document.documentElement.clientHeight
  window.onscroll = function(){
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    btn.style.display = scrollTop > clientHeight ? 'block' : 'none'
  }
  let speed
  function scroll(){
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    if(scrollTop > 0){
      document.documentElement.scrollTop = document.body.scrollTop = scrollTop - speed
      speed+=2
      setTimeout(scroll,13)
    }
  }
  btn.onclick = function(){
    speed = 10
    scroll()
  }
}
```
`speed`以及`speed+=2`可以控制滚动的速度以及加速度





