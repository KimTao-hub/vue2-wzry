module.exports = (app ,authMiddleware)=>{
    const express = require('express');
    const router = express.Router();
    const Ad = require('../../Models/Ad.js');

    // //使用auth验证中间件
    // const authMiddleware = require('../../middleware/auth.js');

    router.post('/ad',authMiddleware(),async function(req,res){
        let model =await  Ad.create(req.body);
        res.send({
            model:model,
            status:200,
        })
    })
    router.get('/ad/list',authMiddleware(),async function(req,res){
        let model = await Ad.find();
        res.send({
            model:model,
            status:200,
        })
    })
    router.get('/ad/:id',authMiddleware(),async function(req,res){
        let model = await Ad.findById(req.params.id);
        res.send({
            model:model,
            status:200,
        })
    })
    router.put('/ad/:id',authMiddleware(),async function(req,res){
        let model = await Ad.findByIdAndUpdate(req.params.id,req.body);
        res.send({
            model:model,
            status:200,
        })
    })
    router.delete('/ad/:id',authMiddleware(),async function (req,res){
         let model = await Ad.findByIdAndRemove(req.params.id);
         res.send({
             model:model,
             status:201,
         })
    })

    app.use('/admin/api',router)
}