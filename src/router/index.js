import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import User from '../views/User'
import Main from '../views/Main'
import Mall from '../views/Mall'
import PageOne from '../views/PageOne'
import PageTwo from '../views/PageTwo'

Vue.use(VueRouter)
// 1.创建路由组件
// 2.将路由与组件进行映射
// 3.创建router实例

const routes = [
  //主路由
  {
    path:'/',
    component:Main,
    redirect:'./home',//重定向
    children:[
      //子路由
      {path:'/home',component:Home},//首页
      {path:'/user',component:User},//用户
      {path:'/mall',component:Mall},//商品
      {path:'/page1',component:PageOne},//页面1
      {path:'/page2',component:PageTwo},//页面2
    ]
  }
]
const router = new VueRouter({
  routes //缩写 相当于 routes:routes
})

export default router






