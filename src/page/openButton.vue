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

              <Button v-if="!openSuperSpeed"  type="primary" @click="changeButton(6)">超级加速已关闭,请开启</Button>
              <Button v-if="openSuperSpeed"  type="error" @click="changeButton(6)">超级加速已开启,请关闭</Button>

              <Button v-if="!openUniteCirculateInfo"  type="primary" @click="changeButton(7)">按照3亿流通z撤单已经关闭,请开启</Button>
              <Button v-if="openUniteCirculateInfo"  type="error" @click="changeButton(7)">按照3亿流通z撤单已经开启,请关闭</Button>
            </div>
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
             this.openUniteCirculateInfo = r.data.openUniteCirculateInfo
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

              var openLongLegFlag = this.openLongLeg;
              var openJumpInQueueFlag = this.openJumpInQueue;
              var openNewPositionFlag = this.openNewPosition;
              var openTwoBigEntrustFlag = this.openTwoBigEntrust;
              var openScareOpenFlag = this.openScareOpen;
              var openOneLinePlankInsertOrderFlag = this.openOneLinePlankInsertOrder;
              var openSuperSpeedFlag = this.openSuperSpeed;
              var openUniteCirculateInfoFlag = this.openUniteCirculateInfo;
              this.$api.post('singular/button/changeButton', {openLongLeg:openLongLegFlag,openJumpInQueue:openJumpInQueueFlag,openNewPosition:openNewPositionFlag,openTwoBigEntrust:openTwoBigEntrustFlag,openScareOpen:openScareOpenFlag,openOneLinePlankInsertOrder:openOneLinePlankInsertOrderFlag,openSuperSpeed:openSuperSpeedFlag,openUniteCirculateInfo:openUniteCirculateInfoFlag}, r => {
                location.reload()
              })

            },
        }
   }
</script>
