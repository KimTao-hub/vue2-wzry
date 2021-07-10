# vue2-wzry
模仿王者荣耀移动端官网页面，包括管理系统和前端网页

# 前言：
  模拟王者荣耀网站 https://pvp.qq.com/m/的后台管理系统和手机端页面
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
       #### 生命力战斗力攻击力等打分
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
     文章使用富文本编辑器
       npm查找并安装vue2-editor，安装出现不明bug
       放弃使用vue2-editor，使用vue-quill-editor，安装成功并使用
     新建文章  
     文章列表
  ## 用户管理
     新建用户
      #用户名，密码加密用bcryptjs，server文件夹npm install bcryptjs，防止后台人员看到用户的密码。
     用户列表

  ## 运营管理（实现广告位,即轮播图的管理）
     新建广告
     广告列表

  ## 用户登录
      ### 后端server文件安装http-assert统一处理报错
      ### 后端安装jsonwebtoken 用来生成token值，保存登录状态 npm install jsonwebtoken
      ### 用户登录后台几口校验：
         第一步：查找用户名,找不到assert抛出422错误 ---- assert(user,422,'用户不存在');
         第二步：用bcryptjs解析密码是否相等，不相等assert抛出422错误
         第三步：用jsonwebtoken 生成token值返回token值
      ### 统一错误处理--后端路由使用错误中间件，统一处理assert抛出的错误。
          然后通过axios拦截器对错误信息进行UI显示
  
      ### 登录页 sessionStorage保存返回的token值等。

      ### 每访问一个页面都要带上token值，如果没有token值，则强制跳转到登录页面。
         需要使用axios请求拦截器，每次访问时带上token
      ### 后台设置express路由的中间件，解析token，判断用户是否正确登录，将中间件应用到各个路由上，确保访问路都需要登录
         使用axios响应拦截器，对于中间件的抛错进行处理，显示message信息框
      
      ### 前面只做好了后台接口的登录校验，现在开始做前端页面的后台校验
          可以给前端login路由的添加元信息meta:{requireAuth:true}
          在Vue导航首位beforeEach中判断元信息和token，若都不存在跳转到login页面（next('/login')），否则放过(next())。


 # 状态码：
   删除成功：201  
   成功：200   
   校验token，用户没登录：401
   登录时没查找到用户、密码错误：422
