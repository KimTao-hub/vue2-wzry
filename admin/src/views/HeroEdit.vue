<template>
    <el-card>
        <h1>{{id?"编辑":"新建"}}英雄</h1>
         
        <el-form label-width="120px" @submit.native.prevent="save">
                   <el-tabs v-model="activeName"  type="border-card">
                        <el-tab-pane label="基本信息" name="basic">
                            <el-form-item label="名称">
                                <el-input v-model="model.name"></el-input>
                            </el-form-item>
                            <el-form-item label="称号">
                                <el-input v-model="model.title"></el-input>
                            </el-form-item>
                            <el-form-item label="类型">
                                <el-select v-model="model.cates" placeholder="请选择" multiple>
                                    <el-option
                                    v-for="item in cateList"
                                    :key="item._id"
                                    :label="item.name"
                                    :value="item._id"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item label="头像">
                                <el-upload
                                    class="avatar-uploader"
                                    :action="$http.defaults.baseURL+'/uploads'"
                                    :show-file-list="false"
                                    :on-success="handleSuccess"
                                >
                                    <img v-if="model.avater" :src="model.avater" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-form-item>

                            <el-form-item label="顺风出装">
                                <el-select v-model="model.items1" placeholder="请选择" multiple>
                                        <el-option 
                                            v-for="item in itemList"
                                            :key="item._id"
                                            :label="item.name"
                                            :value="item._id"
                                        >
                                        </el-option>
                                    </el-select>
                            </el-form-item>

                            <el-form-item label="逆风出装">
                                <el-select v-model="model.items2" placeholder="请输入" multiple>
                                    <el-option
                                    v-for="item in itemList"
                                    :key="item._id"
                                    :label="item.name"
                                    :value="item._id"
                                    >
                                    </el-option>
                                </el-select>     
                            </el-form-item>

                            <el-form-item label="使用技巧">
                                <el-input type="textare" v-model="model.usageTips"></el-input>
                            </el-form-item>
                            <el-form-item label="对抗技巧">
                                <el-input type="textarea" v-model="model.battleTips"></el-input>
                            </el-form-item>
                            <el-form-item label="团战技巧">
                                <el-input type="textarea" v-model="model.teamworkTips"></el-input>
                            </el-form-item>

                            <el-form-item label="难度">
                                <el-rate  v-model="model.score.diffcult" show-score :max="10"></el-rate>
                            </el-form-item>
                            <el-form-item label="技能">
                                <el-rate v-model="model.score.skill"  show-score :max="10"></el-rate>
                            </el-form-item>
                            <el-form-item label="攻击力">
                                <el-rate v-model="model.score.attack"  show-score :max="10"></el-rate>
                            </el-form-item>
                            <el-form-item label="生命力">
                                <el-rate v-model="model.score.survive"  show-score :max="10"></el-rate>
                            </el-form-item>
                       </el-tab-pane>

                        <!-- 技能管理tab-->
                        <el-tab-pane label="技能管理" name="skills">
                            <el-button size="small" @click="model.skills.push({})">
                                <i class="el-icon-plus"></i>添加技能
                            </el-button>
                            <el-row :gutter="20" type="flex" style="flex-wrap:wrap">
                                <!-- 循环model.skills得到多个技能框组合 -->
                                <el-col :md="12" v-for="(skill,i) in model.skills" :key="i" class="skillForm">
                                        <el-form-item label="技能名称">
                                            <el-input v-model="skill.name"></el-input>
                                        </el-form-item>

                                        <el-form-item label="图标">
                                            <el-upload
                                                class="avatar-uploader"
                                                :action="$http.defaults.baseURL+'/uploads'"
                                                :show-file-list="false"
                                                :on-success="res=>$set(skill,'icon',res.url)"
                                            >
                                                <img v-if="skill.icon" :src="skill.icon" class="avatar">
                                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                            </el-upload>
                                        </el-form-item>
            
                                        <el-form-item label="描述">
                                            <el-input type="textarea" v-model="skill.description"></el-input>
                                        </el-form-item>

                                        <el-form-item label="提示">
                                            <el-input type="textarea" v-model="skill.tips"></el-input>
                                        </el-form-item>
                                        <el-form-item  >
                                            <el-button type='danger' size ='mini' @click="model.skills.splice(i,1)">删除</el-button>
                                        </el-form-item>
                                </el-col>
                            </el-row>
                        </el-tab-pane>
                     </el-tabs>

                    <el-form-item>
                        <el-button native-type="submit" type="primary" class="btn">保存</el-button>
                    </el-form-item>
        </el-form>
    </el-card>
</template>
<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 5rem;
    height: 5rem;
    line-height: 5rem;
    text-align: center;
  }
  .avatar {
    width: 5rem;
    height: 5rem;
    display: block;
  }
  .el-select{
      width: 100%;
  }
  .skillForm{
      border-bottom: 1px solid #ccc;
  }
  .btn{
      margin-top: 20px;
  }
</style>
<script>
export default {
    props:{
         id:{}
    },
    data(){
        return{
            model:{
                name:"",
                avater:"",
                title:"",
                cates:[],
                score:{
                    diffcult:0,
                    skill:0,//技能
                    attack:0,//攻击
                    survive:0,//生命力
                },
               skills:[],
               items1:[],
               items2:[],
               //英雄使用技巧
                usageTips:"",
                battleTips:"",//对抗技巧
                teamworkTips:"",//团战技巧
            },
            cateList:[],
            itemList:[], //装备列表
            activeName:"skills",
        }
    },
    created(){
      this.getHeroCateList();
      this.getItemList();
      if(this.id){
          this.getHeroDetail();
      }
      
    },
    methods:{
        handleSuccess(res){
           //成功以后把图片地址保存下来
           this.model.avater = res.url;
        },
        //获取英雄的分类
        async getHeroCateList(){
            const res =  await  this.$http.get('/subcate/list')
            //console.log(res)
            if(res.data.status === 200){
                 let arr=[];
                  res.data.model.forEach(item => {
                      if(item.parent.name === 'heros'){
                            arr.push(item);
                      }
                  }) 
                this.cateList = arr;
               // console.log(this.cateList);
            }else{
                this.$message.error('获取英雄列表失败');
            }
        },

        //获取装备列表
        async getItemList(){
            const res =  await this.$http.get('/item/list')
            //console.log(res);
            if(res.data.status ===200){
                this.itemList = res.data.model;
               // console.log(this.itemList)
            }else{
                this.$message.error('获取装备列表失败');
            }
        },
        async save(){
            if(this.id){
                const res =  await this.$http.put(`/hero/${this.id}`,this.model)
                if(res.data.status ===200){
                    this.$message({
                        type:"success",
                        message:"修改成功"
                    })
                    this.$router.push('/heros/list');
                }else{
                    this.$message.error('修改失败')
                }
            }else{
                  //console.log(this.model);
                const res =  await this.$http.post('/hero',this.model);
                 if(res.data.status===200){
                    this.$message({
                        type:"success",
                        message:"保存成功"
                    })
                    this.$router.push('/heros/list');
                }else{
                    this.$message.error('保存失败');
                }
            }
           
        },
        async getHeroDetail(){
            const res = await  this.$http.get(`/hero/${this.id}`)
            if(res.data.status ===200){
                this.model = res.data.model;
            }else{
                this.$message.error('获取英雄详情失败');
            }
        }
    }
}
</script>

