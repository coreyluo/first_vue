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
      <Menu active-name="1-1" theme="dark" width="auto" :open-names="['1']" @on-select="routeTo">
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
            通用仓位:<Input name= "generalPosition" v-model="generalPosition" placeholder="" style="width: 300px" />
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
            大市值仓位比例:<Input name= "paramBig" v-model="paramBig" placeholder="" style="width: 300px" />
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

    </Layout>
  </div>
</template>
<script>
  export default {
    created () {
      this.$api.get('dragon/tradeAccount/listOrderPrice', null, r => {
        var infos = r.data;
        this.data7 = infos
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
        currentPosition:0,
        currentPosition300:0,
        currentPosition688:0,
        currentGeneralPosition:0

      }
    },
    methods: {
      show (index) {
        this.indexId=this.data7[index].id;
        this.param1=this.data7[index].position;
        this.param300=this.data7[index].position300;
        this.param688=this.data7[index].position688;
        this.generalPosition = this.data7[index].generalPosition;
      },
      ok () {
        var position= this.param1;
        var changerId = this.indexId;
        var position300 = this.param300;
        var position688 = this.param688;
        var generalPosition = this.generalPosition;

        if(position>=3000000||position300>=3000000||position688>=3000000||generalPosition>=3000000){
          this.currentPosition = position;
          this.currentPosition300 = position300;
          this.currentPosition688 = position688;
          this.currentGeneralPosition = generalPosition;
          this.modal3 = true;
        }else{
          this.$api.post('dragon/tradeAccount/changeOrderPrice', {id:changerId,position:position,position300:position300,position688:position688, generalPosition:generalPosition}, r => {
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
        this.paramBig = this.data7[index].positionBigAmount;
      },
      ok2 () {
        var changerId = this.indexId;
        var twoPlankRatio = this.paramTwoPlankRatio;
        var highPlankRatio = this.paramHighPlankRatio;
        var positionBigAmount = this.paramBig;
        this.$api.post('dragon/tradeAccount/changeRate', {id:changerId,twoPlankRatio:twoPlankRatio,highPlankRatio:highPlankRatio,positionBigAmount:positionBigAmount}, r => {
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

      okClear () {
        var changerId = this.indexId;
        var position = this.currentPosition;
        var position300 = this.currentPosition300;
        var position688 = this.currentPosition688;
        var generalPosition= this.currentGeneralPosition;
        this.$api.post('dragon/tradeAccount/changeOrderPrice', {id:changerId,position:position,position300:position300,position688:position688, generalPosition:generalPosition}, r => {
          location.reload();
        })

      },

      cancelClear () {
      },



    }
  }
</script>
