# Flutter构建Android APP
> 在完成项目开发后,我们就想要将我们的代码打包成一个apk的包,以提供给别人使用.

## 创建密钥库 keystore
```
keytool -genkey -v -keystore ~/key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias key
```
上面的操作会要求我们输入两次密码后再让我们填写一些基本信息.
不想填写的信息,我们可以直接回车跳过,最后出现
```
Is CN=Unknown, OU=Unknown, O=Unknown, L=Unknown, ST=Unknown, C=Unknown correct?
  [no]: 
```
我们直接按`y`就可以了.然后又要求我们输入密钥密码,我们可以直接回车设置成和密钥库一样的密码.最后出现如下:
```
[Storing /Users/xxx/key.jks]
```
就证明密钥库已经生成成功了,并且上面的就是文件所在的路径.

**注意:** 此文件需要保密,不要将其放到github等上面去

## 引用keystore
在android目录下创建一个名为`key.properties`的文件,里面包含对keystore的引用:
```
storePassword=123456
keyPassword=123456
keyAlias=key
storeFile=/Users/xxx/key.jks
```

 - storeFile的路径是密钥库的路径,就是我们之前生成的路径
 - keyAlias是别名,在我们第一步命令的时候赋予
 - keyPassword和storePassword就是密钥和密钥库的密码了,我们前面也设置了

## 配置签名
编辑`android/app/build.gradle`文件为应用配置签名

 - 替换
```
android {
```
变成:
```
def keystorePropertiesFile = rootProject.file("key.properties")
def keystoreProperties = new Properties()
keystoreProperties.load(new FileInputStream(keystorePropertiesFile))

android {
```
---
- 替换
```
buildTypes {
    release {
        // TODO: Add your own signing config for the release build.
        // Signing with the debug keys for now, so `flutter run --release` works.
        signingConfig signingConfigs.debug
    }
}
```
变成:
```
signingConfigs {
    release {
        keyAlias keystoreProperties['keyAlias']
        keyPassword keystoreProperties['keyPassword']
        storeFile file(keystoreProperties['storeFile'])
        storePassword keystoreProperties['storePassword']
    }
}
buildTypes {
    release {
        signingConfig signingConfigs.release
    }
}
```

## 构建apk包
在项目目录下运行
```
flutter build apk
```
当看到类似如下这样的提示,则表示已经构建成功,并且告诉了我们构建成功的apk的路径.
```
Running Gradle task 'assembleRelease'...            
Running Gradle task 'assembleRelease'... Done   59.8s
✓ Built build/app/outputs/apk/release/app-release.apk (16.1MB).
```
自此,我们的项目构建就完成了,我们可以将包发给别人安装或者提交到应用商店.






