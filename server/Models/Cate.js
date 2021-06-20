var  mongoose = require('mongoose');
////每个 schema 都会映射到一个 MongoDB collection
var schema = mongoose.Schema({
    name: {type:String},
    //ObjectIds
    //要指定类型为 ObjectId，在声明中使用 Schema.Types.ObjectId。
    parent:{type:mongoose.SchemaTypes.ObjectId,ref:"Fcate"}
  });

module.exports= mongoose.model('Cate', schema);