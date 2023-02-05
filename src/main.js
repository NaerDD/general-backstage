import Vue from 'vue';
// import { Button,Row,Container} from 'element-ui';
//全局注入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';

//按需引入
// Vue.use(Button)
// Vue.use(Row)
// Vue.use(Container)

Vue.use(ElementUI);

new Vue({
  el: "#app",
  router,
  render: (h) => h(App),
});
