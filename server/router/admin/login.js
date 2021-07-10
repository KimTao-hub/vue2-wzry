module.exports= app=>{
 const express = require('express');
 const router = express.Router();
 const User =  require('../../Models/User.js')
 const assert = require('http-assert');
 const bcrypt = require('bcryptjs');

 const jwt = require('jsonwebtoken');
 const secretKey = 'asdfgh';
//用户登录console.log)
router.post('/login',async(req,res)=>{
    // console.log(req)
    const {name,pwd} = req.body
    //console.log(name,pwd);

    //1查找用户名
    const user = await User.findOne({name:name}).select('+pwd');
    console.log(user)
    assert(user,422,'用户不存在');

    //2校验密码
    const pd =  bcrypt.compareSync(pwd, user.pwd); 
    assert(pd,422,'密码错误');

    //3.生成token
    const  token = jwt.sign({id: user._id}, secretKey);
    res.send({
       status:200,
       name:user.name,
       token:token,
    })

  //   //1.查找用户名
  //   const user = await User.findOne({username:username}).select('+pwd')
  //   assert(user,422,'用户不存在')
  // //   if(!user){
  // //      return res.status(422).send({
  // //         message:'用户不存在'
  // //      })
  // //   }
  //   //2.校验密码
  //  const pd =  bcrypt.compareSync( password,user.password)
  //  assert(pd,422,'密码错误')
  // //  if(!pd){
  // //     return res.status(422).send({
  // //        message:'密码错误'
  // //     })
  // //  }
  //   //3.生成token值
  //  const token =  jwt.sign({id:user._id },secretKey)
  //  res.send({
  //     token:token,
  //     username:user.username
  //  })
})
app.use('/admin/api',router)
}