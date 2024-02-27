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
            <Menu active-name="1-14" theme="dark" width="auto" :open-names="['1']" @on-select="routeTo">
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
<!--                  <MenuItem  name="1-15"><router-link to="/disableUnmatch/1"><font color="#fff">禁止未匹配量买入</font></router-link></MenuItem>
                  <MenuItem  name="1-16"><router-link to="/stockBeforeRateInfo/1"><font color="#fff">涨幅过高股票信息</font></router-link></MenuItem>-->
                </Submenu>
            </Menu>
        </Sider>
        <Layout :style="{marginLeft: '200px'}">
            <template>
              <div>
                <font style="font-weight:bold;font-size:15px;">股票代码：</font><Input name= "param19" v-model="param19" placeholder="stockCode" style="width: 300px" />
                <Button type="primary" icon="ios-search" @click="search()">查询</Button>

                <Button style="float:right" type="error" @click="modal1=true;show1()">买入涨幅</Button>
                <Button style="float:right" type="success" @click="modal2=true;show2()">添加股票</Button>
                <Button style="float:right" type="error" @click="modal4=true;show4()">执行买入</Button>
              </div>
            </template>
            <Table border :columns="columns12" :data="data7">
                <template slot-scope="{ row }" slot="tab">
                    <strong>{{ row.tab }}</strong>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                  <Button style="float:right" type="primary" @click="modal3=true;show3(row)">买入权重修改</Button>
                  <Button style="float:right" type="error" @click="deleteStock(row)">删除</Button>
                </template>
            </Table>

            <template>
              <Modal
                v-model="modal1"
                title="买入涨幅"
                @on-ok="ok"
                @on-cancel="cancel">
                <div>
                  买入涨幅设置:<Input name= "param3" v-model="param3" placeholder="" style="width: 300px" />
                </div>

              </Modal>
            </template>

          <template>
            <Modal
              v-model="modal2"
              title="添加股票"
              @on-ok="okClear"
              @on-cancel="cancelClear">
              <div>
                股票代码:<Input name= "param10" v-model="param10" placeholder="" style="width: 300px" />
              </div>
            </Modal>
          </template>

          <template>
            <Modal
              v-model="modal3"
              title="买入权重"
              @on-ok="okClear3"
              @on-cancel="cancelClear3">
              <div>
                买入权重:<Input name= "param11" v-model="param11" placeholder="" style="width: 300px" />
              </div>
            </Modal>
          </template>

          <template>
            <Modal
              v-model="modal4"
              title="确定执行批量买入？"
              @on-ok="okClear4"
              @on-cancel="cancelClear4">
            </Modal>
          </template>

        </Layout>
    </div>
</template>
<script>
    export default {
        created () {
            this.$api.get('dragon/blockBatchBuy/listData', null, r => {
                this.data7 = r.data;
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
                        key: 'stockName'
                    },
                    {
                      title: '权重',
                      key: 'positionRatio'
                    },
                    {
                      title: '买入涨幅',
                      key: 'buyRate'
                    },
                    {
                      title: '操作',
                      slot: 'action',
                      width: 650,
                      align: 'center'
                    }
                ],
                data7: [

                ],
                modal1: false,
                modal2:false,
                modal3:false,
                modal4:false,
                currentStockCode:0
            }
        },
        methods: {
          search(){
            var stockCode = this.param19;
            if(stockCode){
              stockCode = stockCode;
            }else{
              stockCode = null;
            }
            this.$api.get('dragon/blockBatchBuy/listData', {stockCode:stockCode}, r => {
              this.data7 = r.data;
            })
          },
          deleteStock(row){
              var rowStockCode = row.stockCode;
              this.$api.get('dragon/blockBatchBuy/deleteStock', {stockCode:rowStockCode}, r => {
                location.reload()
              })
          },

          ok () {
            var buyRate = this.param3;
            this.$api.get('dragon/blockBatchBuy/batchChangeBuyRate', {rate:buyRate}, r => {
                location.reload()
            })

          },

          cancel () {
          },

          okClear () {
            var stockCode = this.param10;
            this.$api.get('dragon/blockBatchBuy/addStock', {stockCode:stockCode}, r => {
              location.reload()
            })
          },

          cancelClear () {
          },
          show3 (row) {
            this.currentStockCode = row.stockCode;
            this.param11=row.positionRatio;
          },
          okClear3 () {
            var positionRatio = this.param11;
            var currentStockCode = this.currentStockCode;
            this.$api.get('dragon/blockBatchBuy/changeRatio', {stockCode:currentStockCode,positionRatio:positionRatio}, r => {
              location.reload()
            })
          },

          cancelClear3 () {
          },

          okClear4 () {
            this.$api.get('dragon/blockBatchBuy/batchBuy', {}, r => {
              location.reload()
            })
          },

          cancelClear4 () {
          },

        },

    }
</script>
