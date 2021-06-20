<template>
    <el-card>
        <h1>装备列表</h1>
         <el-table
            :data="tableData"
            stripe           
            style="width: 100%">
            <el-table-column label ="#"  type="index">
            </el-table-column>
            <el-table-column  prop="name" label="名称"  width="180">
            </el-table-column> 
             <el-table-column  prop="cate.name" label="分类"  width="180">
            </el-table-column> 
             <el-table-column  prop="icon" label="图片"  width="280">
                 <template slot-scope="scope">
                        <img :src="scope.row.icon" style="height:3rem;border-radius:5px">
                </template>
            </el-table-column> 
            <el-table-column label="操作">
                 <template slot-scope="scope">
                    <el-button  type="text" @click="handleEdit( scope.row)">编辑</el-button>
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
        this.getItemList();
    },
    methods:{
        async getItemList(){
            const res = await  this.$http.get('/item/list')
            if(res.data.status ===200){
                this.tableData = res.data.model;
            }else{
                this.$message.error('获取列表失败！');
            }
            //console.log(res);
        },
        async handleDelete(row){
            //console.log(row)
            const res =  await  this.$http.delete(`/item/${row._id}`)
            console.log(res);
            if(res.data.status === 201){
                this.$message({
                    type:'success',
                    message:"删除成功"
                })
                this.getItemList();
            }else{
                this.$message.error('删除失败');
            }
        },
        handleEdit(row){
            this.$router.push(`/goods/edit/${row._id}`)
        }

    }
    
}
</script>

