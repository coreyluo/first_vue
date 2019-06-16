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
            <Menu active-name="1-6" theme="dark" width="auto" :open-names="['1']" @on-select="routeTo">
                <Submenu name="1">
                    <template slot="title">
                        <Icon type="ios-navigate"></Icon>
                        股票管理
                    </template>
                    <MenuItem  name="1-1"><router-link to="/"><font color="#fff">今日待撤</font></router-link></MenuItem>
                    <MenuItem  name="1-2"><router-link to="/content/1"><font color="#fff">参数调优</font></router-link></MenuItem>
                    <MenuItem  name="1-3"><router-link to="/stockPool/1"><font color="#fff">股票监听池</font></router-link></MenuItem>
                    <MenuItem  name="1-4"><router-link to="/disableStockPool/1"><font color="#fff">禁止下单股票池</font></router-link></MenuItem>
                    <MenuItem  name="1-5"><router-link to="/aggressiveStockPool/1"><font color="#fff">激进股票池</font></router-link></MenuItem>
                    <MenuItem  name="1-6"><router-link to="/position/1"><font color="#fff">仓位</font></router-link></MenuItem>
                    <MenuItem  name="1-7"><router-link to="/targetParam/1"><font color="#fff">靶向参数</font></router-link></MenuItem>
                    <MenuItem  name="1-8"><router-link to="/cancelLog/1"><font color="#fff">今日撤单日志</font></router-link></MenuItem>
                    <MenuItem  name="1-9"><router-link to="/dealOrder/1"><font color="#fff">今日成交</font></router-link></MenuItem>
                    <MenuItem  name="1-10"><router-link to="/sellOrder/1"><font color="#fff">今日可卖</font></router-link></MenuItem>
                  <MenuItem  name="1-11"><router-link to="/highStock/1"><font color="#fff">高位板</font></router-link></MenuItem>
                  <MenuItem  name="1-12"><router-link to="/dragonParam/1"><font color="#fff">龙头模式参数</font></router-link></MenuItem>
                  <MenuItem  name="1-13"><router-link to="/sellParam/1"><font color="#fff">卖出参数</font></router-link></MenuItem>
                  <MenuItem  name="1-14"><router-link to="/hotBlockStock/1"><font color="#fff">热门板块</font></router-link></MenuItem>
                  <MenuItem  name="1-15"><router-link to="/blockView/1"><font color="#fff">所有板块</font></router-link></MenuItem>
                  <MenuItem  name="1-16"><router-link to="/openButton/1"><font color="#fff">开启策略按钮</font></router-link></MenuItem>
                </Submenu>
            </Menu>
        </Sider>
        <Layout :style="{marginLeft: '200px'}">
            <div style="height: 30px">
            </div>
            <template>
              <div>
                <Button v-if="tradeStatus" style="float:right" type="warning" @click="changeTradeStatus()">禁止下单</Button>
                <Button v-if="!tradeStatus" style="float:right" type="primary" @click="changeTradeStatus()">启用下单</Button>
              </div>
            </template>
            <Table border :columns="columns13" :data="data7">
                <template slot-scope="{ row }" slot="tab">
                    <strong>{{ row.tab }}</strong>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                    <Button type="primary" size="small" style="margin-right: 5px" @click="modal1=true;show(index)">修改</Button>
                </template>

            </Table>
            <template>
                <Modal
                    v-model="modal1"
                    title="参数修改"
                    @on-ok="ok"
                    @on-cancel="cancel">
                    <div>
                        仓位:<Input name= "param1" v-model="param1" placeholder="" style="width: 300px" />
                    </div>
                </Modal>
            </template>
        </Layout>
    </div>
</template>
<script>
   export default {
        created () {
             this.$api.get('singular/tradeAccount/listOrderPrice', null, r => {
                  var infos = r.data;
                 this.data7 = infos
             })
            this.$api.get('singular/command/showTradeStatus', null, r => {
                this.tradeStatus = r.data;
            })
        },

        data () {
             return {
                 columns13: [
                     {
                        title: '券商交易账号',
                        key: 'tradeAccountNo',
                        align: 'center'
                     },
                     {
                         title: '仓位',
                         key: 'position',
                         align: 'center'
                     },
                     {
                         title: '操作',
                         slot: 'action',
                         width: 150,
                         align: 'center'
                     }
                 ],
                 data7: [

                 ],
                 modal1: false,
                 indexId:0,
                 tradeStatus:true
             }
        },
        methods: {
             show (index) {
                 this.indexId=this.data7[index].id;
                 this.param1=this.data7[index].position;
             },
             ok () {
                  var position= this.param1;
                  var changerId = this.indexId;
                  this.$api.post('singular/tradeAccount/changeOrderPrice', {id:changerId,position:position}, r => {

                  })
                  location.reload();

             },
             cancel () {
                 this.$Message.info($("param1").value)
             },
             changeTradeStatus (){
               this.$api.post('singular/command/changeTradeStatus', {}, r => {
                  this.tradeStatus = r.data
               })
             }
        }
   }
</script>
