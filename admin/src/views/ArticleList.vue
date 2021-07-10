<template>
    <el-card>
       <h1>文章列表</h1>
       <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column label ="#"  type="index">
            </el-table-column>
            <el-table-column  prop="_id" label="ID" width="240">
            </el-table-column>
            <el-table-column prop="title"  label="标题" >
            </el-table-column>
           
            <el-table-column label="操作" width="180">
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
      color: red;
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
       this.getList();    
    },
    methods:{
      async getList(){
          const res = await this.$http.get('/article/list')
          console.log(res);
          if(res.data.status === 200){
              this.tableData = res.data.model;
              console.log(this.tableData);
          }else{
              this.$message.error('获取列表失败')
          }
      },
      async handleDelete(row){
          const res =   await this.$http.delete(`/article/${row._id}`)
          if(res.data.status === 201){
              this.$message({
                  type:'success',
                  message:"删除成功"
              })
              this.getList();
          }else{
              this.$message.error('删除失败');
          }
      },
      handleEdit(row){
          this.$router.push(`/articles/edit/${row._id}`)
      }
    }
}
</script>
