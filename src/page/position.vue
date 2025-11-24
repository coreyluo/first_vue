
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
      <Menu active-name="1-1" theme="dark" width="auto" :open-names="['1']" @on-select="routeTo">
        <Submenu name="1">
          <template slot="title">
            <Icon type="ios-navigate"></Icon>
            股票管理
          </template>
          <MenuItem  name="1-8"><router-link to="/userLogin/1"><font color="#fff">登录</font></router-link></MenuItem>
          <MenuItem  name="1-1"><router-link to="/"><font color="#fff">账户信息</font></router-link></MenuItem>
          <MenuItem  name="1-18"><router-link to="/strategyRatio/1"><font color="#fff">扫板比例系数</font></router-link></MenuItem>
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
        </Submenu>
      </Menu>
    </Sider>
    <Layout :style="{marginLeft: '200px'}">
      <div style="height: 30px">
      </div>
      <Table border :columns="columns13" :data="data7">
        <template slot-scope="{ row }" slot="tab">
          <strong>{{ row.tab }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" style="margin-right: 5px" @click="modal1=true;show(index)">修改三大市场仓位</Button>

          <Button type="primary" style="margin-right: 5px" @click="modal2=true;show2(index)">修改比例</Button>

          <Button v-if="row.accountStatus===0" style="margin-left: 5px" type="warning" @click="changeAccountStatus(1,index,1)">主板已经关闭,请开启</Button>
          <Button v-if="row.accountStatus===1" style="margin-left: 5px" type="primary" @click="changeAccountStatus(1,index,0)">主板已经开启,请关闭</Button>

          <Button v-if="row.accountStatus300===0" style="margin-left: 5px" type="warning" @click="changeAccountStatus(2,index,1)">创业板已经关闭,请开启</Button>
          <Button v-if="row.accountStatus300===1" style="margin-left: 5px" type="primary" @click="changeAccountStatus(2,index,0)">创业板已经开启,请关闭</Button>

          <Button v-if="row.accountStatus688===0" style="margin-left: 5px" type="warning" @click="changeAccountStatus(3,index,1)">科创板已经关闭,请开启</Button>
          <Button v-if="row.accountStatus688===1" style="margin-left: 5px" type="primary" @click="changeAccountStatus(3,index,0)">科创板已经开启,请关闭</Button>

          <div>&nbsp</div>

          <Button v-if="row.dragonRadicalStatus===0" style="margin-right: 5px" type="warning" @click="changeAccountStatus(4,index,1)">超龙头已关闭,请开启</Button>
          <Button v-if="row.dragonRadicalStatus===1" style="margin-right: 5px" type="primary" @click="changeAccountStatus(4,index,0)">超龙头已开启,请禁用</Button>

          <Button v-if="row.twoPlankStatus===0" style="margin-left: 5px" type="warning" @click="changeAccountStatus(5,index,1)">二板已经关闭,请开启</Button>
          <Button v-if="row.twoPlankStatus===1" style="margin-left: 5px" type="primary" @click="changeAccountStatus(5,index,0)">二板已经开启,请关闭</Button>

          <Button v-if="row.highPlankStatus===0" style="margin-left: 5px" type="warning" @click="changeAccountStatus(6,index,1)">高位板已经关闭,请开启</Button>
          <Button v-if="row.highPlankStatus===1" style="margin-left: 5px" type="primary" @click="changeAccountStatus(6,index,0)">高位板已经开启,请关闭</Button>

          <Button v-if="accountMarketType===0" style="margin-left: 5px" type="warning" >全市场</Button>
          <Button v-if="accountMarketType===1" style="margin-left: 5px" type="primary">上海</Button>
          <Button v-if="accountMarketType===2" style="margin-left: 5px" type="primary">深圳</Button>

          <div>&nbsp</div>
          <Button v-if="row.plankTradeButton" style="margin-left: 5px" type="primary" @click="changePlankTradeButton()">普达触碰涨停已开启</Button>
          <Button v-if="!row.plankTradeButton" style="margin-left: 5px" type="warning" @click="changePlankTradeButton()">普达触碰涨停已关闭</Button>

          <Button type="primary" style="margin-right: 5px" @click="modal6=true;show6()">修改总卖百分比</Button>

        </template>
      </Table>

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
            <tr class="button2" align="center" v-for="(row, rowIndex) in data8" :key="rowIndex">
              <td  v-for="(value, key) in row" :key="key">{{ value }}
                <Button  v-if="rowIndex==0 && percentNormal===value && key!='positionTitle' " style="margin-left: 5px" type="error">使用中</Button >
                <Button v-if="rowIndex==0 && percentNormal!=value && key!='positionTitle'" style="margin-left: 5px" type="primary" @click="changeDayPercentPosition(rowIndex,value)">未使用</Button>
                <Button  v-if="rowIndex==1 && percent300===value && key!='positionTitle' " style="margin-left: 5px" type="error">使用中</Button >
                <Button v-if="rowIndex==1 && percent300!=value && key!='positionTitle'" style="margin-left: 5px" type="primary" @click="changeDayPercentPosition(rowIndex,value)">未使用</Button>
                <Button  v-if="rowIndex==2 && aiPercentNormal===value && key!='positionTitle' " style="margin-left: 5px" type="error">使用中</Button >
                <Button v-if="rowIndex==2 && aiPercentNormal!=value && key!='positionTitle'" style="margin-left: 5px" type="primary" @click="changeDayPercentPosition(rowIndex,value)">未使用</Button>
                <Button  v-if="rowIndex==3 && aiPercent300===value && key!='positionTitle' " style="margin-left: 5px" type="error">使用中</Button >
                <Button v-if="rowIndex==3 && aiPercent300!=value && key!='positionTitle'" style="margin-left: 5px" type="primary" @click="changeDayPercentPosition(rowIndex,value)">未使用</Button>
                <Button  v-if="rowIndex==4 && aiScorePercentNormal===value && key!='positionTitle' " style="margin-left: 5px" type="error">使用中</Button >
                <Button v-if="rowIndex==4 && aiScorePercentNormal!=value && key!='positionTitle'" style="margin-left: 5px" type="primary" @click="changeDayPercentPosition(rowIndex,value)">未使用</Button>
                <Button  v-if="rowIndex==5 && aiScorePercent300===value && key!='positionTitle' " style="margin-left: 5px" type="error">使用中</Button >
                <Button v-if="rowIndex==5 && aiScorePercent300!=value && key!='positionTitle'" style="margin-left: 5px" type="primary" @click="changeDayPercentPosition(rowIndex,value)">未使用</Button>
                <Button  v-if="rowIndex==6 && aiWangPercentNormal===value && key!='positionTitle' " style="margin-left: 5px" type="error">使用中</Button >
                <Button v-if="rowIndex==6 && aiWangPercentNormal!=value && key!='positionTitle'" style="margin-left: 5px" type="primary" @click="changeDayPercentPosition(rowIndex,value)">未使用</Button>
                <Button  v-if="rowIndex==7 && aiWangPercent300===value && key!='positionTitle' " style="margin-left: 5px" type="error">使用中</Button >
                <Button v-if="rowIndex==7 && aiWangPercent300!=value && key!='positionTitle'" style="margin-left: 5px" type="primary" @click="changeDayPercentPosition(rowIndex,value)">未使用</Button>

              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <template>
        <Modal
          v-model="modal1"
          title="市场仓位修改"
          @on-ok="ok"
          @on-cancel="cancel">
          <div>
            主板仓位:<Input name= "param1" v-model="param1" placeholder="" style="width: 300px" />
          </div>
          <div>
            创业板仓位:<Input name= "param300" v-model="param300" placeholder="" style="width: 300px" />
          </div>
          <div>
            科创板仓位:<Input name= "param688" v-model="param688" placeholder="" style="width: 300px" />
          </div>
          <div>
            通用仓位:<Input name= "generalPosition" v-model="generalPosition" placeholder="" style="width: 300px" />
          </div>
          <div>
            ai仓位:<Input name= "aiPosition" v-model="aiPosition" placeholder="" style="width: 300px" />
          </div>
          <div>
            ai300仓位:<Input name= "aiPosition300" v-model="aiPosition300" placeholder="" style="width: 300px" />
          </div>
          <div>
            未匹配仓位:<Input name= "unmatchPosition" v-model="unmatchPosition" placeholder="" style="width: 300px" />
          </div>
          <div>
            牵引力仓位:<Input name= "positionBlock" v-model="positionBlock" placeholder="" style="width: 300px" />
          </div>
          <div>
            低吸单笔:<Input name= "positionBuyLow" v-model="positionBuyLow" placeholder="" style="width: 300px" />
          </div>
          <div>
            etf单笔:<Input name= "positionEtf" v-model="positionEtf" placeholder="" style="width: 300px" />
          </div>
        </Modal>
      </template>

      <template>
        <Modal
          v-model="modal2"
          title="比例修改"
          @on-ok="ok2"
          @on-cancel="cancel2">
          <div>
            二板仓位比例:<Input name= "paramTwoPlankRatio" v-model="paramTwoPlankRatio" placeholder="" style="width: 300px" />
          </div>
          <div>
            高位板仓位比例:<Input name= "paramHighPlankRatio" v-model="paramHighPlankRatio" placeholder="" style="width: 300px" />
          </div>
          <div>
            反包仓位比例:<Input name= "rePlankRatio" v-model="paramRePlankRatio" placeholder="" style="width: 300px" />
          </div>
          <div>
            大市值仓位比例:<Input name= "paramBig" v-model="paramBig" placeholder="" style="width: 300px" />
          </div>
          <div>
            跟随比例:<Input name= "paramFollowDaLaoRatio" v-model="paramFollowDaLaoRatio" placeholder="" style="width: 300px" />
          </div>
        </Modal>
      </template>

      <template>
        <Modal
          v-model="modal6"
          title="总卖百分比"
          @on-ok="ok6"
          @on-cancel="cancel6">
          <div>
            总卖百分比:<Input name= "percentTotalSell" v-model="percentTotalSell" placeholder="" style="width: 300px" />
          </div>
        </Modal>
      </template>

      <template>
        <Modal
          v-model="modal3"
          title="有仓位超过300万了，确定吗？"
          @on-ok="okClear"
          @on-cancel="cancelClear">
        </Modal>
      </template>

      <template>
        <Modal
          v-model="modal4"
          title="ai仓位超过1000万了，确定吗？"
          @on-ok="okClear"
          @on-cancel="cancelClear">
        </Modal>
      </template>
      <template>
        <Modal
          v-model="modal5"
          title="牵引力仓位超过1000万了，确定吗？"
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
      this.$api.get('dragon/tradeAccount/listOrderPrice', null, r => {
        var infos = r.data;
        this.data7 = infos
        this.percentNormal = infos[0].percentNormal;
        this.percent300 = infos[0].percent300;
        this.aiPercentNormal = infos[0].aiPercentNormal;
        this.aiPercent300 = infos[0].aiPercent300;
        this.aiScorePercentNormal = infos[0].aiScorePercentNormal;
        this.aiScorePercent300 = infos[0].aiScorePercent300;
        this.aiWangPercentNormal = infos[0].aiWangPercentNormal;
        this.aiWangPercent300 = infos[0].aiWangPercent300;
        this.accountMarketType = infos[0].marketType;
        this.plankTradeButton = infos[0].plankTradeButton;
        this.percentTotalSell = infos[0].percentTotalSell;
      })
    },

    data () {
      return {
        columns13: [
          {
            title: '券商交易账号',
            key: 'userId',
            align: 'center'
          },
          {
            title: '主板仓位',
            key: 'position',
            align: 'center'
          },
          {
            title: '创业板仓位',
            key: 'position300',
            align: 'center'
          },
          {
            title: '科创板仓位',
            key: 'position688',
            align: 'center'
          },
          {
            title: '大流通市值仓位系数',
            key: 'positionBigAmount',
            align: 'center'
          },
          {
            title: '通用仓位',
            key: 'generalPosition',
            align: 'center'
          },
          {
            title: '扫板',
            key: 'aiPosition',
            align: 'center'
          },
          {
            title: '扫板300',
            key: 'aiPosition300',
            align: 'center'
          },
          {
            title: 'ai何',
            key: 'aiScorePosition',
            align: 'center'
          },
          {
            title: 'ai何300',
            key: 'aiScorePosition300',
            align: 'center'
          },
          {
            title: 'ai汪',
            key: 'aiWangPosition',
            align: 'center'
          },
          {
            title: 'ai汪300',
            key: 'aiWangPosition300',
            align: 'center'
          },
          {
            title: '二板仓位系数',
            key: 'twoPlankRatio',
            align: 'center'
          },
          {
            title: '高位仓位系数',
            key: 'highPlankRatio',
            align: 'center'
          },
          {
            title: '反包仓位系数',
            key: 'rePlankRatio',
            align: 'center'
          },
          {
            title: '未匹配仓位',
            key: 'unmatchPosition',
            align: 'center'
          },
          {
            title: '牵引力仓位',
            key: 'positionBlock',
            align: 'center'
          },
          {
            title: '低吸单笔',
            key: 'positionBuyLow',
            align: 'center'
          },
          {
            title: 'etf单笔',
            key: 'positionEtf',
            align: 'center'
          },
          {
            title: '跟随仓位系数分母',
            key: 'followDaLaoRatio',
            align: 'center'
          },
          {
            title: '操作',
            slot: 'action',
            width: 850,
            align: 'center'
          }
        ],

        columns14: [
          {
            title: '仓位名称',
            key: 'positionTitle',
            align: 'center'
          },
          {
            title: '比例',
            key: 'percent0',
            align: 'center'
          },
          {
            title: '比例',
            key: 'percent1',
            align: 'center'
          },
          {
            title: '比例',
            key: 'percent2',
            align: 'center'
          },
          {
            title: '比例',
            key: 'percent3',
            align: 'center'
          },
          {
            title: '比例',
            key: 'percent4',
            align: 'center'
          },
          {
            title: '比例',
            key: 'percent5',
            align: 'center'
          },
          {
            title: '比例',
            key: 'percent6',
            align: 'center'
          },
          {
            title: '比例',
            key: 'percent7',
            align: 'center'
          },
          {
            title: '比例',
            key: 'percent8',
            align: 'center'
          },
          {
            title: '比例',
            key: 'percent9',
            align: 'center'
          }
          ,
          {
            title: '比例',
            key: 'percent10',
            align: 'center'
          }
        ],
        data7: [

        ],
        data8: [
          {
            positionTitle: '主板比例',
            percent0: 0.1,
            percent1: 1,
            percent2: 2,
            percent3: 3,
            percent4: 4,
            percent5: 5,
            percent6: 6,
            percent7: 7,
            percent8: 8,
            percent9: 9,
            percent10: 10,
          },
          {
            positionTitle: '创业板比例',
            percent0: 0.1,
            percent1: 1,
            percent2: 2,
            percent3: 3,
            percent4: 4,
            percent5: 5,
            percent6: 6,
            percent7: 7,
            percent8: 8,
            percent9: 9,
            percent10: 10,
          },
          {
            positionTitle: '主板扫板比例',
            percent0: 0.1,
            percent1: 1,
            percent2: 2,
            percent3: 3,
            percent4: 4,
            percent5: 5,
            percent6: 6,
            percent7: 7,
            percent8: 8,
            percent9: 9,
            percent10: 10,
          },
          {
            positionTitle: '创业板扫板比例',
            percent0: 0.1,
            percent1: 1,
            percent2: 2,
            percent3: 3,
            percent4: 4,
            percent5: 5,
            percent6: 6,
            percent7: 7,
            percent8: 8,
            percent9: 9,
            percent10: 10,
          },
          {
            positionTitle: '主板ai何比例',
            percent0: 0.1,
            percent1: 1,
            percent2: 2,
            percent3: 3,
            percent4: 4,
            percent5: 5,
            percent6: 6,
            percent7: 7,
            percent8: 8,
            percent9: 9,
            percent10: 10,
          },
          {
            positionTitle: '创业板ai何比例',
            percent0: 0.1,
            percent1: 1,
            percent2: 2,
            percent3: 3,
            percent4: 4,
            percent5: 5,
            percent6: 6,
            percent7: 7,
            percent8: 8,
            percent9: 9,
            percent10: 10,
          },
          {
            positionTitle: '主板ai汪比例',
            percent0: 0.1,
            percent1: 1,
            percent2: 2,
            percent3: 3,
            percent4: 4,
            percent5: 5,
            percent6: 6,
            percent7: 7,
            percent8: 8,
            percent9: 9,
            percent10: 10,
          },
          {
            positionTitle: '创业板ai汪比例',
            percent0: 0.1,
            percent1: 1,
            percent2: 2,
            percent3: 3,
            percent4: 4,
            percent5: 5,
            percent6: 6,
            percent7: 7,
            percent8: 8,
            percent9: 9,
            percent10: 10,
          }

        ],
        modal1: false,
        modal2:false,
        modal3:false,
        modal4:false,
        modal6:false,

        indexId:0,
        currentPosition:0,
        currentPosition300:0,
        currentPosition688:0,
        currentGeneralPosition:0,
        currentAiPosition:0,
        currentAiPosition300:0,
        currentUnmatchPosition:0,
        currentPositionBlock:0,
        currentPositionBuyLow:0,
        currentPositionEtf:0,
        percentNormal:null,
        percent300:null,
        aiPercentNormal:null,
        aiPercent300:null,
        aiScorePercentNormal:null,
        aiScorePercent300:null,
        aiWangPercentNormal:null,
        aiWangPercent300:null,
        accountMarketType:0,
        plankTradeButton:false,
        percentTotalSell:0,
      }
    },
    methods: {
      show (index) {
        this.indexId=this.data7[index].id;
        this.param1=this.data7[index].position;
        this.param300=this.data7[index].position300;
        this.param688=this.data7[index].position688;
        this.generalPosition = this.data7[index].generalPosition;
        this.aiPosition = this.data7[index].aiPosition
        this.aiPosition300 = this.data7[index].aiPosition300
        this.unmatchPosition = this.data7[index].unmatchPosition
        this.positionBlock = this.data7[index].positionBlock
        this.positionBuyLow = this.data7[index].positionBuyLow
        this.positionEtf = this.data7[index].positionEtf
      },
      ok () {
        var position= this.param1;
        var changerId = this.indexId;
        var position300 = this.param300;
        var position688 = this.param688;
        var generalPosition = this.generalPosition;
        var aiPosition = this.aiPosition;
        var aiPosition300 = this.aiPosition300;
        var unmatchPosition = this.unmatchPosition;
        var positionBlock = this.positionBlock
        var positionBuyLow = this.positionBuyLow
        var positionEtf = this.positionEtf

        if(position>=3000000||position300>=3000000||position688>=3000000||generalPosition>=3000000){
          this.currentPosition = position;
          this.currentPosition300 = position300;
          this.currentPosition688 = position688;
          this.currentGeneralPosition = generalPosition;
          this.currentAiPosition = aiPosition;
          this.currentAiPosition300 = aiPosition300;
          this.currentUnmatchPosition = unmatchPosition;
          this.currentPositionBlock = positionBlock;
          this.currentPositionBuyLow = positionBuyLow;
          this.currentPositionEtf = positionEtf;
          this.modal3 = true;
        }else if(aiPosition>=10000000){
          this.currentPosition = position;
          this.currentPosition300 = position300;
          this.currentPosition688 = position688;
          this.currentGeneralPosition = generalPosition;
          this.currentAiPosition = aiPosition;
          this.currentAiPosition300 = aiPosition300;
          this.currentUnmatchPosition = unmatchPosition;
          this.currentPositionBlock = positionBlock;
          this.currentPositionBuyLow = positionBuyLow;
          this.currentPositionEtf = positionEtf;
          this.modal4 = true;
        }else if(positionBlock>=10000000){
          this.currentPosition = position;
          this.currentPosition300 = position300;
          this.currentPosition688 = position688;
          this.currentGeneralPosition = generalPosition;
          this.currentAiPosition = aiPosition;
          this.currentAiPosition300 = aiPosition300;
          this.currentUnmatchPosition = unmatchPosition;
          this.currentPositionBlock = positionBlock;
          this.currentPositionBuyLow = positionBuyLow;
          this.currentPositionEtf = positionEtf;
          this.modal4 = true;
        }else{
          this.$api.post('dragon/tradeAccount/changeOrderPrice', {id:changerId,position:position,position300:position300,position688:position688, generalPosition:generalPosition,aiPosition:aiPosition,aiPosition300:aiPosition300,unmatchPosition:unmatchPosition,positionBlock:positionBlock,positionBuyLow:positionBuyLow,positionEtf:positionEtf}, r => {
            location.reload();
          })
        }

      },
      cancel () {
        this.$Message.info($("param1").value)
      },


      show2 (index) {
        this.indexId=this.data7[index].id;
        this.paramTwoPlankRatio = this.data7[index].twoPlankRatio;
        this.paramHighPlankRatio = this.data7[index].highPlankRatio;
        this.paramRePlankRatio = this.data7[index].rePlankRatio;
        this.paramBig = this.data7[index].positionBigAmount;
        this.paramFollowDaLaoRatio = this.data7[index].followDaLaoRatio;
      },
      ok2 () {
        var changerId = this.indexId;
        var twoPlankRatio = this.paramTwoPlankRatio;
        var highPlankRatio = this.paramHighPlankRatio;
        var rePlankRatio = this.paramRePlankRatio;
        var positionBigAmount = this.paramBig;
        var followDaLaoRatio = this.paramFollowDaLaoRatio;
        this.$api.post('dragon/tradeAccount/changeRate', {id:changerId,twoPlankRatio:twoPlankRatio,highPlankRatio:highPlankRatio,rePlankRatio:rePlankRatio,positionBigAmount:positionBigAmount,followDaLaoRatio:followDaLaoRatio}, r => {
          location.reload();
        })


      },
      cancel2 () {
        this.$Message.info($("param2").value)
      },

      changeAccountStatus (buttonIndex,index,buttonValue){
        var idVal=this.data7[index].id;
        var accountStatusStr = this.data7[index].accountStatus;
        var accountStatus300Str = this.data7[index].accountStatus300;
        var accountStatus688Str = this.data7[index].accountStatus688;
        var dragonRadicalStatusStr = this.data7[index].dragonRadicalStatus;
        var twoPlankStatusStr    = this.data7[index].twoPlankStatus;
        var highPlankStatusStr    = this.data7[index].highPlankStatus;

        if(buttonIndex==1){
          accountStatusStr = buttonValue;
        } else if(buttonIndex==2){
          accountStatus300Str = buttonValue;
        }else if(buttonIndex==3){
          accountStatus688Str = buttonValue;
        }else if(buttonIndex==4){
          dragonRadicalStatusStr = buttonValue;
        }else if(buttonIndex==5){
          twoPlankStatusStr = buttonValue;
        }else if(buttonIndex==6){
          highPlankStatusStr = buttonValue;
        }
        this.$api.post('dragon/tradeAccount/changeAccountStatus', {id:idVal,accountStatus:accountStatusStr,accountStatus300:accountStatus300Str,accountStatus688:accountStatus688Str,
          dragonRadicalStatus:dragonRadicalStatusStr,twoPlankStatus:twoPlankStatusStr,highPlankStatus:highPlankStatusStr
          }, r => {
          location.reload();
        })
      },

      changeDayPercentPosition (rowIndexInfo,buttonValue){
          if(rowIndexInfo==0) {
            this.percentNormal = buttonValue;
          }
          if(rowIndexInfo==1) {
            this.percent300 = buttonValue;
          }
          if(rowIndexInfo==2) {
            this.aiPercentNormal = buttonValue;
          }
          if(rowIndexInfo==3) {
            this.aiPercent300 = buttonValue;
          }
        if(rowIndexInfo==4) {
          this.aiScorePercentNormal = buttonValue;
        }
        if(rowIndexInfo==5) {
          this.aiScorePercent300 = buttonValue;
        }
        if(rowIndexInfo==6) {
          this.aiWangPercentNormal = buttonValue;
        }
        if(rowIndexInfo==7) {
          this.aiWangPercent300 = buttonValue;
        }
          var idVal=this.data7[0].id;
          var percentNormal = this.percentNormal;
          var percent300 = this.percent300;
          var aiPercentNormal = this.aiPercentNormal;
          var aiPercent300 = this.aiPercent300;
          var aiScorePercentNormal = this.aiScorePercentNormal;
          var aiScorePercent300 = this.aiScorePercent300;
          var aiWangPercentNormal = this.aiWangPercentNormal;
          var aiWangPercent300 = this.aiWangPercent300;

          this.$api.post('dragon/tradeAccount/changePercentOrderPrice', {id:idVal,percentNormal:percentNormal,percent300:percent300,aiPercentNormal:aiPercentNormal,aiPercent300:aiPercent300,aiScorePercentNormal:aiScorePercentNormal,aiScorePercent300:aiScorePercent300,aiWangPercentNormal:aiWangPercentNormal,aiWangPercent300:aiWangPercent300}, r => {
            location.reload();
          })
      },

      okClear () {
        var changerId = this.indexId;
        var position = this.currentPosition;
        var position300 = this.currentPosition300;
        var position688 = this.currentPosition688;
        var generalPosition= this.currentGeneralPosition;
        var aiPosition = this.currentAiPosition;
        var aiPosition300 = this.currentAiPosition300;
        var unmatchPosition = this.currentUnmatchPosition;
        var positionBlock = this.currentPositionBlock
        this.$api.post('dragon/tradeAccount/changeOrderPrice', {id:changerId,position:position,position300:position300,position688:position688, generalPosition:generalPosition,aiPosition:aiPosition,aiPosition300:aiPosition300,unmatchPosition:unmatchPosition,positionBlock:positionBlock}, r => {
          location.reload();
        })

      },

      cancelClear () {
      },

      changePlankTradeButton () {
        this.$api.get('dragon/tradeAccount/changePlankTradeButton', {}, r => {
          location.reload()
        })
      },

      show6 (index) {
        this.percentTotalSell = this.data7[index].percentTotalSell;
      },
      ok6 () {

        var percentTotalSell = this.percentTotalSell;
        this.$api.post('dragon/tradeAccount/changePercentTotalSell', {percentTotalSell:percentTotalSell}, r => {
          location.reload();
        })


      },
      cancel6 () {
      },

    }
  }
</script>
