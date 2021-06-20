module.exports = app =>{
    const mongoose = require('mongoose')
    mongoose.connect('mongodb://127.0.0.1:27017/vue_wzry',{
            useUnifiedTopology:true,
            useNewUrlParser: true,
            useFindAndModify: false,
    })
        // // 把模型全部引用一边，因为有的模型相互关联
        // require('require-all')(__dirname+'/../Models')
}