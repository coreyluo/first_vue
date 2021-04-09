import Vue from 'vue'
import Router from 'vue-router'

import Position from '@/page/position'
import DisableStockPool from '@/page/disableStockPool'
Vue.use(Router)

export default new Router({
  routes: [
    {
       path: '/position/:id',
       component: Position
     },{
      path: '/disableStockPool/:id',
      component: DisableStockPool
    }
  ]
})
