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
            <Menu active-name="1-20" theme="dark" width="auto" :open-names="['1']" @on-select="routeTo">
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
                    <font style="font-weight:bold;font-size:15px;">股票代码：</font><Input name= "param1" v-model="param1" placeholder="stockCode" style="width: 300px" />
                  <font style="font-weight:bold;font-size:15px;">连板数：</font><Input name= "param2" v-model="param2" placeholder="板数" style="width: 300px" />

                    <Col span="5">
                      <font style="font-weight:bold;font-size:15px;">起始日期：</font><DatePicker format="yyyy-MM-dd"  @on-change="getStartTime" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
                    </Col>
                    <Col span="5">
                      <font style="font-weight:bold;font-size:15px;">结止日期：</font><DatePicker format="yyyy-MM-dd" @on-change="getEndTime"  type="date" placeholder="Select date" style="width: 200px"></DatePicker>
                    </Col>

                  <font style="font-weight:bold;font-size:15px;">是否成功封住：</font>
                  <Dropdown trigger="click" @on-click="changeMenu">
                    <a href="javascript:void(0)" name="all"  v-html='this.MenuText' >全部 <Icon type="ios-arrow-down"></Icon> </a>

                    <DropdownMenu slot="list">
                      <DropdownItem  name="all">全部</DropdownItem>
                      <DropdownItem  name="plank">尾盘封住</DropdownItem>
                      <DropdownItem  name="circulate">尾盘未封住</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>

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
            this.$api.get('singular/statisticDaily/list', {pageNo:1,pageSize:100}, r => {
               r.data.forEach(item => {
                 if(item.endStatus==0){
                   item.endStatusName = "失败"
                 }
                 if(item.endStatus==1){
                   item.endStatusName = "成功"
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
                        key: 'stockName'
                    },
                    {
                        title: '第几板',
                        key: 'plankType'
                    },
                    {
                        title: '尾盘是否炸板',
                        key: 'endStatusName'
                    },
                    {
                      title: '最高溢价',
                      key: 'highest'
                    },
                    {
                      title: '最低溢价',
                      key: 'lowest'
                    },
                    {
                      title: '平均溢价',
                      key: 'average'
                    },
                    {
                      title: '交易日期',
                      key: 'tradeDate'
                    }

                ],
                data6: [

                ],
                dateStart:"",
                dateEnd:"",
                MenuText:'全部',
                endStatus:null

            }
        },
        methods: {


          changeMenu(name) {
            if (name == 'all') {
              this.MenuText = '全部';
              this.endStatus = null;
            } else if (name == 'plank') {
              this.MenuText = '尾盘封住';
              this.endStatus = 1;
            } else {
              this.MenuText = '尾盘未封住';
              this.endStatus = 0;
            }
          },


          getStartTime(starTime) {
            this.dateStart = starTime;
          },
          getEndTime(endTime) {
            this.dateEnd = endTime;
          },


          search(){
                var stockCode = this.param1;
                var plankType = this.param2;
                var tradeTimeStart = this.dateStart;
                var tradeTimeEnd = this.dateEnd;
                if(stockCode){
                  stockCode = stockCode;
                }else{
                  stockCode = null;
                }
                this.$api.get('singular/statisticDaily/list', {stockCode:stockCode,pageNo:1,pageSize:50,createTimeFrom:tradeTimeStart,createTimeTo:tradeTimeEnd,plankType:plankType,endStatus:this.endStatus}, r => {
                  r.data.forEach(item => {
                    if(item.endStatus==0){
                      item.endStatusName = "失败"
                    }
                    if(item.endStatus==1){
                      item.endStatusName = "成功"
                    }
                  });
                  this.data6 = r.data;
                })
            }
        }
    }
</script>
