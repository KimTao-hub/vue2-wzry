
//路由文件导出的是个函数
module.exports =(app,authMiddleware) =>{
    const express = require('express')
    const router = express.Router()
    //引入Mode
    const Fcate = require('../../Models/Fcate.js')
    const Cate = require('../../Models/Cate.js'); 

     //使用auth验证中间件
    // const authMiddleware = require('../../middleware/auth.js');
    
    // 写入
    router.post('/fcate',authMiddleware(),async function (req, res) {
      // console.log(req)
      const model =  await Fcate.create(req.body)
      res.send({model:model})
    })
    router.get('/fcate/list',authMiddleware(),async function (req, res) {
      const model =  await Fcate.find();
      res.send({model:model})
    })
    router.delete('/fcate/:id',authMiddleware(),async function(req,res){
      //console.log(req)
      //req.params.id
      const model =  await Fcate.findByIdAndDelete(req.params.id);
      res.send({
        status:201, 
        model:model
      })
    })
    router.put('/fcate/:id',authMiddleware(), async function(req,res){
      // console.log(req)
      await Fcate.findByIdAndUpdate(req.params.id,req.body)
      // console.log(model)
      res.send({
         status:200,
      })
    })
   //########子分类路由
  //  router.post('/subcate',async function (req, res) {
  //   // console.log(req)
  //   const model =  await Cate.create(req.body)
  //   res.send({
  //     model:model,
  //     status:200,
  //   })
  // })
  // router.get('/subcate/list',async function(req,res){
  //   // 关联查询populate
  //   const model = await Cate.find().populate('parent');
  //   res.send({
  //     model:model,
  //     status:200
  //   })
  // })
  // router.put('/subcate/:id', async function(req,res){
  //   // console.log(req)
  //   await Cate.findByIdAndUpdate(req.params.id,req.body)
  //   // console.log(model)
  //   res.send({
  //      status:200,
  //   })
  // })
  // router.get('/subcate/one/:id',async function(req,res){
  //   const model = await Cate.findById(req.params.id)
  //   res.send({
  //     model:model,
  //     status:200
  //   })
  // })
  // router.delete('/subcate/:id',async function(req,res){
  //     const model = await Cate.findByIdAndDelete(req.params.id);
  //     res.send({
  //       model:model,
  //       status:201,
  //     })

  // })
    app.use('/admin/api',router)
}
