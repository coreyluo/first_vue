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
            <Menu active-name="1-2" theme="dark" width="auto" :open-names="['1']" @on-select="routeTo">
                <Submenu name="1">
                    <template slot="title">
                        <Icon type="ios-navigate"></Icon>
                        股票管理
                    </template>
                    <MenuItem  name="1-1"><router-link to="/"><font color="#fff">今日待撤</font></router-link></MenuItem>
                    <MenuItem  name="1-2"><router-link to="/content/1"><font color="#fff">参数调优</font></router-link></MenuItem>
                    <MenuItem  name="1-3"><router-link to="/stockPool/1"><font color="#fff">股票监听池</font></router-link></MenuItem>
                    <MenuItem  name="1-4"><router-link to="/disableStockPool/1"><font color="#fff">禁止下单股票池</font></router-link></MenuItem>
                    <MenuItem  name="1-5"><router-link to="/aggressiveStockPool/1"><font color="#fff">激进股票池</font></router-link></MenuItem>
                    <MenuItem  name="1-6"><router-link to="/position/1"><font color="#fff">仓位</font></router-link></MenuItem>
                    <MenuItem  name="1-7"><router-link to="/targetParam/1"><font color="#fff">靶向参数</font></router-link></MenuItem>
                    <MenuItem  name="1-8"><router-link to="/cancelLog/1"><font color="#fff">今日撤单日志</font></router-link></MenuItem>
                  <MenuItem  name="1-9"><router-link to="/dealOrder/1"><font color="#fff">今日成交</font></router-link></MenuItem>
                  <MenuItem  name="1-10"><router-link to="/sellOrder/1"><font color="#fff">今日可卖</font></router-link></MenuItem>
                  <MenuItem  name="1-11"><router-link to="/highStock/1"><font color="#fff">高位板</font></router-link></MenuItem>
                  <MenuItem  name="1-12"><router-link to="/dragonParam/1"><font color="#fff">龙头模式参数</font></router-link></MenuItem>
                  <MenuItem  name="1-13"><router-link to="/sellParam/1"><font color="#fff">卖出参数</font></router-link></MenuItem>
                  <MenuItem  name="1-14"><router-link to="/hotBlockStock/1"><font color="#fff">热门板块</font></router-link></MenuItem>
                  <MenuItem  name="1-15"><router-link to="/blockView/1"><font color="#fff">所有板块</font></router-link></MenuItem>
                  <MenuItem  name="1-16"><router-link to="/openButton/1"><font color="#fff">开启策略按钮</font></router-link></MenuItem>
                </Submenu>
            </Menu>
        </Sider>
        <Layout :style="{marginLeft: '200px'}">
            <div class="blankRow">
            </div>
            <template>
              <template>
                <div>
                  <i class="remark" >{{remark1}}</i><i>&nbsp&nbsp&nbsp&nbsp</i><Button type="success" @click="modal2=true;showRemark(remark1,1)">修改描述</Button>
                  <tag v-if="inUse===1" class="in-use">正在使用</tag>
                  <tag v-else class="no-use">未启用</tag>
                  <Button style="float:right" v-if="open1===1" type="error" @click="closeAllStrategy(1)">所有策略启用,请关闭</Button>
                  <Button style="float:right" v-if="open1===0" type="primary" @click="openAllStrategy(1)">已经关闭某某些策略,请启用</Button>

                  <Button style="float:right" type="warning" @click="flushCache(1)">启用参数</Button>
                </div>
              </template>
              <Table border :columns="columns13" :data="data13">
                <template slot-scope="{ row }" slot="tab">
                  <strong>{{ row.tab }}</strong>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                  <Button type="primary" size="small" style="margin-right: 5px" @click="modal1=true;show(row)">修改</Button>
                </template>
              </Table>
            </template>

            <div class="blankRow">
            </div>
            <template>
              <template>
                <div>
                  <i class="remark" >{{remark2}}</i><i>&nbsp&nbsp&nbsp&nbsp</i><Button type="success" @click="modal2=true;showRemark(remark2,2)">修改描述</Button>
                  <tag v-if="inUse===2" class="in-use">正在使用</tag>
                  <tag class="no-use" v-else >未启用</tag>
                  <Button style="float:right" v-if="open2===1" type="error" @click="closeAllStrategy(2)">所有策略启用,请关闭</Button>
                  <Button style="float:right" v-if="open2===0" type="primary" @click="openAllStrategy(2)">已经关闭某某些策略,请启用</Button>

                  <Button style="float:right" type="warning" @click="flushCache(2)">启用参数</Button>
                </div>
              </template>
              <Table border :columns="columns13" :data="data14">
                <template slot-scope="{ row }" slot="tab">
                  <strong>{{ row.tab }}</strong>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                  <Button type="primary" size="small" style="margin-right: 5px" @click="modal1=true;show(row)">修改</Button>
                </template>
              </Table>
            </template>

            <div class="blankRow">
            </div>
            <template>
              <template>
                <div>
                  <i class="remark" >{{remark3}}</i><i>&nbsp&nbsp&nbsp&nbsp</i><Button type="success" @click="modal2=true;showRemark(remark3,3)">修改描述</Button>
                  <tag v-if="inUse===3" class="in-use">正在使用</tag>
                  <tag class="no-use" v-else >未启用</tag>
                  <Button style="float:right" v-if="open3===1" type="error" @click="closeAllStrategy(3)">所有策略启用,请关闭</Button>
                  <Button style="float:right" v-if="open3===0" type="primary" @click="openAllStrategy(3)">已经关闭某某些策略,请启用</Button>

                  <Button style="float:right" type="warning" @click="flushCache(3)">启用参数</Button>
                </div>
              </template>
              <Table border :columns="columns13" :data="data15">
                <template slot-scope="{ row }" slot="tab">
                  <strong>{{ row.tab }}</strong>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                  <Button type="primary" size="small" style="margin-right: 5px" @click="modal1=true;show(row)">修改</Button>
                </template>
              </Table>
            </template>

            <div class="blankRow">
            </div>
            <template>
              <template>
                <div>
                  <i class="remark" >{{remark4}}</i><i>&nbsp&nbsp&nbsp&nbsp</i><Button type="success" @click="modal2=true;showRemark(remark4,4)">修改描述</Button>
                  <tag v-if="inUse===4" class="in-use">正在使用</tag>
                  <tag class="no-use" v-else >未启用</tag>
                  <Button style="float:right" v-if="open4===1" type="error" @click="closeAllStrategy(4)">所有策略启用,请关闭</Button>
                  <Button style="float:right" v-if="open4===0" type="primary" @click="openAllStrategy(4)">已经关闭某某些策略,请启用</Button>

                  <Button style="float:right" type="warning" @click="flushCache(4)">启用参数</Button>
                </div>
              </template>
              <Table border :columns="columns13" :data="data16">
                <template slot-scope="{ row }" slot="tab">
                  <strong>{{ row.tab }}</strong>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                  <Button type="primary" size="small" style="margin-right: 5px" @click="modal1=true;show(row)">修改</Button>
                </template>
              </Table>
            </template>

            <template>
              <Modal
                v-model="modal2"
                title="修改描述"
                @on-ok="okRemark"
                @on-cancel="cancelRemark">
                <div v-if="false">>
                  描述<Input name= "param100" v-model="param100" placeholder="" style="width: 200px" />
                </div>
                <div>
                  描述<Input name= "param0" v-model="param0" placeholder="" style="width: 200px" />
                </div>
              </Modal>
            </template>

            <template>
                <Modal
                    v-model="modal1"
                    title="参数修改"
                    @on-ok="ok"
                    @on-cancel="cancel">
                    <div>
                        买入（买一封单达到流通z的比例(万分)）:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<Input name= "param1" v-model="param1" placeholder="" style="width: 100px" />
                    </div>
                    <div>
                        炮灰或者但前量大于多少直接不下单或者撤单(手):&nbsp&nbsp<Input name= "param2" v-model="param2" placeholder="" style="width: 100px" />
                    </div>
                    <div>
                        买入（炮灰量 单位:手）:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp   <Input name= "param3" v-model="param3" placeholder="" style="width: 100px" />
                    </div>
                    <div>
                        撤单（封板多少秒后封单小于流通z的比例(万分)）:<Input name= "param4" v-model="param4" placeholder="" style="width: 100px" />
                    </div>
                    <div>
                        封单后延迟校验撤单信息秒数:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp <Input name= "param5" v-model="param5" placeholder="" style="width: 100px" />
                    </div>
                    <div v-if="false">
                        4秒后封单数小于最大封单数的百分比:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp <Input name= "param6" v-model="param6" placeholder="" style="width: 100px" />
                    </div>
                    <div v-if="false">
                        4秒后封单数小于流通z的百分比:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp <Input name= "param7" v-model="param7" placeholder="" style="width: 100px" />
                    </div>
                    <div>
                      40s封单循环比较百分比:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp <Input name= "param8" v-model="param8" placeholder="" style="width: 100px" />
                    </div>
                    <div>
                        靶向往前数的秒数:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp <Input name= "param9" v-model="param9" placeholder="" style="width: 100px" />
                    </div>
                    <div>
                      6s内逐笔多空比较百分比:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp <Input name= "param10" v-model="param10" placeholder="" style="width: 100px" />
                    </div>
                    <div>
                      6s多空对比固定手数&40秒心跳固定手数:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp <Input name= "param11" v-model="param11" placeholder="" style="width: 100px" />
                    </div>
                    <div>
                        靶向4前面判断大单标准:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp <Input name= "param12" v-model="param12" placeholder="" style="width: 100px" />
                    </div>
                    <div>
                        靶向4大单bc百分比:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp <Input name= "param13" v-model="param13" placeholder="" style="width: 100px" />
                    </div>
                    <div>
                      369固定值版(手):&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp <Input name= "param14" v-model="param14" placeholder="" style="width: 100px" />
                    </div>
                    <div>
                      几分钟内不成交(分钟):&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp <Input name= "param15" v-model="param15" placeholder="" style="width: 100px" />
                    </div>
                    <div>
                      固定时间(内成交+撤单量)>把前量百分比:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp <Input name= "param16" v-model="param16" placeholder="" style="width: 100px" />
                    </div>
                    <div>
                      分时成交固定手数(手):&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp <Input name= "param17" v-model="param17" placeholder="" style="width: 100px" />
                    </div>
                </Modal>
            </template>
        </Layout>
    </div>
</template>
<script>
   export default {
        created () {
             this.$api.post('singular/paramConfig/dataList', {}, r => {
                  var infos = r.data;
                  infos.forEach(item => {
                      item.insertCirculatezPercentStr=item.insertCirculatezPercent;
                      if(item.stockType==0){
                        item.stockTypeStr = "1亿以下"
                      }
                      if(item.stockType==1){
                        item.stockTypeStr = "1-3亿"
                      }
                      if(item.stockType==2){
                        item.stockTypeStr = "3-5.5亿"
                      }
                      if(item.stockType==3){
                        item.stockTypeStr = "5.5-8亿以上"
                      }
                      if(item.stockType==4){
                        item.stockTypeStr = "8-11亿以上"
                      }
                      if(item.stockType==5){
                        item.stockTypeStr = "11亿以上"
                      }
                   })

                  infos.forEach(item =>{
                    if(item.sign ==1){
                      this.data13.push(item)
                    }
                    if(item.sign ==2){
                      this.data14.push(item)
                    }
                    if(item.sign ==3){
                      this.data15.push(item)
                    }
                    if(item.sign ==4){
                      this.data16.push(item)
                    }
                    if(item.used==1){
                      this.inUse = item.sign
                    }
                    if(item.sign==1){
                      this.remark1=item.remark;
                    }
                    if(item.sign==2){
                      this.remark2=item.remark;
                    }
                    if(item.sign==3){
                      this.remark3=item.remark;
                    }
                    if(item.sign==4){
                      this.remark4=item.remark;
                    }

                    if(item.sign==1){
                      this.open1=item.openAll;
                    }
                    if(item.sign==2){
                      this.open2=item.openAll;
                    }
                    if(item.sign==3){
                      this.open3=item.openAll;
                    }
                    if(item.sign==4){
                      this.open4=item.openAll;
                    }

                  })

             })
        },

        data () {
             return {
                 columns13: [
                     {
                         title: '流通Z类型',
                         key: 'stockTypeStr',
                         align: 'center'
                     },
                     {
                         title: '买入（买一封单达到流通z的比例(万分)）',
                         key: 'insertCirculatezPercentStr',
                         align: 'center'
                     },
                     {
                        title: '炮灰或者但前量大于多少直接不下单或者撤单(手)',
                        key: 'soldOneQuantity',
                        align: 'center'
                     },
                     {
                         title: '买入（炮灰量 单位:手）',
                         key: 'buyOneQuantity',
                         align: 'center'
                     },
                     {
                         title: '撤单（封板多少秒后封单小于流通z的比例(万分)）',
                         key: 'cancelCirculatezPercent',
                         align: 'center'
                     },
                     {
                         title: '封单后延迟校验撤单信息秒数',
                         key: 'sealDelaySecond',
                         align: 'center'
                     },

                     {
                          title: '40s封单循环比较百分比',
                          key: 'percentLastSealing',
                          align: 'center'
                      },
                      {
                          title: '靶向往前数的秒数',
                          key: 'targetSecond',
                          align: 'center'
                      },
                      {
                          title: '6s内逐笔多空比较百分比',
                          key: 'currentSealPercent',
                          align: 'center'
                      },
                      {
                          title: '6s多空对比固定手数&40秒心跳固定手数',
                          key: 'cancelQuantity',
                          align: 'center'
                      },
                      {
                          title: '靶向4前面判断大单标准(手)',
                          key: 'targetFourBig',
                          align: 'center'
                      },
                      {
                          title: '靶向4大单bc百分比',
                          key: 'targetFourPercent',
                          align: 'center'
                      },
                      {
                          title: '369固定值版(手)',
                          key: 'baseSealing',
                          align: 'center'
                      },
                      {
                         title: '几分钟内不成交(分钟)',
                         key: 'noDealMinute',
                         align: 'center'
                      },
                     {
                       title: '固定时间(内成交+撤单量)>把前量百分比',
                       key: 'beforeSealingPercent',
                       align: 'center'
                     },
                     {
                       title: '分时成交固定手数(手)',
                       key: 'threeSecondTradeQuantity',
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
                 data15: [

                 ],
                 data16: [

                 ],
                 modal1: false,
                 modal2: false,
                 inUse:0,
                 remark1:'暂时无描述',
                 remark2:'暂时无描述',
                 remark3:'暂时无描述',
                 remark4:'暂时无描述',
                 open1:0,
                 open2:0,
                 open3:0,
                 open4:0,
                 indexId:0
             }
        },
        methods: {
             show (row) {
                 this.indexId=row.id;
                 this.param1=row.insertCirculatezPercent;
                 this.param2=row.soldOneQuantity;
                 this.param3=row.buyOneQuantity;
                 this.param4=row.cancelCirculatezPercent;
                 this.param5=row.sealDelaySecond;
                 this.param6=row.percentMaxBuyOne;
                 this.param7=row.percentCirculatez;
                 this.param8=row.percentLastSealing;
                 this.param9=row.targetSecond;
                 this.param10=row.currentSealPercent;
                 this.param11=row.cancelQuantity;
                 this.param12=row.targetFourBig;
                 this.param13=row.targetFourPercent;
                 this.param14=row.baseSealing;
                 this.param15=row.noDealMinute;
                 this.param16=row.beforeSealingPercent;
                 this.param17=row.threeSecondTradeQuantity;

             },
             ok () {
                  var primaryKey = this.indexId
                  var insertCirculatezPercent= this.param1
                  var soldOneQuantity= this.param2
                  var buyOneQuantity= this.param3
                  var cancelCirculatezPercent= this.param4
                  var sealDelaySecond= this.param5
                  var percentMaxBuyOne = this.param6;
                  var percentCirculatez = this.param7;
                  var percentLastSealing = this.param8;
                  var targetSecond = this.param9;
                  var currentSealPercent = this.param10;
                  var cancelQuantity = this.param11;
                  var targetFourBig = this.param12;
                  var targetFourPercent = this.param13;
                  var baseSealing = this.param14;
                  var noDealMinute = this.param15;
                  var beforeSealingPercent = this.param16;
                  var threeSecondTradeQuantity = this.param17;
                  this.$api.post('singular/paramConfig/updateConfig', {id:primaryKey,insertCirculatezPercent:insertCirculatezPercent,soldOneQuantity:soldOneQuantity,buyOneQuantity:buyOneQuantity,cancelCirculatezPercent:cancelCirculatezPercent,sealDelaySecond:sealDelaySecond,percentMaxBuyOne:percentMaxBuyOne,percentCirculatez:percentCirculatez,percentLastSealing:percentLastSealing,targetSecond:targetSecond,currentSealPercent:currentSealPercent,cancelQuantity:cancelQuantity,targetFourBig:targetFourBig,targetFourPercent:targetFourPercent,baseSealing:baseSealing,noDealMinute:noDealMinute,beforeSealingPercent:beforeSealingPercent,threeSecondTradeQuantity:threeSecondTradeQuantity}, r => {
                    location.reload()
                  })

             },
             flushCache(signIndex){
                 this.$api.post('singular/paramConfig/publish', {sign:signIndex}, r => {
                     this.$Message.info("刷新成功");
                     location.reload()
                 })
             },

            showRemark (remarkStr,signIndex) {
              this.param100 =signIndex;
              this.param0=remarkStr;
            },
            okRemark () {
              var signIndex = this.param100;
              var remarkStr= this.param0;
              this.$api.post('singular/paramConfig/updateRemark', {sign:signIndex,remark:remarkStr}, r => {
                this.$Message.info("刷新成功");
                location.reload()
              })
            },

            closeAllStrategy(signIndex){
              this.$api.post('singular/paramConfig/closeAllStrategy', {sign:signIndex}, r => {
                location.reload()
              })
            },
            openAllStrategy(signIndex){
              this.$api.post('singular/paramConfig/openAllStrategy', {sign:signIndex}, r => {
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
