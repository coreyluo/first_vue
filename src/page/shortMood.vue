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
      <Menu active-name="1-33" theme="dark" width="auto" :open-names="['1']" @on-select="routeTo">
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
          <MenuItem  name="1-32"><router-link to="/positionRatio/1"><font color="#fff">低吸仓位系数</font></router-link></MenuItem>
          <MenuItem  name="1-33"><router-link to="/shortMood/1"><font color="#fff">短线情绪</font></router-link></MenuItem>
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
    <Layout :style="{marginLeft: '300px'}">
      <div id="myChart" :style="{width: '1500px', height: '400px'}"></div>
      <div id="myChart1" :style="{width: '1500px', height: '400px'}"></div>
      <div id="myChart2" :style="{width: '1500px', height: '400px'}"></div>
    </Layout>


  </div>
</template>
<script>
  // 引入基本模板
  let echarts = require('echarts/lib/echarts')
  // 引入柱状图组件
  require('echarts/lib/chart/line')
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  export default {
    created () {
      this.$api.post('singular/shortMoodCondition/listData', {}, r => {
        var profits = r.data.profits;
        var suddens = r.data.suddenPlanks;
        var uppers = r.data.upperPlanks;
        profits.forEach(item => {
          var profitSons = [];
          profitSons.push(item.key);
          profitSons.push(item.value)
          this.profitList.push(profitSons)
        })
        uppers.forEach(item => {
          var upperSons = [];
          upperSons.push(item.key);
          upperSons.push(item.value)
          this.upperPlankCountList.push(upperSons)
        })
        suddens.forEach(item => {
          var suddenSons = [];
          suddenSons.push(item.key);
          suddenSons.push(item.value)
          this.suddenPlankCountList.push(suddenSons)
        })

        this.drawLine();
      })


    },
    name: 'hello',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        profitList: [],
        upperPlankCountList:[],
        suddenPlankCountList:[]
      }
    },
    methods: {

      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart1 = echarts.init(document.getElementById('myChart1'))
        let myChart = echarts.init(document.getElementById('myChart'))
        let myChart2 = echarts.init(document.getElementById('myChart2'))
       var profitXList = this.profitList.map(function (item) {
          return item[0];
        });
        var profitYList = this.profitList.map(function (item) {
          return item[1];
        });

        var upperXList = this.upperPlankCountList.map(function (item) {
          return item[0];
        });
        var upperYList = this.upperPlankCountList.map(function (item) {
          return item[1];
        });

        var suddenXList = this.suddenPlankCountList.map(function (item) {
          return item[0];
        });
        var suddenYList = this.suddenPlankCountList.map(function (item) {
          return item[1];
        });
        myChart.setOption({
          title: {
            text: '情绪'
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            data: profitXList
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: profitYList,
            type: 'line'
          }]
        });


        // 绘制图表
        myChart1.setOption({
          title: {
            text: '涨停数量'
          },
          tooltip: {
            trigger: 'axis'
          },
          lineStyle:{
            color:'#FF2D2D'
          },
          itemStyle : {
            normal : {
              color:'#FF2D2D'
            }
          },
          xAxis: {
            type: 'category',
            data: upperXList
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: upperYList,
            type: 'line'
          }]
        });

        myChart2.setOption({
          title: {
            text: '跌停数量'
          },
          tooltip: {
            trigger: 'axis'
          },
          lineStyle:{
            color:'#007500'
          },
          itemStyle : {
            normal : {
              color:'#007500'
            }
          },
          xAxis: {
            type: 'category',
            data: suddenXList
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: suddenYList,
            type: 'line'
          }]
        });


      }
    }
  }
 </script>
