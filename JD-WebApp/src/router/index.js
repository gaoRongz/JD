/**
 * 配置项目的路由规则表
 **/
import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import index from '@/pages/index'
import sel from '@/pages/selects'
import find from '@/pages/find'
import shopcar from '@/pages/shopcar'
import me from '@/pages/me'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: index
    },
    {
      path: '/index',
      name: 'index',
      component: index,
    },
    {
      path: '/selects',
      name: 'selects',
      component: sel //组建名与上面的import 后面的名字相同
    },
    {
      path: '/find',
      name: 'find',
      component: find
    },
    {
      path: '/shopcar',
      name: 'shopcar',
      component: shopcar
    },
    {
      path: '/me',
      name: 'me',
      component: me
    },
  ]
})
