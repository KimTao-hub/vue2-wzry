import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import http from './http.js'

Vue.config.productionTip = false

//发起xhr请求的axios绑定为vue
//vue的实例原型链上挂载axios的实例http,就可以发送请求
Vue.prototype.$http = http;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
