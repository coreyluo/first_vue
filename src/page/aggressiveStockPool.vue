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
                    <Button style="float:right" type="success" @click="modal1=true;show()">添加</Button>
                </div>

            </template>
            <Table border :columns="columns12" :data="data6">
                <template slot-scope="{ row }" slot="tab">
                    <strong>{{ row.tab }}</strong>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                    <Button type="primary" size="small" style="margin-right: 5px" @click="deleteInfo(index)">删除</Button>
                </template>
            </Table>

            <template>
                <Modal
                    v-model="modal1"
                    title="添加监听股票"
                    @on-ok="ok"
                    @on-cancel="cancel">
                    <div>
                        股票代码:<Input name= "param2" v-model="param2" placeholder="" style="width: 300px" />
                    </div>
                </Modal>
            </template>
        </Layout>
    </div>
</template>
<script>
    export default {
        created () {
            this.$api.get('singular/aggressiveListenPool/dataList', {pageNo:1,pageSize:100}, r => {
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
                        key: 'stockName'
                    },
                    {
                       title: '操作',
                       slot: 'action',
                       width: 150,
                       align: 'center'
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
                this.$api.get('singular/aggressiveListenPool/dataList', {stockCode:stockCode,pageNo:1,pageSize:100}, r => {
                    var infoos = r.data;
                    this.data6=infoos;
                })
            },
            ok () {
                var stockCodeAdd= this.param2
                this.$api.get('singular/aggressiveListenPool/batchToPool', {stockCodeStr:stockCodeAdd}, r => {
                    this.$Message.info("添加成功");
                })
                location.reload()
            },
            cancel () {
               this.$Message.info($("param1").value)
            },
            deleteInfo(index){
                var stockCodeStr = this.data6[index].stockCode;
                this.$api.get('singular/aggressiveListenPool/deleteStockCode', {stockCode:stockCodeStr}, r => {
                    this.$Message.info("删除成功");
                    location.reload()
                })
            }

        }
    }
</script>
