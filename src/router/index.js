import Vue from 'vue'
import Router from 'vue-router'

import Position from '@/page/position'
import DisableStockPool from '@/page/disableStockPool'
import RadicalDragonPool from '@/page/radicalDragonPool'
import OrderCancelPool from '@/page/orderCancelPool'
import CancelLog from '@/page/cancelLog'
import Content from '@/page/content'
import SellOrder from '@/page/sellOrder'
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
    },{
      path: '/cancelLog/:id',
      component: CancelLog
    },{
      path: '/content/:id',
      component: Content
    },{
      path: '/sellOrder/:id',
      component: SellOrder
    }

  ]
})
