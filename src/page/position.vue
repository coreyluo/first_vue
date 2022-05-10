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
          <MenuItem  name="1-1"><router-link to="/"><font color="#fff">账户信息</font></router-link></MenuItem>
          <MenuItem  name="1-7"><router-link to="/sellOrder/1"><font color="#fff">卖出</font></router-link></MenuItem>
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
          <Button type="primary" style="margin-right: 5px" @click="modal1=true;show(index)">修改仓位</Button>
          <Button type="primary" style="margin-right: 5px" @click="modal1=true;show(index)">修改仓位</Button>

          <Button v-if="row.accountStatus===0" style="margin-left: 5px" type="warning" @click="changeAccountStatus(1,index,1)">主板已经关闭,请开启</Button>
          <Button v-if="row.accountStatus===1" style="margin-left: 5px" type="primary" @click="changeAccountStatus(1,index,0)">主板已经开启,请关闭</Button>
          <div>&nbsp</div>
        </template>

      </Table>
      <template>
        <Modal
          v-model="modal1"
          title="仓位修改"
          @on-ok="ok"
          @on-cancel="cancel">
          <div>
            主板仓位:<Input name= "param1" v-model="param1" placeholder="" style="width: 300px" />
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
      this.$api.get('tiger/tradeAccount/listOrderPrice', null, r => {
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
            title: '操作',
            slot: 'action',
            width: 1100,
            align: 'center'
          }
        ],
        data7: [

        ],
        modal1: false,
        modal3:false,

        indexId:0,
        currentPosition:0

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

        if(position>=3000000){
          this.currentPosition = position;
          this.modal3 = true;
        }else{
          this.$api.post('tiger/tradeAccount/changeOrderPrice', {id:changerId,position:position}, r => {
            location.reload();
          })
        }

      },
      cancel () {
        this.$Message.info($("param1").value)
      },


      changeAccountStatus (buttonIndex,index,buttonValue){
        var idVal=this.data7[index].id;
        var accountStatusStr = this.data7[index].accountStatus;

        if(buttonIndex==1){
          accountStatusStr = buttonValue;
        }
        this.$api.post('tiger/tradeAccount/changeAccountStatus', {id:idVal,accountStatus:accountStatusStr}, r => {
          location.reload();
        })
      },

      okClear () {
        var changerId = this.indexId;
        var position = this.currentPosition;
        var position300 = this.currentPosition300;
        var position688 = this.currentPosition688;
        var generalPosition= this.currentGeneralPosition;
        this.$api.post('tiger/tradeAccount/changeOrderPrice', {id:changerId,position:position,position300:position300,position688:position688, generalPosition:generalPosition}, r => {
          location.reload();
        })

      },

      cancelClear () {
      },



    }
  }
</script>
