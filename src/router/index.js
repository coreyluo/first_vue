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
import MonsterIncreaseStock from '@/page/monsterIncreaseStock'
import AbsortPool from '@/page/absortPool'
import SevenSunPool from '@/page/sevenSunPool'
import DragonTigerStock from '@/page/dragonTigerStock'
import FlowKbar from '@/page/flowKbar'
import ProhibitStockPool from '@/page/prohibitStockPool'
import StopTradeStock from '@/page/stopTradeStock'


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
    }, {
      path: '/highStock/:id',
      component: HighStock
    }, {
      path: '/dragonParam/:id',
      component: DragonParam
    }, {
      path: '/sellParam/:id',
      component: SellParam
    }, {
      path: '/hotBlockStock/:id',
      component: HotBlockStock
    }, {
      path: '/blockView/:id',
      component: BlockView
    }, {
      path: '/openButton/:id',
      component: OpenButton
    }, {
      path: '/insertQueue/:id',
      component: InsertQueue
    }, {
      path: '/connect/:id',
      component: ConnectList
    }, {
      path: '/areaBlockView/:id',
      component: AreaBlockView
    }, {
      path: '/statisticDaily/:id',
      component: StatisticDaily
    }, {
      path: '/statisticTotalDaily/:id',
      component: StatisticTotalDaily
    }, {
      path: '/radicalDragonPool/:id',
      component: RadicalDragonPool
    }, {
      path: '/highIncreaseStock/:id',
      component: HighIncreaseStock
    }, {
      path: '/specialNStock/:id',
      component: SpecialNStock
    }, {
      path: '/delayLog/:id',
      component: DelayLog
    },{
      path: '/monsterIncreaseStock/:id',
      component: MonsterIncreaseStock
    },{
      path: '/absortPool/:id',
      component: AbsortPool
    },{
      path: '/sevenSunPool/:id',
      component: SevenSunPool
    },{
      path: '/dragonTigerStock/:id',
      component: DragonTigerStock
    },{
      path: '/flowKbar/:id',
      component: FlowKbar
    },{
      path: '/prohibitStockPool/:id',
      component: ProhibitStockPool
    },{
      path: '/stopTradeStock/:id',
      component: StopTradeStock
    }

  ]
})
