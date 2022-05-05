# 项目背景

随着互联网的发展，开发者在使用浏览器时有如下问题：

(1) 常用浏览器的新建标签页仅能展示前几次点击的网址，不易调整。

(2) 记录待办事项的软件操作成本高，且定制自由度低。

(3) 在gitee 优秀项目的不断增加的背景下，项目收藏的分类及搜索成为问题。

然而，传统的导航页却不能解决开发者以上的问题：大部分导航栏内容具繁复性，缺乏简约性和美感；稍具有美观性的导航栏，却遇到拖动性差、自定义功能弱等问题。

基于此，一个高度自定义化的导航栏——“拾光同学”应运而生。针对开发者在使用浏览器时的痛点，“拾光同学”开发了的高度自定义化导航应用，致力于解决传统导航页面和待办软件存在的各种问题，成为当之无愧的开发者的效率窗口。

 

# 竞品分析

| 竞品                 | 主要结论                                                     |
| -------------------- | ------------------------------------------------------------ |
| 掘金插件             | 掘金插件有良好的体现当前github上火热的一些repo，但是并没有办法体现当前用户的仓库内容。 |
| Edge浏览器新建标签页 | 站点图标栏只能记录开始使用的空位，一旦满了就不能增加并且不能更新位置 |
| 滴答清单             | 列表分类功能十分完善，但只能限于系统模块，无法根据用户的习惯如纸质便签任意更改位置 |

总而言之，拾光同学是支持自定义的。

# 需求范围

| 需求         | 说明                                                       |
| ------------ | ---------------------------------------------------------- |
| 第三方登录   | 可以使用gitee进行第三方登录                                |
| 搜索功能     | 用户可以自定义搜索引擎，以及是否开启历史记录               |
| 仓库收藏列表 | 登陆之后收藏的内容进入收藏列表，每个仓库之间可以随意的拖到 |
| 仓库导入功能 | 可以对自己的star仓库进行导入操作                           |
| 签到功能     | 可以统计用户签到天数和时间，分析上线率                     |
| 标签功能     | 可以随意拖拽自己待办事项的位置                             |
| 皮肤功能     | 可以对站点进行换肤                                         |

## 用户模块 

### 1.搜索功能

当用户未进行登录时，无法查看自己当前收藏的gitee仓库。此时只能进行搜索以及查看收藏列表，搜索的网站分别有百度，必应，360等可以自由切换。

![img](https://gitee.com/Dye/statics/raw/master/img/202205052106386.jpg)

![img](https://gitee.com/Dye/statics/raw/master/img/202205052106048.jpg)

登陆用户可以进入个人中心对搜索引擎进行增删改查

![img](https://gitee.com/Dye/statics/raw/master/img/202205052106387.jpg)用户还可以在控制台选择是否开启历史记录

![img](https://gitee.com/Dye/statics/raw/master/img/202205052106388.jpg)

当开启历史记录后，在搜索框进行搜索能够显示近期记录

![img](https://gitee.com/Dye/statics/raw/master/img/202205052106389.jpg)

### 2.站点收藏

![img](https://gitee.com/Dye/statics/raw/master/img/202205052106390.jpg)未登陆用户只能使用预设站点，可以体验点击排队的功能

登陆用户可以对站点进行增删改查

![img](https://gitee.com/Dye/statics/raw/master/img/202205052106392.jpg)

![img](https://gitee.com/Dye/statics/raw/master/img/202205052106393.jpg)

 

### 3.打卡签到功能

![img](https://gitee.com/Dye/statics/raw/master/img/202205052106394.jpg)

登陆用户可以进行日常打卡，打卡记录在控制台我的账号，查看日历图

![img](https://gitee.com/Dye/statics/raw/master/img/202205052106395.jpg)

并且会根据打卡时间，生成近一星期时间折线图

![img](https://gitee.com/Dye/statics/raw/master/img/202205052106803.jpg)4.站点壁纸功能

登陆用户可以对导航页面头部壁纸进行更换，更换方式在控制台，个性设置

![img](https://gitee.com/Dye/statics/raw/master/img/202205052106396.jpg)

## 分类模块

### 1.导入功能

在控制台，我的账号，可以进行gitee账号绑定，绑定成功后，自动将gitee star的优秀项目导入数据库

![img](https://gitee.com/Dye/statics/raw/master/img/202205052106397.jpg)

### 2.收藏列表

未登陆用户，只能体验预设仓库收藏列表

![img](https://gitee.com/Dye/statics/raw/master/img/202205052106398.jpg)登陆用户在导入仓库后，来到该页面，可以创建分类，移动分类，甚至移动分类，可以自由拖拽。

![img](https://gitee.com/Dye/statics/raw/master/img/202205052106399.jpg)

![img](https://gitee.com/Dye/statics/raw/master/img/202205052106614.jpg)

![img](https://gitee.com/Dye/statics/raw/master/img/202205052106400.jpg)

![img](https://gitee.com/Dye/statics/raw/master/img/202205052106401.jpg)

![img](https://gitee.com/Dye/statics/raw/master/img/202205052106402.jpg)

## 便签模块

登陆用户可以新建便签，系统将生成的便签数据可视化，不再以列表形式，用户也可以随意拖动，实现“纸质便签般”的粘贴。双击两下即可删除，十分便捷。

![img](https://gitee.com/Dye/statics/raw/master/img/202205052106179.jpg)

 

![image-20220505210646823](https://gitee.com/Dye/statics/raw/master/img/202205052106881.png)

- 后端地址：https://github.com/dyedd/light-collector-front-end
