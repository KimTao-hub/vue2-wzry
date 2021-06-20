<template>
    <el-card>
        <el-table
            :data="tableData"
            stripe
            style="width: 100%"
        >
            <el-table-column type="index" label="#" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
             <el-table-column prop="avater" label="头像" width="180">
                 <template slot-scope="scope">
                        <img :src="scope.row.avater" style="height:3rem;border-radius:5px">
                </template>
            </el-table-column>
             <el-table-column prop="title" label="称号" width="180">
            </el-table-column>
            <el-table-column  label="操作">
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
    color:red
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
        this.getHeroList();
    },
    methods:{
        async getHeroList(){
           const res =   await  this.$http.get('/hero/list');
           console.log(res.data)
           if(res.data.status =200){
               this.tableData = res.data.model;
           }else{
               this.$message.error('获取英雄列表失败');
           }
        },
        handleEdit(row){
            this.$router.push(`/heros/edit/${row._id}`)
        },
        async handleDelete(row){
            const res =  await this.$router.delete(`/hero/${row._id}`)
            if(res.data.status === 200){
                this.$message({
                    type:"success",
                    message:"删除成功"
                })
                this.getHeroList();
            }else{
                this.$message.error('删除失败');
            }

        }
    }
}
</script>

