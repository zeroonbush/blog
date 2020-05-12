# Git常用指令

## 项目初始化
```
git init
```
项目初始化之后会生成一个.git文件,如果看不见,可能是因为电脑隐藏了以.开头的文件

## 项目关联
### 克隆项目
```
git clone xxxx // xxxx 表示项目地址
```
表示从远程仓库拉取项目到本地

### 本地项目关联远程仓库
如果我们本地是有项目的,我们想要的是将本地的项目和远程仓库关联起来,那么有如下两种情况

 * 本地已有文件与git仓库关联起来(空仓库) 
 * 本地已有文件与git仓库关联起来(非空仓库:比如有README.md)

我们先来看第一种,它的流程是这样的:
```
git init
git remote add origin xxxx
git add .
git commit -m 'init'
git push --set-upstream origin master 或者 git push -u origin master 
```
第二种非空仓库的情况:
```
git init
git remote add origin xxxx
git add .
git commit -m 'init'
git pull origin master --allow-unrelated-histories
//若有冲突,先解决冲突
git push --set-upstream origin master
```
可以看出来这两种情况只有在第5步的时候才是有区别的.

在上面的commit到本地仓库后,如果直接推送,它会报错:
```
refusing to merge unrelated histories
```
意思就是拒绝合并没有历史关系的分支,我们用下面的代码解决这个问题
```
git pull origin master --allow-unrelated-histories
```
我们允许拉取没有历史关系的分支,这步也就是我们代码的第5步

## 分支操作
### 查看分支
```
git branch  //查看本地分支
git branch -r //远程分支
git branch -a  //本地+远程
git brnahc -v  //分支最后一次提交的信息
```
在实际项目开发中,往往会有多个任务并行开发,因此从一个基础分支拉取不同分支进行代码编写是常有的事情.
### 切换分支
```
git branch <BranchName>  //  创建本地分支
git checkout <BranchName> //切换到对应分支
git checkout -b<BranchName>r  //创建并切换到对应分支
```

### 拉取分支
将远程git仓库里的指定分支拉取到本地（本地不存在的分支）
```
git checkout -b 本地分支名 origin/远程分支名
```

### 删除分支
```
git branch -d <BranchName>  //删除本地分支
git push origin :<BranchName>(origin后面有空格)  //删除远程分支
```

### 创建本地新分支并推送到远程
```
git checkout -b branch1 //创建本地新分支并切换到对应的分支
git push --set-upstream origin branch1
```

### 暂存
有时候,我们想要切换分支,但是又不想将当前分支代码提交到本地或远程仓库,直接切换过去的话代码会被覆盖,这时候我们可以使用暂存功能
```
git stash //存
git stash pop //取出暂存
```

## 提交操作

### 代码提交
```
git add .  
git commit -m 'commit message'
git push 
```
提交的时候,可以输入emoji表情,可爱又有趣,别人一眼看过来就知道你提交的是关于什么
```
:bug: //修复BUG
:lipstick: //更新样式
:lock: //解决安全问题
:recycle: //重构
:sparkles: //添加新功能
```

### 查看提交历史
```
git log
git log -3 //显示最近3次的更新
```


### 本地代码回滚
```
git reset --hard commit-id //回滚到commit-id 
git reset --hard HEAD~3 //将最近三次的提交回滚
git reset --hard HEAD^ //将本地代码回退到上一个版本
```

### 标签功能
有时候,我们的项目上线了,我们就需要标签功能,记录我们的版本
```
git tag //显示已有的标签
git tag v1.0.1 //创建一个轻量级标签 
git tag -a v1.0.2 -m ‘release version’ //创建一个带有标注的标签
git tag -d tag_name //删除标签
git push //并不会把tag标签传送到远端服务器上,只有通过显式命令才能分享标签到远端仓库
git push origin tag_name //push单个tag 
git push origin --tags //推送所有本地新增的标签 
```

## 配置
### config配置
最后我们来说一下config配置
```
git config --global user.name  //查看全局配置的用户名
git config --global user.email  //查看全局配置的邮箱
git config --global user.name 'zhangsha'  //配置全局的用户名
git config --global user.email 'xx@xx.com'  //配置全局的邮箱
//下面是针对单独的项目进行配置和查看
git config user.name 'lisi'  //配置当前项目的用户名
git config user.name  //查看当前项目的用户名
git config --list  //查看多个配置
```
配置分为全局配置和项目配置,没有对项目进行单独配置的时候,会默认使用全局的配置.如果我们在一个项目中进行了单独的配置,那么就会使用项目中配置.这个选项在你切换不同项目(比如公司和个人项目)的时候,可以起到一定的作用.