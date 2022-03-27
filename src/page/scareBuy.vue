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
        </Submenu>
      </Menu>
    </Sider>
    <Layout :style="{marginLeft: '200px'}">
      <div class="blankRow">
      </div>

      <template>
        <div>
          <Button style="float:right" type="error" @click="modal2=true;show()">恐慌买入</Button>
        </div>
      </template>

      <template>
        <Modal
          v-model="modal2"
          title="确定要恐慌买入吗？"
          @on-ok="okClear"
          @on-cancel="cancelClear">
        </Modal>
      </template>

    </Layout>
  </div>
</template>
<script>
  export default {
    created () {
    },

    data: function () {
      return {
        modal2:false
      }

    },
    methods: {
      okClear () {
        this.$api.get('dragon/scareBuy/scareBuyStock', null, r => {
          location.reload()
        })

      },
      cancelClear () {
      },

    }
  }
</script>
