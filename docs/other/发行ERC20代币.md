# 如何基于ERC20发行自己的代币
>如今区块链的发展越来越迅速,也越来越被大众所熟知.而BTC作为区块链的一个产物,相信大家都听说过,甚至于持有过BTC.而以太坊（英文Ethereum）是一个开源的有智能合约功能的公共区块链平台，通过其专用加密货币以太币（Ether，简称"ETH"）提供去中心化的以太虚拟机（Ethereum Virtual Machine）来处理点对点合约。而正是以太坊智能合约让我们发行自己的代币成为一种不是那么难的事情

## 安装插件
下面来讲讲在以太坊测试网络发行自己代币的一些流程
首先,我们需要爬墙出去,安装一个叫做metamask的Chrome插件吧,[点我安装](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn)
安装metamask插件,添加至扩展程序,然后使用metamask,创建自己的账号,记住这些助记词,相当于自己的密钥.

![此处输入图片的描述][1]

点击切换到测试网络,一个代币在发布到正式环境之前肯定是要在测试网络进行开发测试的,毕竟在正式网络上都是要钱的啊.这里我们选择的是Ropsten 测试网络,刚开始我们的测试网络上的ETH是0,所以我们要先获取一些测试网络上的ETH,以供我们做测试使用.

## 获取测试币

![此处输入图片的描述][2]

这里我们从测试水龙头中获取一些ETH

![此处输入图片的描述][3]
这里的第一个是获取,第二个是捐赠,我们点击第一个获取就行了,可以看到下面会生成一个hash,
在 [https://teth.bitaps.com/](https://teth.bitaps.com/) 这个网站将刚刚生成的hash复制进去查询,就可以看到相对应的ETH转账记录.
这里可以看到,我们的metamask已经刷新了,我们已经拥有了测试网络的ETH.

## 编写合约代码

接下来,我们打开 [https://remix.ethereum.org/](https://remix.ethereum.org/) 这个网站,这是一个名叫remix的在线编辑器,专门用于编写智能合约,这个编辑器也有本地的安装版本,在其github中可以获取到,这是官方推荐的编辑器,我们可以使用solidity编写智能合约.( 这里推荐一个编程游戏,可以教你学会简单的solidity , [https://cryptozombies.io/zh/course](https://cryptozombies.io/zh/course)  ,这是一个打僵尸的游戏)

在remix中新建一个文件,命名为MyToken.sol.注意这里用solidity编写的文件后缀名都是.sol ,在这个文件中编写我们自己的智能合约.

## 编译部署

编写完智能合约以后,我们要先进行编译.之后才是deploy我们的代币.
这里我们使用的环境选择 Injected Web3,填写好deploy的参数
![此处输入图片的描述][4]

点击transact后 再次确认,就可以了,至此我们的智能合约就完成了.
然后复制 Deployed Contracts 的智能合约地址, 在metamask中点击添加代币,自定义代币,将刚刚复制的智能合约的地址黏贴进去,就可以看到,我们刚刚创建时的tokenSymbol已经自动关联起来了,添加完代币以后,就可以看见我们刚刚创建的代币已经显示出来了,代币的名字其实是可以用中文的.

自此,一个在测试网络的代币已经生成了.
现在你是不是觉得那些在币圈的大部分币都是空气币了,因为发行一个token是如此的简单,几乎是没有什么成本.


  [1]: https://img-blog.csdnimg.cn/20191214134439187.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L21vZ3V6aGFsZQ==,size_16,color_FFFFFF,t_70
  [2]: https://img-blog.csdnimg.cn/2019121413443473.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L21vZ3V6aGFsZQ==,size_16,color_FFFFFF,t_70
  [3]: https://img-blog.csdnimg.cn/20191214134439223.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L21vZ3V6aGFsZQ==,size_16,color_FFFFFF,t_70
  [4]: https://img-blog.csdnimg.cn/20191214134439195.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L21vZ3V6aGFsZQ==,size_16,color_FFFFFF,t_70