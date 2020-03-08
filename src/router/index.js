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
import HighStock from '@/page/highStock'
import DragonParam from '@/page/dragonParam'
import SellParam from '@/page/sellParam'
import HotBlockStock from '@/page/hotBlockStock'
import BlockView from '@/page/blockView'
import OpenButton from '@/page/openButton'
import InsertQueue from '@/page/insertQueue'
import ConnectList from '@/page/connectList'
import AreaBlockView from '@/page/areaBlockView'
import StatisticDaily from '@/page/statisticDaily'
import StatisticTotalDaily from '@/page/statisticTotalDaily'
import RadicalDragonPool from '@/page/radicalDragonPool'
import HighIncreaseStock from '@/page/highIncreaseStock'
import SpecialNStock from '@/page/specialNStock'
import DelayLog from '@/page/delayLog'


Vue.use(Router)

export default new Router({
  routes: [
    {
       path: '/position/:id',
       component: Position
     }

  ]
})
