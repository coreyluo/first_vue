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
    .in-use {
      position: relative;
      float: left;
      left: 50%;
      background: #ed4014;
      font-weight:900;
      font-family: helvetica Neue;
    }
    .no-use {
      position: relative;
      float: left;
      left: 50%;
      background: #c5c8ce;
      font-weight:900;
      font-family: helvetica Neue;
    }
    .blankRow {
      height: 30px;
      background: #c5c8ce;
    }
    .remark {
      height: 20px;
      line-height: 20px;
      font-weight:900;
      font-family: Helvetica;
      vertical-align:middle;
    }
</style>
<template>
    <div class="layout">
        <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
            <Menu active-name="1-12" theme="dark" width="auto" :open-names="['1']" @on-select="routeTo">
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
            <div class="blankRow">
            </div>
            <template>
              <Table border :columns="columns13" :data="data13">
                <template slot-scope="{ row }" slot="tab">
                  <strong>{{ row.tab }}</strong>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                  <Button v-if="row.strategyEnable ==0" type="primary" size="small" style="margin-right: 5px" @click="startStrategy(row,1)">启用策略</Button>
                  <Button v-if="row.strategyEnable ==1" type="error" size="small" style="margin-right: 5px" @click="startStrategy(row,0)">关闭策略</Button>
                  <Button type="primary" size="small" style="margin-right: 5px" @click="modal1=true;show(row)">修改参数</Button>
                </template>
              </Table>
            </template>

            <template>
                <Modal
                    v-model="modal1"
                    title="参数修改"
                    @on-ok="ok"
                    @on-cancel="cancel">
                    <div>
                      放大系数:<Input name= "param1" v-model="param1" placeholder="" style="width: 100px" />
                    </div>
                    <div>
                      缩小系数:<Input name= "param2" v-model="param2" placeholder="" style="width: 100px" />
                    </div>
                    <div>
                      仓位系数:<Input name= "param3" v-model="param3" placeholder="" style="width: 100px" />
                    </div>
                    <div>
                      描述:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<Input name= "param4" v-model="param4" placeholder="" style="width: 100px" />
                    </div>
                </Modal>
            </template>
        </Layout>
    </div>
</template>
<script>
   export default {
        created () {
             this.$api.post('singular/dragonRatio/getDataList', {}, r => {
                  var infos = r.data;
                  infos.forEach(item => {
                      item.insertCirculatezPercentStr=item.insertCirculatezPercent;
                      if(item.dragonType==0){
                        item.dragonTypeStr = "正常"
                      }
                      if(item.dragonType==1){
                        item.dragonTypeStr = "龙一"
                      }
                      if(item.dragonType==2){
                        item.dragonTypeStr = "龙二"
                      }
                      if(item.dragonType==3){
                        item.dragonTypeStr = "龙三"
                      }
                      if(item.strategyEnable==0){
                        item.strategyEnableStr ="未启用";
                      }
                      if(item.strategyEnable==1){
                        item.strategyEnableStr ="已启用";
                      }

                   })
                  this.data13 = infos;
             })
        },

        data () {
             return {
                 columns13: [
                     {
                         title: '龙头名称',
                         key: 'dragonTypeStr',
                         align: 'center'
                     },
                     {
                         title: '放大系数 ',
                         key: 'upperRatio',
                         align: 'center'
                     },
                     {
                        title: '缩小系数',
                        key: 'lowerRatio',
                        align: 'center'
                     },
                     {
                       title: '仓位系数',
                       key: 'positionRatio',
                       align: 'center'
                     },
                     {
                       title: '撤单策略是否启用(靶前 分时等)',
                       key: 'strategyEnableStr',
                       align: 'center'
                     },
                     {
                       title: '描述',
                       key: 'remark',
                       align: 'center'
                     },
                     {
                         title: '操作',
                         slot: 'action',
                         width: 250,
                         align: 'center'
                     }
                 ],

                 data13: [

                 ],
                 modal1: false,
                 indexId: 0,
                 dragonType: 0,
                 strategyEnable: 0
             }
        },
        methods: {
             show (row) {
                 this.indexId=row.id;
                 this.dragonType=row.dragonType;
                 this.param1=row.upperRatio;
                 this.param2=row.lowerRatio;
                 this.param3=row.positionRatio;
                 this.param4=row.remark;
                 this.strategyEnable=row.strategyEnable;
             },
             ok () {
                  var primaryKey = this.indexId
                  var type = this.dragonType
                  var upperRatio= this.param1
                  var lowerRatio= this.param2
                  var positionRatio= this.param3
                  var remark= this.param4
                  var strategyE = this.strategyEnable
                  this.$api.post('singular/dragonRatio/update', {id:primaryKey,dragonType:type,upperRatio:upperRatio,lowerRatio:lowerRatio,positionRatio:positionRatio,strategyEnable:strategyE,remark:remark}, r => {
                    location.reload()
                  })

             },
             cancel () {
                 this.$Message.info($("param1").value)
             },
             startStrategy(row,stratStrategyIndex){
               var indexId=row.id;
               var dragonType=row.dragonType;
               var upperRatio=row.upperRatio;
               var lowerRatio=row.lowerRatio;
               var positionRatio=row.positionRatio;
               var remark=row.remark;
               this.$api.post('singular/dragonRatio/update', {id:indexId,dragonType:dragonType,upperRatio:upperRatio,lowerRatio:lowerRatio,positionRatio:positionRatio,strategyEnable:stratStrategyIndex,remark:remark}, r => {
                 location.reload()
               })
             }
        }
   }
</script>
