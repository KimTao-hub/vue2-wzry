module.exports = (app,authMiddleware)=>{
    const express = require('express');
    const router = express.Router();
    
    const Hero = require('../../Models/Hero.js');

     //使用auth验证中间件
     //const authMiddleware = require('../../middleware/auth.js');
   
    router.post('/hero',authMiddleware(),async(req,res)=>{
       const model =  await Hero.create(req.body)
       res.send({
           model:model,
           status:200
       })
    })
    router.get('/hero/list',authMiddleware(),async(req,res)=>{
        const model = await Hero.find();
        res.send({
            model:model,
            status:200
        })
    })
    router.get('/hero/:id',authMiddleware(),async (req,res)=>{
       const model = await Hero.findById(req.params.id);
       res.send({
           model:model,
           status:200
       })
    })  
    router.put('/hero/:id',authMiddleware(),async (req,res)=>{
        const model = await Hero.findByIdAndUpdate(req.params.id,req.body);
        res.send({
            model:model,
            status:200,
        })
    })  
    router.delete('/hero/:id',authMiddleware(),async (req,res)=>{
        const model = await Hero.findByIdAndRemove(req.params.id);
        res.send({
            model:model,
            status:201
        })
    })
    app.use('/admin/api',router)
}