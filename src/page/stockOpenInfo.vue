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
      <Menu active-name="1-17" theme="dark" width="auto" :open-names="['1']" @on-select="routeTo">
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
<!--          <MenuItem  name="1-15"><router-link to="/disableUnmatch/1"><font color="#fff">禁止未匹配量买入</font></router-link></MenuItem>
          <MenuItem  name="1-16"><router-link to="/stockBeforeRateInfo/1"><font color="#fff">涨幅过高股票信息</font></router-link></MenuItem>-->
          <MenuItem  name="1-17"><router-link to="/stockOpenInfo/1"><font color="#fff">集合一字信息</font></router-link></MenuItem>
        </Submenu>
      </Menu>
    </Sider>
    <Layout :style="{marginLeft: '200px'}">
      <div style="height: 30px">
      </div>
      <template>
        <div>
          <font style="font-weight:bold;font-size:15px;">股票代码：</font><Input name= "param1" v-model="param1" placeholder="stockCode" style="width: 300px" />
          <Button type="primary" icon="ios-search" @click="search()">查询</Button>
          <Button  type="error" size="small"  @click="modal1=true;show()">一键添加小池子</Button>
        </div>

      </template>
      <Table border :columns="columns12" :data="data6">
        <template slot-scope="{ row }" slot="tab">
          <strong>{{ row.tab }}</strong>
        </template>
      </Table>

      <template>
        <Modal
          v-model="modal1"
          title="添加小池子参数"
          @on-ok="ok"
          @on-cancel="cancel">
          <div>
            仓位系数:&nbsp&nbsp<Input name= "param2" v-model="param2" placeholder="" style="width: 100px" />
          </div>
          <div>
            是否扫版:&nbsp&nbsp
            <select id="sex" name = param3  v-model="param3">
              <option  value="1">涨停s</option>
              <option  value="0">排队</option>
              <option  value="2">涨停价有成交</option>
              <option  value="3">低于一分钱有成交</option>
            </select>
          </div>
          <div>封单比例<Input name= "param5" v-model="param5" placeholder="" style="width: 100px" /></div>
        </Modal>
      </template>
    </Layout>
  </div>
</template>
<script>
export default {
  created () {
    this.$api.post('bull/sealingPercent/listData', {stockCode:null,rateZ:null}, r => {
      var infos = r.data;
      this.data6=infos;
    })
  },
  data () {
    return {
      columns12: [
        {
          title: '股票代码',
          key: 'stockCode'
        },
        {
          title: '股票名称',
          key: 'blockName'
        },
        {
          title: '占比',
          key: 'rateZ'
        },
        {
          title: '日期',
          key: 'kbarDate'
        }
      ],
      data6: [

      ],
      modal1: false
    }
  },
  methods: {
    search(){
      var stockCode = this.param1;
      if(stockCode){
        stockCode = stockCode;
      }else{
        stockCode = null;
      }
      this.$api.post('bull/sealingPercent/listData', {stockCode:stockCode}, r => {
        var infos = r.data;
        this.data6=infos;
      })
    },
    show () {
    },

    ok () {
      var positionRatio= this.param2
      var sweepType= this.param3
      var rateZ = this.param5;
      this.$api.get('bull/sealingPercent/toDragonPool', {positionRatio:positionRatio,sweepType:sweepType,rateZ:rateZ}, r => {
        location.reload()
      })
    },
    cancel () {
      this.$Message.info($("param1").value)
    },

  }
}
</script>
