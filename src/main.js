import Vue from 'vue';
// import { Button,Row,Container} from 'element-ui';
//全局注入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import store from './store';
import './api/mock';
import Cookie from 'js-cookie';

//按需引入
// Vue.use(Button)
// Vue.use(Row)
// Vue.use(Container)
//全局引入
Vue.use(ElementUI);

//添加全局导航守卫
router.beforeEach((to, from,next) => {
  // token存不存在
  const token = Cookie.get('token')
  //token不存在,说明当前用户是未登陆,应该跳转到登陆页
  if(!token && to.name!=='login'){
    next({name:'login'})
  }else if(token && to.name ==='login'){
    //token存在,说明用户登陆,此时跳转至首页
    next({ name:'home' })
  }else{
    next();
  }
})

new Vue({
  el: "#app",
  router,store,
  render: (h) => h(App),
  created(){
    store.commit('addMenu',router)
  }
});
