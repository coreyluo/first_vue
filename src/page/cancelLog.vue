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
            <Menu active-name="1-5" theme="dark" width="auto" :open-names="['1']" @on-select="routeTo">
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
                    <Button v-if="row.status==0" type="primary" size="small" @click="stopCancel(index)">停撤</Button>
                    <Button v-if="row.status==2" type="error" size="small" @click="resume(index)">恢复</Button>
                </template>
            </Table>
        </Layout>
    </div>
</template>
<script>
    export default {
        created () {
            this.$api.get('dragon/cancelLog/dataList', {pageNo:1,pageSize:50}, r => {
               r.data.forEach(item => {
                 if(item.success==0){
                   item.successStr = "失败"
                 }
                 if(item.success==1){
                   item.successStr = "成功"
                 }
              });
              this.data6 = r.data;
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
                        key: 'ticketName'
                    },
                    {
                        title: '撤单策略类型',
                        key: 'strategyDescribe'
                    },
                    {
                        title: '撤单参数',
                        key: 'strategyContent'
                    },
                    {
                        title: '委托编号',
                        key: 'orderNo'
                    },
                    {
                        title: '是否成功',
                        key: 'successStr'
                    },
                    {
                        title: '撤单时间',
                        key: 'createTime'
                    },
                    {
                        title: '描述',
                        key: 'message'
                    }
                ],
                data6: [

                ]
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
                this.$api.get('dragon/cancelLog/dataList', {stockCode:stockCode,pageNo:1,pageSize:50}, r => {
                  r.data.forEach(item => {
                    if(item.success==0){
                      item.successStr = "失败"
                    }
                    if(item.success==1){
                      item.successStr = "成功"
                    }
                  });
                  this.data6 = r.data;
                })
            }
        }
    }
</script>
