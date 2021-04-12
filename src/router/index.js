import Vue from 'vue'
import Router from 'vue-router'

import Position from '@/page/position'
import DisableStockPool from '@/page/disableStockPool'
import RadicalDragonPool from '@/page/radicalDragonPool'
import OrderCancelPool from '@/page/orderCancelPool'
Vue.use(Router)

export default new Router({
  routes: [
    {
       path: '/',
       component: Position
     },{
      path: '/disableStockPool/:id',
      component: DisableStockPool
    },{
      path: '/radicalDragonPool/:id',
      component: RadicalDragonPool
    },{
      path: '/orderCancelPool/:id',
      component: OrderCancelPool
    }
  ]
})
