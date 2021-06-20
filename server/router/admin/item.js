module.exports = app=>{
    const express = require('express');
    const router = express.Router();

    const Item = require('../../Models/Item.js');
    //上传
    router.post('/item',async (req,res)=>{
      const model =await Item.create(req.body);
      console.log(model)
      res.send({
          model:model,
          status:200,
      })
    })
    //获取列表
    router.get('/item/list',async(req,res)=>{
        const model = await Item.find().populate('cate');
        res.send({
            model:model,
            status:200,
        })
    })
    //根据id删除
    router.delete('/item/:id',async(req,res)=>{
        //console.log(req);
        const model = await Item.findByIdAndRemove(req.params.id);
        res.send({
            model:model,
            status:201,
        })
    })
    //获取一条数据的详情
    router.get('/item/:id',async (req,res)=>{
        const model = await Item.findById(req.params.id)
        res.send({
            model:model,
            status:200
        })
    })
    //更新
    router.put('/item/:id',async (req,res)=>{
       await Item.findByIdAndUpdate(req.params.id,req.body);
       res.send({
           status:200
       });

    })

    app.use('/admin/api',router);
}