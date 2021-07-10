<template>
    <div>
        <el-card>
            <h1>{{ id ? '编辑':'新建'}}用户</h1>
             <el-form label-width="120px" @submit.native.prevent="save">
                <el-form-item label="用户名:">
                    <el-input v-model="model.name"></el-input>
                </el-form-item>
                 <el-form-item label="密码:">
                    <el-input v-model="model.pwd" type="password"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button native-type="submit" type="primary" class="btn">保存</el-button>
                </el-form-item>
           </el-form>
        </el-card>
    </div>
</template>
<script>
export default {
    props:{
        id:{}
    },
    data(){
        return{
            model:{
                name:"",
                pwd:"",
            }

        }
    },
    created(){
        this.getUserDetail();
    },
    methods:{
        async save(){
            if(this.id){
                const res = await this.$http.put(`/user/${this.id}`,this.model);
                if(res.data.status === 200){
                    this.$message({
                        type:'success',
                        message:'编辑成功',
                    })
                    this.$router.push('/users/list');
                }else{
                    this.$message.error('编辑失败');
                }

            }else{
                const res =  await this.$http.post('/user',this.model);
                if(res.data.status === 200){
                    this.$message({
                        type:'success',
                        message:'保存成功'
                    })
                    this.$router.push('/users/list')
                }else{
                    this.$message.error('保存失败')
                }
            }
        },
        async getUserDetail(){
           const res =  await this.$http.get(`/user/${this.id}`)
           if(res.data.status === 200){
               this.model = res.data.model;
           }else{
               this.$message.error('获取用户详情失败')
           }  
        }
    }
}
</script>

