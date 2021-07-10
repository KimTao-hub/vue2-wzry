var  mongoose = require('mongoose');
////每个 schema 都会映射到一个 MongoDB collection
var schema = mongoose.Schema({
      //广告位，一个广告位可以包含多条广告
      title:{type:String},
      items:[{
         image:{type:String},
         url:{type:String},  //广告的跳转链接
      }]
      
  });

module.exports= mongoose.model('Ad', schema);