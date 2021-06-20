<template>
    <div>
        <el-card>
            <h1>父级分类</h1>
           <el-table
            :data="tableData"
            stripe           
            style="width: 100%">
            <el-table-column label ="#"  type="index">
            </el-table-column>
            <el-table-column  prop="name" label="名称"  width="180">
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
      color: red;
  }
</style>
<script>
export default {
    data(){
        return{
            tableData:[]
        }
    },
    methods:{
        async getList(){
           const res = await this.$http.get('/fcate/list')
           //console.log(res);
           this.tableData = res.data.model;
        //    console.log(this.tableData)
        },
        async handleDelete(index,row){
           // console.log(index)
        //    console.log(row)
           const res = await  this.$http.delete(`/fcate/${row._id}`)
        //    console.log(res);
           if(res.data.status === 201){
               this.$message({
                   message: '删除成功',
                   type: 'success'
               })

           };
           this.getList();
        },
        async handleEdit(index,row){
           // console.log(row)
            this.$router.push(`/fcate/edit/${row._id}`)
        }

    },
    created(){
       this.getList();
    }
}
</script>

