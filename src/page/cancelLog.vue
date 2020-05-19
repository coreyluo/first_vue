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
            <Menu active-name="1-8" theme="dark" width="auto" :open-names="['1']" @on-select="routeTo">
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
                  <MenuItem  name="1-25"><router-link to="/absortPool/1"><font color="#fff">粽子</font></router-link></MenuItem>
                   <MenuItem  name="1-6"><router-link to="/position/1"><font color="#fff">仓位</font></router-link></MenuItem>
                   <MenuItem  name="1-7"><router-link to="/targetParam/1"><font color="#fff">靶向参数</font></router-link></MenuItem>
                   <MenuItem  name="1-8"><router-link to="/cancelLog/1"><font color="#fff">今日撤单日志</font></router-link></MenuItem>
                   <MenuItem  name="1-9"><router-link to="/dealOrder/1"><font color="#fff">今日成交</font></router-link></MenuItem>
                  <MenuItem  name="1-10"><router-link to="/sellOrder/1"><font color="#fff">今日可卖</font></router-link></MenuItem>
                  <MenuItem  name="1-11"><router-link to="/highStock/1"><font color="#fff">高位板</font></router-link></MenuItem>
                  <MenuItem  name="1-5"><router-link to="/highIncreaseStock/1"><font color="#fff">涨幅过高股票</font></router-link></MenuItem>
                  <MenuItem  name="1-26"><router-link to="/monsterIncreaseStock/1"><font color="#fff">近期妖股</font></router-link></MenuItem>
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
                  <MenuItem  name="1-27"><router-link to="/sevenSunPool/1"><font color="#fff">七连阳</font></router-link></MenuItem>
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
            this.$api.get('singular/cancelLog/dataList', {pageNo:1,pageSize:50}, r => {
               r.data.forEach(item => {
                 if(item.success==0){
                   item.successStr = "失败"
                 }
                 if(item.success==1){
                   item.successStr = "成功"
                 }
                 if(item.strategyCode=="delay_circulatez_percent"){
                   item.strategyCodeStr = "延迟流通z百分比策略"
                 }else if(item.strategyCode=="third_second_transaction"){
                   item.strategyCodeStr = "分时成交策略"
                 }else if(item.strategyCode=="compare_by_last_sealing"){
                   item.strategyCodeStr = "封单量大于下降至上次的一定比例撤单策略"
                 }else if(item.strategyCode="detail_order_summary"){
                   item.strategyCodeStr = "逐笔委托统计策略"
                 }else{
                   item.strategyCodeStr = "逐笔防爆头"
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
                        key: 'strategyCodeStr'
                    },
                    {
                        title: '撤单参数',
                        key: 'strategyParam'
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
                this.$api.get('singular/cancelLog/dataList', {stockCode:stockCode,pageNo:1,pageSize:50}, r => {
                  r.data.forEach(item => {
                    if(item.success==0){
                      item.successStr = "失败"
                    }
                    if(item.success==1){
                      item.successStr = "成功"
                    }
                    if(item.strategyCode=="delay_circulatez_percent"){
                      item.strategyCodeStr = "延迟流通z百分比策略"
                    }else if(item.strategyCode=="second_trade_quantity"){
                      item.strategyCodeStr = "一秒成交量策略"
                    }else if(item.strategyCode=="compare_by_last_sealing"){
                      item.strategyCodeStr = "封单量大于下降至上次的一定比例撤单策略"
                    }else if(item.strategyCode="target_four"){
                      item.strategyCodeStr = "靶向四"
                    }else if(item.strategyCode="detail_order_summary"){
                      item.strategyCodeStr = "逐笔委托统计策略"
                    }

                  });
                  this.data6 = r.data;
                })
            }
        }
    }
</script>
