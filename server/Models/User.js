const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name:{type:String},
    pwd:{
        select:false,//表示不显示密码
        type:String,
        //对密码进行加密
        set:function(val){ 
            return require('bcryptjs').hashSync(val,10)
        },
    }
})

module.exports = mongoose.model('User',schema)