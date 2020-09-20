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
      <Menu active-name="1-6" theme="dark" width="auto" :open-names="['1']" @on-select="routeTo">
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
        </Submenu>
      </Menu>
    </Sider>
    <Layout :style="{marginLeft: '200px'}">
      <div style="height: 30px">
      </div>
      <template>
        <div>
          <Button v-if="tradeStatus" style="float:right" type="primary" @click="changeTradeStatus()">已经开启,请禁用</Button>
          <Button v-if="!tradeStatus" style="float:right" type="warning" @click="changeTradeStatus()">已经禁止,请开启</Button>
        </div>
      </template>
      <Table border :columns="columns13" :data="data7">
        <template slot-scope="{ row }" slot="tab">
          <strong>{{ row.tab }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" style="margin-right: 5px" @click="modal1=true;show(index)">修改三大市场仓位</Button>

          <Button type="primary" style="margin-right: 5px" @click="modal2=true;show(index)">修改卖出比例</Button>

          <Button v-if="row.pit===0" style="margin-right: 5px" type="warning" @click="changeAccountStatus(5,index,1)">集合核按钮已关闭,请开启</Button>
          <Button v-if="row.pit===1" style="margin-right: 5px" type="primary" @click="changeAccountStatus(5,index,0)">集合核按钮已开启,请禁用</Button>

          <Button v-if="row.pitOpen===0" style="margin-right: 5px" type="warning" @click="changeAccountStatus(6,index,1)">开盘核按钮已关闭,请开启</Button>
          <Button v-if="row.pitOpen===1" style="margin-right: 5px" type="primary" @click="changeAccountStatus(6,index,0)">开盘核按钮已开启,请禁用</Button>

          <Button v-if="1===1" style="margin-right: 5px" type="primary" @click="modal3=true;show(index)">通用砸盘按钮</Button>

          <div>&nbsp</div>

          <Button v-if="row.dumplingStatus===0" style="margin-right: 5px" type="warning" @click="changeAccountStatus(4,index,1)">粽子已关闭,请开启</Button>
          <Button v-if="row.dumplingStatus===1" style="margin-right: 5px" type="primary" @click="changeAccountStatus(4,index,0)">粽子已开启,请禁用</Button>

          <Button v-if="row.middleStatus1===0" style="margin-right: 5px" type="warning" @click="changeAccountStatus(9,index,1)">半路1已关闭,请开启</Button>
          <Button v-if="row.middleStatus1===1" style="margin-right: 5px" type="primary" @click="changeAccountStatus(9,index,0)">半路1已开启,请禁用</Button>

          <Button v-if="row.middleStatus2===0" style="margin-right: 5px" type="warning" @click="changeAccountStatus(10,index,1)">半路2已关闭,请开启</Button>
          <Button v-if="row.middleStatus2===1" style="margin-right: 5px" type="primary" @click="changeAccountStatus(10,index,0)">半路2已开启,请禁用</Button>

          <Button v-if="row.middleStatus3===0" style="margin-right: 5px" type="warning" @click="changeAccountStatus(11,index,1)">半路3已关闭,请开启</Button>
          <Button v-if="row.middleStatus3===1" style="margin-right: 5px" type="primary" @click="changeAccountStatus(11,index,0)">半路3已开启,请禁用</Button>

          <div>&nbsp</div>
          <Button v-if="row.dragonRadicalStatus===0" style="margin-right: 5px" type="warning" @click="changeAccountStatus(3,index,1)">超龙头已关闭,请开启</Button>
          <Button v-if="row.dragonRadicalStatus===1" style="margin-right: 5px" type="primary" @click="changeAccountStatus(3,index,0)">超龙头已开启,请禁用</Button>

          <Button v-if="row.twoPlankStatus===0" style="margin-right: 5px" type="warning" @click="changeAccountStatus(2,index,1)">二板禁止,请开启</Button>
          <Button v-if="row.twoPlankStatus===1" style="margin-right: 5px" type="primary" @click="changeAccountStatus(2,index,0)">二板开启,请禁用</Button>

          <Button v-if="row.accountStatus===1" style="margin-left: 5px" type="warning" @click="changeAccountStatus(1,index,0)">主板已经关闭,请开启</Button>
          <Button v-if="row.accountStatus===0" style="margin-left: 5px" type="primary" @click="changeAccountStatus(1,index,1)">主板已经开启,请关闭</Button>

          <Button v-if="row.accountStatus300===1" style="margin-left: 5px" type="warning" @click="changeAccountStatus(7,index,0)">创业板已经关闭,请开启</Button>
          <Button v-if="row.accountStatus300===0" style="margin-left: 5px" type="primary" @click="changeAccountStatus(7,index,1)">创业板已经开启,请关闭</Button>

          <Button v-if="row.accountStatus688===1" style="margin-left: 5px" type="warning" @click="changeAccountStatus(8,index,0)">科创板已经关闭,请开启</Button>
          <Button v-if="row.accountStatus688===0" style="margin-left: 5px" type="primary" @click="changeAccountStatus(8,index,1)">科创板已经开启,请关闭</Button>
          <div>&nbsp</div>
        </template>

      </Table>
      <template>
        <Modal
          v-model="modal1"
          title="三大市场仓位修改"
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
            半路1仓位:<Input name= "paramMiddle1" v-model="paramMiddle1" placeholder="" style="width: 300px" />
          </div>
          <div>
            半路2仓位:<Input name= "paramMiddle2" v-model="paramMiddle2" placeholder="" style="width: 300px" />
          </div>
          <div>
            半路3仓位:<Input name= "paramMiddle3" v-model="paramMiddle3" placeholder="" style="width: 300px" />
          </div>
        </Modal>
      </template>

      <template>
        <Modal
          v-model="modal2"
          title="核按钮卖出比例"
          @on-ok="ok2"
          @on-cancel="cancel2">
          <div>
            比例:<Input name= "param2" v-model="param2" placeholder="" style="width: 300px" />
          </div>
        </Modal>
      </template>

      <template>
        <Modal
          v-model="modal3"
          title="确定要砸盘吗"
          @on-ok="okSell"
          @on-cancel="cancelSell">
        </Modal>
      </template>

    </Layout>
  </div>
</template>
<script>
  export default {
    created () {
      this.$api.get('singular/tradeAccount/listOrderPrice', null, r => {
        var infos = r.data;
        this.data7 = infos
      })
      this.$api.get('singular/command/showTradeStatus', null, r => {
        this.tradeStatus = r.data;
      })
    },

    data () {
      return {
        columns13: [
          {
            title: '券商交易账号',
            key: 'tradeAccountNo',
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
            title: '半路1仓位',
            key: 'middlePosition1',
            align: 'center'
          },
          {
            title: '半路2仓位',
            key: 'middlePosition2',
            align: 'center'
          },
          {
            title: '半路3仓位',
            key: 'middlePosition3',
            align: 'center'
          },
          {
            title: '核按钮卖出比例',
            key: 'sellRate',
            align: 'center'
          },
          {
            title: '操作',
            slot: 'action',
            width: 1100,
            align: 'center'
          }
        ],
        data7: [

        ],
        modal1: false,
        modal2:false,
        modal3:false,
        indexId:0,
        tradeStatus:true
      }
    },
    methods: {
      show (index) {
        this.indexId=this.data7[index].id;
        this.param1=this.data7[index].position;
        this.param300=this.data7[index].position300;
        this.param688=this.data7[index].position688;
        this.paramMiddle1 = this.data7[index].middlePosition1;
        this.paramMiddle2 = this.data7[index].middlePosition2;
        this.paramMiddle3 = this.data7[index].middlePosition3;
      },
      ok () {
        var position= this.param1;
        var changerId = this.indexId;
        var position300 = this.param300;
        var position688 = this.param688;
        var middlePosition1 = this.paramMiddle1;
        var middlePosition2 = this.paramMiddle2;
        var middlePosition3 = this.paramMiddle3;
        this.$api.post('singular/tradeAccount/changeOrderPrice', {id:changerId,position:position,position300:position300,position688:position688,middlePosition1:middlePosition1,middlePosition2:middlePosition2,middlePosition3:middlePosition3}, r => {

        })
        location.reload();

      },
      cancel () {
        this.$Message.info($("param1").value)
      },
      changeTradeStatus (){
        this.$api.post('singular/command/changeTradeStatus', {}, r => {
          this.tradeStatus = r.data
        })
      },

      okSell () {
        var idVal=this.indexId;
        this.$api.post('singular/tradeAccount/generalSell', {id:idVal}, r => {
          location.reload();
        })
      },

      cancelSell () {
      },


      ok2 () {
        var sellRate= this.param2;
        var changerId = this.indexId;
        this.$api.post('singular/tradeAccount/changeSellRate', {id:changerId,sellRate:sellRate}, r => {

        })
        location.reload();

      },
      cancel2 () {
        this.$Message.info($("param2").value)
      },

      changeAccountStatus (buttonIndex,index,buttonValue){
        var idVal=this.data7[index].id;
        var accountStatusStr = this.data7[index].accountStatus;
        var twoPlankStatusStr = this.data7[index].twoPlankStatus;
        var dragonRadicalStatusStr = this.data7[index].dragonRadicalStatus;
        var dumplingStatusStr = this.data7[index].dumplingStatus;
        var middleStatus1Str = this.data7[index].middleStatus1;
        var middleStatus2Str = this.data7[index].middleStatus2;
        var middleStatus3Str = this.data7[index].middleStatus3;
        var pitStr = this.data7[index].pit;
        var pitOpenStr = this.data7[index].pitOpen;
        var accountStatus300Str = this.data7[index].accountStatus300;
        var accountStatus688Str = this.data7[index].accountStatus688;
        if(buttonIndex==1){
          accountStatusStr = buttonValue;
        }else if(buttonIndex==2){
          twoPlankStatusStr = buttonValue;
        }else if(buttonIndex==3){
          dragonRadicalStatusStr = buttonValue;
        }else if(buttonIndex == 4){
          dumplingStatusStr = buttonValue;
        }else if(buttonIndex == 9){
          middleStatus1Str = buttonValue;
        }else if(buttonIndex == 10){
          middleStatus2Str = buttonValue;
        }else if(buttonIndex == 11){
          middleStatus3Str = buttonValue;
        }else if(buttonIndex == 5) {
          pitStr = buttonValue;
        }else if(buttonIndex==6){
          pitOpenStr = buttonValue;
        } else if(buttonIndex==7){
          accountStatus300Str = buttonValue;
        }else if(buttonIndex==8){
          accountStatus688Str = buttonValue;
        }
          this.$api.post('singular/tradeAccount/changeAccountStatus', {id:idVal,accountStatus:accountStatusStr,twoPlankStatus:twoPlankStatusStr,dragonRadicalStatus:dragonRadicalStatusStr,dumplingStatus:dumplingStatusStr,middleStatus1:middleStatus1Str,middleStatus2:middleStatus2Str,middleStatus3:middleStatus3Str,
            pit:pitStr,pitOpen:pitOpenStr,accountStatus300:accountStatus300Str,accountStatus688:accountStatus688Str}, r => {
          location.reload();
        })

      }
    }
  }
</script>
