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
          <MenuItem  name="1-1"><router-link to="/"><font color="#fff">账户信息</font></router-link></MenuItem>
          <MenuItem  name="1-7"><router-link to="/sellOrder/1"><font color="#fff">卖出</font></router-link></MenuItem>
          <MenuItem  name="1-8"><router-link to="/openButton/1"><font color="#fff">按钮</font></router-link></MenuItem>
        </Submenu>
      </Menu>
    </Sider>
    <Layout :style="{marginLeft: '200px'}">
      <div class="blankRow">
      </div>

      <template>
        <div>
          <Button style="float:right" type="error" @click="modal3=true;">沪深300买入</Button>
        </div>
      </template>

      <template>
        <Modal
          v-model="modal3"
          title="确定要沪深300权重买入吗？"
          @on-ok="okClear3"
          @on-cancel="cancelClear3">
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
        modal3:false
      }

    },
    methods: {

      okClear3 () {
        this.$api.post('tiger/buttonInfo/hsWeightBuy', null, r => {
          location.reload()
        })

      },
      cancelClear3 () {
      },

    }
  }
</script>
