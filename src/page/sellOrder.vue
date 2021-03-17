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
</style>
<template>
    <div class="layout">
        <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
            <Menu active-name="1-10" theme="dark" width="auto" :open-names="['1']" @on-select="routeTo">
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
            <div style="height: 30px">
            </div>
            <template>
              <div>
                <Button style="float:right" type="info" @click="pullAll()">拉取当日可卖</Button>
              </div>
            </template>
            <Table border :columns="columns12" :data="data7">
                <template slot-scope="{ row }" slot="tab">
                    <strong>{{ row.tab }}</strong>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                  <Button v-if="row.status ==0" type="primary" size="small"  @click="changeStatus(row.id)">停卖</Button>
                  <Button v-if="row.status ==1" type="error" size="small"  @click="changeStatus(row.id)">继续卖出</Button>
                  <Button v-if="row.noSellFiveMinute" type="error" size="small"  @click="noSellFiveMinute(row.stockCode)">龙头5分钟已经禁卖,请允许</Button>
                  <Button v-if="!row.noSellFiveMinute" type="primary" size="small"  @click="noSellFiveMinute(row.stockCode)">龙头5分钟未禁卖,请禁卖</Button>
                  <Button v-if="row.sellCallAuction ==0" type="primary" size="small" @click="modal1=true;show(row.id,row.sellCallAuction)">集合卖出未开启,请开启</Button>
                  <Button v-if="row.sellCallAuction !==0" type="error" size="small" @click="modal1=true;show(row.id,row.sellCallAuction)">集合卖出已开启,请关闭</Button>
                  <Button v-if="row.sellFallV ==0" type="primary" size="small" @click="modal2=true;show2(row.id,row.sellFallV)">倒v卖出未开启,请开启</Button>
                  <Button v-if="row.sellFallV !==0" type="error" size="small" @click="modal2=true;show2(row.id,row.sellFallV)">倒v卖出已开启,请关闭</Button>
                </template>
            </Table>

          <template>
            <Modal
              v-model="modal1"
              title="集合卖出比例"
              @on-ok="ok"
              @on-cancel="cancel">
              <div>
                <div>
                  可&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp卖&nbsp&nbsp&nbsp&nbspid&nbsp&nbsp:<Input name= "param3" readonly="true" v-model="param3" placeholder="" style="width: 300px" />
                </div>
                <div>
                  集合卖出比例:<Input name= "param2" v-model="param2" placeholder="" style="width: 300px" />
                </div>

              </div>
            </Modal>
          </template>

          <template>
            <Modal
              v-model="modal2"
              title="倒v卖出比例"
              @on-ok="ok2"
              @on-cancel="cancel2">
              <div>
                <div>
                  可&nbsp&nbsp&nbsp&nbsp卖&nbsp&nbsp&nbsp&nbspid&nbsp&nbsp:<Input name= "param3" readonly="true" v-model="param21" placeholder="" style="width: 300px" />
                </div>
                <div>
                  倒v卖出比例:<Input name= "param2" v-model="param22" placeholder="" style="width: 300px" />
                </div>

              </div>
            </Modal>
          </template>

        </Layout>
    </div>
</template>
<script>
    export default {
        created () {
            this.$api.get('singular/sellAvailable/listData', null, r => {
                this.data7 = r.data;
            })
        },
        data () {
            return {
                columns12: [
                    {
                      title: '账号id',
                      key: 'accountId'
                    },
                    {
                        title: '股票代码',
                        key: 'stockCode'
                    },
                    {
                        title: '股票名称',
                        key: 'stockName'
                    },
                    {
                      title: '可卖数量(股数)',
                      key: 'quantityAvailable'
                    },
                    {
                      title: '操作',
                      slot: 'action',
                      width: 550,
                      align: 'center'
                    }
                ],
                data7: [

                ],
                modal1: false,
                modal2: false
            }
        },
        methods: {

          changeStatus(id){
            this.$api.get('singular/sellAvailable/changeStatus', {id:id}, r => {

            })
            location.reload()
          },
          pullAll(){
            this.$api.get('singular/sellAvailable/pullData', null, r => {

            })
            location.reload()
          },
          noSellFiveMinute(stockCode){
            this.$api.get('singular/sellAvailable/noSellFiveMinute', {stockCode:stockCode}, r => {

            })
            location.reload()
          },
          show (id,rowPercent) {
            this.param2=rowPercent;
            this.param3=id;
          },
          ok () {
            this.$api.get('singular/sellAvailable/sellCallAuction', {id:this.param3,percent:this.param2}, r => {

            })
            location.reload()
          },
          cancel () {
            this.$Message.info($("param1").value)
          },

          show2 (id,rowPercent) {
            this.param22=rowPercent;
            this.param21=id;
          },
          ok2 () {
            this.$api.get('singular/sellAvailable/sellFallV', {id:this.param21,percent:this.param22}, r => {

            })
            location.reload()
          },
          cancel2 () {
            this.$Message.info($("param1").value)
          }
        },

    }
</script>
