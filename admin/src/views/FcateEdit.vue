<template>
    <div>
        <el-card class="box-card">
           <h1>{{ id? "编辑":"增加"}}父分类</h1>
           <el-form label-width="120px">
                <el-form-item label="分类名称:">
                    <el-input v-model="model.name"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit">创建</el-button>
                </el-form-item>
           </el-form>
            
        </el-card>
    </div>
</template>
<style scoped>
  
</style>
<script>
export default {
    //接受路由传参
    props:{
        id:{},
    },
    data() {
      return {
           model:{
               name:"",
           }
       }
    },
    methods:{
        async onSubmit(){
            //console.log(this.model)
            if(!this.id){
                const res =  await this.$http.post('/fcate',this.model) 
               // console.log(res)
                if(res.data){
                    this.$message({
                        message: '创建成功',
                        type: 'success'
                    });
                    this.$router.push('/fcate/list')
                }
            }else{
                //console.log(this.id)
                const res =   await this.$http.put(`/fcate/${this.id}`,this.model)
                //console.log(res);
                if(res.data.status === 200){
                    this.$message({
                        message: '编辑成功',
                        type: 'success'
                    });
                    this.$router.push('/fcate/list')
                }


            }
            
        }

    }
}
</script>


