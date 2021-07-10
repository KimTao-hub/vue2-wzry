<template>
    <div class="box">
        <el-card class="login-card" >
            <h3>用户登录</h3>
            <el-form :model="model" status-icon ref="loginForm" label-width="60px"  @submit.native.prevent="save">
                <el-form-item label="用户名" prop="name">
                    <el-input type="text" v-model="model.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pwd">
                    <el-input type="password" v-model="model.pwd" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item >
                    <el-button type="primary" native-type="submit">登录</el-button>
                    <el-button  @click="resetForm('loginForm')" >重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<style scoped>
   .box{
       background-color:slategrey;
       height: 100vh;
       position: relative;
   }
   .login-card{
       width: 500px;
       height: 300px;
       position:absolute;
       top:150px;
       left:50%;
       transform: translate(-250px);
       /* padding-top: 50px; */
   }
</style>

<script>
export default {
    data(){
         return{
              model:{
                name:"",
                pwd:"",
            }
         }
    },
    methods:{
        resetForm(formName) {
        //    console.log(formName);
           this.$refs[formName].resetFields();
       },
       async save(){
            //console.log(this.model);
            let res =  await  this.$http.post('/login',this.model);
            console.log(res);
            if(res.data.status === 200){
               sessionStorage.token = res.data.token;
               sessionStorage.name = res.data.name;
               this.$router.push('/');
            }

        }
           
    }
}
</script>

