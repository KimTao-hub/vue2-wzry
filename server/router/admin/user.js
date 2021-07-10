
module.exports =(app,authMiddleware)=>{
     const express = require('express');
     const router = express.Router();
     const User = require('../../Models/User.js')

      //使用auth验证中间件
    //const authMiddleware = require('../../middleware/auth.js');

     router.post('/user',authMiddleware(),async function(req,res){
        const model = await  User.create(req.body);
        res.send({
           model:model,
           status:200
        })
     })
     router.get('/user/list',authMiddleware(),async function(req,res){
        const model = await User.find();
        res.send({
           model:model,
           status:200
        })
     })
     router.delete('/user/:id',authMiddleware(),async function(req,res){
        const model = await User.findByIdAndRemove(req.params.id);
        res.send({
           model:model,
           status:201,
        })
     })
     router.get('/user/:id',authMiddleware(),async function(req,res){
        const model = await User.findById(req.params.id);
        res.send({
           model:model,
           status:200
        })
     })
     router.put('/user/:id',authMiddleware(),async function (req,res){
        await User.findByIdAndUpdate(req.params.id,req.body);
        res.send({
           status:200,
        })
     })
     app.use('/admin/api',router);
}