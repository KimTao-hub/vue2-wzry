const mongoose = require('mongoose');

const schema =  mongoose.Schema({
    name:{type:String},
    avater:{type:String},
    title:{type:String},
    //英雄所属分类
    cates:[{type:mongoose.SchemaTypes.ObjectId,ref:"Cate"}],
    //分数登记
    score:{
        diffcult:{type:Number},
        skill:{type:Number},//技能
        attack:{type:Number},//攻击
        survive:{type:Number},//生命力
    },
    //技能字段
    skills:[
        {
            icon:{type:String},//技能图标
            name:{type:String},//名称
            description:{type:String},//技能描述
            tips:{type:String},//技能提示
        }
    ],
    //两套装备--逆风出装，顺丰出装
    items1:[{type:mongoose.SchemaTypes.ObjectId,ref:'Item'}],
    items2:[{type:mongoose.SchemaTypes.ObjectId,ref:'Item'}],
  //英雄使用技巧
    usageTips:{type:String},
    battleTips:{type:String},//对抗技巧
    teamworkTips:{type:String},//团战技巧
    //英雄之间关系
    partener:[
        { 
            hero:{type:mongoose.SchemaTypes.ObjectId,ref:"Hero"},
            description:{type:String},
        }
    ]

})

module.exports = mongoose.model('Hero',schema)