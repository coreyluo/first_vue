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
                  <MenuItem  name="1-7"><router-link to="/sellOrder/1"><font color="#fff">卖出</font></router-link></MenuItem>
                </Submenu>
            </Menu>
        </Sider>
        <Layout :style="{marginLeft: '200px'}">
            <template>
              <div>
                <Button style="float:right" type="success" @click="modal1=true;show()">卖出比例设置</Button>
                <Button style="float:right" type="error" @click="modal2=true;show2()">执行核按钮</Button>

<!--                <Button v-if="!dotSell"  type="error" @click="changeDotSellStatus()">点位卖出已关闭,请开启</Button>
                <Button v-if="dotSell"  type="primary" @click="changeDotSellStatus()">点位卖出已开启,请关闭</Button>-->
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
                <div>
                  核按钮比例:<Input name= "param3" v-model="param3" placeholder="" style="width: 300px" />
                </div>
                <div>
                  高点卖出比例:<Input name= "param4" v-model="param4" placeholder="" style="width: 300px" />
                </div>
                <div>
                  涨速卖出比例:<Input name= "param5" v-model="param5" placeholder="" style="width: 300px" />
                </div>
              </Modal>
            </template>

          <template>
            <Modal
              v-model="modal2"
              title="确定执行核按钮吗"
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
            this.$api.get('tiger/sellAvailable/listData', null, r => {
                this.data7 = r.data.vos;
                this.frequency = r.data.sellButtonDTO.frequency;
                this.sellMinute = r.data.sellButtonDTO.sellMinute;
                this.pitSellPercent = r.data.sellButtonDTO.pitSellPercent;
                this.highSellPercent = r.data.sellButtonDTO.highSellPercent;
                this.increaseSellPercent = r.data.sellButtonDTO.increaseSellPercent;
                this.gatherSell = r.data.sellButtonDTO.gatherSell;
                this.dotSell = r.data.sellButtonDTO.dotSell;
                this.slowSellStartHighAndIncrease = r.data.sellButtonDTO.slowSellStartHighAndIncrease;
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
                      width: 650,
                      align: 'center'
                    }
                ],
                data7: [

                ],
                frequency:0,
                sellMinute:0,
                pitSellPercent:0,
                increaseSellPercent:10,
                highSellPercent:20,
                dotSell:true,
                modal1: false,
                modal2:false
            }
        },
        methods: {

          changeDotSellStatus(){
            this.$api.get('tiger/sellAvailable/changeDotSellFlag', {}, r => {
              location.reload()
            })
          },


          changeStatus(id){
            this.$api.get('tiger/sellAvailable/changeStatus', {id:id}, r => {
              location.reload()
            })
          },

          show(){
            this.param1 = this.frequency;
            this.param2 = this.sellMinute;
            this.param3 = this.pitSellPercent;
            this.param4 = this.highSellPercent;
            this.param5 = this.increaseSellPercent;
          },
          ok () {
            var frequencyStr= this.param1;
            var minuteSellStr = this.param2;
            var pitSellPercentStr = this.param3;
            var highSellPercentStr = this.param4;
            var increaseSellPercentStr = this.param5;
            this.$api.get('tiger/sellAvailable/changeDotSell', {frequency:frequencyStr,sellMinute:minuteSellStr,pitSellPercent:pitSellPercentStr,highSellPercent:highSellPercentStr,increaseSellPercent:increaseSellPercentStr}, r => {
                location.reload()
            })

          },

          cancel () {
          },

          okClear () {
            this.$api.get('tiger/sellAvailable/pitSell', null, r => {
              location.reload()
            })

          },

          cancelClear () {
          },

        },

    }
</script>
