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
            <Menu active-name="1-4" theme="dark" width="auto" :open-names="['1']" @on-select="routeTo">
                <Submenu name="1">
                    <template slot="title">
                        <Icon type="ios-navigate"></Icon>
                        股票管理
                    </template>
                  <MenuItem  name="1-8"><router-link to="/userLogin/1"><font color="#fff">登录</font></router-link></MenuItem>
                  <MenuItem  name="1-1"><router-link to="/"><font color="#fff">账户信息</font></router-link></MenuItem>
                  <MenuItem  name="1-3"><router-link to="/radicalDragonPool/1"><font color="#fff">小池子</font></router-link></MenuItem>
                  <MenuItem  name="1-4"><router-link to="/orderCancelPool/1"><font color="#fff">等待撤单</font></router-link></MenuItem>
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
                </div>
            </template>
            <Table border :columns="columns12" :data="data6">
                <template slot-scope="{ row }" slot="tab">
                    <strong>{{ row.tab }}</strong>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                    <Button v-if="row.status==1" type="primary" size="small" @click="stopCancel(index)">停撤</Button>
                    <Button v-if="row.status==2" type="error" size="small" @click="resume(index)">已停撤</Button>
                </template>
            </Table>
        </Layout>
    </div>
</template>
<script>
    export default {
        created () {
            this.$api.get('dragon/orderCancel/dataList', null, r => {
               var infos = r.data;
               infos.forEach(item => {
                 if(item.status==0){
                   item.statusStr = "初始化"
                 }
                 if(item.status==1){
                   item.statusStr = "等待撤单"
                 }
                 if(item.status==2){
                   item.statusStr = "禁止撤单"
                 }
                 if(item.insertOrderType==0){
                   item.insertTypeStr="L1行情下单"
                 }
                 if(item.insertOrderType==1&&item.entrustStatus==0){
                   item.insertTypeStr="L2行情下单"
                 }
                 if(item.insertOrderType==1&&item.entrustStatus==1){
                   item.insertTypeStr="逐笔下单"
                 }
                 if(item.orderStamp!=""&&item.beforeQuantity!=null){
                   item.beforeQuantityStr = item.beforeQuantity/100
                 }
              })
              this.data6 = infos
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
                        title: '委托编号',
                        key: 'orderNo'
                    },
                    {
                        title: 'Action',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ],
                data6: [

                ]
            }
        },
        methods: {
            stopCancel (index) {
                var idStr = this.data6[index].id;
                this.$api.get('dragon/orderCancel/stopCancel', {id:idStr}, r => {
                     location.reload()
                })
            },
            resume (index) {
                var idStr = this.data6[index].id;
                this.$api.get('dragon/orderCancel/resume', {id:idStr}, r => {
                     location.reload()
                })
            },
            search(){
                var stockCode = this.param1;
                if(stockCode){
                  stockCode = stockCode;
                }else{
                  stockCode = null;
                }
                this.$api.get('dragon/orderCancel/dataList', {stockCode:stockCode}, r => {
                    var infos = r.data;
                    infos.forEach(item => {
                       if(item.status==0){
                         item.statusStr = "等待撤单"
                       }
                       if(item.status==2){
                         item.statusStr = "已禁止撤单"
                       }
                        if(item.insertOrderType==0){
                          item.insertTypeStr=="L1行情下单"
                        }
                        if(item.insertOrderType==1&&item.entrustStatus==0){
                          item.insertTypeStr=="L2行情下单"
                        }
                        if(item.insertOrderType==1&&item.entrustStatus==1){
                          item.insertTypeStr=="逐笔下单"
                        }
                        if(item.orderStamp!=null){
                          item.beforeQuantityStr = item.beforeQuantity
                        }
                    })
                    this.data6 = infos
                })
            }

        }
    }
</script>
