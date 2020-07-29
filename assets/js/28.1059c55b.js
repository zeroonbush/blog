(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{348:function(t,s,a){"use strict";a.r(s);var n=a(33),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"javascript的执行机制"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#javascript的执行机制"}},[t._v("#")]),t._v(" JavaScript的执行机制")]),t._v(" "),a("h2",{attrs:{id:"js是单线程的"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#js是单线程的"}},[t._v("#")]),t._v(" JS是单线程的")]),t._v(" "),a("p",[t._v("不同于Java等多线程语言,JavaScript这门语言是单线程的,这与它的用途是相关的.大家都知道JavaScript诞生之初就是作为浏览器的脚本语言.所以它的主要用途就是与用户进行交互以及操作DOM.假如有两个线程,其中一个线程想要添加一个节点,而另一个线程则想要删除一个节点.如果这两个线程同时运行,那么结果势必会导致混乱,所以JavaScript是一门单线程的语言.")]),t._v(" "),a("h2",{attrs:{id:"同步和异步"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#同步和异步"}},[t._v("#")]),t._v(" 同步和异步")]),t._v(" "),a("p",[t._v("JavaScript虽然是单线程的,但是也是分 "),a("code",[t._v("同步")]),t._v(" 和 "),a("code",[t._v("异步")]),t._v(" 的.像我们平时用的比较多的 "),a("code",[t._v("ajax")]),t._v(" 请求, "),a("code",[t._v("setTimeout")]),t._v(" 定时器等都是异步任务.\n说起 "),a("code",[t._v("同步")]),t._v(" 和 "),a("code",[t._v("异步")]),t._v(",相信大家应该都是有所了解的.这俩应该算是编程中的比较基础的两个概念了.从抽象一点的角度说,同步就是在执行一个方法或函数之后,程序进入到一个阻塞状态,直到获取系统返回的结果之后,再执行之后的命令.而异步则是在执行完一个方法或函数后,程序是非阻塞的,继续执行下面的命令,等到系统返回消息的时候,再去做相对应的处理,也就是说多个相关事件不一定要等待前面一个事件完成再去做.从形象一点的角度说,举个生活的例子就是早上起床之后熬粥,在熬粥的时候,我啥也不干就等着它熬好,那就是同步.要是我不等它,自己去刷牙洗脸,最后粥熬好的时候我过来吃那就是异步.")]),t._v(" "),a("h3",{attrs:{id:"为啥要有同步异步之分"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#为啥要有同步异步之分"}},[t._v("#")]),t._v(" 为啥要有同步异步之分")]),t._v(" "),a("p",[t._v("那么为什么会有同步和异步呢?这是因为JavaScript是单线程的,那就表示它执行的任务需要排队.当前一个任务结束的时候,才会执行后一个任务.大家都知道cpu的处理速度比内存快上百倍,比硬盘更是快上百万倍.所以很多时候cpu不得不在那边等待内存或硬盘返回结果.这就很消耗时间了,我明明很早就把一个事情干完了,为啥还要等你那么久.于是我决定不等了,先干后面的事情,等你返回了结果后通知我,我再去处理刚刚挂起的任务.于是同步和异步就这么来了,其中同步任务是在主线程上执行,而异步任务则是进入任务队列.当任务队列通知主线程某个异步任务可以执行了(比如定时器的时间到了等),该任务才会进入主线程执行.主线程从任务队列中读取的这个过程会一直循环进行,这个过程就叫做"),a("code",[t._v("事件循环(Event Loop)")]),t._v(".")]),t._v(" "),a("h2",{attrs:{id:"任务队列"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#任务队列"}},[t._v("#")]),t._v(" 任务队列")]),t._v(" "),a("p",[t._v("任务队列就是一个事件队列,我们前面提到的有些耗时的任务或一些异步任务,我们将它放到任务队列中.当满足某些条件时就可以从任务队列中取出去放到主线程中执行.\n我们先来看下面的代码,类似的问题是有可能出现在一些面试题中的.问的就是打印出来的顺序是多少?")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setTimeout")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Promise")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("resolve"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" reject")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("resolve")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("4")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 2 3 4 1")]),t._v("\n")])])]),a("p",[t._v("为什么是 "),a("code",[t._v("2341")]),t._v(" 的顺序呢?我们来分析下,JS中代码的执行是从上到下一行一行执行的.首先执行的是 "),a("code",[t._v("setTimeout")]),t._v(" 这段代码,发现这是定时器任务,于是便把内部的具体执行内容 "),a("code",[t._v("console.log(1)")]),t._v(" 先拿出来放到其他地方,准备待会儿再执行.继续执行到 "),a("code",[t._v("console.log(2)")]),t._v(" 这句,于是先输出一个2.继续执行,遇到了一个 "),a("code",[t._v("Promise")]),t._v(" .注意在这个 "),a("code",[t._v("Promise")]),t._v("中 , "),a("code",[t._v("console.log(3)")]),t._v(" 以及之后的 "),a("code",[t._v("resolve()")]),t._v(" 这两句都是同步执行的,但是 "),a("code",[t._v("then")]),t._v(" 里面的代码却是异步执行的.于是在输出了一个3之后,又把 "),a("code",[t._v("console.log(4)")]),t._v(" 拿出来放到其他地方,准备晚点再去执行它.好了,现在我们已经把 "),a("code",[t._v("console.log(1)")]),t._v(" 和 "),a("code",[t._v("console.log(4)")]),t._v(" 扔进了一个地方,那么为什么是先输出4然后再是1呢?这是因为虽然1和4都被我们扔进了一个地方,我们可以把这个地方理解为一个大房子.1和4被扔进了不同的房间.其中1被扔进了一个叫做 "),a("code",[t._v("宏任务队列")]),t._v(" 的房间.4被扔进了另一个叫做 "),a("code",[t._v("微任务队列")]),t._v(" 的房间.这俩房间都住着好些人,我们来简单看下都有哪些朋友.")]),t._v(" "),a("h3",{attrs:{id:"微任务和宏任务"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#微任务和宏任务"}},[t._v("#")]),t._v(" 微任务和宏任务")]),t._v(" "),a("ul",[a("li",[a("strong",[t._v("微任务(micro-task):")]),t._v(" "),a("code",[t._v("Promise")]),t._v(" ,"),a("code",[t._v("process.nextTick")]),t._v(" 等")]),t._v(" "),a("li",[a("strong",[t._v("宏任务(macro-task):")]),t._v(" "),a("code",[t._v("script")]),t._v(", "),a("code",[t._v("setTimeout")]),t._v(",  "),a("code",[t._v("setInterval")]),t._v(" 等")])]),t._v(" "),a("p",[t._v("这里每次我们的一个宏任务执行完毕后,都要去微任务队列看看有没有任务需要执行.如果此时微任务队列中有任务,那就先执行微任务队列中的任务,要把微任务队列中的任务都清空.执行完毕后再执行宏任务队列中的下一个任务.所谓一图胜千言,各位老铁请看下图:")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://imgconvert.csdnimg.cn/aHR0cHM6Ly9ibG9nLTEyNTcyMzM0MTcuY29zLmFwLW5hbmppbmcubXlxY2xvdWQuY29tL0pTX29yZGVyLnBuZw?x-oss-process=image/format,png",alt:"执行顺序"}})]),t._v(" "),a("p",[a("strong",[t._v("总结起来就是")]),t._v(":不同类型的任务会进入到对应的事件队列(Event Queue)中.每次执行下一个宏任务之前先去微任务队列里面查看,直到把微任务队列清空后再去执行宏任务队列中的任务.")]),t._v(" "),a("p",[t._v("上面的微任务中我们提到了 "),a("code",[t._v("process.nextTick")]),t._v(" ,下面我们来简单了解下."),a("code",[t._v("process.nextTick")]),t._v(" 是在当前执行栈的最后,下一次事件循环开始前触发,而"),a("code",[t._v("setTimeout")]),t._v(" 则是在事件循环开始后. 将下面代码放到 node 运行环境,执行结果为先2后1")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("process"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("nextTick")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 2 1")]),t._v("\n")])])]),a("p",[t._v("我们在上面的代码之前再放置一个setTimeout 定时器,打印输出结果")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setTimeout")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nprocess"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("nextTick")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 2 1 3")]),t._v("\n")])])]),a("p",[t._v("可以看到输出的结果为 "),a("code",[t._v("2 1 3")]),t._v(" ,这就是因为 "),a("code",[t._v("setTimeout")]),t._v(" 是个宏任务, 而 "),a("code",[t._v("nextTick")]),t._v(" 则是个微任务.所以先清空微任务队列,即先执行 "),a("code",[t._v("process.nextTick")]),t._v(" 的回调.")]),t._v(" "),a("h3",{attrs:{id:"运用微任务和宏任务来解题"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#运用微任务和宏任务来解题"}},[t._v("#")]),t._v(" 运用微任务和宏任务来解题")]),t._v(" "),a("p",[t._v("到这里我们已经介绍了同步异步以及微任务队列和宏任务队列的相关内容了,我们再来看一看一道复杂一点的题目.")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setTimeout")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setTimeout")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Promise")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("resolve"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" reject")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("resolve")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("4")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Promise")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("resolve"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" reject")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("resolve")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("6")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Promise")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("resolve"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" reject")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("7")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setTimeout")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n     console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("8")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("resolve")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("9")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 4 5 7 6 9 1 2 3 8")]),t._v("\n")])])]),a("p",[t._v("我们按照上面我画的那个图的思路来解决下这道题目.为了少打几个字,我就把类似 "),a("code",[t._v("console.log(1)")]),t._v(" 之类的写成1了.首先执行前面两个 "),a("code",[t._v("setTimeout")]),t._v(" ,于是把123放到了宏任务队列中.执行到4的时候,先打印出一个4.然后是两个"),a("code",[t._v("Promise")]),t._v(",先打印出5,然后把6放到了微任务队列中.再之后打印出7,把8放到宏任务中,然后就是9放到微任务中.此时已经打印出457,并且微任务中有[6,9],宏任务中有[1,2,3,8].代码第一遍已经执行完毕,前面提到了整个"),a("code",[t._v("script")]),t._v(" 脚本相当于一个宏任务.于是便去执行微任务,接着打印出69.此时微任务已经清空,去执行宏任务.选取宏任务队列中的第一个任务,打印出1之后.回过头去看看微任务队列是否还有未执行的任务,现在已经没有了.于是便继续执行宏任务队列中的下一个任务即2.打印出2之后,因为这是一个 "),a("code",[t._v("Promise")]),t._v(" ,所以将"),a("code",[t._v("then")]),t._v("里面的3放到微任务队列,此次宏任务执行完毕.此时的微任务队列有[3],宏任务队列有[8].再去执行微任务队列,打印出3.最后再次执行宏任务队列,打印出8.经过上面这么一波分析,大家是不是已经明白了遇到这样的问题该如何解决了.")])])}),[],!1,null,null,null);s.default=e.exports}}]);