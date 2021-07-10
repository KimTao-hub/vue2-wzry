var  mongoose = require('mongoose');
////每个 schema 都会映射到一个 MongoDB collection
var schema = mongoose.Schema({
    title: {type:String},
    cates:[{type:mongoose.SchemaTypes.ObjectId,ref:"Cate"}],
    //ObjectIds
    //要指定类型为 ObjectId，在声明中使用 Schema.Types.ObjectId。
    essay:{type:String},
  });

module.exports= mongoose.model('Article', schema);