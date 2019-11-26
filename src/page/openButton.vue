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
            <Menu active-name="1-16" theme="dark" width="auto" :open-names="['1']" @on-select="routeTo">
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
                    <MenuItem  name="1-17"><router-link to="/insertQueue/1"><font color="#fff">插队池</font></router-link></MenuItem>
                    <MenuItem  name="1-18"><router-link to="/connect/1"><font color="#fff">连接相关</font></router-link></MenuItem>
                    <MenuItem  name="1-19"><router-link to="/areaBlockView/1"><font color="#fff">地区板块</font></router-link></MenuItem>
                    <MenuItem  name="1-20"><router-link to="/statisticDaily/1"><font color="#fff">连板成功详情统计</font></router-link></MenuItem>
                    <MenuItem  name="1-21"><router-link to="/statisticTotalDaily/1"><font color="#fff">连板成功率统计</font></router-link></MenuItem>
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
              <Button v-if="!openLongLeg"  type="primary" @click="changeButton(0)">大长腿已关闭,请开启</Button>
              <Button v-if="openLongLeg"  type="error" @click="changeButton(0)">大长腿已开启,请关闭</Button>

              <Button v-if="!openJumpInQueue"  type="primary" @click="changeButton(1)">插队已关闭,请开启</Button>
              <Button v-if="openJumpInQueue"  type="error" @click="changeButton(1)">插队已开启,请关闭</Button>

              <Button v-if="!openNewPosition"  type="primary" @click="changeButton(2)">高位仓位已关闭,请开启</Button>
              <Button v-if="openNewPosition"  type="error" @click="changeButton(2)">高位仓位已开启,请关闭</Button>

              <Button v-if="!openTwoBigEntrust"  type="primary" @click="changeButton(3)">下单两个大单已关闭,请开启</Button>
              <Button v-if="openTwoBigEntrust"  type="error" @click="changeButton(3)">下单两个大单已开启,请关闭</Button>

              <Button v-if="!openScareOpen"  type="primary" @click="changeButton(4)">恐慌开板已关闭,请开启</Button>
              <Button v-if="openScareOpen"  type="error" @click="changeButton(4)">恐慌开板已开启,请关闭</Button>

              <Button v-if="!openOneLinePlankInsertOrder"  type="primary" @click="changeButton(5)">一字回封下单越过禁止下单按钮已关闭,请开启</Button>
              <Button v-if="openOneLinePlankInsertOrder"  type="error" @click="changeButton(5)">一字回封下单越过禁止下单按钮已开启,请关闭</Button>

              <Button v-if="!openUniteCirculateInfo"  type="primary" @click="changeButton(7)">按照3亿流通撤单已关闭,请开启</Button>
              <Button v-if="openUniteCirculateInfo"  type="error" @click="changeButton(7)">按照3亿流通撤单已开启,请关闭</Button>

              <Button v-if="!openYesterdayHot"  type="primary" @click="changeButton(8)">昨日打爆已经关闭,请开启</Button>
              <Button v-if="openYesterdayHot"  type="error" @click="changeButton(8)">昨日打爆已经开启,请关闭</Button>

            </div>
            <div class="blankRow">
            </div>
            <div>


              <Button v-if="!openNineSecond"  type="primary" @click="changeButton(9)">单前量9s防爆头已关闭,请开启</Button>
              <Button v-if="openNineSecond"  type="error" @click="changeButton(9)">单前量9s防爆头已开启,请关闭</Button>

              <Button v-if="openNewWeakPlank"  type="primary" @click="changeButton(10)">卖一弱板3次已开启,请切换4次</Button>
              <Button v-if="!openNewWeakPlank"  type="error" @click="changeButton(10)">卖一弱板4次已开启,请切换3次</Button>

              <Button v-if="!openSuperSpeed"  type="primary" @click="changeButton(6)">上午L1超级加速已关闭,请开启</Button>
              <Button v-if="openSuperSpeed"  type="error" @click="changeButton(6)">上午L1超级加速已开启,请关闭</Button>

              <Button v-if="!openZhuBiSuperSpeed"  type="primary" @click="changeButton(11)">全天逐笔超级加速已关闭,请开启</Button>
              <Button v-if="openZhuBiSuperSpeed"  type="error" @click="changeButton(11)">全天逐笔超级加速已开启,请关闭</Button>

              <Button v-if="!openCancelSuperSpeed"  type="primary" @click="changeButton(12)">撤单0.5s已关闭,请开启</Button>
              <Button v-if="openCancelSuperSpeed"  type="error" @click="changeButton(12)">撤单0.5s已开启,请关闭</Button>

              <Button v-if="!openBeforeBigEntrust"  type="primary" @click="changeButton(13)">靶前大单撤单策略已关闭,请开启</Button>
              <Button v-if="openBeforeBigEntrust"  type="error" @click="changeButton(13)">靶前大单撤单策略已开启,请关闭</Button>

              <Button v-if="!openNearBigEntrust"  type="primary" @click="changeButton(14)">靶附近大单撤单策略已关闭,请开启</Button>
              <Button v-if="openNearBigEntrust"  type="error" @click="changeButton(14)">靶附近大单撤单策略已开启,请关闭</Button>

              <Button v-if="!openCallMarketInvestorListen"  type="primary" @click="changeButton(15)">集合庄股检测已关闭,请开启</Button>
              <Button v-if="openCallMarketInvestorListen"  type="error" @click="changeButton(15)">集合庄股检测已开启,请关闭</Button>

            </div>

            <div class="blankRow">
            </div>
            <div>
              <Button v-if="!open125MillionSpeed"  type="primary" @click="changeButton(16)">125ms加速已关闭,请开启</Button>
              <Button v-if="open125MillionSpeed"  type="error" @click="changeButton(16)">125ms加速已开启,请关闭</Button>

              <Button v-if="!openBeforeQuantity"  type="primary" @click="changeButton(17)">单前量5万策略已关闭,请开启</Button>
              <Button v-if="openBeforeQuantity"  type="error" @click="changeButton(17)">单前量5万策略已已开启,请关闭</Button>

              <Button v-if="!openHighSellHelper"  type="primary" @click="changeButton(18)">33分前高点卖出小助手已关闭,请开启</Button>
              <Button v-if="openHighSellHelper"  type="error" @click="changeButton(18)">33分前高点卖出小助手已开启,请关闭</Button>

              <Button v-if="!openCallMarketInsert"  type="primary" @click="changeButton(19)">集合竞价下单已关闭,请开启</Button>
              <Button v-if="openCallMarketInsert"  type="error" @click="changeButton(19)">集合竞价下单已开启,请关闭</Button>

              <Button v-if="!openBigSunDetailOrder"  type="primary" @click="changeButton(20)">大阳线逐笔介入已关闭,请开启</Button>
              <Button v-if="openBigSunDetailOrder"  type="error" @click="changeButton(20)">大阳线逐笔介入下单已开启,请关闭</Button>

              <Button v-if="!openBreakingOrder"  type="primary" @click="changeButton(21)">拆单已关闭,请开启</Button>
              <Button v-if="openBreakingOrder"  type="error" @click="changeButton(21)">拆单已开启,请关闭</Button>

              <Button v-if="!openTradesCompare"  type="primary" @click="changeButton(22)">分时成交放量已关闭,请开启</Button>
              <Button v-if="openTradesCompare"  type="error" @click="changeButton(22)">分时成交放量已开启,请关闭</Button>

              <Button v-if="!dragonHeadSwitch"  type="primary" @click="changeButton(23)">打爆当日跟风已关闭,请开启</Button>
              <Button v-if="dragonHeadSwitch"  type="error" @click="changeButton(23)">打爆当日跟风已开启,请关闭</Button>
            </div>

            <div class="blankRow">
            </div>

            <div>
              <Button v-if="big2BMaxCirculate===0" type="primary" @click="modal1=true;show()">扫版流通z设置</Button>
              <Button v-if="big2BMaxCirculate>0" type="error" @click="modal1=true;show()">扫版流通z设置</Button>

              <Button  type="primary" @click="modal6=true;show6()">{{disableOrderOverMinutes}}分钟后回封不打</Button>

              <Button  type="primary" @click="modal3=true;show3()">阳线板下单次数设置{{generalPlankCount}}次</Button>

              <Button  type="primary" @click="modal4=true;show4()">一字板下单次数设置{{oneLinePlankCount}}次</Button>

              <Button  type="primary" @click="modal5=true;show5()">插队下单次数设置{{jumpQueueCount}}次</Button>

              <Button v-if="carryManySInto===0" type="primary" @click="modal7=true;show7()">抬轿大于多少流通z已关闭</Button>
              <Button v-if="carryManySInto>0" type="error" @click="modal7=true;show7()"> 抬轿大于多少流通z已开启</Button>

              <Button v-if="sweepPlankCirculate===0" type="primary" @click="modal8=true;show8()">新版扫版已关闭,请开启</Button>
              <Button v-if="sweepPlankCirculate>0" type="error" @click="modal8=true;show8()"> 新版扫版已开启,请关闭</Button>

              <Button v-if="!sellNineRate"  type="primary" @click="changeButton(24)">9个点不涨停卖出已关闭,请开启</Button>
              <Button v-if="sellNineRate"  type="error" @click="changeButton(24)">9个点不涨停卖出已开启,请关闭</Button>

              <Button v-if="!overCirculatezDisable"  type="error" @click="changeButton(25)">5亿以上下单已开启,请关闭</Button>
              <Button v-if="overCirculatezDisable"  type="primary" @click="changeButton(25)">5亿以上下单已关闭,请开启</Button>


            </div>

          </template>

          <template>
            <Modal
              v-model="modal1"
              title="扫版流通z"
              @on-ok="ok"
              @on-cancel="cancel">
              <div>
                扫版流通z(单位:亿):<Input name= "param2" v-model="param2" placeholder="" style="width: 300px" />
              </div>
            </Modal>
          </template>

          <template>
            <Modal
              v-model="modal3"
              title="阳线板下单次数"
              @on-ok="ok3"
              @on-cancel="cancel3">
              <div>
                阳线板下单次数:<Input name= "param3" v-model="param3" placeholder="" style="width: 300px" />
              </div>
            </Modal>
          </template>
          <template>
            <Modal
              v-model="modal4"
              title="一字板下单次数"
              @on-ok="ok4"
              @on-cancel="cancel4">
              <div>
                一字板下单次数:<Input name= "param4" v-model="param4" placeholder="" style="width: 300px" />
              </div>
            </Modal>
          </template>
          <template>
            <Modal
              v-model="modal5"
              title="插队下单次数"
              @on-ok="ok5"
              @on-cancel="cancel5">
              <div>
                插队下单次数:<Input name= "param5" v-model="param5" placeholder="" style="width: 300px" />
              </div>
            </Modal>
          </template>

          <template>
            <Modal
              v-model="modal6"
              title="回封间隔时间"
              @on-ok="ok6"
              @on-cancel="cancel6">
              <div>
                回封间隔时间:<Input name= "param6" v-model="param6" placeholder="" style="width: 300px" />
              </div>
            </Modal>
          </template>

          <template>
            <Modal
              v-model="modal7"
              title="抬轿大于多少流通z开启"
              @on-ok="ok7"
              @on-cancel="cancel7">
              <div>
                抬轿大于多少流通z开启:<Input name= "param7" v-model="param7" placeholder="" style="width: 300px" />
              </div>
            </Modal>
          </template>

          <template>
            <Modal
              v-model="modal8"
              title="新版扫版大于多少流通z开启"
              @on-ok="ok8"
              @on-cancel="cancel8">
              <div>
                新版扫版大于多少流通z开启:<Input name= "param8" v-model="param8" placeholder="" style="width: 300px" />
              </div>
            </Modal>
          </template>

        </Layout>
    </div>
</template>
<script>
   export default {
        created () {
           this.$api.post('singular/button/list', {}, r => {
             this.openLongLeg=r.data.openLongLeg,
             this.openJumpInQueue=r.data.openJumpInQueue,
             this.openNewPosition= r.data.openNewPosition,
             this.openTwoBigEntrust=r.data.openTwoBigEntrust,
             this.openScareOpen = r.data.openScareOpen,
             this.openOneLinePlankInsertOrder= r.data.openOneLinePlankInsertOrder,
             this.openSuperSpeed= r.data.openSuperSpeed,
             this.openUniteCirculateInfo = r.data.openUniteCirculateInfo,
             this.openYesterdayHot = r.data.openYesterdayHot,
             this.openNineSecond = r.data.openNineSecond,
             this.openNewWeakPlank = r.data.openNewWeakPlank,
             this.openZhuBiSuperSpeed = r.data.openZhuBiSuperSpeed,
             this.openCancelSuperSpeed = r.data.openCancelSuperSpeed,
             this.openBeforeBigEntrust = r.data.openBeforeBigEntrust,
             this.openNearBigEntrust = r.data.openNearBigEntrust,
             this.openCallMarketInvestorListen=r.data.openCallMarketInvestorListen,
             this.open125MillionSpeed=r.data.open125MillionSpeed,
             this.openBeforeQuantity=r.data.openBeforeQuantity,
               this.openTradesCompare = r.data.openTradesCompare,
               this.openBreakingOrder = r.data.openBreakingOrder,
               this.openHighSellHelper = r.data.openHighSellHelper,
               this.openCallMarketInsert = r.data.openCallMarketInsert,
               this.openBigSunDetailOrder = r.data.openBigSunDetailOrder,
               this.big2BMaxCirculate = r.data.big2BMaxCirculate,
               this.generalPlankCount = r.data.generalPlankCount,
               this.oneLinePlankCount =r.data.oneLinePlankCount,
               this.jumpQueueCount = r.data.jumpQueueCount,
               this.disableOrderOverMinutes = r.data.disableOrderOverMinutes,
               this.carryManySInto = r.data.carryManySInto,
               this.sweepPlankCirculate = r.data.sweepPlankCirculate,
             this.dragonHeadSwitch = r.data.dragonHeadSwitch,
               this.sellNineRate = r.data.sellNineRate,
               this.overCirculatezDisable = r.data.overCirculatezDisable
           });

        },

        data () {
           return {
             openLongLeg:false,
             openJumpInQueue:false,
             openNewPosition: false,
             openTwoBigEntrust:false,
             openScareOpen:false,
             openOneLinePlankInsertOrder:true,
             openSuperSpeed:false,
             openUniteCirculateInfo:false,
             openYesterdayHot:false,
             openNineSecond:false,
             openNewWeakPlank:false,
             openZhuBiSuperSpeed:false,
             openCancelSuperSpeed:false,
             openBeforeBigEntrust:false,
             openNearBigEntrust:false,
             openCallMarketInvestorListen:false,
             open125MillionSpeed:false,
             openBeforeQuantity:false,
             openHighSellHelper:false,
             openCallMarketInsert:false,
             openBigSunDetailOrder:false,
             openBreakingOrder:true,
             openTradesCompare:false,
             big2BMaxCirculate:0,
             generalPlankCount:2,
             oneLinePlankCount:2,
             jumpQueueCount:1,
             disableOrderOverMinutes:360,
             carryManySInto:0,
             sweepPlankCirculate:0,
             dragonHeadSwitch:true,
             sellNineRate:false,
             overCirculatezDisable:false,
             modal1: false,
             modal3: false,
             modal4: false,
             modal5: false,
             modal6:false,
             modal7:false,
             modal8:false
           }

        },
        methods: {

          changeButton (index) {
              if(index ==0){
                this.openLongLeg = !(this.openLongLeg);
              }
              if(index ==1){
                this.openJumpInQueue = !(this.openJumpInQueue);
              }
              if(index ==2){
                this.openNewPosition = !(this.openNewPosition);
              }
              if(index ==3){
                this.openTwoBigEntrust = !(this.openTwoBigEntrust);
              }
              if(index ==4){
                this.openScareOpen = !(this.openScareOpen);
              }
              if(index ==5){
                this.openOneLinePlankInsertOrder = !(this.openOneLinePlankInsertOrder);
              }
              if(index ==6){
                this.openSuperSpeed = !(this.openSuperSpeed);
              }
              if(index ==7){
                this.openUniteCirculateInfo = !(this.openUniteCirculateInfo);
              }
              if(index ==8){
                this.openYesterdayHot = !(this.openYesterdayHot);
              }
              if(index ==9){
                this.openNineSecond = !(this.openNineSecond);
              }
            if(index ==10){
              this.openNewWeakPlank = !(this.openNewWeakPlank);
            }
            if(index ==11){
              this.openZhuBiSuperSpeed = !(this.openZhuBiSuperSpeed);
            }
            if(index ==12){
              this.openCancelSuperSpeed = !(this.openCancelSuperSpeed);
            }
            if(index==13){
                this.openBeforeBigEntrust = !(this.openBeforeBigEntrust);
            }
            if(index==14){
              this.openNearBigEntrust = !(this.openNearBigEntrust);
            }
            if(index==15){
              this.openCallMarketInvestorListen = !(this.openCallMarketInvestorListen);
            }
            if(index==16){
              this.open125MillionSpeed = !(this.open125MillionSpeed);
            }
            if(index==17){
              this.openBeforeQuantity = !(this.openBeforeQuantity);
            }
            if(index==18){
              this.openHighSellHelper = !(this.openHighSellHelper);
            }
            if(index==19){
              this.openCallMarketInsert = !(this.openCallMarketInsert);
            }
            if(index==20){
              this.openBigSunDetailOrder = !(this.openBigSunDetailOrder);
            }
            if(index==21){
              this.openBreakingOrder = !(this.openBreakingOrder);
            }
            if(index ==22){
                this.openTradesCompare = !(this.openTradesCompare);
            }
            if(index ==23){
              this.dragonHeadSwitch = !(this.dragonHeadSwitch);
            }
            if(index==24){
                this.sellNineRate=!(this.sellNineRate);
            }
            if(index==25){
                this.overCirculatezDisable = !(this.overCirculatezDisable);
            }
              var openLongLegFlag = this.openLongLeg;
              var openJumpInQueueFlag = this.openJumpInQueue;
              var openNewPositionFlag = this.openNewPosition;
              var openTwoBigEntrustFlag = this.openTwoBigEntrust;
              var openScareOpenFlag = this.openScareOpen;
              var openOneLinePlankInsertOrderFlag = this.openOneLinePlankInsertOrder;
              var openSuperSpeedFlag = this.openSuperSpeed;
              var openUniteCirculateInfoFlag = this.openUniteCirculateInfo;
              var openYesterdayHotFlag = this.openYesterdayHot;
              var openNineSecondFlag = this.openNineSecond;
              var openNewWeakPlankFlag = this.openNewWeakPlank;
              var openZhuBiSuperSpeedFlag = this.openZhuBiSuperSpeed;
              var openCancelSuperSpeedFlag = this.openCancelSuperSpeed;
              var openBeforeBigEntrustFlag = this.openBeforeBigEntrust;
              var openNearBigEntrustFlag = this.openNearBigEntrust;
              var openCallMarketInvestorListenFlag = this.openCallMarketInvestorListen;
              var open125MillionSpeedFlag = this.open125MillionSpeed;
              var openBeforeQuantityFlag = this.openBeforeQuantity;
              var openHighSellHelperFlag = this.openHighSellHelper;
              var openCallMarketInsertFlag = this.openCallMarketInsert;
              var openBigSunDetailOrderFlag = this.openBigSunDetailOrder;
              var big2BMaxCirculateFlag = this.big2BMaxCirculate;
              var generalPlankCountFlag = this.generalPlankCount;
              var oneLinePlankCountFlag = this.oneLinePlankCount;
              var jumpQueueCountFlag = this.jumpQueueCount;
              var openBreakingOrderFlag = this.openBreakingOrder;
              var disableOrderOverMinutesFlag = this.disableOrderOverMinutes;
              var openTradesCompareFlag = this.openTradesCompare;
              var carryManySIntoFlag = this.carryManySInto;
              var sweepPlankCirculateFlag = this.sweepPlankCirculate;
              var dragonHeadSwitchFlag = this.dragonHeadSwitch;
              var sellNineRateFlag = this.sellNineRate;
              var overCirculatezDisableFlag = this.overCirculatezDisable;
              this.$api.post('singular/button/changeButton', {openLongLeg:openLongLegFlag,openJumpInQueue:openJumpInQueueFlag,openNewPosition:openNewPositionFlag,openTwoBigEntrust:openTwoBigEntrustFlag,openScareOpen:openScareOpenFlag,openOneLinePlankInsertOrder:openOneLinePlankInsertOrderFlag,openSuperSpeed:openSuperSpeedFlag,openUniteCirculateInfo:openUniteCirculateInfoFlag,openYesterdayHot:openYesterdayHotFlag,openNineSecond:openNineSecondFlag,openNewWeakPlank:openNewWeakPlankFlag,openZhuBiSuperSpeed:openZhuBiSuperSpeedFlag,openCancelSuperSpeed:openCancelSuperSpeedFlag,openBeforeBigEntrust:openBeforeBigEntrustFlag,openNearBigEntrust:openNearBigEntrustFlag,openCallMarketInvestorListen:openCallMarketInvestorListenFlag,open125MillionSpeed:open125MillionSpeedFlag,openBeforeQuantity:openBeforeQuantityFlag,openHighSellHelper:openHighSellHelperFlag,openCallMarketInsert:openCallMarketInsertFlag,openBigSunDetailOrder:openBigSunDetailOrderFlag,big2BMaxCirculate:big2BMaxCirculateFlag,generalPlankCount:generalPlankCountFlag,oneLinePlankCount:oneLinePlankCountFlag,jumpQueueCount:jumpQueueCountFlag,openBreakingOrder:openBreakingOrderFlag,disableOrderOverMinutes:disableOrderOverMinutesFlag,openTradesCompare:openTradesCompareFlag,carryManySInto:carryManySIntoFlag,sweepPlankCirculate:sweepPlankCirculateFlag,dragonHeadSwitch:dragonHeadSwitchFlag,sellNineRate:sellNineRateFlag,overCirculatezDisable:overCirculatezDisableFlag}, r => {
                location.reload()
              })

            },

            show () {
              this.param2=this.big2BMaxCirculate;
            },
            ok () {

              this.big2BMaxCirculate = this.param2
              if(this.param===''){
                this.big2BMaxCirculate = 0;
              }
              this.changeButton (30)
            },
            cancel () {
              this.$Message.info($("param1").value)
            },

          show3 () {
            this.param3=this.generalPlankCount;
          },
          ok3 () {

            this.generalPlankCount = this.param3
            if(this.param===''){
              this.generalPlankCount = 2;
            }
            this.changeButton (31)
          },
          cancel3 () {
            this.$Message.info($("param3").value)
          },

          show4 () {
            this.param4=this.oneLinePlankCount;
          },
          ok4 () {

            this.oneLinePlankCount = this.param4
            if(this.param===''){
              this.oneLinePlankCount = 2;
            }
            this.changeButton (32)
          },
          cancel4 () {
            this.$Message.info($("param4").value)
          },

          show5 () {
            this.param5=this.jumpQueueCount;
          },
          ok5 () {
            this.jumpQueueCount = this.param5
            if(this.param===''){
              this.jumpQueueCount = 1;
            }
            this.changeButton (33)
          },
          cancel5 () {
            this.$Message.info($("param5").value)
          },

          show6 () {
            this.param6=this.disableOrderOverMinutes;
          },

          ok6 () {
            this.disableOrderOverMinutes = this.param6
            if(this.param===''){
              this.disableOrderOverMinutes = 360;
            }
            this.changeButton (34)
          },
          cancel6 () {
            this.$Message.info($("param6").value)
          },

          show7 () {
            this.param7=this.carryManySInto;
          },

          ok7 () {
            this.carryManySInto = this.param7
            if(this.param===''){
              this.carryManySInto = 0;
            }
            this.changeButton (35)
          },
          cancel7 () {
            this.$Message.info($("param7").value)
          },


          show8 () {
            this.param8=this.sweepPlankCirculate;
          },

          ok8 () {
            this.sweepPlankCirculate = this.param8
            if(this.param===''){
              this.sweepPlankCirculate = 0;
            }
            this.changeButton (35)
          },
          cancel8 () {
            this.$Message.info($("param8").value)
          }
        }
   }
</script>
