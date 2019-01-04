// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import VueScroller  from 'vue-scroller'

require('./assets/css/base.scss')

Vue.use(VueScroller)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render(creat){
    return creat(App)
  }
})
//main.js只能引assets下的文件 因为要打包
//static下的文件直接在index.html引入
