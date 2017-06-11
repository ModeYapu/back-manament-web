import Vue from 'vue'
require('./extends/filters')
require('./extends/directives')
import router from './router/routers.js'
import App from './App.vue'
require('assets/css/comm.less')
require('assets/css/normalize.css')
require('assets/css/icon.less')
require('assets/css/loading.less')

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)

// 实例全局事件管理器
window.eventBus = new Vue()

// 重写window.alert
window.alert = function (title, callback) {
  window.eventBus.$emit('alert.show', title, callback)
}
// 重写window.confirm
window.confirm = function (title, callback) {
  window.eventBus.$emit('confirm.show', title, callback)
}

new Vue({
  el: '#app',
  router,
  components: {
    App
  }
})
