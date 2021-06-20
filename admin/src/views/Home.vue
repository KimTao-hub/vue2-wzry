<template>
  <div class="home">
    <el-container style="height: 100vh; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu 
          :default-openeds="['1','3']" 
          active-text-color="#ffd04b"
          router>
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>内容管理</template>
            <el-menu-item-group>
              <template slot="title">父分类</template>
              <el-menu-item index="/fcate/edit">新增父分类</el-menu-item>
              <el-menu-item index="/fcate/list">父分类列表</el-menu-item>
            </el-menu-item-group>

             <el-menu-item-group>
              <template slot="title">子分类</template>
              <el-menu-item index="/subcate/edit">新增子分类</el-menu-item>
              <el-menu-item index="/subcate/list">子分类列表</el-menu-item>
            </el-menu-item-group>

            <el-menu-item-group>
              <template slot="title">物品</template>
              <el-menu-item index="/goods/edit">新增装备</el-menu-item>
               <el-menu-item index="/goods/list">装备列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">英雄</template>
              <el-menu-item index="/heros/edit">新增英雄</el-menu-item>
               <el-menu-item index="/heros/list">英雄列表</el-menu-item>
            </el-menu-item-group>
             <el-menu-item-group>
              <template slot="title">文章</template>
              <el-menu-item index="/articles/edit">新增文章</el-menu-item>
               <el-menu-item index="/articles/list">文章列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>用户管理</template>
            <el-menu-item-group>
              <template slot="title">用户</template>
              <el-menu-item index="/users/edit">新增用户</el-menu-item>
              <el-menu-item index="/users/list">用户列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>运营管理</template>
            <el-menu-item-group>
              <template slot="title">广告位</template>
              <el-menu-item index="/ads/edit">新建广告位</el-menu-item>
              <el-menu-item index="/edits/list">广告位列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>修改密码</el-dropdown-item>
              </el-dropdown-menu>
          </el-dropdown>
          <span>王小虎</span>
        </el-header>

        <el-main>
            <!-- 子页面显示区 -->
            <!-- 因为编辑页和新建页面共用一个页面，绑定key区分不同的页面 -->
          <router-view :key="$router.path"/>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>
<style scoped>
     .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
     }
  .el-aside {
      color: #333;
  }
</style>

<script>
  export default {
    data() {
      return {
        
      }
    }
  };
</script>
