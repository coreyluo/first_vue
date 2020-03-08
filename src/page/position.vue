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
          <MenuItem  name="1-6"><router-link to="/position/1"><font color="#fff">账户</font></router-link></MenuItem>
        </Submenu>
      </Menu>
    </Sider>
    <Layout :style="{marginLeft: '200px'}">
      <div style="height: 30px">
      </div>
      <template>
        <div>
        </div>
      </template>
      <Table border :columns="columns13" :data="data7">
        <template slot-scope="{ row }" slot="tab">
          <strong>{{ row.tab }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="modal1=true;show(index)">修改</Button>

          <Button v-if="row.accountStatus===1" style="float:right" type="warning" @click="changeAccountStatus(1,index,0)">已经禁止,请开启</Button>
          <Button v-if="row.accountStatus===0" style="float:right" type="primary" @click="changeAccountStatus(1,index,1)">已经开启,请禁用</Button>
        </template>

      </Table>
      <template>
        <Modal
          v-model="modal1"
          title="参数修改"
          @on-ok="ok"
          @on-cancel="cancel">
          <div>
            仓位:<Input name= "param1" v-model="param1" placeholder="" style="width: 300px" />
          </div>
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
            title: '仓位',
            key: 'position',
            align: 'center'
          },
          {
            title: '操作',
            slot: 'action',
            width: 650,
            align: 'center'
          }
        ],
        data7: [

        ],
        modal1: false,
        indexId:0,
        tradeStatus:true
      }
    },
    methods: {
      show (index) {
        this.indexId=this.data7[index].id;
        this.param1=this.data7[index].position;
      },
      ok () {
        var position= this.param1;
        var changerId = this.indexId;
        this.$api.post('singular/tradeAccount/changeOrderPrice', {id:changerId,position:position}, r => {

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
      changeAccountStatus (buttonIndex,index,buttonValue){
        var idVal=this.data7[index].id;
        var accountStatusStr = this.data7[index].accountStatus;
        var twoPlankStatusStr = this.data7[index].twoPlankStatus;
        var dragonRadicalStatusStr = this.data7[index].dragonRadicalStatus;
        if(buttonIndex==1){
          accountStatusStr = buttonValue;
        }else if(buttonIndex==2){
          twoPlankStatusStr = buttonValue;
        }else if(buttonIndex==3){
          dragonRadicalStatusStr = buttonValue;
        }
        this.$api.post('singular/tradeAccount/changeAccountStatus', {id:idVal,accountStatus:accountStatusStr,twoPlankStatus:twoPlankStatusStr,dragonRadicalStatus:dragonRadicalStatusStr}, r => {
          location.reload();
        })

      }
    }
  }
</script>
