<template>
    <el-card>
        <h1>{{id ? "编辑":"新建"}}装备</h1>
         <el-form label-width="120px">
             <el-form-item label="装备名称："> 
                 <el-input v-model="model.name"></el-input>
             </el-form-item>
             <el-form-item label="装备类型："> 
                 <el-select v-model="model.cate">
                     <el-option v-for="(item) in cates" 
                                :label ="item.name" 
                                :value="item._id" 
                                :key="item._id">
                      </el-option>
                 </el-select>
             </el-form-item>
            <el-form-item label="装备图片：">
                <el-upload
                    class="avatar-uploader"
                    :action="$http.defaults.baseURL+'/uploads'"
                    :show-file-list="false"
                    :on-success="handleSuccess"
                  >
                    <img v-if="model.icon" :src="model.icon" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item>
                  <el-button type="primary" @click="onSubmit">保存</el-button>
            </el-form-item>
      </el-form> 
    </el-card>
</template>
<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
<script>
export default {
    props:{
        id:{}
    },
    data(){
        return{
          //装备有名称、分类、图片地址
          model:{
             name:"",
             icon:"",
             cate:"",
          },
          cates:[],
        }
    },
    created(){
        //获得分类
        this.getCateList();
        //console.log(this.id)
        if(this.id){
          this.getItemByID()
        }
    },
    methods:{
        async getCateList(){
            const res =  await this.$http.get('/subcate/list')
            //console.log(res)
            const arr =[];
            if(res.data.status === 200){
                res.data.model.forEach(item => {
                  if(item.parent.name==="items"){
                      arr.push(item)
                  }
                });
               // console.log(arr)
                this.cates = arr;
            }else{
               this.$message.error('获取分类数据失败');
            }
       },
        handleSuccess(res){
          //console.log(res);
          //res:
              // metype: "image/jpeg", destination: "E:\\前端\\vue_wzry\\server/uploads", …}
              // destination: "E:\\前端\\vue_wzry\\server/uploads"
              // encoding: "7bit"
              // fieldname: "file"
              // filename: "99e25cc21a2fd29caea4723c59190da4"
              // mimetype: "image/jpeg"
              // originalname: "190.jpg"
              // path: "E:\\前端\\vue_wzry\\server\\uploads\\99e25cc21a2fd29caea4723c59190da4"
              // size: 20163
              // url: "http://localhost:3000/uploads/99e25cc21a2fd29caea4723c59190da4"
              // __proto__: Object
          this.model.icon = res.url;
        },
       async  onSubmit(){
            if(this.id){
                 //编辑
                const res =  await this.$http.put(`/item/${this.id}`,this.model)
                console.log(res);
                if(res.data.status === 200){
                  this.$message({
                    type:'success',
                    message:'更新成功',
                  })
                  this.$router.push('/goods/list');
                }else{
                  this.$message.error('更新失败');
                }
            }else{
               //console.log(this.model)
                const res = await  this.$http.post('/item',this.model);
                if(res.data.status){
                  this.$router.push('/goods/list');
                }else{
                  this.$message.error('保存失败！')
                }
            }
        },
        async getItemByID(){
            const res =   await  this.$http.get(`/item/${this.id}`)
            this.model = res.data.model;
            if(res.data.status !== 200){
                this.$message.error('获取详情数据失败');
            }
        }
    }
  
}
</script>
