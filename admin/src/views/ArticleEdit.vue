<template>
    <el-card>
        <h1>{{id ? "编辑" :"新建"}}文章</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="标题">
                <el-input v-model="model.title"></el-input>
            </el-form-item>
            <el-form-item label="分类">
               <el-select v-model="model.cates"  placeholder="请选择分类" multiple>
                   <el-option 
                        v-for="item in cates" 
                        :label ="item.name" 
                        :value="item._id" 
                        :key="item._id"
                    >
                    </el-option>
               </el-select>
            </el-form-item>
            <el-form-item label="内容">
                  <quill-editor class="editor"
                       v-model="model.essay" 
                        ref="myQuillEditor"
                        :options="editorOption"
                        @blur="onEditorBlur($event)"
                        @focus="onEditorFocus($event)"
                        @ready="onEditorReady($event)"
                   >
                  </quill-editor>
            </el-form-item>
            <el-form-item >
                <el-button class="btn" native-type="submit" type="primary">保存</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>
<style scoped>
.editor{
    height: 500px;
}
.btn{
    margin: 100px;
}
</style>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
 
import { quillEditor } from 'vue-quill-editor'

export default {
    components: {
        quillEditor
    },
    props:{
        id:{}
    },
    data(){
        return{
            model:{
                title:'',
                cates:[],
                essay:"",
            },
            cates:[],

        }
    },
    created(){
       this.getCateList();
       if(this.id){
           this.getDetail();
       }    
    },
    methods:{
      //获取分类
      async getCateList(){
        const res = await  this.$http.get('/subcate/list')
        if(res.data.status === 200){
            let arr =[];
            res.data.model.forEach(item => {
                if(item.parent.name==="news"){
                    arr.push(item)
                }
            });
            this.cates = arr;
            //console.log(arr);
        }else{
            this.$message.error('获取分类失败')
        }

      },
      async save(){
        if(this.id){
            const res = await this.$http.put(`/article/${this.id}`,this.model);
            if(res.data.status ===200){
                this.$message({
                    type:'success',
                    message:"编辑成功"
                })
                this.$router.push('/articles/list');
            }else{
                this.$message.error('编辑失败');
            }
        }else{
             const res = await  this.$http.post('/article',this.model);
             if(res.data.status ===200){
                    this.$router.push('/articles/list')
             }else{
                    this.$message.error('保存失败')
            }
        }
      },
      //获取详情
      async getDetail(){
         const res = await  this.$http.get(`/article/one/${this.id}`)
         if(res.data.status === 200){
              this.model = res.data.model;
         }else{
             this.$message.error('获取详情失败')
         }
      }
    }
}
</script>

