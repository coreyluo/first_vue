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
            <Menu active-name="1-30" theme="dark" width="auto" :open-names="['1']" @on-select="routeTo">
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
                  <MenuItem  name="1-27"><router-link to="/sevenSunPool/1"><font color="#fff">低点买入策略</font></router-link></MenuItem>
                  <MenuItem  name="1-28"><router-link to="/dragonTigerStock/1"><font color="#fff">龙虎榜</font></router-link></MenuItem>
                  <MenuItem  name="1-29"><router-link to="/flowKbar/1"><font color="#fff">流动性数据</font></router-link></MenuItem>
                  <MenuItem  name="1-30"><router-link to="/prohibitStockPool/1"><font color="#fff">股票池修改</font></router-link></MenuItem>
                  <MenuItem  name="1-31"><router-link to="/stopTradeStock/1"><font color="#fff">即将违规股票</font></router-link></MenuItem>
                </Submenu>
            </Menu>
        </Sider>
        <Layout :style="{marginLeft: '200px'}">
            <div style="height: 30px">
            </div>
            <template>
                <div>
                    <font style="font-weight:bold;font-size:15px;">股票代码：</font><Input name= "param1" v-model="param1" placeholder="stockCode" style="width: 300px" />
                    <Button type="primary" style="margin-left: 5px" icon="ios-search" @click="search()">查询</Button>
                     <Button style="margin-right: 5px"type="primary" @click="sortChange()">日期排序</Button>
                     <Button style="margin-right: 5px" type="success" @click="modal1=true;show()">添加</Button>
                     <Button style="margin-right: 5px" type="primary" @click="modal2=true;show()">全部删除</Button>
                </div>

            </template>
            <Table border :columns="columns12" :data="historyData">
                <template slot-scope="{ row }" slot="tab">
                    <strong>{{ row.tab }}</strong>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                    <Button type="error" size="small"  @click="deleteInfo(index)">删除</Button>
                </template>
            </Table>

          <Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage" @on-page-size-change="changepagesize"></Page>


          <template>
                <Modal
                    v-model="modal1"
                    title="删除股票"
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
                title="确定要清空禁止股票吗"
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
            this.$api.get('singular/prohibitPool/dataList', {sortType:this.sortType}, r => {
                var infos = r.data;
                infos.forEach(item => {
                  if(item.stockCode.substring(0,1)=="6"){
                    item.stockDetail = "http://quote.eastmoney.com/sh"+item.stockCode+".html";
                  }else {
                    item.stockDetail = "http://quote.eastmoney.com/sz" + item.stockCode + ".html";
                  }
                });
                this.data6=infos;

                this.ajaxHistoryData = this.data6;
                this.dataCount = this.data6.length;
                // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
                if(this.data6.length < this.pageSize){
                  this.historyData = this.ajaxHistoryData;
                }else{
                  this.historyData = this.ajaxHistoryData.slice(0,this.pageSize);
                }
            });
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
                      title: '添加日期',
                      key: 'createTime'
                    },
                    {
                      title: '股票详情',
                      key: 'stockDetail',
                      render: (h, params) => {
                        let url = params.row.stockDetail
                        return h('a', {
                          attrs: {
                            href: url,
                            target: '_black'
                          }
                        }, params.row.stockDetail)
                      }
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
                historyData: [],
                ajaxHistoryData:[],
                page:{

                },
                dataCount:0,
                // 每页显示多少条
                pageSize:50,
                sortType:1,
                modal1: false,
                modal2:false,

            }
        },
        methods: {

            handleListApproveHistory(){
                // 保存取到的所有数据
                this.ajaxHistoryData = this.data6;
                this.dataCount = this.data6.length;
                // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
                if(this.data6.length < this.pageSize){
                  this.historyData = this.ajaxHistoryData;
                }else{
                  this.historyData = this.ajaxHistoryData.slice(0,this.pageSize);
                }
            },

            changepage(index){
              var _start = ( index - 1 ) * this.pageSize;
              var _end = index * this.pageSize;
              this.historyData = this.ajaxHistoryData.slice(_start,_end);
            },
            changepagesize(pageSize){
              this.pageSize = pageSize;
              this.handleListApproveHistory()
            },

            search(){
              alert(100)
                var stockCode = this.param1;
                if(stockCode){
                  stockCode = stockCode;
                }else{
                  stockCode = null;
                }
                this.$api.get('singular/prohibitPool/dataList', {stockCode:stockCode,sortType:this.sortType}, r => {
                  var infos = r.data;
                  infos.forEach(item => {
                    if(item.stockCode.substring(0,1)=="6"){
                      item.stockDetail = "http://quote.eastmoney.com/sh"+item.stockCode+".html";
                    }else {
                      item.stockDetail = "http://quote.eastmoney.com/sz" + item.stockCode + ".html";
                    }
                  });
                  this.data6=infos;

                  this.ajaxHistoryData = this.data6;
                  this.dataCount = this.data6.length;
                  // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
                  if(this.data6.length < this.pageSize){
                    this.historyData = this.ajaxHistoryData;
                  }else{
                    this.historyData = this.ajaxHistoryData.slice(0,this.pageSize);
                  }
                })
            },
            ok () {
                var stockCodeAdd= this.param2
                this.$api.get('singular/prohibitPool/oneToPool', {stockCode:stockCodeAdd}, r => {
                })
                location.reload()
            },
            cancel () {
               this.$Message.info($("param1").value)
            },



            deleteInfo(index){
                var primaryKey = this.data6[index].stockCode;
                this.$api.get('singular/prohibitPool/removeStockCode', {stockCode:primaryKey}, r => {

                });
                location.reload()
            },
            removeAll(){
                this.$api.get('singular/prohibitPool/deleteAll', null, r => {
                })
                location.reload()
            },
            okClear () {
              this.$api.get('singular/prohibitPool/deleteAll', null, r => {
              })
              location.reload()
            },

            cancelClear () {
            },
            sortChange(){
              if(this.sortType==0){
                this.sortType = 1;
              }else{
                this.sortType = 0;
              }
              var stockCode = this.param1;
              if(stockCode){
                stockCode = stockCode;
              }else{
                stockCode = null;
              }
              this.$api.get('singular/prohibitPool/dataList', {stockCode:stockCode,sortType:this.sortType}, r => {
                var infos = r.data;
                infos.forEach(item => {
                  if(item.stockCode.substring(0,1)=="6"){
                    item.stockDetail = "http://quote.eastmoney.com/sh"+item.stockCode+".html";
                  }else {
                    item.stockDetail = "http://quote.eastmoney.com/sz" + item.stockCode + ".html";
                  }
                });
                this.data6=infos;
                this.ajaxHistoryData = this.data6;
                this.dataCount = this.data6.length;
                // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
                if(this.data6.length < this.pageSize){
                  this.historyData = this.ajaxHistoryData;
                }else{
                  this.historyData = this.ajaxHistoryData.slice(0,this.pageSize);
                }
              })
            },
        }
    }
</script>
