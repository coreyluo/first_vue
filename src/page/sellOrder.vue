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
            <Menu active-name="1-7" theme="dark" width="auto" :open-names="['1']" @on-select="routeTo">
                <Submenu name="1">
                    <template slot="title">
                        <Icon type="ios-navigate"></Icon>
                        股票管理
                    </template>
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
            <template>
              <div>
                <Button style="float:right" type="success" @click="modal1=true;show()">节点卖出设置</Button>
              </div>
            </template>
            <Table border :columns="columns12" :data="data7">
                <template slot-scope="{ row }" slot="tab">
                    <strong>{{ row.tab }}</strong>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                  <Button v-if="row.status ==0" type="primary" size="small"  @click="changeStatus(row.id)">停卖</Button>
                  <Button v-if="row.status ==1" type="error" size="small"  @click="changeStatus(row.id)">继续卖出</Button>
                </template>
            </Table>

            <template>
              <Modal
                v-model="modal1"
                title="节点卖出参数"
                @on-ok="ok"
                @on-cancel="cancel">
                <div>
                  卖出次数:<Input name= "param1" v-model="param1" placeholder="" style="width: 300px" />
                </div>
                <div>
                  时间间隔:<Input name= "param2" v-model="param2" placeholder="" style="width: 300px" />
                </div>
              </Modal>
            </template>

        </Layout>
    </div>
</template>
<script>
    export default {
        created () {
            this.$api.get('dragon/sellAvailable/listData', null, r => {
                this.data7 = r.data.vos;
                this.frequency = r.data.frequency;
                this.sellMinute = r.data.sellMinute;
            })
        },
        data () {
            return {
                columns12: [
                    {
                      title: '账号id',
                      key: 'accountId'
                    },
                    {
                        title: '股票代码',
                        key: 'stockCode'
                    },
                    {
                        title: '股票名称',
                        key: 'stockName'
                    },
                    {
                      title: '可卖数量(股数)',
                      key: 'quantityAvailable'
                    },
                    {
                      title: '操作',
                      slot: 'action',
                      width: 550,
                      align: 'center'
                    }
                ],
                data7: [

                ],
                frequency:0,
                sellMinute:0,
                modal1: false
            }
        },
        methods: {
          changeStatus(id){
            this.$api.get('dragon/sellAvailable/changeStatus', {id:id}, r => {

            })
            location.reload()
          },

          show(){
            this.param1 = this.frequency;
            this.param2 = this.sellMinute;
          },
          ok () {
            var frequencyStr= this.param1;
            var minuteSellStr = this.param2;
            this.$api.get('dragon/sellAvailable/changeDotSell', {frequency:frequencyStr,sellMinute:minuteSellStr}, r => {
            })
            location.reload()
          },

          cancel () {
          },
        },

    }
</script>
