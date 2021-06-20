module.exports = app=>{
    const express = require('express');
    const router = express.Router();
    
    const Hero = require('../../Models/Hero.js');
   
    router.post('/hero',async(req,res)=>{
       const model =  await Hero.create(req.body)
       res.send({
           model:model,
           status:200
       })
    })
    router.get('/hero/list',async(req,res)=>{
        const model = await Hero.find();
        res.send({
            model:model,
            status:200
        })
    })
    router.get('/hero/:id',async (req,res)=>{
       const model = await Hero.findById(req.params.id);
       res.send({
           model:model,
           status:200
       })
    })  
    router.put('/hero/:id',async (req,res)=>{
        const model = await Hero.findByIdAndUpdate(req.params.id,req.body);
        res.send({
            model:model,
            status:200,
        })
    })  
    router.delete('/hero/:id',async (req,res)=>{
        const model = await Hero.findByIdAndRemove(req.params.id);
        res.send({
            model:model,
            status:201
        })
    })
    app.use('/admin/api',router)
}