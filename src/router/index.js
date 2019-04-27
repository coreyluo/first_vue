import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index'
import Content from '@/page/content'
import StockPool from '@/page/stockPool'
import DisableStockPool from '@/page/disableStockPool'
import AggressiveStockPool from '@/page/aggressiveStockPool'
import Position from '@/page/position'
import TargetParam from '@/page/targetParam'
import CancelLog from '@/page/cancelLog'
import DealOrder from '@/page/dealOrder'
import SellOrder from '@/page/sellOrder'

Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/',
        component: Index
      }, {
        path: '/content/:id',
        component: Content
      }, {
        path: '/stockPool/:id',
        component: StockPool
      }, {
       path: '/disableStockPool/:id',
       component: DisableStockPool
     }, {
       path: '/aggressiveStockPool/:id',
       component: AggressiveStockPool
     }, {
       path: '/position/:id',
       component: Position
     }, {
      path: '/targetParam/:id',
      component: TargetParam
    }, {
      path: '/cancelLog/:id',
      component: CancelLog
    }, {
      path: '/dealOrder/:id',
      component: DealOrder
    }, {
      path: '/sellOrder/:id',
      component: SellOrder
    }

  ]
})
