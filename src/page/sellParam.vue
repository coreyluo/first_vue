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
            <Menu active-name="1-13" theme="dark" width="auto" :open-names="['1']" @on-select="routeTo">
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
                  <MenuItem  name="1-32"><router-link to="/positionRatio/1"><font color="#fff">低吸仓位系数</font></router-link></MenuItem>
                  <MenuItem  name="1-33"><router-link to="/shortMood/1"><font color="#fff">短线情绪</font></router-link></MenuItem>
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
              <Table border :columns="columns13" :data="data13">
                <template slot-scope="{ row }" slot="tab">
                  <strong>{{ row.tab }}</strong>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                  <Button type="primary" size="small" style="margin-right: 5px" @click="modal1=true;show(row)">修改</Button>
                  <Button v-if="row.inUsed===1" type="error" size="small" style="margin-right: 5px">正在使用</Button>
                  <Button v-if="row.inUsed!==1" type="primary" size="small" style="margin-right: 5px" @click="updateUsed(index)">使用策略</Button>
                </template>
              </Table>

            </template>


          <template>
            <div>
              <Button v-if="!quickHighSellStatus"  type="primary" @click="changeQuickSellStatus(0)">高点快速卖出已经关闭,请开启</Button>
              <Button v-if="quickHighSellStatus"  type="error" @click="changeQuickSellStatus(0)">高点快速卖出已开启,请关闭</Button>

              <Button v-if="!quickComeDownSellStatus"  type="primary" @click="changeQuickSellStatus(1)">5分钟下降快速卖出已经关闭,请开启</Button>
              <Button v-if="quickComeDownSellStatus"  type="error" @click="changeQuickSellStatus(1)">5分钟下降快速卖出已开启,请关闭</Button>
            </div>
          </template>

            <template>
                <Modal
                    v-model="modal1"
                    title="参数修改"
                    @on-ok="ok"
                    @on-cancel="cancel">
                    <div>
                      峰值卖出百分比:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<Input name= "param1" v-model="param1" placeholder="" style="width: 100px" />
                    </div>
                    <div>
                      4-6高点卖出百分比(总仓位):&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<Input name= "param2" v-model="param2" placeholder="" style="width: 100px" />
                    </div>
                    <div>
                      6-8.5高点卖出百分比(总仓位):&nbsp&nbsp&nbsp&nbsp<Input name= "param3" v-model="param3" placeholder="" style="width: 100px" />
                    </div>
                    <div>
                      大于8.5高点卖出百分比(总仓位):<Input name= "param4" v-model="param4" placeholder="" style="width: 100px" />
                    </div>
                    <div>
                      相对7个点卖出百分比(总仓位):&nbsp&nbsp&nbsp<Input name= "param5" v-model="param5" placeholder="" style="width: 100px" />
                    </div>
                    <div>
                      大v卖出百分比(总仓位):&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp <Input name= "param6" v-model="param6" placeholder="" style="width: 100px" />
                    </div>
                </Modal>
            </template>
        </Layout>
    </div>
</template>
<script>
   export default {
        created () {
             this.$api.post('singular/sellParam/dataList', {}, r => {
                  var infos = r.data;
                   infos.forEach(item => {
                     if(item.type==1){
                       item.sellSpeed = "快速卖出"
                     }
                     if(item.type==2){
                       item.sellSpeed = "正常卖出"
                     }
                     if(item.type==3){
                       item.sellSpeed = "缓慢卖出"
                     }
                   })
                  this.data13 = infos;
             });
          this.$api.post('singular/sellParam/quickSell', {}, r => {
            var infos = r.data;
            infos.forEach(item => {
              if(item.type==0){
                this.quickHighSellStatus = item.openOn;
              }
              if(item.type==1){
                this.quickComeDownSellStatus = item.openOn;
              }

            })
          })
        },

        data () {
             return {
                 columns13: [
                     {
                         title: '峰值卖出百分比(当前剩余仓位)',
                         key: 'peakPercent',
                         align: 'center'
                     },
                     {
                         title: '4-6高点卖出百分比(总仓位)',
                         key: 'highOnePercent',
                         align: 'center'
                     },
                     {
                        title: '6-8.5高点卖出百分比(总仓位)',
                        key: 'highTwoPercent',
                        align: 'center'
                     },
                     {
                         title: '大于8.5高点卖出百分比(总仓位)',
                         key: 'highThreePercent',
                         align: 'center'
                     },
                     {
                         title: '相对7个点卖出百分比(总仓位)',
                         key: 'relativePercent',
                         align: 'center'
                     },
                     {
                         title: '大v卖出百分比(总仓位)',
                         key: 'bigvPercent',
                         align: 'center'
                     },
                     {
                       title: '卖出类型',
                       key: 'sellSpeed',
                       align: 'center'
                     },
                     {
                         title: '操作',
                         slot: 'action',
                         width: 200,
                         align: 'center'
                     }
                 ],

                 data13: [

                 ],
                 quickHighSellStatus:false,
                 quickComeDownSellStatus:false,
                 modal1: false,
                 indexId:0
             }
        },
        methods: {
             show (row) {
                 this.indexId=row.id;
                 this.param1=row.peakPercent;
                 this.param2=row.highOnePercent;
                 this.param3=row.highTwoPercent;
                 this.param4=row.highThreePercent;
                 this.param5=row.relativePercent;
                 this.param6=row.bigvPercent;
             },
             ok () {
                  var primaryKey = this.indexId
                  var peakPercent= this.param1
                  var highOnePercent= this.param2
                  var highTwoPercent= this.param3
                  var highThreePercent= this.param4
                  var relativePercent= this.param5
                  var bigvPercent = this.param6;

                  this.$api.post('singular/sellParam/update', {id:primaryKey,peakPercent:peakPercent,highOnePercent:highOnePercent,highTwoPercent:highTwoPercent,highThreePercent:highThreePercent,relativePercent:relativePercent,bigvPercent:bigvPercent}, r => {
                    location.reload()
                  })

             },
              updateUsed (index) {
                var primaryKey =this.data13[index].id
                this.$api.post('singular/sellParam/updateUsed', {id:primaryKey}, r => {
                  location.reload()
                })

              },

            changeQuickSellStatus (code) {
              this.$api.post('singular/sellParam/changeQuickSellStatus', {type:code}, r => {
                location.reload()
              })

            },

             cancel () {
                 this.$Message.info($("param1").value)
             },

             cancelRemark () {
                this.$Message.info()
             }
        }
   }
</script>
