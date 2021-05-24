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
      <Menu active-name="1-3" theme="dark" width="auto" :open-names="['1']" @on-select="routeTo">
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
        </Submenu>
      </Menu>
    </Sider>
    <Layout :style="{marginLeft: '200px'}">
      <div class="blankRow">
      </div>
      <template>
        <template>
          <div>
            <Button style="float:right"  type="primary" >超级龙头</Button>
            <Button style="float:right" type="error" @click="modal1=true;showAdd(0,5,1,30,1.10,1)">添加</Button>
          </div>
        </template>
        <Table border :columns="columns13" :data="data13">
          <template slot-scope="{ row }" slot="tab">
            <strong>{{ row.tab }}</strong>
          </template>
          <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="modal1=true;show(row)">修改</Button>
            <Button type="error" size="small" style="margin-right: 5px" @click="deleteRadical(row.id)">删除</Button>
          </template>
        </Table>
      </template>

      <div class="blankRow">
      </div>
      <template>
        <template>
          <div>
          </div>
          <div>
            <font style="font-weight:bold;font-size:15px;">股票代码：</font><Input name= "paramStock" v-model="paramStock" placeholder="stockCode" style="width: 300px" />
            <Button type="primary" icon="ios-search" @click="searchStock()">查询</Button>

            <Button style="float:right" type="error" @click="modal2=true">删除全部</Button>
            <Button style="float:right" type="primary">激进打板</Button>
            <Button style="float:right" type="error" @click="modal1=true;showAdd(2,2,1,30,1.10,1)">添加</Button>

          </div>
        </template>
        <Table border :columns="columns13" :data="data14">
          <template slot-scope="{ row }" slot="tab">
            <strong>{{ row.tab }}</strong>
          </template>
          <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="modal1=true;show(row)">修改</Button>
            <Button type="error" size="small" style="margin-right: 5px" @click="deleteRadical(row.id)">删除</Button>
          </template>
        </Table>
      </template>

      <template>
        <Modal
          v-model="modal1"
          title="激进龙头股票"
          @on-ok="ok"
          @on-cancel="cancel">
          <div>
            股票代码:&nbsp&nbsp<Input name= "param1" v-model="param1" placeholder="" style="width: 100px" />
          </div>
          <div>
            仓位系数:&nbsp&nbsp<Input name= "param2" v-model="param2" placeholder="" style="width: 100px" />
          </div>
          <div>
            是否扫版:&nbsp&nbsp
            <select id="sex" name = param3  v-model="param3">
              <option v-if="param4 ==2" value="1">扫版</option>
<!--              <option v-if="param4 ==2" value="0">不扫版</option>
              <option v-if="param4 ==2" value="2">强要</option>-->


              <option v-if="param4 ==0" value="1">开盘向上买入</option>
              <option v-if="param4 ==0" value="0">集合买入</option>
            </select>
          </div>
          <div>
            时间限制:&nbsp&nbsp<Input name= "param5" v-model="param5" placeholder="" style="width: 100px" />
          </div>
          <div>
            买入上限:&nbsp&nbsp<Input name= "param6" v-model="param6" placeholder="" style="width: 100px" />
          </div>
          <div>
            买入次数:&nbsp&nbsp<Input name= "param7" v-model="param7" placeholder="" style="width: 100px" />
          </div>
          <div>
            <Input type="hidden" name= "param4" v-model="param4" placeholder="" style="width: 100px" />
          </div>
        </Modal>
      </template>

      <template>
        <Modal
          v-model="modal2"
          title="确定要删除所有吗"
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
      this.$api.post('dragon/radicalDragonPool/dataList', {}, r => {
        var infos = r.data.radicalDragonPools;
        infos.forEach(item => {
          if(item.radical==0){
            if(item.sweepType==0){
              item.sweepTypeStr = "集合买入"
            }
            if(item.sweepType==1){
              item.sweepTypeStr = "开盘向上买入"
            }
          }else {
            if (item.sweepType == 0) {
              item.sweepTypeStr = "不扫版"
            }
            if (item.sweepType == 1) {
              item.sweepTypeStr = "扫版"
            }
            if (item.sweepType == 2) {
              item.sweepTypeStr = "强要"
            }
          }
        })

        infos.forEach(item =>{
          if(item.radical ==0){
            this.data13.push(item)
          }
          if(item.radical ==2){
            this.data14.push(item)
          }
        })

      })
    },

    data () {
      return {
        columns13: [
          {
            title: '股票代码',
            key: 'stockCode',
            align: 'center'
          },
          {
            title: '股票名称',
            key: 'stockName',
            align: 'center'
          },
          {
            title: '是否扫版',
            key: 'sweepTypeStr',
            align: 'center'
          },
          {
            title: '仓位系数',
            key: 'positionRatio',
            align: 'center'
          },
          {
            title: '开盘后下单时间限制',
            key: 'afterOpenSeconds',
            align: 'center'
          },
          {
            title: '买入上限',
            key: 'highRate',
            align: 'center'
          },
          {
            title: '买入次数',
            key: 'orderTimes',
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
        modal1: false,
        modal2: false,
        indexId:0,
      }
    },
    methods: {
      searchStock(){
        var stockCode = this.paramStock;
        this.$api.post('dragon/radicalDragonPool/dataList', {stockCode:stockCode}, r => {
          var infos = r.data.radicalDragonPools;
          infos.forEach(item => {
            if(item.radical==0){
              if(item.sweepType==0){
                item.sweepTypeStr = "集合买入"
              }
              if(item.sweepType==1){
                item.sweepTypeStr = "开盘向上买入"
              }
            }else {
              if (item.sweepType == 0) {
                item.sweepTypeStr = "不扫版"
              }
              if (item.sweepType == 1) {
                item.sweepTypeStr = "扫版"
              }
              if (item.sweepType == 2) {
                item.sweepTypeStr = "强要"
              }
            }
          })
          this.data13=[],
          this.data14=[],
          infos.forEach(item =>{
            if(item.radical ==0){
              this.data13.push(item)
            }
            if(item.radical ==2){
              this.data14.push(item)
            }
          })

        })
      },


      show (row) {
        this.indexId=row.id;
        this.param1=row.stockCode;
        this.param2=row.positionRatio;
        this.param3=row.sweepType;
        this.param4=row.radical;
        this.param5 = row.afterOpenSeconds;
        this.param6 = row.highRate;
        this.param7 = row.orderTimes;
      },
      ok () {
        var primaryKey = this.indexId
        var stockCode= this.param1
        var positionRatio= this.param2
        var sweepType= this.param3
        var radical= this.param4
        var afterOpenSeconds = this.param5
        var highRate = this.param6
        var orderTimes = this.param7
        this.$api.post('dragon/radicalDragonPool/addOne', {id:primaryKey,stockCode:stockCode,positionRatio:positionRatio,sweepType:sweepType,radical:radical,afterOpenSeconds:afterOpenSeconds,highRate:highRate,orderTimes:orderTimes}, r => {
          location.reload()
        })

      },
      cancel () {
        this.$Message.info($("param1").value)
      },


      deleteRadical(id){
        this.$api.get('dragon/radicalDragonPool/deleteOne', {id:id}, r => {
          location.reload()
        })
      },

      showAdd (radical,positionRatio,sweepType,afterOpenSeconds,highRate,orderTimes) {
        this.param4=radical;
        this.param3=sweepType;
        this.param2=positionRatio;
        this.param5=afterOpenSeconds;
        this.param6 = highRate;
        this.param7 = orderTimes;
      },
      okClear () {
        this.$api.get('dragon/radicalDragonPool/deleteAll', null, r => {
        })
        location.reload()
      },

      cancelClear () {
      },

    }
  }
</script>
