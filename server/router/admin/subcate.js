module.exports = (app,authMiddleware)=>{
    const express = require('express');
    const router = express.Router();
    const Cate = require('../../Models/Cate.js');

     //使用auth验证中间件
    // const authMiddleware = require('../../middleware/auth.js');
    //########子分类路由
   router.post('/subcate',authMiddleware(),async function (req, res) {
    // console.log(req)
    const model =  await Cate.create(req.body)
    res.send({
      model:model,
      status:200,
    })
  })
  router.get('/subcate/list',authMiddleware(),async function(req,res){
    // 关联查询populate
    const model = await Cate.find().populate('parent');
    res.send({
      model:model,
      status:200
    })
  })
  router.put('/subcate/:id',authMiddleware(),async function(req,res){
    // console.log(req)
    await Cate.findByIdAndUpdate(req.params.id,req.body)
    // console.log(model)
    res.send({
       status:200,
    })
  })
  router.get('/subcate/one/:id',authMiddleware(),async function(req,res){
    const model = await Cate.findById(req.params.id)
    res.send({
      model:model,
      status:200
    })
  })
  router.delete('/subcate/:id', authMiddleware(),async function(req,res){
      const model = await Cate.findByIdAndDelete(req.params.id);
      res.send({
        model:model,
        status:201,
      })
  })

    app.use('/admin/api',router);
}