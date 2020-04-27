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
            <Menu active-name="1-1" theme="dark" width="auto" :open-names="['1']" @on-select="routeTo">
                <Submenu name="1">
                    <template slot="title">
                        <Icon type="ios-navigate"></Icon>
                        股票管理
                    </template>
                   <MenuItem  name="1-1"><router-link to="/"><font color="#fff">今日待撤</font></router-link></MenuItem>
                   <MenuItem  name="1-2"><router-link to="/content/1"><font color="#fff">参数调优</font></router-link></MenuItem>
                   <MenuItem  name="1-3"><router-link to="/stockPool/1"><font color="#fff">股票监听池</font></router-link></MenuItem>
                   <MenuItem  name="1-4"><router-link to="/disableStockPool/1"><font color="#fff">禁止下单股票池</font></router-link></MenuItem>
                  <MenuItem  name="1-22"><router-link to="/radicalDragonPool/1"><font color="#fff">激进龙头股票</font></router-link></MenuItem>
                   <MenuItem  name="1-6"><router-link to="/position/1"><font color="#fff">仓位</font></router-link></MenuItem>
                   <MenuItem  name="1-7"><router-link to="/targetParam/1"><font color="#fff">靶向参数</font></router-link></MenuItem>
                   <MenuItem  name="1-8"><router-link to="/cancelLog/1"><font color="#fff">今日撤单日志</font></router-link></MenuItem>
                   <MenuItem  name="1-9"><router-link to="/dealOrder/1"><font color="#fff">今日成交</font></router-link></MenuItem>
                  <MenuItem  name="1-10"><router-link to="/sellOrder/1"><font color="#fff">今日可卖</font></router-link></MenuItem>
                  <MenuItem  name="1-11"><router-link to="/highStock/1"><font color="#fff">高位板</font></router-link></MenuItem>
                  <MenuItem  name="1-5"><router-link to="/highIncreaseStock/1"><font color="#fff">涨幅过高股票</font></router-link></MenuItem>
                  <MenuItem  name="1-24"><router-link to="/monsterIncreaseStock/1"><font color="#fff">近期妖股</font></router-link></MenuItem>
                  <MenuItem  name="1-23"><router-link to="/specialNStock/1"><font color="#fff">特殊高位股票</font></router-link></MenuItem>
                  <MenuItem  name="1-12"><router-link to="/dragonParam/1"><font color="#fff">龙头模式参数</font></router-link></MenuItem>
                  <MenuItem  name="1-13"><router-link to="/sellParam/1"><font color="#fff">卖出参数</font></router-link></MenuItem>
                  <MenuItem  name="1-14"><router-link to="/hotBlockStock/1"><font color="#fff">热门板块</font></router-link></MenuItem>
                  <MenuItem  name="1-15"><router-link to="/blockView/1"><font color="#fff">所有板块</font></router-link></MenuItem>
                  <MenuItem  name="1-16"><router-link to="/openButton/1"><font color="#fff">开启策略按钮</font></router-link></MenuItem>
                  <MenuItem  name="1-24"><router-link to="/delayLog/1"><font color="#fff">延迟日志</font></router-link></MenuItem>
                  <MenuItem  name="1-17"><router-link to="/insertQueue/1"><font color="#fff">插队池</font></router-link></MenuItem>
                  <MenuItem  name="1-18"><router-link to="/connect/1"><font color="#fff">连接相关</font></router-link></MenuItem>
                  <MenuItem  name="1-19"><router-link to="/areaBlockView/1"><font color="#fff">地区板块</font></router-link></MenuItem>
                  <MenuItem  name="1-20"><router-link to="/statisticDaily/1"><font color="#fff">连板成功详情统计</font></router-link></MenuItem>
                  <MenuItem  name="1-21"><router-link to="/statisticTotalDaily/1"><font color="#fff">连板成功率统计</font></router-link></MenuItem>
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
                    <Button v-if="row.status==0" type="error" size="small" @click="manHandleCancel(index)">执行撤单</Button>
                </template>
            </Table>
        </Layout>
    </div>
</template>
<script>
    export default {
        created () {
            this.$api.get('singular/orderCancel/dataList', null, r => {
               var infos = r.data;
               infos.forEach(item => {
                 if(item.status==0){
                   item.statusStr = "等待撤单"
                 }
                 if(item.status==2){
                   item.statusStr = "已经禁止撤单"
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
                      title: '下单实际炮灰量',
                      key: 'realCannonQuantity'
                    },
                    {
                      title: '下单实际单前量',
                      key: 'beforeQuantityStr'
                    },
                    {
                      title: '下单方式',
                      key: 'insertTypeStr'
                    },
                    {
                        title: '状态',
                        key: 'statusStr'
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
                this.$api.get('singular/orderCancel/stopCancel', {id:idStr}, r => {
                     location.reload()
                })
            },
            resume (index) {
                var idStr = this.data6[index].id;
                this.$api.get('singular/orderCancel/resume', {id:idStr}, r => {
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
                this.$api.get('singular/orderCancel/dataList', {stockCode:stockCode}, r => {
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
            },
            manHandleCancel(index){
                var idStr = this.data6[index].id;
                this.$api.get('singular/orderCancel/manHandleCancel', {id:idStr}, r => {
                  location.reload()
                })
            }

        }
    }
</script>
