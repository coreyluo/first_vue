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
import StockOpenInfo from "@/page/stockOpenInfo"
import StrategyRatio from "@/page/strategyRatio"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/radicalDragonPool/:id',
      component: RadicalDragonPool
    },{
      path: '/userLogin/:id',
      component: UserLogin
    }

  ]
})
