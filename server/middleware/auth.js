//创建中间件
module.exports = options =>{
    //options表示可以传递参数，为未来个性化配置打基础，现在不需要

    const User = require('../Models/User');
    const jwt = require('jsonwebtoken');
    const  assert = require('http-assert');
    const secretKey ='asdfgh';

    return async(req,res,next) =>{
        const token = String(req.headers.authorization || "").split(" ").pop();
        assert(token,401,'请用户登录');
        
        //校验用户，解析token
        const {id} = jwt.verify(token,secretKey);
        assert(id,401,'请用户登录');
        req.user = await User.findById(id);
        assert(req.user,401,'请用户登录')
        await next();
    }
    
//     return  async(req,res,next) => {
//             //console.log(req.headers.authorization)
//             const token =String(req.headers.authorization || '').split(' ').pop() 
//             assert(token,401,'请用户登录')
//             //   console.log(token)
//             //校验用户，解析token值
//              const {id}=  jwt.verify(token, secretKey)
//              assert(id,401,'用户请登录')
//              req.user =  await Admin.findById(id) 
//              assert(req.user,401,'用户请登录')
//              await next()
    
    
//    }
}