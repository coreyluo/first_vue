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

    </Layout>
  </div>
</template>
<script>
  export default {
    created () {
      this.$api.post('dragon/buttonConfig/list', {}, r => {
        this.uppersButton=r.data.uppersButton;
        this.shButton = r.data.shButton;
        this.delay300Mill = r.data.delay300Mill
      });
    },

    data: function () {
      return {
        uppersButton: false,
        shButton:false,
        modal1: false,
        delay300Mill:0
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

      changeInsertDelayButton (mill) {
        this.$api.get('dragon/buttonConfig/changeInsertDelayButton', {mill:mill}, r => {
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

    }
  }
</script>
