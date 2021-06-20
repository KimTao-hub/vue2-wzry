# 前言：
  模拟王者荣耀网站 https://pvp.qq.com/m/
# 技术栈：
   vue2.x + element-ui + mongoose +mongodb + express
# 初始化
  vue create admin 
  admin:
    添加element： vue add element
    安装axios：yarn add axios
  创建server文件夹:
     npm init -y初始化,在其package.json里面配置，并新建一个index.js
     安装nodemon express mongoose cors
# 观察王者荣耀官网https://pvp.qq.com/m/
  ## 内容主题区域主要为：
     ### 新闻资讯
     ### 英雄列表
       #### 装备（每个英雄都有装备）
       #### 使用技巧
       #### 对抗技巧
       #### 等
     ### 精彩视频
       #### 可使用官方连接，也可以不做
# 后台管理功能--由官网内容分为以下几个模块构建：
  ## 分类
     新建分类
       上级分类：
          news
          video
          heros
     分类列表
  ## 物品（英雄的装备）
    新建物品
    物品列表
  ## 英雄
     新建英雄--定义英雄得各项属性
     英雄列表
  ## 文章
     新建文章
     文章列表
  ## 用户管理
     新建用户
     用户列表
  ## 用户登录

  ## 运营管理（实现广告位的管理）
     新建广告
     广告列表
 # 状态码：
   删除成功：201  
   成功：200   
