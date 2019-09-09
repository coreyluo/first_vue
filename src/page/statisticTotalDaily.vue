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
            <Menu active-name="1-21" theme="dark" width="auto" :open-names="['1']" @on-select="routeTo">
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
                    <Col span="5">
                      <font style="font-weight:bold;font-size:15px;">起始日期：</font><DatePicker format="yyyy-MM-dd"  @on-change="getStartTime" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
                    </Col>
                    <Col span="5">
                      <font style="font-weight:bold;font-size:15px;">结止日期：</font><DatePicker format="yyyy-MM-dd" @on-change="getEndTime"  type="date" placeholder="Select date" style="width: 200px"></DatePicker>
                    </Col>

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
            this.$api.get('singular/statisticDaily/listTotal', {pageNo:1,pageSize:100}, r => {
               r.data.forEach(item => {

              });
              this.data6 = r.data;
            })
        },
        data () {
            return {
                columns12: [

                    {
                        title: '交易日期',
                        key: 'tradeDate'
                    },
                    {
                        title: '总上板数',
                        key: 'allPlank'
                    },
                    {
                        title: '总封住数量',
                        key: 'allNicePlank'
                    },
                    {
                        title: '可以打板数',
                        key: 'allInsertPlank'
                    },
                    {
                      title: '可以打板封住数量',
                      key: 'allNiceInsertPlank'
                    },
                    {
                      title: '可以打一板数',
                      key: 'allFirstInsertPlank'
                    },
                    {
                      title: '可以打一板封住数量',
                      key: 'allNiceFirstInsertPlank'
                    },
                    {
                      title: '可以打二板数',
                      key: 'allSecondInsertPlank'
                    },
                    {
                      title: '可以打er板封住数量',
                      key: 'allNiceSecondInsertPlank'
                    },
                    {
                      title: '可以打三板数',
                      key: 'allThirdInsertPlank'
                    },
                    {
                      title: '可以打三板封住数量',
                      key: 'allNiceThirdInsertPlank'
                    },
                    {
                      title: '可以打四板数',
                      key: 'allFourthInsertPlank'
                    },
                    {
                      title: '可以打四板封住数量',
                      key: 'allNiceFourthInsertPlank'
                    },
                    {
                      title: '可以打五板数',
                      key: 'allFifthInsertPlank'
                    },
                    {
                      title: '可以打五板及以上封住数量',
                      key: 'allNiceFifthInsertPlank'
                    }

                ],
                data6: [

                ],
                dateStart:"",
                dateEnd:""
            }
        },
        methods: {


          getStartTime(starTime) {
            this.dateStart = starTime;
          },
          getEndTime(endTime) {
            this.dateEnd = endTime;
          },


          search(){
                var tradeTimeStart = this.dateStart;
                var tradeTimeEnd = this.dateEnd;
                this.$api.get('singular/statisticDaily/listTotal', {createTimeFrom:tradeTimeStart,createTimeTo:tradeTimeEnd}, r => {
                  r.data.forEach(item => {
                  });
                  this.data6 = r.data;
                })
            }
        }
    }
</script>
