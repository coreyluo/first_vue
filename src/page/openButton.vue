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
      <Menu active-name="1-9" theme="dark" width="auto" :open-names="['1']" @on-select="routeTo">
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
          <MenuItem  name="1-12"><router-link to="/blockDiy/1"><font color="#fff">自定义板块</font></router-link></MenuItem>
          <MenuItem  name="1-11"><router-link to="/circulateInfo/1"><font color="#fff">股票信息</font></router-link></MenuItem>
          <MenuItem  name="1-13"><router-link to="/scareBuy/1"><font color="#fff">恐慌买入</font></router-link></MenuItem>
          <MenuItem  name="1-14"><router-link to="/batchBlock/1"><font color="#fff">批量买入</font></router-link></MenuItem>
          <MenuItem  name="1-15"><router-link to="/disableUnmatch/1"><font color="#fff">禁止未匹配量买入</font></router-link></MenuItem>
          <MenuItem  name="1-16"><router-link to="/stockBeforeRateInfo/1"><font color="#fff">涨幅过高股票信息</font></router-link></MenuItem>
        </Submenu>
      </Menu>
    </Sider>
    <Layout :style="{marginLeft: '200px'}">
      <div class="blankRow">
      </div>

      <template>
        <div>
          <Button v-if="!uppersButton"  type="primary" @click="changeButton(1)">逐笔成交下单已关闭,请开启</Button>
          <Button v-if="uppersButton"  type="error" @click="changeButton(1)">逐笔成交下单已开启,请关闭</Button>

          <Button v-if="!shButton"  type="primary" @click="changeShButton()">上证已关闭,请开启</Button>
          <Button v-if="shButton"  type="error" @click="changeShButton()">上证已开启,请关闭</Button>

          <Button  type="primary" @click="modal1=true;show1()">创业板延迟{{delay300Mill}}下单</Button>

          <Button v-if="!riskControlButton"  type="primary" @click="changeRiskControlButton()">低市值股票监管已关闭,请开启</Button>
          <Button v-if="riskControlButton"  type="error" @click="changeRiskControlButton()">低市值股票监管已开启,请关闭</Button>

          <Button v-if="!cancelButton"  type="primary" @click="changeRadicalCancelButton()">激进池禁止撤单已开启,请开启撤单</Button>
          <Button v-if="cancelButton"  type="error" @click="changeRadicalCancelButton()">激进池允许撤单已开启,请关闭撤单</Button>

          <Button  type="primary" @click="modal2=true;show2()">未匹配量流通z系数{{unmatchPercentRatio}}</Button>

          <Button type="primary"  @click="modal3=true;show3()">涨幅过高系数</Button>
        </div>
      </template>

      <template>
        <Modal
          v-model="modal1"
          title="回封间隔时间"
          @on-ok="ok1"
          @on-cancel="cancel1">
          <div>
            回封间隔时间:<Input name= "param1" v-model="param1" placeholder="" style="width: 300px" />
          </div>
        </Modal>
      </template>

      <template>
        <Modal
          v-model="modal2"
          title="未匹配量流通z系数"
          @on-ok="ok2"
          @on-cancel="cancel2">
          <div>
            未匹配量流通z系数:<Input name= "param2" v-model="param2" placeholder="" style="width: 300px" />
          </div>
        </Modal>
      </template>

      <template>
        <Modal
          v-model="modal3"
          title="涨幅过高系数"
          @on-ok="ok3"
          @on-cancel="cancel3">
          <div>
            涨幅过高股票仓位系数:<Input name= "positionRatioParam" v-model="positionRatioParam" placeholder="" style="width: 300px" />
          </div>
          <div>
            3日涨幅:<Input name= "rateDay3RatioParam" v-model="rateDay3RatioParam" placeholder="" style="width: 300px" />
          </div>
          <div>
            5日涨幅:<Input name= "rateDay5RatioParam" v-model="rateDay5RatioParam" placeholder="" style="width: 300px" />
          </div>
          <div>
            10日涨幅:<Input name= "rateDay10RatioParam" v-model="rateDay10RatioParam" placeholder="" style="width: 300px" />
          </div>
          <div>
            20日涨幅:<Input name= "rateDay20RatioParam" v-model="rateDay20RatioParam" placeholder="" style="width: 300px" />
          </div>
          <div>
            30日涨幅:<Input name= "rateDay30RatioParam" v-model="rateDay30RatioParam" placeholder="" style="width: 300px" />
          </div>
          <div>
            40日涨幅:<Input name= "rateDay40RatioParam" v-model="rateDay40RatioParam" placeholder="" style="width: 300px" />
          </div>
          <div>
            60日涨幅:<Input name= "rateDay60RatioParam" v-model="rateDay60RatioParam" placeholder="" style="width: 300px" />
          </div>
        </Modal>
      </template>

    </Layout>
  </div>
</template>
<script>
  export default {
    created () {
      this.$api.post('dragon/buttonConfig/list', {}, r => {
        this.uppersButton=r.data.uppersButton;
        this.cancelButton=r.data.cancelButton;
        this.shButton = r.data.shButton;
        this.riskControlButton = r.data.riskControlButton;
        this.delay300Mill = r.data.delay300Mill;
        this.unmatchPercentRatio =  r.data.unmatchPercentRatio
        this.positionRatio = r.data.positionRatio;
        this.rateDay3Ratio = r.data.rateDay3Ratio;
        this.rateDay5Ratio = r.data.rateDay5Ratio;
        this.rateDay10Ratio = r.data.rateDay10Ratio;
        this.rateDay20Ratio = r.data.rateDay20Ratio;
        this.rateDay30Ratio = r.data.rateDay30Ratio;
        this.rateDay40Ratio = r.data.rateDay40Ratio;
        this.rateDay60Ratio = r.data.rateDay60Ratio;
      });
    },

    data: function () {
      return {
        uppersButton: false,
        shButton:false,
        cancelButton:false,
        riskControlButton:true,
        modal1: false,
        modal2: false,
        modal3: false,
        delay300Mill:0,
        unmatchPercentRatio:0,
        positionRatio:1,
        rateDay3Ratio:10000,
        rateDay5Ratio:10000,
        rateDay10Ratio:10000,
        rateDay20Ratio:10000,
        rateDay30Ratio:10000,
        rateDay40Ratio:10000,
        rateDay60Ratio:10000
      }

    },
    methods: {

      changeButton (index) {
        var buttonCodestr = "";
        if(index ==1){
          buttonCodestr = "upperS_button";
        }
        this.$api.get('dragon/buttonConfig/changeButton', {buttonCode:buttonCodestr}, r => {
          location.reload()
        })
      },

      changeShButton () {
        this.$api.get('dragon/buttonConfig/changeShButton', {}, r => {
          location.reload()
        })
      },

      changeRiskControlButton () {
        this.$api.get('dragon/buttonConfig/riskControlButton', {}, r => {
          location.reload()
        })
      },

      changeRadicalCancelButton () {
        this.$api.get('dragon/buttonConfig/radicalCancelButton', {}, r => {
          location.reload()
        })
      },

      changeInsertDelayButton (mill) {
        this.$api.get('dragon/buttonConfig/changeInsertDelayButton', {mill:mill}, r => {
          location.reload()
        })
      },

      changePercentRatioButton (ratio) {
        this.$api.get('dragon/buttonConfig/changePercentRatio', {percentRatio:ratio}, r => {
          location.reload()
        })
      },

      changeStockBeforeRateRatioButton (positionRatio,rateDay3Ratio,rateDay5Ratio,rateDay10Ratio,rateDay20Ratio,rateDay30Ratio,rateDay40Ratio,rateDay60Ratio) {
        this.$api.get('dragon/buttonConfig/changeStockBeforeRateRatio', {positionRation:positionRatio,rateDay3Ratio:rateDay3Ratio,rateDay5Ratio:rateDay5Ratio,rateDay10Ratio:rateDay10Ratio,rateDay20Ratio:rateDay20Ratio,rateDay30Ratio:rateDay30Ratio,rateDay40Ratio:rateDay40Ratio,rateDay60Ratio:rateDay60Ratio}, r => {
          location.reload()
        })
      },

      show1 () {
        this.param1=this.delay300Mill;
      },

      ok1 () {
        this.delay300Mill = this.param1
        if(this.param1===''){
          this.delay300Mill = 0;
        }
        this.changeInsertDelayButton (this.delay300Mill)
      },
      cancel1 () {
        this.$Message.info($("param1").value)
      },

      show2 () {
        this.param2=this.unmatchPercentRatio;
      },
      ok2 () {
        this.unmatchPercentRatio = this.param2
        this.changePercentRatioButton (this.unmatchPercentRatio)
      },
      cancel2 () {
        this.$Message.info($("param2").value)
      },

      show3 () {
        this.positionRatioParam=this.positionRatio;
        this.rateDay3RatioParam=this.rateDay3Ratio;
        this.rateDay5RatioParam=this.rateDay5Ratio;
        this.rateDay10RatioParam=this.rateDay10Ratio;
        this.rateDay20RatioParam=this.rateDay20Ratio;
        this.rateDay30RatioParam=this.rateDay30Ratio;
        this.rateDay40RatioParam=this.rateDay40Ratio;
        this.rateDay60RatioParam=this.rateDay60Ratio;
      },
      ok3 () {
        this.positionRatio = this.positionRatioParam;
        this.rateDay3Ratio = this.rateDay3RatioParam;
        this.rateDay5Ratio = this.rateDay5RatioParam;
        this.rateDay10Ratio = this.rateDay10RatioParam;
        this.rateDay20Ratio = this.rateDay20RatioParam;
        this.rateDay30Ratio = this.rateDay30RatioParam;
        this.rateDay40Ratio = this.rateDay40RatioParam;
        this.rateDay60Ratio = this.rateDay60RatioParam;
        if(this.positionRatioParam===''){
          this.positionRatio = 1;
        }
        this.changeStockBeforeRateRatioButton (this.positionRatio,this.rateDay3Ratio,this.rateDay5Ratio,this.rateDay10Ratio,this.rateDay20Ratio,this.rateDay30Ratio,this.rateDay40Ratio,this.rateDay60Ratio)
      },
      cancel3 () {
        this.$Message.info()
      },

    }
  }
</script>
