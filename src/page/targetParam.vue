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
                        靶向4前面判断大单标准:<Input name= "param1" v-model="param1" placeholder="" style="width: 100px" />
                    </div>
                    <div>
                        靶向4大单bc百分比:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<Input name= "param2" v-model="param2" placeholder="" style="width: 100px" />
                    </div>
                    <div>
                        撤单总量(股):&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<Input name= "param3" v-model="param3" placeholder="" style="width: 100px" />
                    </div>
                    <div>
                        一秒成交总量(股):<Input name= "param4" v-model="param4" placeholder="" style="width: 100px" />
                    </div>
                </Modal>
            </template>
        </Layout>
    </div>
</template>
<script>
   export default {
        created () {
             this.$api.get('singular/targetConfig/dataList', null, r => {
                  var infos = r.data;
                  infos.forEach(item => {
                      if(item.targetType==1){
                        item.targetTypeStr = "小于100万股"
                      }
                      if(item.targetType==2){
                        item.targetTypeStr = "100万到200万"
                      }
                      if(item.targetType==3){
                        item.targetTypeStr = "200万到300万"
                      }
                      if(item.targetType==4){
                        item.targetTypeStr = "300万到400万"
                      }
                      if(item.targetType==5){
                        item.targetTypeStr = "400万以上"
                      }
                   })
                 this.data7 = infos

             })
        },

        data () {
             return {
                 columns13: [
                     {
                         title: '靶向类型',
                         key: 'targetTypeStr',
                         align: 'center'
                     },
                     {
                         title: '靶向4前面判断大单标准',
                         key: 'beforeQuantity',
                         align: 'center'
                     },
                     {
                        title: '靶向4大单bc百分比',
                        key: 'cancelPercentValue',
                        align: 'center'
                     },
                     {
                         title: '撤单总量(股)',
                         key: 'cancelQuantity',
                         align: 'center'
                     },
                     {
                         title: '十秒成交总量(股)',
                         key: 'secondTradeQuantity',
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
                 indexId:0
             }
        },
        methods: {
             show (index) {
                 this.indexId=this.data7[index].id;
                 this.param1=this.data7[index].beforeQuantity;
                 this.param2=this.data7[index].cancelPercentValue;
                 this.param3=this.data7[index].cancelQuantity;
                 this.param4=this.data7[index].secondTradeQuantity;
             },
             ok () {
                  var primaryKey = this.indexId
                  var beforeQuantity= this.param1
                  var cancelPercentValue= this.param2
                  var cancelQuantity= this.param3
                  var secondTradeQuantity= this.param4
                  this.$api.post('singular/targetConfig/update', {id:primaryKey,beforeQuantity:beforeQuantity,cancelPercentValue:cancelPercentValue,cancelQuantity:cancelQuantity,secondTradeQuantity:secondTradeQuantity}, r => {
                    location.reload()
                  })

             },
             cancel () {
                 this.$Message.info($("param1").value)
             }
        }
   }
</script>
