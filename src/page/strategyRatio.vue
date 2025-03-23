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
.button2 {
  border: 2px solid black;
  border-collapse: collapse;
  width: 170px;
  height: 60px;
  background: #f5f7f9;
  opacity: 1;
  align-items:center;
  border-radius: 4px;
  color: black;
}
table, th, td {
  border: 1px solid black;
  border-collapse: collapse; /* 移除单元格之间的间隔 */
}

</style>
<template>
    <div class="layout">
        <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
            <Menu active-name="1-11" theme="dark" width="auto" :open-names="['1']" @on-select="routeTo">
                <Submenu name="1">
                    <template slot="title">
                        <Icon type="ios-navigate"></Icon>
                        股票管理
                    </template>
                  <MenuItem  name="1-8"><router-link to="/userLogin/1"><font color="#fff">登录</font></router-link></MenuItem>
                   <MenuItem  name="1-1"><router-link to="/"><font color="#fff">账户信息</font></router-link></MenuItem>
                   <MenuItem  name="1-2"><router-link to="/disableStockPool/1"><font color="#fff">禁止下单股票池</font></router-link></MenuItem>
                   <MenuItem  name="1-3"><router-link to="/radicalDragonPool/1"><font color="#fff">小池子</font></router-link></MenuItem>
                   <MenuItem  name="1-4"><router-link to="/orderCancelPool/1"><font color="#fff">等待撤单</font></router-link></MenuItem>
                   <MenuItem  name="1-5"><router-link to="/cancelLog/1"><font color="#fff">撤单日志</font></router-link></MenuItem>
                   <MenuItem  name="1-6"><router-link to="/content/1"><font color="#fff">参数</font></router-link></MenuItem>
                    <MenuItem  name="1-7"><router-link to="/sellOrder/1"><font color="#fff">卖出</font></router-link></MenuItem>
                    <MenuItem  name="1-9"><router-link to="/openButton/1"><font color="#fff">按钮</font></router-link></MenuItem>
                   <MenuItem  name="1-10"><router-link to="/blockView/1"><font color="#fff">板块信息</font></router-link></MenuItem>
                  <MenuItem  name="1-12"><router-link to="/blockDiy/1"><font color="#fff">自定义板块</font></router-link></MenuItem>
                  <MenuItem  name="1-11"><router-link to="/circulateInfo/1"><font color="#fff">股票信息</font></router-link></MenuItem>
                  <MenuItem  name="1-13"><router-link to="/scareBuy/1"><font color="#fff">恐慌买入</font></router-link></MenuItem>
                  <MenuItem  name="1-14"><router-link to="/batchBlock/1"><font color="#fff">批量买入</font></router-link></MenuItem>
                  <MenuItem  name="1-15"><router-link to="/disableUnmatch/1"><font color="#fff">禁止未匹配量买入</font></router-link></MenuItem>
                  <MenuItem  name="1-16"><router-link to="/stockBeforeRateInfo/1"><font color="#fff">涨幅过高股票信息</font></router-link></MenuItem>
                  <MenuItem  name="1-17"><router-link to="/stockOpenInfo/1"><font color="#fff">集合一字信息</font></router-link></MenuItem>
                  <MenuItem  name="1-18"><router-link to="/strategyRatio/1"><font color="#fff">扫板比例系数</font></router-link></MenuItem>
                </Submenu>
            </Menu>
        </Sider>
        <Layout :style="{marginLeft: '200px'}">
            <div style="height: 30px">
            </div>
          <div>
            <table>
              <thead>
              <tr>
                <th class="button2">仓位名称</th>
                <th class="button2">比例</th>
                <th class="button2">比例</th>
                <th class="button2">比例</th>
                <th class="button2">比例</th>
                <th class="button2">比例</th>
                <th class="button2">比例</th>
                <th class="button2">比例</th>
                <th class="button2">比例</th>
                <th class="button2">比例</th>
                <th class="button2">比例</th>
                <th class="button2">比例</th>
              </tr>
              </thead>
              <tbody>
              <tr class="button2" align="center" v-for="(row, rowIndex) in data6" :key="rowIndex">
                <td  v-for="(value, key) in row" :key="key">{{ value }}
                  <Button v-if="data7[rowIndex].positionRatio==value && key!='code'" style="margin-left: 5px" type="error">使用中</Button>
                  <Button v-if="data7[rowIndex].positionRatio!=value && key!='code'" style="margin-left: 5px" type="primary" @click="changeDayPercentPosition(data7[rowIndex].id,value)">未使用</Button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>

        </Layout>
    </div>
</template>
<script>
    export default {
      created: function () {
        this.$api.get('dragon/strategyRatio/listStrategyRatio', {}, r => {
          var infos = r.data;
          function Person(code, ratio0, ratio1, ratio2, ratio3, ratio4, ratio5, ratio6, ratio7, ratio8, ratio9, ratio10) {
            this.code = code;
            this.ratio0 = ratio0;
            this.ratio1 = ratio1;
            this.ratio2 = ratio2;
            this.ratio3 = ratio3;
            this.ratio4 = ratio4;
            this.ratio5 = ratio5;
            this.ratio6 = ratio6;
            this.ratio7 = ratio7;
            this.ratio8 = ratio8;
            this.ratio9 = ratio9;
            this.ratio10 = ratio10;
          }

          for (var i = 0; i < infos.length; i++) {
             var ratioInfo = infos[i];
             const person = new Person(ratioInfo.strategyCode, 0.00, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0)
             this.data6.push(person)
          }
          this.data7 = infos;
        })
      },
        data () {
            return {
                data6: [

                ],
                data7: [

                ]


            }
        },
        methods: {
          changeDayPercentPosition (rowIndex,ratio){
            this.$api.post('dragon/strategyRatio/changeRatio', {id:rowIndex,positionRatio:ratio}, r => {
              location.reload();
            })
          },


        }
    }
</script>
