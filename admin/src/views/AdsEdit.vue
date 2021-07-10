<template>
    <div>
        <el-card>
            <h1>{{this.id ? "编辑":"新建"}}广告位</h1>
            <el-form label-width="120px"  @submit.native.prevent="save">
                <el-form-item label="标题">
                    <el-input v-model="model.title"></el-input>
                </el-form-item>
                
                <el-form-item label="广告">
                     <el-button size="small"  @click="model.items.push({})">
                        <i class="el-icon-plus"></i>添加广告
                    </el-button>
                    <el-row :gutter="20" type="flex" style="flex-wrap:wrap">
                        <!-- 循环model.items得到多个广告框组合 -->
                         <el-col :md="24" v-for="(item,i) in model.items" :key="i" class="ads-form">
                            <el-form-item label="跳转链接(URL)">
                                    <el-input type="text" v-model="item.url"></el-input>
                            </el-form-item>
                            <el-form-item label="图片" class="image">
                                <el-upload
                                    class="avatar-uploader"
                                    :action="$http.defaults.baseURL+'/uploads'"
                                    :show-file-list="false"
                                    :on-success="res=>$set(item,'image',res.url)"
                                >
                                    <img v-if="item.image" :src="item.image" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                           </el-form-item>
                            <el-form-item  >
                                <el-button type='danger' size ='mini' @click="model.items.splice(i,1)">删除</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item>
                    <el-button native-type="submit" type="primary" class="btn">保存</el-button>
                 </el-form-item>
            </el-form>
        </el-card>
    </div>
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
    /* 宽度不写死 */
    min-width: 5rem; 
    height: 5rem;
    line-height: 5rem;
    text-align: center;
  }
  .avatar {
    min-width: 5rem;
    height: 5rem;
    display: block;
  }
  .el-select{
      width: 100%;
  }
  .ads-form{
      margin-top: 1rem;
      border-bottom: 1px solid #ccc;
  }
  .image{
      margin-top: 1rem;

  }
  .btn{
      margin-top: 20px;
  }
</style>

<script>
export default {
    props:{
        id:{}
    },
    data(){
        return {
            model:{
                 items:[], //存放url和图片
                 title:'',
            }

        }
    },
    created(){
        if(this.id){
           this.getAdDetail();
        }
    },
    methods:{
        async save(){
            if(this.id){
                let res = await this.$http.put(`/ad/${this.id}`,this.model);
                if(res.data.status === 200){
                    this.$message({
                        type:'success',
                        message:'编辑成功'
                    })
                        this.$router.push('/ads/list');
                    }else{
                        this.$message.error('编辑失败');
                    }   

            }else{
                let res =  await this.$http.post('/ad',this.model)
                if(res.data.status ===200){
                    this.$message({
                    type:'success',
                    message:'保存成功'
                })
                    this.$router.push('/ads/list');
                }else{
                    this.$message.error('保存失败');
                }    
            }
        },
        async getAdDetail(){
          let res = await this.$http.get(`/ad/${this.id}`);
          if(res.data.status === 200){
              this.model = res.data.model;
          }else{
              this.$message.error('获取详情失败');
          }
        }
    }
}
</script>

