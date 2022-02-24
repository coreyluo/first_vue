import Vue from 'vue'
import Router from 'vue-router'

import Position from '@/page/position'
import SellOrder from '@/page/sellOrder'
Vue.use(Router)

export default new Router({
  routes: [
    {
       path: '/',
       component: Position
     },{
      path: '/sellOrder/:id',
      component: SellOrder
    }
  ]
})
