<style scoped>
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  .layout-header-bar{
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
  }
  .in-use {
    position: relative;
    float: left;
    left: 50%;
    background: #ed4014;
    font-weight:900;
    font-family: helvetica Neue;
  }
  .no-use {
    position: relative;
    float: left;
    left: 50%;
    background: #c5c8ce;
    font-weight:900;
    font-family: helvetica Neue;
  }
  .blankRow {
    height: 30px;
    background: #c5c8ce;
  }
  .remark {
    height: 20px;
    line-height: 20px;
    font-weight:900;
    font-family: Helvetica;
    vertical-align:middle;
  }
</style>
<template>
  <div class="layout">
    <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
      <Menu active-name="1-22" theme="dark" width="auto" :open-names="['1']" @on-select="routeTo">
        <Submenu name="1">
          <template slot="title">
            <Icon type="ios-navigate"></Icon>
            股票管理
          </template>
          <MenuItem  name="1-1"><router-link to="/"><font color="#fff">今日待撤</font></router-link></MenuItem>
          <MenuItem  name="1-2"><router-link to="/content/1"><font color="#fff">参数调优</font></router-link></MenuItem>
          <MenuItem  name="1-3"><router-link to="/stockPool/1"><font color="#fff">股票监听池</font></router-link></MenuItem>
          <MenuItem  name="1-4"><router-link to="/disableStockPool/1"><font color="#fff">禁止下单股票池</font></router-link></MenuItem>
          <MenuItem  name="1-22"><router-link to="/radicalDragonPool/1"><font color="#fff">激进龙头股票</font></router-link></MenuItem>
          <MenuItem  name="1-25"><router-link to="/absortPool/1"><font color="#fff">粽子</font></router-link></MenuItem>
          <MenuItem  name="1-6"><router-link to="/position/1"><font color="#fff">仓位</font></router-link></MenuItem>
          <MenuItem  name="1-7"><router-link to="/targetParam/1"><font color="#fff">靶向参数</font></router-link></MenuItem>
          <MenuItem  name="1-8"><router-link to="/cancelLog/1"><font color="#fff">今日撤单日志</font></router-link></MenuItem>
          <MenuItem  name="1-9"><router-link to="/dealOrder/1"><font color="#fff">今日成交</font></router-link></MenuItem>
          <MenuItem  name="1-10"><router-link to="/sellOrder/1"><font color="#fff">今日可卖</font></router-link></MenuItem>
          <MenuItem  name="1-11"><router-link to="/highStock/1"><font color="#fff">高位板</font></router-link></MenuItem>
          <MenuItem  name="1-5"><router-link to="/highIncreaseStock/1"><font color="#fff">涨幅过高股票</font></router-link></MenuItem>
          <MenuItem  name="1-26"><router-link to="/monsterIncreaseStock/1"><font color="#fff">近期妖股</font></router-link></MenuItem>
          <MenuItem  name="1-23"><router-link to="/specialNStock/1"><font color="#fff">特殊高位股票</font></router-link></MenuItem>
          <MenuItem  name="1-12"><router-link to="/dragonParam/1"><font color="#fff">龙头模式参数</font></router-link></MenuItem>
          <MenuItem  name="1-13"><router-link to="/sellParam/1"><font color="#fff">卖出参数</font></router-link></MenuItem>
          <MenuItem  name="1-14"><router-link to="/hotBlockStock/1"><font color="#fff">热门板块</font></router-link></MenuItem>
          <MenuItem  name="1-15"><router-link to="/blockView/1"><font color="#fff">所有板块</font></router-link></MenuItem>
          <MenuItem  name="1-16"><router-link to="/openButton/1"><font color="#fff">开启策略按钮</font></router-link></MenuItem>
          <MenuItem  name="1-24"><router-link to="/delayLog/1"><font color="#fff">延迟日志</font></router-link></MenuItem>
          <MenuItem  name="1-17"><router-link to="/insertQueue/1"><font color="#fff">插队池</font></router-link></MenuItem>
          <MenuItem  name="1-18"><router-link to="/connect/1"><font color="#fff">连接相关</font></router-link></MenuItem>
          <MenuItem  name="1-19"><router-link to="/areaBlockView/1"><font color="#fff">地区板块</font></router-link></MenuItem>
          <MenuItem  name="1-20"><router-link to="/statisticDaily/1"><font color="#fff">连板成功详情统计</font></router-link></MenuItem>
          <MenuItem  name="1-21"><router-link to="/statisticTotalDaily/1"><font color="#fff">连板成功率统计</font></router-link></MenuItem>
          <MenuItem  name="1-27"><router-link to="/sevenSunPool/1"><font color="#fff">低点买入策略</font></router-link></MenuItem>
          <MenuItem  name="1-28"><router-link to="/dragonTigerStock/1"><font color="#fff">龙虎榜</font></router-link></MenuItem>
          <MenuItem  name="1-29"><router-link to="/flowKbar/1"><font color="#fff">流动性数据</font></router-link></MenuItem>
          <MenuItem  name="1-30"><router-link to="/prohibitStockPool/1"><font color="#fff">股票池修改</font></router-link></MenuItem>
          <MenuItem  name="1-31"><router-link to="/stopTradeStock/1"><font color="#fff">即将违规股票</font></router-link></MenuItem>
        </Submenu>
      </Menu>
    </Sider>
    <Layout :style="{marginLeft: '200px'}">
      <div class="blankRow">
      </div>
      <template>
        <template>
          <div>
            <Button style="float:right"  type="primary" >超级龙头</Button>
            <Button style="float:right" type="error" @click="modal1=true;showAdd(0,5,1,30,1.10,1)">添加</Button>
          </div>
        </template>
        <Table border :columns="columns13" :data="data13">
          <template slot-scope="{ row }" slot="tab">
            <strong>{{ row.tab }}</strong>
          </template>
          <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="modal1=true;show(row)">修改</Button>
            <Button type="error" size="small" style="margin-right: 5px" @click="deleteRadical(row.id)">删除</Button>
          </template>
        </Table>
      </template>

      <div class="blankRow">
      </div>
      <template>
        <template>
          <div>
            <Button style="float:right" type="primary">激进打板</Button>
            <Button style="float:right" type="error" @click="modal1=true;showAdd(2,2,1,30,1.10,1)">添加</Button>
          </div>
        </template>
        <Table border :columns="columns13" :data="data14">
          <template slot-scope="{ row }" slot="tab">
            <strong>{{ row.tab }}</strong>
          </template>
          <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="modal1=true;show(row)">修改</Button>
            <Button type="error" size="small" style="margin-right: 5px" @click="deleteRadical(row.id)">删除</Button>
          </template>
        </Table>
      </template>

      <template>
        <Modal
          v-model="modal1"
          title="激进龙头股票"
          @on-ok="ok"
          @on-cancel="cancel">
          <div>
            股票代码:&nbsp&nbsp<Input name= "param1" v-model="param1" placeholder="" style="width: 100px" />
          </div>
          <div>
            仓位系数:&nbsp&nbsp<Input name= "param2" v-model="param2" placeholder="" style="width: 100px" />
          </div>
          <div>
            是否扫版:&nbsp&nbsp
            <select id="sex" name = param3  v-model="param3">
              <option v-if="param4 ==2" value="1">扫版</option>
              <option v-if="param4 ==2" value="0">不扫版</option>

              <option v-if="param4 ==0" value="1">开盘向上买入</option>
              <option v-if="param4 ==0" value="0">集合买入</option>
            </select>
          </div>
          <div>
            时间限制:&nbsp&nbsp<Input name= "param5" v-model="param5" placeholder="" style="width: 100px" />
          </div>
          <div>
            买入上限:&nbsp&nbsp<Input name= "param6" v-model="param6" placeholder="" style="width: 100px" />
          </div>
          <div>
            买入次数:&nbsp&nbsp<Input name= "param7" v-model="param7" placeholder="" style="width: 100px" />
          </div>
          <div>
            <Input type="hidden" name= "param4" v-model="param4" placeholder="" style="width: 100px" />
          </div>
        </Modal>
      </template>

    </Layout>
  </div>
</template>
<script>
  export default {
    created () {
      this.$api.post('singular/radicalDragonPool/dataList', {}, r => {
        var infos = r.data;
        infos.forEach(item => {
          if(item.radical==0){
            if(item.sweepType==0){
              item.sweepTypeStr = "集合买入"
            }
            if(item.sweepType==1){
              item.sweepTypeStr = "开盘向上买入"
            }
          }else {
            if (item.sweepType == 0) {
              item.sweepTypeStr = "不扫版"
            }
            if (item.sweepType == 1) {
              item.sweepTypeStr = "扫版"
            }
          }
        })

        infos.forEach(item =>{
          if(item.radical ==0){
            this.data13.push(item)
          }
          if(item.radical ==2){
            this.data14.push(item)
          }
        })

      })
    },

    data () {
      return {
        columns13: [
          {
            title: '股票代码',
            key: 'stockCode',
            align: 'center'
          },
          {
            title: '股票名称',
            key: 'stockName',
            align: 'center'
          },
          {
            title: '是否扫版',
            key: 'sweepTypeStr',
            align: 'center'
          },
          {
            title: '仓位系数',
            key: 'positionRatio',
            align: 'center'
          },
          {
            title: '开盘后下单时间限制',
            key: 'afterOpenSeconds',
            align: 'center'
          },
          {
            title: '买入上限',
            key: 'highRate',
            align: 'center'
          },
          {
            title: '买入次数',
            key: 'orderTimes',
            align: 'center'
          },
          {
            title: '操作',
            slot: 'action',
            width: 150,
            align: 'center'
          }
        ],

        data13: [

        ],

        data14: [

        ],
        modal1: false,
        indexId:0
      }
    },
    methods: {
      show (row) {
        this.indexId=row.id;
        this.param1=row.stockCode;
        this.param2=row.positionRatio;
        this.param3=row.sweepType;
        this.param4=row.radical;
        this.param5 = row.afterOpenSeconds;
        this.param6 = row.highRate;
        this.param7 = row.orderTimes;
      },
      ok () {
        var primaryKey = this.indexId
        var stockCode= this.param1
        var positionRatio= this.param2
        var sweepType= this.param3
        var radical= this.param4
        var afterOpenSeconds = this.param5
        var highRate = this.param6
        var orderTimes = this.param7
        this.$api.post('singular/radicalDragonPool/addOne', {id:primaryKey,stockCode:stockCode,positionRatio:positionRatio,sweepType:sweepType,radical:radical,afterOpenSeconds:afterOpenSeconds,highRate:highRate,orderTimes:orderTimes}, r => {
          location.reload()
        })

      },
      cancel () {
        this.$Message.info($("param1").value)
      },

      cancelRemark () {
        this.$Message.info()
      },

      deleteRadical(id){
        this.$api.get('singular/radicalDragonPool/deleteOne', {id:id}, r => {
          location.reload()
        })
      },

      showAdd (radical,positionRatio,sweepType,afterOpenSeconds,highRate,orderTimes) {
        this.param4=radical;
        this.param3=sweepType;
        this.param2=positionRatio;
        this.param5=afterOpenSeconds;
        this.param6 = highRate;
        this.param7 = orderTimes;
      },
    }
  }
</script>
