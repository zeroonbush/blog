# node发送邮件功能的实现
> 很多项目都会有登录功能,登录又分为短信验证码登录和邮箱验证码登录.两者都需要服务端发送随机验证码给客户端,今天我们来实现一个简单的发送邮件的功能吧
>

## 初始化项目
```shell
mkdir node-mail && cd $_
yarn init -y
```
首先,我们创建一个项目然后进入此项目,并且进行初始化操作
## 安装插件
```shell
yarn add nodemailer
```
安装插件,具体插件的详细说明[看这里](https://nodemailer.com/about/)
## 编写代码
```javascript
"use strict";
const nodemailer = require('nodemailer')
const fs = require('fs')
const path = require('path')

const transporter = nodemailer.createTransport({
  service:'163',  //使用的邮箱类型,全部类型可以查看官网
  secureConnection:true,  // 使用了SSL
  auth:{
    user:'zhangsan_test@163.com',
    pass:'xxx',  // 授权码,不是密码,一般可以通过发送短信验证码来获取,且只展示一次,记得保存好
  }
})

let code = Math.random().toString().substr(2, 6)  //随机生成6位验证码

let mailOptions = {
  from:'zhangsan_test@163.com',
  // to:'12345@qq.com',  //邮件接收方,单个邮箱 字符串写法
  to:['12345@qq.com','12346@qq.com'],  //多个邮箱 数组写法
  subject:'Hello this is zhangsan from zhejiang',  //主题
  text:`您的验证码是${code},验证码在10分钟内有效`,  //正文内容,可以是text文本形式,也可以是一个html页面
  // html:fs.createReadStream(path.resolve(__dirname,'index.html')),  //引用一个html形式,可以在根目录创建一个html文件
  attachments:[  //附件
    {
      filename:'1.png',
      path:path.resolve(__dirname, 'images/1.png'),
      cid:"01" 
    },
    {
      filename:'1.txt',
      content:'Hello world !!!'
    },
    {
      filename:'2.txt',
      path:'./2.txt' 
    }
  ]
}

transporter.sendMail(mailOptions, (error, info) =>{
  console.log({code})
  if(error){
    return console.log(error)
  }
  console.log(info)
})
```
**注意:** html里面是可以写样式的,内联样式和行内样式都是可以的.想要引用图片,若图片较小可以转为base64,图片较大则建议使用对象存储,引用cdn.
## 测试结果
在终端键入 `node app.js` 查看运行结果,若出现下面的日志,则证明我们的邮件已经发送成功了
```shell
{
  accepted: [ '12345@qq.com', '12346@qq.com' ],
  rejected: [],
  envelopeTime: 726,
  messageTime: 376,
  messageSize: 381,
  response: '250 Mail OK queued as smtp11,xxxx--.4S2 xxxxx',
  envelope: {
    from: 'zhangsan_test@163.com',
    to: [ '12345@qq.com', '12346@qq.com' ]
  },
  messageId: '<xxx@163.com>'
}
```

自此,一个简单的发送邮件的功能就已经完成了.当然,想要运用到真正的业务当中,还需要很多额外的逻辑判断.比如限制发送频率等.
