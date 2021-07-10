//1、引入exprss,创建实例
const express = require('express')
const app = express()
const port = 3000

//###################跨域
//#####插件
app.use(express.json())
app.use(require('cors')()) //解决跨域
//#####资源静态托管
app.use('/uploads',express.static(__dirname+'/uploads'))

//连接数据库
require('./db/index.js')(app)
// const mongoose = require('mongoose')
// mongoose.connect('mongodb://127.0.0.1:27017/vue_wzry',{
//     useUnifiedTopology:true,
//     useNewUrlParser: true,
// })

//################后台api路由
////原本 是var birds = require('./birds')
//app.use('/birds', birds)
// const routes = require('./router/admin/index.js')
// app.use('/', routes)
//现在由于子路由是一个导出的函数,所以导出函数，运行函数并把express实例app当作参数传入
//传入校验中间件
const authMiddleware = require('./middleware/auth.js');
require('./router/admin/index.js')(app,authMiddleware);
require('./router/admin/subcate.js')(app,authMiddleware);
require('./router/admin/item.js')(app,authMiddleware);
require('./router/admin/hero.js')(app,authMiddleware);
require('./router/admin/article.js')(app,authMiddleware);
require('./router/admin/user.js')(app,authMiddleware);
require('./router/admin/ads.js')(app,authMiddleware);
require('./router/admin/login.js')(app);


//统一错误处理
//捕获asset抛出的异常，集中错误处理，因为使用了http-assert返回的不是json格式的数据，需要转换
app.use(async(err,req,res,next) =>{
   //console.log(err) // 打印error
   //console.log(err.statusCode) //422
   //console.log(err.message)
  //返回一个接送格式数据
  res.status(err.statusCode || 500).send({
     message:err.message
  });
})

//#################### multer---图片上传
const multer = require('multer');
const  upload = multer({ dest:__dirname+'/uploads'});

app.use('/admin/api/uploads',upload.single('file'),async function (req, res) {
     console.log(req)
     //req.file是一个对象
     const file = req.file;
     //拼凑出图片的地址---因为资源静态托管了，地址才是这个
     file.url = `http://localhost:3000/uploads/${file.filename}`
     res.send(file)
})

app.listen(port, () => {
  console.log(` app listening at http://localhost:${port}`)
})