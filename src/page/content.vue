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
            <Menu active-name="1-6" theme="dark" width="auto" :open-names="['1']" @on-select="routeTo">
                <Submenu name="1">
                    <template slot="title">
                        <Icon type="ios-navigate"></Icon>
                        股票管理
                    </template>
                    <MenuItem  name="1-8"><router-link to="/userLogin/1"><font color="#fff">登录</font></router-link></MenuItem>
                    <MenuItem  name="1-1"><router-link to="/"><font color="#fff">账户信息</font></router-link></MenuItem>
                    <MenuItem  name="1-2"><router-link to="/disableStockPool/1"><font color="#fff">禁止下单股票池</font></router-link></MenuItem>
                    <MenuItem  name="1-3"><router-link to="/radicalDragonPool/1"><font color="#fff">小池子</font></router-link></MenuItem>
                    <MenuItem  name="1-4"><router-link to="/orderCancelPool/1"><font color="#fff">等待撤单</font></router-link></MenuItem>
                    <MenuItem  name="1-5"><router-link to="/cancelLog/1"><font color="#fff">撤单日志</font></router-link></MenuItem>
                    <MenuItem  name="1-6"><router-link to="/content/1"><font color="#fff">参数</font></router-link></MenuItem>
                    <MenuItem  name="1-7"><router-link to="/sellOrder/1"><font color="#fff">卖出</font></router-link></MenuItem>
                    <MenuItem  name="1-9"><router-link to="/openButton/1"><font color="#fff">按钮</font></router-link></MenuItem>
                    <MenuItem  name="1-10"><router-link to="/blockView/1"><font color="#fff">板块信息</font></router-link></MenuItem>
                </Submenu>
            </Menu>
        </Sider>
        <Layout :style="{marginLeft: '200px'}">
            <div class="blankRow">
            </div>
            <template>
              <template>
                <div>
                  <i class="remark" >{{remark1}}</i>
                  <tag v-if="inUse===1" class="in-use">正在使用</tag>
                  <tag v-else class="no-use">未启用</tag>

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

              <template>
                <div>
                  <i class="remark" >{{remark2}}</i><i>&nbsp&nbsp&nbsp&nbsp</i>
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
                  <i class="remark" >{{remark1}}</i>
                  <tag v-if="inUse===2" class="in-use">正在使用</tag>
                  <tag v-else class="no-use">未启用</tag>

                  <Button style="float:right" type="warning" @click="flushCache(2)">启用参数</Button>
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

              <template>
                <div>
                  <i class="remark" >{{remark2}}</i><i>&nbsp&nbsp&nbsp&nbsp</i>
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
                        买入（行情下单比例(万分)）:&nbsp&nbsp<Input name= "param1" v-model="param1" placeholder="" style="width: 100px" />
                    </div>
                    <div>
                        炮灰最大限制(手):&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<Input name= "param2" v-model="param2" placeholder="" style="width: 100px" />
                    </div>
                    <div>
                        买入（炮灰量 单位:手）:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp   <Input name= "param3" v-model="param3" placeholder="" style="width: 100px" />
                    </div>
                    <div>
                        撤单（369比例(万分)）:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<Input name= "param4" v-model="param4" placeholder="" style="width: 100px" />
                    </div>
                    <div>
                        369秒数:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp <Input name= "param5" v-model="param5" placeholder="" style="width: 100px" />
                    </div>
                    <div>
                        封单下降百分比参数:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp <Input name= "param6" v-model="param6" placeholder="" style="width: 100px" />
                    </div>

                </Modal>
            </template>
        </Layout>
    </div>
</template>
<script>
   export default {
        created () {
             this.$api.post('dragon/paramConfig/dataList', {}, r => {
                  var infos = r.data;
                  infos.forEach(item => {
                      item.insertCirculatezPercentStr=item.insertCirculatezPercent;
                      if(item.stockType==0){
                        item.stockTypeStr = "5000万以下"
                      }
                      if(item.stockType==1){
                        item.stockTypeStr = "5000万-1亿"
                      }
                      if(item.stockType==2){
                        item.stockTypeStr = "1-2亿"
                      }
                      if(item.stockType==3){
                        item.stockTypeStr = "2-3亿"
                      }
                      if(item.stockType==4){
                        item.stockTypeStr = "3-5.5亿"
                      }
                      if(item.stockType==5){
                        item.stockTypeStr = "5.5-8亿"
                      }
                      if(item.stockType==6){
                        item.stockTypeStr = "8-11亿"
                      }
                      if(item.stockType==7){
                        item.stockTypeStr = "11亿以上"
                      }
                   })

                  infos.forEach(item =>{
                    if(item.memberType==1) {
                      if (item.sign == 1) {
                        this.data13.push(item)
                      }
                      if (item.sign == 2) {
                        this.data14.push(item)
                      }
                    }

                    if(item.memberType==2) {
                      if (item.sign == 1) {
                        this.data15.push(item)
                      }
                      if (item.sign == 2) {
                        this.data16.push(item)
                      }
                    }

                    if(item.used==1){
                        this.inUse = item.memberType;
                    }
                    if(item.sign==1){
                      this.remark1=item.remark;
                    }
                    if(item.sign==2){
                      this.remark2=item.remark;
                    }

                    if(item.sign==1){
                      this.open1=item.openAll;
                    }
                    if(item.sign==2){
                      this.open2=item.openAll;
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
                         title: '369秒数',
                         key: 'sealDelaySecond',
                         align: 'center'
                     },

                     {
                          title: '封单下降百分比参数',
                          key: 'percentLastSealing',
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
                 this.param6=row.percentLastSealing;
             },
             ok () {
                  var primaryKey = this.indexId
                  var insertCirculatezPercent= this.param1
                  var soldOneQuantity= this.param2
                  var buyOneQuantity= this.param3
                  var cancelCirculatezPercent= this.param4
                  var sealDelaySecond= this.param5
                  var percentLastSealing = this.param6;

                  this.$api.post('dragon/paramConfig/updateConfig', {id:primaryKey,insertCirculatezPercent:insertCirculatezPercent,soldOneQuantity:soldOneQuantity,buyOneQuantity:buyOneQuantity,
                    cancelCirculatezPercent:cancelCirculatezPercent,sealDelaySecond:sealDelaySecond, percentLastSealing:percentLastSealing}, r => {
                    location.reload()
                  })

             },
             flushCache(memberType){
                 this.$api.post('dragon/paramConfig/publish', {memberType:memberType}, r => {
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
              this.$api.post('dragon/paramConfig/updateRemark', {sign:signIndex,remark:remarkStr}, r => {
                this.$Message.info("刷新成功");
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
