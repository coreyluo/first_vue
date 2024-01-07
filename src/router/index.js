import Vue from 'vue'
import Router from 'vue-router'

import Position from '@/page/position'
import DisableStockPool from '@/page/disableStockPool'
import RadicalDragonPool from '@/page/radicalDragonPool'
import OrderCancelPool from '@/page/orderCancelPool'
import CancelLog from '@/page/cancelLog'
import Content from '@/page/content'
import SellOrder from '@/page/sellOrder'
import UserLogin from '@/page/userLogin'
import OpenButton from '@/page/openButton'
import BlockView from '@/page/blockView'
import CirculateInfo from "@/page/circulateInfo"
import BlockDiy from "@/page/blockDiy"
import ScareBuy from "@/page/scareBuy"
import BatchBlock from "@/page/batchBlock"
import DisableUnmatch from "@/page/disableUnmatch"
import StockBeforeRateInfo from "@/page/stockBeforeRateInfo"
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
    },{
      path: '/userLogin/:id',
      component: UserLogin
    },{
      path: '/openButton/:id',
      component: OpenButton
    },{
      path: '/blockView/:id',
      component: BlockView
    },{
      path: '/circulateInfo/:id',
      component: CirculateInfo
    },{
      path: '/blockDiy/:id',
      component: BlockDiy
    },{
      path: '/scareBuy/:id',
      component: ScareBuy
    },{
      path: '/batchBlock/:id',
      component: BatchBlock
    },{
      path: '/disableUnmatch/:id',
      component: DisableUnmatch
    },{
      path: '/stockBeforeRateInfo/:id',
      component: StockBeforeRateInfo
    }

  ]
})
