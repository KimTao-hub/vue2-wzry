const mongoose = require('mongoose')

//创建schema
const schema = mongoose.Schema({
     name:{
         type:String
     }
})
module.exports = mongoose.model('Fcate',schema);