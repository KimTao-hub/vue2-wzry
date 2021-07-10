module.exports =(app,authMiddleware)=>{
    const express = require('express');
    const router = express.Router();
    
    const Article = require('../../Models/Article.js')
    
    //  //使用auth验证中间件
    //  const authMiddleware = require('../../middleware/auth.js');

    router.get('/article/list',authMiddleware(),async(req,res)=>{
        const model = await  Article.find();
        // console.log(model);
        res.send({
            model:model,
            status:200,
        })
    })
    router.delete('/article/:id',authMiddleware(),async (req,res)=>{
        const model =await  Article.findByIdAndRemove(req.params.id)
        res.send({
            model:model,
            status:201,
        })
    })
    router.post('/article',authMiddleware(),async(req,res)=>{
        const model =await  Article.create(req.body);
        res.send({
            model:model,
            status:200,
        })
    })
    router.put('/article/:id',authMiddleware() ,async (req,res)=>{
        const model =await Article.findByIdAndUpdate(req.params.id,req.body);
        res.send({
            model:model,
            status:200,
        })
    })
    router.get('/article/one/:id',authMiddleware(),async(req,res)=>{
       const model =await  Article.findById(req.params.id);
       res.send({
           model:model,
           status:200,
       })
    })
    app.use('/admin/api',router);
}