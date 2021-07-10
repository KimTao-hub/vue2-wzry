<template>
    <el-card>
        <h1>用户列表</h1>
         <el-table
            :data="tableData"
            stripe           
            style="width: 100%">
            <el-table-column label ="#"  type="index">
            </el-table-column>
            <el-table-column  prop="_id" label="ID"  width="180">
            </el-table-column> 
            <el-table-column  prop="name" label="姓名"  width="180">
            </el-table-column> 
            <el-table-column label="操作">
                 <template slot-scope="scope">
                    <el-button  type="text" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button class="btn" type="text" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>
<style scoped>
  .btn{
      color:red;
  }
</style>

<script>
export default {
    data(){
        return{
            tableData:[],
        }
    },
    created(){
        this.getUserList();
    },
    methods:{
        async getUserList(){
            const res = await  this.$http.get('/user/list')
            if(res.data.status ===200){
                this.tableData = res.data.model;
            }else{
                this.$message.error('获取列表失败！');
            }
            //console.log(res);
        },
        async handleDelete(row){
            //console.log(row)
            const res =  await  this.$http.delete(`/user/${row._id}`)
            console.log(res);
            if(res.data.status === 201){
                this.$message({
                    type:'success',
                    message:"删除成功"
                })
                this.getUserList();
            }else{
                this.$message.error('删除失败');
            }
        },
        handleEdit(row){
            this.$router.push(`/users/edit/${row._id}`)
        }

    }
    
}
</script>

