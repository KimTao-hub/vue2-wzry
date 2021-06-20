<template>
    <div>
      <el-card>
        <h1>子分类列表</h1>
        <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column label ="#"  type="index">
            </el-table-column>
            <el-table-column prop="parent.name"  label="父级分类" width="180">
            </el-table-column>
            <el-table-column  prop="name" label="子分类名称">
            </el-table-column>
            <el-table-column label="操作">
                 <template slot-scope="scope">
                    <el-button  type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button class="btn" type="text" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
      </el-card>
    </div>
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
    methods:{
      async getCateList(){
            const res =  await this.$http.get('/subcate/list')
            //console.log(res)
            if(res.data.status === 200){
                this.tableData = res.data.model;
            }
           // console.log(this.tableData)
      },
      handleEdit(index,row){
          //console.log(row._id)
          this.$router.push(`/subcate/edit/${row._id}`)
      },
      async handleDelete(index,row){
           const res =  await  this.$http.delete(`/subcate/${row._id}`);
           if(res.data.status === 201){
               this.$message({
                   message:"删除成功",
                   type:'success'
               })
               this.getCateList();
            }
      }
    },
    created(){
        this.getCateList();
    }
}
</script>

