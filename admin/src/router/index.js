import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

import FcateEdit from '../views/FcateEdit.vue'
import FcateList from '../views/FcateList.vue'

import SubcateEdit from '../views/SubcateEdit.vue'
import SubcateList from '../views/SubcateList.vue'

import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'

import HeroEdit from  '../views/HeroEdit.vue'
import HeroList from '../views/HeroList.vue'

import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'

import UserList from '../views/UserList.vue'
import UserEdit from '../views/UserEdit.vue'

import AdsEdit from '../views/AdsEdit.vue'
import AdsList from  '../views/AdsList.vue'

Vue.use(VueRouter)

const routes = [
  {path:'/login',component:Login,meta:{ requireAuth: true}}, //设置路由元信息
  {
    path: '/',
    name: 'Home',
    component: Home,
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    children:[
      {path:'/fcate/edit',component:FcateEdit,},
      //props传参实现路由与组件解耦
      {path:'/fcate/edit/:id',component:FcateEdit,props:true},
      {path:'/fcate/list',component:FcateList},

      { path:'/subcate/edit',component: SubcateEdit},
      {path:'/subcate/edit/:id',component:SubcateEdit,props:true},
      { path:'/subcate/list',component:SubcateList},

      {path:'/goods/edit',component:ItemEdit},
      {path:'/goods/edit/:id',component:ItemEdit,props:true},
      {path:'/goods/list',component:ItemList},

      {path:'/heros/edit',component:HeroEdit},
      {path:'/heros/edit/:id',component:HeroEdit,props:true},
      {path:'/heros/list',component:HeroList},

      {path:'/articles/edit',component:ArticleEdit},
      {path:'/articles/edit/:id',component:ArticleEdit,props:true},
      {path:'/articles/list',component:ArticleList},

      {path:'/users/edit',component:UserEdit},
      {path:'/users/edit/:id',component:UserEdit,props:true},
      {path:'/users/list',component:UserList},

      {path:'/ads/edit',component:AdsEdit},
      {path:'/ads/edit/:id',component:AdsEdit,props:true},
      {path:'/ads/list',component:AdsList},

  

    ]

  },
]

const router = new VueRouter({
  routes
})
//添加路由守卫
router.beforeEach((to,from,next) =>{
   //访问路由元信息和token
   //当路由元信息不存在和token不存在时
   if(!to.meta.requireAuth && !sessionStorage.token){
      //跳转到login页面
      return next('/login');
   }
   next();
})


export default router
