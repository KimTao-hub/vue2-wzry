const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name:{type:String},
    cate:{type:mongoose.SchemaTypes.ObjectId,ref:"Cate"},
    icon:{type:String},
})

module.exports = mongoose.model('Item',schema)