<template>
    <div>
        <el-card>
            <h1>广告位列表</h1>
            <el-table
              :data="tableData"
              stripe           
              style="width: 100%"
            >
            <el-table-column label ="#"  type="index">
            </el-table-column>
            <el-table-column  prop="title" label="标题"  width="180">
            </el-table-column> 
            <el-table-column prop="items[0].url"  label="跳转链接">
            </el-table-column>
             <el-table-column  prop="items[0].image" label="图片"  width="280">
                 <template slot-scope="scope">
                    <img :src="scope.row.items[0].image" style="height:3rem;border-radius:5px">
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
    </div>
</template>
<script>
export default {
    data(){
        return {
            tableData:[],
        }
    },
    created(){
        this.getList();
    },
    methods:{
        async getList(){
            let res = await this.$http.get('/ad/list');
            console.log(res.data.model);
            if(res.data.status === 200){
               this.tableData = res.data.model;
            }else{
                this.$message.error('获取列表失败');
            }
            
        },
        handleEdit(row){
            //console.log(row);
            this.$router.push(`/ads/edit/${row._id}`);
        },
        async handleDelete(row){
           const res = await this.$http.delete(`/ad/${row._id}`);
           if(res.data.status === 201){
               this.$message({
                   type:'success',
                   message:"删除成功",
               })
               this.getList();
           }else{
               this.$message.error('删除失败');
           }
        }
    }
}
</script>
