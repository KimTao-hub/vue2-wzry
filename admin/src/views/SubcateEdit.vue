<template>
    <div>
        <el-card class="box-card">
           <h1>{{id ? "编辑":"新建"}}分类</h1>
           <el-form label-width="120px">
                <el-form-item label="父级分类:">
                    <el-select v-model="model.parent" placeholder="请选择父级分类">
                        <el-option v-for="(item,index) in parents" 
                                :label ="item.name" 
                                :value="item._id" 
                                :key="index">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="分类名称:">
                    <el-input v-model="model.name"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit">保存</el-button>
                </el-form-item>
           </el-form>
            
        </el-card>
    </div>
</template>
<style scoped>
  
</style>
<script>
export default {
    props:{
        id:{},
    },
    data() {
      return {
           model:{
               name:"",
               parent:"",
           },
           parents:[],
       }
    },
    methods:{
        async onSubmit(){
            //console.log(this.model)
            if(!this.id){
                const res =  await this.$http.post('/subcate',this.model) 
                //console.log(res)
                if(res.data.status === 200){
                    this.$message({
                        message:"新增成功",
                        type:'success',
                    })
                    this.$router.push('/subcate/list');
                }
            }else{
               const res =  await this.$http.put(`/subcate/${this.id}`,this.model)
               console.log(res)
               if(res.data.status === 200){
                   this.$message({
                       message:"编辑成功",
                       type:'success',
                   });
                   this.$router.push('/subcate/list');

               }
            }
           
        },
        async getFcateList(){
           const res =  await this.$http.get('/fcate/list');
           //console.log(res);
           this.parents = res.data.model;
           //console.log(this.parents);
        //    console.log(this.id)
        },
        //获得编辑得详情
        async getSubcateDetail(){
            const res = await  this.$http.get(`/subcate/one/${this.id}`);
           // console.log(res)
            this.model = res.data.model;
        }

    },
    created(){
         this.getFcateList();
         if(this.id){
             this.getSubcateDetail();
         }else{
             this.model.name ="";
             this.model.parent ="";
         }
    }
}
</script>


