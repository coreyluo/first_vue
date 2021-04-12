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
            <Menu active-name="1-2" theme="dark" width="auto" :open-names="['1']" @on-select="routeTo">
                <Submenu name="1">
                    <template slot="title">
                        <Icon type="ios-navigate"></Icon>
                        股票管理
                    </template>
                   <MenuItem  name="1-1"><router-link to="/"><font color="#fff">账户信息</font></router-link></MenuItem>
                   <MenuItem  name="1-2"><router-link to="/disableStockPool/1"><font color="#fff">禁止下单股票池</font></router-link></MenuItem>
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
                     <Button style="float:right" type="success" @click="modal1=true;show()">添加</Button>
                     <Button style="float:right" type="primary" @click="modal2=true;show()">全部删除</Button>
                </div>

            </template>
            <Table border :columns="columns12" :data="data6">
                <template slot-scope="{ row }" slot="tab">
                    <strong>{{ row.tab }}</strong>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                    <Button v-if="row.operateStatus !=2" type="primary" size="small"  @click="change(index)">停追</Button>
                    <Button v-if="row.operateStatus ==2" type="error" size="small"  @click="deleteInfo(index)">允许追单</Button>
                </template>
            </Table>

            <template>
                <Modal
                    v-model="modal1"
                    title="添加人工干预股票"
                    @on-ok="ok"
                    @on-cancel="cancel">
                    <div>
                        股票代码:<Input name= "param2" v-model="param2" placeholder="" style="width: 300px" />
                    </div>
                </Modal>
            </template>

          <template>
            <Modal
              v-model="modal2"
              title="确定要清空禁止股票池吗"
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
            this.$api.get('dragon/disablePool/dataList', {pageNo:1,pageSize:100}, r => {
                var infos = r.data;
                 infos.forEach(item => {
                    if(item.operateStatus==0){
                      item.operateStatusStr = "系统操作";
                    }
                    if(item.operateStatus==1){
                      item.operateStatusStr = "已经下单";
                    }
                   if(item.operateStatus==2){
                     item.operateStatusStr = "人工操作";
                   }
                 })
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
                        title: '操作类型',
                        key: 'operateStatusStr'
                    },
                    {
                        title: 'Action',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ],
                data6: [

                ],
                 modal1: false,
                 modal2:false
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
                this.$api.get('dragon/disablePool/dataList', {stockCode:stockCode,pageNo:1,pageSize:100}, r => {
                    var infos = r.data;
                     infos.forEach(item => {
                       if(item.operateStatus==0){
                         item.operateStatusStr = "系统操作";
                       }
                       if(item.operateStatus==1){
                         item.operateStatusStr = "已经下单";
                       }
                       if(item.operateStatus==2){
                         item.operateStatusStr = "人工操作";
                       }
                     })
                     this.data6=infos;
                })
            },

            ok () {
                var stockCodeAdd= this.param2
                this.$api.get('dragon/disablePool/oneToPool', {stockCode:stockCodeAdd}, r => {
                })
                location.reload()
            },
            cancel () {
               this.$Message.info($("param1").value)
            },



            change(index) {
                var stockCodeStr = this.data6[index].stockCode;
                this.$api.get('dragon/disablePool/changeOperateStatus', {stockCode:stockCodeStr}, r => {
                })
                location.reload()
            },
            deleteInfo(index){
                var primaryKey = this.data6[index].stockCode;
                this.$api.get('dragon/disablePool/removeStockCode', {stockCode:primaryKey}, r => {

                });
                location.reload()
            },
            okClear () {
              this.$api.get('dragon/disablePool/deleteAll', null, r => {
              })
              location.reload()
            },

            cancelClear () {
            },
        }
    }
</script>
