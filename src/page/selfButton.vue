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
      <Menu active-name="1-19" theme="dark" width="auto" :open-names="['1']" @on-select="routeTo">
        <Submenu name="1">
          <template slot="title">
            <Icon type="ios-navigate"></Icon>
            股票管理
          </template>
          <MenuItem  name="1-8"><router-link to="/userLogin/1"><font color="#fff">登录</font></router-link></MenuItem>
          <MenuItem  name="1-1"><router-link to="/"><font color="#fff">账户信息</font></router-link></MenuItem>
          <MenuItem  name="1-18"><router-link to="/strategyRatio/1"><font color="#fff">扫板比例系数</font></router-link></MenuItem>
          <MenuItem  name="1-19"><router-link to="/selfButton/1"><font color="#fff">手动买入</font></router-link></MenuItem>
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
          <MenuItem  name="1-17"><router-link to="/stockOpenInfo/1"><font color="#fff">集合一字信息</font></router-link></MenuItem>
        </Submenu>
      </Menu>
    </Sider>
    <Layout :style="{marginLeft: '200px'}">
      <div class="blankRow">
      </div>

      <template>
        <div>

          <Button  type="primary" @click="modal1=true;show1()">微盘总仓位{{positionWeiPan}}</Button>
          <Button  type="primary" @click="modal2=true;show2()">微盘核按钮比例{{weiPanPitPercent}}</Button>
          <Button  type="primary" @click="modal3=true;show3()">微盘执行买入</Button>
          <Button  type="error" @click="modal4=true;show4()">微盘执行卖出</Button>
        </div>

        <div>

          <Button  type="primary" @click="modal21=true;show21()">热股总仓位{{positionReGu}}</Button>
          <Button  type="primary" @click="modal22=true;show22()">热股核按钮比例{{reGuPitPercent}}</Button>
          <Button  type="primary" @click="modal23=true;show23()">热股执行买入</Button>
          <Button  type="error" @click="modal24=true;show24()">热股执行卖出</Button>
        </div>
      </template>

      <template>
        <Modal
          v-model="modal1"
          title="微盘总仓位"
          @on-ok="ok1"
          @on-cancel="cancel1">
          <div>
            微盘总仓位:<Input name= "param1" v-model="param1" placeholder="" style="width: 300px" />
          </div>
        </Modal>
      </template>

      <template>
        <Modal
          v-model="modal2"
          title="微盘核按钮比例"
          @on-ok="ok2"
          @on-cancel="cancel2">
          <div>
            微盘核按钮比例:<Input name= "param2" v-model="param2" placeholder="" style="width: 300px" />
          </div>
        </Modal>
      </template>

      <template>
        <Modal
          v-model="modal3"
          title="微盘确定要执行买入吗？"
          @on-ok="ok3"
          @on-cancel="cancel3">
        </Modal>
      </template>

      <template>
        <Modal
          v-model="modal4"
          title="微盘确定要执行核按钮吗？"
          @on-ok="ok4"
          @on-cancel="cancel4">
        </Modal>
      </template>

      <template>
        <Modal
            v-model="modal21"
            title="热股总仓位"
            @on-ok="ok21"
            @on-cancel="cancel21">
          <div>
            微盘总仓位:<Input name= "param21" v-model="param21" placeholder="" style="width: 300px" />
          </div>
        </Modal>
      </template>

      <template>
        <Modal
            v-model="modal22"
            title="热股核按钮比例"
            @on-ok="ok22"
            @on-cancel="cancel22">
          <div>
            微盘核按钮比例:<Input name= "param22" v-model="param22" placeholder="" style="width: 300px" />
          </div>
        </Modal>
      </template>

      <template>
        <Modal
            v-model="modal23"
            title="热股确定要执行买入吗？"
            @on-ok="ok23"
            @on-cancel="cancel23">
        </Modal>
      </template>

      <template>
        <Modal
            v-model="modal24"
            title="热股确定要执行核按钮吗？"
            @on-ok="ok24"
            @on-cancel="cancel24">
        </Modal>
      </template>

    </Layout>
  </div>
</template>
<script>
  export default {
    created () {
      this.$api.post('dragon/selfBuy/list', {}, r => {
        this.weiPanPitPercent = r.data.weiPanPitPercent;
        this.positionWeiPan = r.data.positionWeiPan;
        this.reGuPitPercent = r.data.reGuPitPercent;
        this.positionReGu = r.data.positionReGu;
        this.accountId = r.data.accountId;
      });
    },

    data: function () {
      return {
        modal1: false,
        modal2: false,
        modal3: false,
        modal4: false,
        modal21: false,
        modal22: false,
        modal23: false,
        modal24: false,
        weiPanPitPercent:20,
        positionWeiPan:0,
        reGuPitPercent:20,
        positionReGu:0,
        accountId:0
      }

    },
    methods: {


      show1 () {
        this.param1=this.positionWeiPan;
      },

      ok1 () {
        this.$api.get('dragon/selfBuy/changePositionWeiPan', {positionWeiPan:this.param1,accountId:this.accountId}, r => {
          location.reload()
        })

      },
      cancel1 () {
        this.$Message.info($("param1").value)
      },

      show2 () {
        this.param2=this.weiPanPitPercent;
      },
      ok2 () {
        this.$api.get('dragon/selfBuy/weiPanPitPercent', {pitPercent:this.param2}, r => {
          location.reload()
        })
      },
      cancel2 () {
        this.$Message.info($("param2").value)
      },


      show3 () {
        this.param1=this.positionWeiPan;
      },

      ok3 () {
        this.$api.get('dragon/selfBuy/weiPanBuy', null, r => {
          location.reload()
        })

      },
      cancel3 () {
      },

      ok4 () {
        this.$api.get('dragon/selfBuy/weiPanPit', null, r => {
          location.reload()
        })

      },
      cancel4 () {
      },


      show21 () {
        this.param21=this.positionReGu;
      },

      ok21 () {
        this.$api.get('dragon/selfBuy/changePositionReGu', {positionReGu:this.param21,accountId:this.accountId}, r => {
          location.reload()
        })

      },
      cancel21 () {
        this.$Message.info($("param21").value)
      },

      show22 () {
        this.param22=this.reGuPitPercent;
      },
      ok22 () {
        this.$api.get('dragon/selfBuy/reGuPitPercent', {reGuPitPercent:this.param22}, r => {
          location.reload()
        })
      },
      cancel22 () {
        this.$Message.info($("param22").value)
      },


      show23 () {
        this.param21=this.positionReGu;
      },

      ok23 () {
        this.$api.get('dragon/selfBuy/reGuBuy', null, r => {
          location.reload()
        })

      },
      cancel23 () {
      },

      ok24 () {
        this.$api.get('dragon/selfBuy/reGuPit', null, r => {
          location.reload()
        })

      },
      cancel24 () {
      },

    }
  }
</script>
