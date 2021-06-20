import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import FcateEdit from '../views/FcateEdit.vue'
import FcateList from '../views/FcateList.vue'

import SubcateEdit from '../views/SubcateEdit.vue'
import SubcateList from '../views/SubcateList.vue'

import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'

import HeroEdit from  '../views/HeroEdit.vue'
import HeroList from '../views/HeroList.vue'


Vue.use(VueRouter)

const routes = [
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

    ]

  },
]

const router = new VueRouter({
  routes
})

export default router
