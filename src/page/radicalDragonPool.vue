
<style scoped>
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  .blankRow {
    height: 10px;
    background: #c5c8ce;
  }

  .dragon-pool {
    height: 550px;
    background: #ffffff;
  }
  .blank-ground {
    height: 35px;
    background: #ffffff;
  }
  .container {
    height: 30vh;
    display: flex;
  }

  .column {
    flex: 1; /* 每个部分平分空间 */
    text-align: center;
    border: 1px solid #000; /* 边框仅为了清晰地显示每个部分 */
    padding: 80px;
  }

  .column1 {
    /* 第一部分的样式 */
    background: #ffffff;
  }

  .column2 {
    /* 第二部分的样式 */
    background: #ffffff;
  }

  .column3 {
    /* 第三部分的样式 */
    background: #ffffff;
  }

  .color-change-button {
    background-color: #555555; /* 默认背景颜色 */
    color: white; /* 文字颜色 */
    padding: 5px 40px; /* 内边距 */
    font-size: 16px; /* 字体大小 */
    cursor: pointer; /* 鼠标光标变成点击手势 */
    border: none; /* 无边框 */
    outline: none; /* 点击时无轮廓 */
    transition: background-color 0.3s; /* 过渡效果 */
  }
  /* 当按钮被激活（例如，被鼠标按下）时 */
  .color-change-button:active {
    background-color: #3e8e41; /* 背景颜色变深 */
  }

  .submit-change-button {
    background-color: #f44336; /* 默认背景颜色 */
    color: white; /* 文字颜色 */
    padding: 5px 40px; /* 内边距 */
    font-size: 16px; /* 字体大小 */
    cursor: pointer; /* 鼠标光标变成点击手势 */
    border: none; /* 无边框 */
    outline: none; /* 点击时无轮廓 */
    transition: background-color 0.3s; /* 过渡效果 */
  }
  /* 当按钮被激活（例如，被鼠标按下）时 */
  .submit-change-button:active {
    background-color: #3e8e41; /* 背景颜色变深 */
  }

  .color-change-button-two {
    background-color: #f44336; /* 默认背景颜色 */
    color: white; /* 文字颜色 */
    padding: 5px 40px; /* 内边距 */
    font-size: 16px; /* 字体大小 */
    cursor: pointer; /* 鼠标光标变成点击手势 */
    border: none; /* 无边框 */
    outline: none; /* 点击时无轮廓 */
    transition: background-color 0.3s; /* 过渡效果 */
  }
  .from_input_info{
    width: 100px;
  }
  .alert-box {
    position: fixed;
    top: 10px;
    right: 10px;
    background-color: #f9f9f9;
    border: 1px solid #d3d3d3;
    padding: 10px;
    border-radius: 5px;
    z-index: 1000;
  }

  .alert-box button {
    float: right;
    cursor: pointer;
  }

  .columncs {
    flex: 1; /* 每个部分平分空间 */
    text-align: center;
    border: 1px solid #000; /* 边框仅为了清晰地显示每个部分 */
    padding: 40px;
  }

</style>

<template>
  <div class="layout">
    <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
      <Menu active-name="1-3" theme="dark" width="auto" :open-names="['1']" @on-select="routeTo">
        <Submenu name="1">
          <template slot="title">
            <Icon type="ios-navigate"></Icon>
            股票管理
          </template>
          <MenuItem  name="1-8"><router-link to="/userLogin/1"><font color="#fff">登录</font></router-link></MenuItem>
          <MenuItem  name="1-1"><router-link to="/"><font color="#fff">账户信息</font></router-link></MenuItem>
          <MenuItem  name="1-3"><router-link to="/radicalDragonPool/1"><font color="#fff">小池子</font></router-link></MenuItem>
          <MenuItem  name="1-4"><router-link to="/orderCancelPool/1"><font color="#fff">等待撤单</font></router-link></MenuItem>
        </Submenu>
      </Menu>
    </Sider>
    <Layout :style="{marginLeft: '200px'}">
      <div class="blankRow">
      </div>
        <template>
          <div>
          </div>
          <div>
            <font style="font-weight:bold;font-size:15px;">股票代码：</font><Input name= "paramStock" v-model="paramStock" placeholder="stockCode" style="width: 300px" />
            <Button type="primary" icon="ios-search" @click="searchStock()">查询</Button>
            <Button style="float:right" type="primary" @click="modal2=true">删除全部</Button>
            <Button style="float:right" type="error" @click="modal1=true;showAdd(2,0.5,1,30,1.10,1)">添加</Button>
          </div>
        </template>
        <template>
          <div class="dragon-pool">
            <Table border :columns="columns13" :data="data15">
              <template slot-scope="{ row }" slot="tab">
                <strong>{{ row.tab }}</strong>
              </template>
              <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="modal1=true;show(row)">修改仓位</Button>
                <Button type="primary" size="small" style="margin-right: 5px" @click="modal3=true;show3(row)">修改策略</Button>
                <Button type="error" size="small" style="margin-right: 5px" @click="deleteRadical(row.id)">删除</Button>
              </template>
            </Table>
            <div style = "text-align: right;" class="pagination">
              <button  @click="prevPage" :disabled="currentPage <= 1">前一页</button>
              <span>当前第 {{ currentPage }} 页共 {{ totalPages }}</span>
              <button @click="nextPage" :disabled="currentPage >= totalPages">后一页</button>
            </div>
          </div>

          <template>
            <div class="blank-ground">
              <button v-if="currentTab=='tab1'" class="color-change-button-two" @click="currentTab = 'tab1'">策略1</button>
              <button v-if="currentTab!=='tab1'" class="color-change-button" @click="currentTab = 'tab1'">策略1</button>
              <button v-if="currentTab=='tab2'" class="color-change-button-two" @click="currentTab = 'tab2'">策略2</button>
              <button v-if="currentTab!=='tab2'" class="color-change-button" @click="currentTab = 'tab2'">策略2</button>
              <button v-if="currentTab=='tab3'" class="color-change-button-two" @click="currentTab = 'tab3'">策略3</button>
              <button v-if="currentTab!=='tab3'" class="color-change-button" @click="currentTab = 'tab3'">策略3</button>
            </div>
            <div>
              <div v-if="currentTab === 'tab1'">
                <form  @submit.prevent="onSubmit1">
                  <div class="container">
                    <div class="column column1">
                      <label><input type="checkbox" v-model="form1.sellQuantityFlag" > 压单金额<:&nbsp&nbsp <Input  type="number" v-model="form1.sellQuantity"  placeholder=""  class="from_input_info" />万</label>
                      <br>
                      <label><input type="checkbox" v-model="form1.buyOneQuantityFlag" > 封单金额>:&nbsp&nbsp <Input type="number"  v-model="form1.buyOneQuantity"  placeholder="" class="from_input_info" />万</label>
                      <br>
                      <label><input type="checkbox" v-model="form1.bigOrderAndSealingFlag" > 大单+封单金额 大单 > <Input type="number"  v-model="form1.bigOrder"  placeholder="" class="from_input_info" />万 封单金额> <Input type="number"  name= "param5" v-model="form1.bigOrderBuyQuantity"  placeholder="" class="from_input_info" /> 万</label>
                    </div>
                    <div class="column column2">
                      <label><input type="checkbox" v-model="form1.cancelBuyOneQuantityFlag" > 封单金额<:&nbsp&nbsp <Input type="number"  v-model="form1.cancelBuyOneQuantity" placeholder="" class="from_input_info" />万 开始时间<Input type="number"  v-model="form1.cancelBuyOneQuantitySec" placeholder="" class="from_input_info" />秒</label>
                      <br>
                      <label><input type="checkbox" v-model="form1.beforeCancelQuantityFlag" > 前序撤单金额>:&nbsp&nbsp <Input type="number"  v-model="form1.beforeCancelQuantity"  placeholder="" class="from_input_info" />万 持续时间<Input type="number"  v-model="form1.beforeCancelQuantitySec" placeholder="" class="from_input_info" />秒</label>
                    </div>
                    <div class="column column3"><input class="submit-change-button" type="submit" value="策略1提交"></div>
                  </div>
                </form >
              </div>
              <div v-if="currentTab === 'tab2'">
                <form  @submit.prevent="onSubmit2">
                  <div class="container">
                    <div class="column column1">
                      <label><input type="checkbox" v-model="form2.sellQuantityFlag" > 压单金额<:&nbsp&nbsp <Input type="number" v-model="form2.sellQuantity"  placeholder="" class="from_input_info" />万</label>
                      <br>
                      <label><input type="checkbox" v-model="form2.buyOneQuantityFlag" > 封单金额>:&nbsp&nbsp <Input type="number"  v-model="form2.buyOneQuantity"  placeholder="" class="from_input_info" />万</label>
                      <br>
                      <label><input type="checkbox" v-model="form2.bigOrderAndSealingFlag" > 大单+封单金额 大单 > <Input type="number"  v-model="form2.bigOrder"  placeholder="" class="from_input_info" />万 封单金额> <Input type="number"  name= "param5" v-model="form2.bigOrderBuyQuantity"  placeholder="" class="from_input_info" /> 万</label>
                    </div>
                    <div class="column column2">
                      <label><input type="checkbox" v-model="form2.cancelBuyOneQuantityFlag" > 封单金额<:&nbsp&nbsp <Input type="number"  v-model="form2.cancelBuyOneQuantity" placeholder="" class="from_input_info" />万 开始时间<Input type="number"  v-model="form2.cancelBuyOneQuantitySec" placeholder="" class="from_input_info" />秒</label>
                      <br>
                      <label><input type="checkbox" v-model="form2.beforeCancelQuantityFlag" > 前序撤单金额>:&nbsp&nbsp <Input type="number"  v-model="form2.beforeCancelQuantity"  placeholder="" class="from_input_info" />万 持续时间<Input type="number"  v-model="form2.beforeCancelQuantitySec" placeholder="" class="from_input_info" />秒</label>
                    </div>
                    <div class="column column3"><input class="submit-change-button" type="submit" value="策略2提交"></div>
                  </div>
                </form >
              </div>
              <div v-if="currentTab === 'tab3'">
                <form  @submit.prevent="onSubmit3">
                  <div class="container">
                    <div class="column column1">
                      <label><input type="checkbox" v-model="form3.sellQuantityFlag" > 压单金额<:&nbsp&nbsp <Input type="number" v-model="form3.sellQuantity"  placeholder="" class="from_input_info" />万</label>
                      <br>
                      <label><input type="checkbox" v-model="form3.buyOneQuantityFlag" > 封单金额>:&nbsp&nbsp <Input type="number"  v-model="form3.buyOneQuantity"  placeholder="" class="from_input_info" />万</label>
                      <br>
                      <label><input type="checkbox" v-model="form3.bigOrderAndSealingFlag" > 大单+封单金额 大单 > <Input type="number"  v-model="form3.bigOrder"  placeholder="" class="from_input_info" />万 封单金额> <Input type="number"  name= "param5" v-model="form3.bigOrderBuyQuantity"  placeholder="" class="from_input_info" />万</label>
                    </div>
                    <div class="column column2">
                      <label><input type="checkbox" v-model="form3.cancelBuyOneQuantityFlag" > 封单金额<:&nbsp&nbsp <Input type="number"  v-model="form3.cancelBuyOneQuantity" placeholder="" class="from_input_info" />万 开始时间<Input type="number"  v-model="form3.cancelBuyOneQuantitySec" placeholder="" class="from_input_info" />秒</label>
                      <br>
                      <label><input type="checkbox" v-model="form3.beforeCancelQuantityFlag" > 前序撤单金额>:&nbsp&nbsp <Input type="number"  v-model="form3.beforeCancelQuantity"  placeholder="" class="from_input_info" />万 持续时间<Input type="number"  v-model="form3.beforeCancelQuantitySec" placeholder="" class="from_input_info" />秒</label>
                    </div>
                    <div class="column column3"><input class="submit-change-button" type="submit" value="策略3提交"></div>
                  </div>
                </form >
              </div>
            </div>
          </template>
      </template>

      <template>
        <Modal
          v-model="modal1"
          title="小股票池"
          @on-ok="ok"
          @on-cancel="cancel">
          <div>
            股票代码:&nbsp&nbsp<Input name= "param1" v-model="param1" placeholder="" style="width: 100px" />
          </div>
          <div>
            仓位系数:&nbsp&nbsp<Input name= "param2" v-model="param2" placeholder="" style="width: 100px" />
          </div>
          <div>
            策略:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
            <select id="sex" name = param3  v-model="param3">
              <option v-if="param4 ==2" value="1">策略1</option>
             <option v-if="param4 ==2" value="2">策略2</option>
              <option v-if="param4 ==2" value="3">策略3</option>
            </select>
          </div>
          <div>
<!--            时间限制:&nbsp&nbsp--><Input type="hidden" name= "param5" v-model="param5" placeholder="" style="width: 100px" />
          </div>
          <div>
<!--            买入上限:&nbsp&nbsp--><Input type="hidden" name= "param6" v-model="param6" placeholder="" style="width: 100px" />
          </div>
          <div>
<!--            买入次数:&nbsp&nbsp--><Input type="hidden" name= "param7" v-model="param7" placeholder="" style="width: 100px" />
          </div>
          <div>
            <Input type="hidden" name= "param4" v-model="param4" placeholder="" style="width: 100px" />
          </div>
        </Modal>
      </template>

      <template>
        <Modal
          v-model="modal3"
          title="个股策略修改"
          @on-ok="ok3"
          @on-cancel="cancel3">
            <div>
              <div class="columncs column1">
                <label><input type="checkbox" name= "paramcs1" v-model="paramcs1" > 压单金额<&nbsp:&nbsp&nbsp <Input  type="number" name= "paramcs11" v-model="paramcs11"  placeholder=""  class="from_input_info" />万</label>
                <br>
                <label><input type="checkbox" name= "paramcs2" v-model="paramcs2" > 封单金额>&nbsp:&nbsp&nbsp <Input type="number"  name= "paramcs22" v-model="paramcs22"  placeholder="" class="from_input_info" />万</label>
                <br>
                <label><input type="checkbox" name= "paramcs3" v-model="paramcs3" > 大单+封单金额 大单>: &nbsp&nbsp&nbsp<Input type="number"  name= "paramcs33" v-model="paramcs33"  placeholder="" class="from_input_info" />万 封单金额> <Input type="number"   name= "paramcs333" v-model="paramcs333"  placeholder="" class="from_input_info" /> 万</label>
              </div>
              <div class="columncs column2">
                <label><input type="checkbox" name= "paramcs4" v-model="paramcs4" > 封单金额<:&nbsp&nbsp <Input type="number"  name= "paramcs44" v-model="paramcs44" placeholder="" class="from_input_info" />万 开始时间<Input type="number"  name= "paramcs444" v-model="paramcs444" placeholder="" class="from_input_info" />秒</label>
                <br>
                <label><input type="checkbox" name= "paramcs5" v-model="paramcs5" > 单前量金额<:&nbsp&nbsp <Input type="number"  name= "paramcs55" v-model="paramcs55"  placeholder="" class="from_input_info" />万 持续时间<Input type="number"  name= "paramcs555" v-model="paramcs555" placeholder="" class="from_input_info" />秒</label>
                <Input  type="hidden" name= "paramcs6" v-model="paramcs6" placeholder="" style="width: 100px" />
              </div>
            </div>
        </Modal>
      </template>

      <template>
        <Modal
          v-model="modal2"
          title="确定要删除所有吗"
          @on-ok="okClear"
          @on-cancel="cancelClear">
        </Modal>
      </template>
      <template>
        <div v-if="isVisible" class="alert-box">
          <p>{{ message }}</p>
          <button @click="closeAlert">关闭</button>
        </div>
      </template>
    </Layout>
  </div>
</template>
<script>

  import message from "iview/src/components/message";

  export default {
    computed: {
      message() {
        return message
      },
      totalPages() {
        return Math.ceil(this.data14.length / this.pageSize);
      },
      // 计算当前页面的数据
      paginatedData() {
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        return this.data15.slice(start, end);
      }
    },
    created () {
      this.$api.post('dragon/radicalDragonPool/dataList', {}, r => {
        var infos = r.data.radicalDragonPools;
        infos.forEach(item => {
          if (item.sweepType == 1) {
            item.sweepTypeStr = "策略1"
          }
          if (item.sweepType == 2) {
            item.sweepTypeStr = "策略2"
          }
          if (item.sweepType == 3) {
            item.sweepTypeStr = "策略3"
          }
        })
        var dataCount = 0;
        infos.forEach(item =>{
          if(item.radical ==2){
            dataCount++;
            this.data14.push(item)
            if(dataCount<=this.pageSize){
              this.data15.push(item)
            }
          }
        })
      })
      this.$api.post('dragon/csParamConfig/dataList', {}, r => {
        var infos = r.data;
        infos.forEach(item => {
          if (item.id == 1) {
            this.form1.sellQuantity = item.sellQuantity;
            this.form1.buyOneQuantity=item.buyOneQuantity;
            this.form1.bigOrder=item.bigOrder;
            this.form1.bigOrderBuyQuantity=item.bigOrderBuyQuantity;
            this.form1.cancelBuyOneQuantity=item.cancelBuyOneQuantity;
            this.form1.beforeCancelQuantity=item.beforeCancelQuantity;
            this.form1.cancelBuyOneQuantitySec=item.cancelBuyOneQuantitySec;
            this.form1.beforeCancelQuantitySec=item.beforeCancelQuantitySec;
            this.form1.sellQuantityFlag="";
            if(item.sellQuantityFlag==1){
              this.form1.sellQuantityFlag=true;
            }
            this.form1.buyOneQuantityFlag="";
            if(item.buyOneQuantityFlag==1){
              this.form1.buyOneQuantityFlag=true;
            }
            this.form1.bigOrderAndSealingFlag="";
            if(item.bigOrderAndSealingFlag==1){
              this.form1.bigOrderAndSealingFlag=true;
            }
            this.form1.cancelBuyOneQuantityFlag="";
            if(item.cancelBuyOneQuantityFlag==1){
              this.form1.cancelBuyOneQuantityFlag=true;
            }
            this.form1.beforeCancelQuantityFlag="";
            if(item.beforeCancelQuantityFlag==1){
              this.form1.beforeCancelQuantityFlag=true;
            }
          }
          if (item.id == 2) {
            this.form2.sellQuantity = item.sellQuantity;
            this.form2.buyOneQuantity=item.buyOneQuantity;
            this.form2.bigOrder=item.bigOrder;
            this.form2.bigOrderBuyQuantity=item.bigOrderBuyQuantity;
            this.form2.cancelBuyOneQuantity=item.cancelBuyOneQuantity;
            this.form2.beforeCancelQuantity=item.beforeCancelQuantity;
            this.form2.cancelBuyOneQuantitySec=item.cancelBuyOneQuantitySec;
            this.form2.beforeCancelQuantitySec=item.beforeCancelQuantitySec;
            this.form2.sellQuantityFlag="";
            if(item.sellQuantityFlag==1){
              this.form2.sellQuantityFlag=true;
            }
            this.form2.buyOneQuantityFlag="";
            if(item.buyOneQuantityFlag==1){
              this.form2.buyOneQuantityFlag=true;
            }
            this.form2.bigOrderAndSealingFlag="";
            if(item.bigOrderAndSealingFlag==1){
              this.form2.bigOrderAndSealingFlag=true;
            }
            this.form2.cancelBuyOneQuantityFlag="";
            if(item.cancelBuyOneQuantityFlag==1){
              this.form2.cancelBuyOneQuantityFlag=true;
            }
            this.form2.beforeCancelQuantityFlag="";
            if(item.beforeCancelQuantityFlag==1){
              this.form2.beforeCancelQuantityFlag=true;
            }
          }
          if (item.id == 3) {
            this.form3.sellQuantity = item.sellQuantity;
            this.form3.buyOneQuantity=item.buyOneQuantity;
            this.form3.bigOrder=item.bigOrder;
            this.form3.bigOrderBuyQuantity=item.bigOrderBuyQuantity;
            this.form3.cancelBuyOneQuantity=item.cancelBuyOneQuantity;
            this.form3.beforeCancelQuantity=item.beforeCancelQuantity;
            this.form3.cancelBuyOneQuantitySec=item.cancelBuyOneQuantitySec;
            this.form3.beforeCancelQuantitySec=item.beforeCancelQuantitySec;
            this.form3.sellQuantityFlag="";
            if(item.sellQuantityFlag==1){
              this.form3.sellQuantityFlag=true;
            }
            this.form3.buyOneQuantityFlag="";
            if(item.buyOneQuantityFlag==1){
              this.form3.buyOneQuantityFlag=true;
            }
            this.form3.bigOrderAndSealingFlag="";
            if(item.bigOrderAndSealingFlag==1){
              this.form3.bigOrderAndSealingFlag=true;
            }
            this.form3.cancelBuyOneQuantityFlag="";
            if(item.cancelBuyOneQuantityFlag==1){
              this.form3.cancelBuyOneQuantityFlag=true;
            }
            this.form3.beforeCancelQuantityFlag="";
            if(item.beforeCancelQuantityFlag==1){
              this.form3.beforeCancelQuantityFlag=true;
            }
          }
        })
      })
    },
    data () {
      return {
        columns13: [
          {
            title: '股票代码',
            key: 'stockCode',
            align: 'center'
          },
          {
            title: '股票名称',
            key: 'stockName',
            align: 'center'
          },
          {
            title: '下单方式',
            key: 'sweepTypeStr',
            align: 'center'
          },
          {
            title: '仓位系数',
            key: 'positionRatio',
            align: 'center'
          },
          {
            title: '操作',
            slot: 'action',
            width: 350,
            align: 'center'
          }
        ],
        data14: [
        ],
        data15: [
        ],
        modal1: false,
        modal2: false,
        modal3: false,
        isVisible: false,
        isVisibleMsg:"",
        indexId:0,
        activeName: 'first',
        currentTab:'tab1',
        currentPage: 1,
        pageSize: 10,
        form1: {
          sellQuantity: '',
          buyOneQuantity: '',
          bigOrder: '',
          bigOrderBuyQuantity: '',
          cancelBuyOneQuantity: '',
          beforeCancelQuantity: '',
          cancelBuyOneQuantitySec: '',
          beforeCancelQuantitySec: '',
          sellQuantityFlag: '',
          buyOneQuantityFlag: '',
          bigOrderAndSealingFlag: '',
          cancelBuyOneQuantityFlag: '',
          beforeCancelQuantityFlag: ''
        },
        form2: {
          sellQuantity: '',
          buyOneQuantity: '',
          bigOrder: '',
          bigOrderBuyQuantity: '',
          cancelBuyOneQuantity: '',
          beforeCancelQuantity: '',
          cancelBuyOneQuantitySec: '',
          beforeCancelQuantitySec: '',
          sellQuantityFlag: '',
          buyOneQuantityFlag: '',
          bigOrderAndSealingFlag: '',
          cancelBuyOneQuantityFlag: '',
          beforeCancelQuantityFlag: ''
        },
        form3: {
          sellQuantity: '',
          buyOneQuantity: '',
          bigOrder: '',
          bigOrderBuyQuantity: '',
          cancelBuyOneQuantity: '',
          beforeCancelQuantity: '',
          cancelBuyOneQuantitySec: '',
          beforeCancelQuantitySec: '',
          sellQuantityFlag: '',
          buyOneQuantityFlag: '',
          bigOrderAndSealingFlag: '',
          cancelBuyOneQuantityFlag: '',
          beforeCancelQuantityFlag: ''
        },
      }
    },

    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      nextPage() {
        if (this.currentPage < this.totalPages) this.currentPage++;
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        this.data15 = this.data14.slice(start, end);
      },
      prevPage() {
        if (this.currentPage > 1) this.currentPage--;
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        this.data15 = this.data14.slice(start, end);
      },

      searchStock(){
        var stockCode = this.paramStock;
        this.$api.post('dragon/radicalDragonPool/dataList', {stockCode:stockCode}, r => {
          var infos = r.data.radicalDragonPools;
          infos.forEach(item => {
            if (item.sweepType == 1) {
              item.sweepTypeStr = "策略1"
            }
            if (item.sweepType == 2) {
              item.sweepTypeStr = "策略2"
            }
            if (item.sweepType == 3) {
              item.sweepTypeStr = "策略3"
            }
          })
          this.data14=[];
          this.data15=[];
          var dataCount = 0;
          infos.forEach(item =>{
            if(item.radical ==2){
              dataCount++;
              this.data14.push(item)
              if(dataCount<=this.pageSize){
                this.data15.push(item)
              }
            }
          })

        })
      },


      show (row) {
        this.indexId=row.id;
        this.param1=row.stockCode;
        this.param2=row.positionRatio;
        this.param3=row.sweepType;
        this.param4=row.radical;
        this.param5 = row.afterOpenSeconds;
        this.param6 = row.highRate;
        this.param7 = row.orderTimes;
      },
      ok () {
        var primaryKey = this.indexId
        var stockCode= this.param1
        var positionRatio= this.param2
        var sweepType= this.param3
        var radical= this.param4
        var afterOpenSeconds = this.param5
        var highRate = this.param6
        var orderTimes = this.param7
        this.$api.post('dragon/radicalDragonPool/addOne', {id:primaryKey,stockCode:stockCode,positionRatio:positionRatio,sweepType:sweepType,radical:radical,afterOpenSeconds:afterOpenSeconds,highRate:highRate,orderTimes:orderTimes}, r => {
          alert(r.msg);
          if(r.code==0){
            location.reload()
          }
        })

      },
      cancel () {
        this.$Message.info($("param1").value)
      },
      show3 (row) {
        this.paramcs6=row.stockCode;
        this.paramcs11 = row.csStockParamConfigDTO.sellQuantity;
        this.paramcs22=row.csStockParamConfigDTO.buyOneQuantity;
        this.paramcs33=row.csStockParamConfigDTO.bigOrder;
        this.paramcs333=row.csStockParamConfigDTO.bigOrderBuyQuantity;
        this.paramcs44=row.csStockParamConfigDTO.cancelBuyOneQuantity;
        this.paramcs55=row.csStockParamConfigDTO.beforeCancelQuantity;
        this.paramcs444=row.csStockParamConfigDTO.cancelBuyOneQuantitySec;
        this.paramcs555=row.csStockParamConfigDTO.beforeCancelQuantitySec;
        this.paramcs1=false;
        if(row.csStockParamConfigDTO.sellQuantityFlag==1){
          this.paramcs1 = true;
        }
        this.paramcs2=false;
        if(row.csStockParamConfigDTO.buyOneQuantityFlag==1){
          this.paramcs2 = true;
        }
        this.paramcs3=false;
        if(row.csStockParamConfigDTO.bigOrderAndSealingFlag==1){
          this.paramcs3 = true;
        }
        this.paramcs4=false;
        if(row.csStockParamConfigDTO.cancelBuyOneQuantityFlag==1){
          this.paramcs4 = true;
        }
        this.paramcs5=false;
        if(row.csStockParamConfigDTO.beforeCancelQuantityFlag==1){
          this.paramcs5 = true;
        }
      },

      ok3 () {
        var stockCodesc = this.paramcs6;
        var sellQuantity=this.paramcs11;
        var buyOneQuantity=this.paramcs22;
        var bigOrder=this.paramcs33;
        var bigOrderBuyQuantity=this.paramcs333;
        var cancelBuyOneQuantity=this.paramcs44;
        var beforeCancelQuantity=this.paramcs55;
        var cancelBuyOneQuantitySec=this.paramcs444;
        var beforeCancelQuantitySec=this.paramcs555;
        var sellQuantityFlag=0;
        if(this.paramcs1){
          sellQuantityFlag = 1;
        }
        var buyOneQuantityFlag=0;
        if(this.paramcs2){
          buyOneQuantityFlag = 1;
        }
        var bigOrderAndSealingFlag=0;
        if(this.paramcs3){
          bigOrderAndSealingFlag = 1;
        }
        var cancelBuyOneQuantityFlag=0;
        if(this.paramcs4){
          cancelBuyOneQuantityFlag = 1;
        }
        var beforeCancelQuantityFlag=0;
        if(this.paramcs5){
          beforeCancelQuantityFlag = 1;
        }
        this.$api.post('dragon/csParamConfig/updateStockConfig', {id:1,stockCode:stockCodesc,sellQuantity:sellQuantity,buyOneQuantity:buyOneQuantity,bigOrder:bigOrder,bigOrderBuyQuantity:bigOrderBuyQuantity,cancelBuyOneQuantity:cancelBuyOneQuantity,
          beforeCancelQuantity:beforeCancelQuantity,cancelBuyOneQuantitySec:cancelBuyOneQuantitySec,beforeCancelQuantitySec:beforeCancelQuantitySec,
          sellQuantityFlag:sellQuantityFlag,buyOneQuantityFlag:buyOneQuantityFlag,bigOrderAndSealingFlag:bigOrderAndSealingFlag,cancelBuyOneQuantityFlag:cancelBuyOneQuantityFlag,beforeCancelQuantityFlag:beforeCancelQuantityFlag}, r => {
          alert(r.msg);
          if(r.code==0){
            location.reload()
          }
        })

      },
      cancel3 () {
        this.$Message.info($("param1").value)
      },


      deleteRadical(id){
        this.$api.get('dragon/radicalDragonPool/deleteOne', {id:id}, r => {
          alert(r.msg);
          if(r.code==0){
            location.reload()
          }
        })
      },
      showAdd (radical,positionRatio,sweepType,afterOpenSeconds,highRate,orderTimes) {
        this.param4=radical;
        this.param3=sweepType;
        this.param2=positionRatio;
        this.param5=afterOpenSeconds;
        this.param6 = highRate;
        this.param7 = orderTimes;
      },
      okClear () {
        this.$api.get('dragon/radicalDragonPool/deleteAll', null, r => {
          location.reload()
        })
      },
      cancelClear () {
      },
      closeAlert() {
        this.isVisible = false;
      },
      onSubmit1() {
        // 这里可以处理表单提交的逻辑，例如发送数据到服务器
        var sellQuantity=this.form1.sellQuantity;
        var buyOneQuantity=this.form1.buyOneQuantity;
        var bigOrder=this.form1.bigOrder;
        var bigOrderBuyQuantity=this.form1.bigOrderBuyQuantity;
        var cancelBuyOneQuantity=this.form1.cancelBuyOneQuantity;
        var beforeCancelQuantity=this.form1.beforeCancelQuantity;
        var cancelBuyOneQuantitySec=this.form1.cancelBuyOneQuantitySec;
        var beforeCancelQuantitySec=this.form1.beforeCancelQuantitySec;
        var sellQuantityFlag=0;
        if(this.form1.sellQuantityFlag){
           sellQuantityFlag = 1;
        }
        var buyOneQuantityFlag=0;
        if(this.form1.buyOneQuantityFlag){
          buyOneQuantityFlag = 1;
        }
        var bigOrderAndSealingFlag=0;
        if(this.form1.bigOrderAndSealingFlag){
          bigOrderAndSealingFlag = 1;
        }
        var cancelBuyOneQuantityFlag=0;
        if(this.form1.cancelBuyOneQuantityFlag){
          cancelBuyOneQuantityFlag = 1;
        }
        var beforeCancelQuantityFlag=0;
        if(this.form1.beforeCancelQuantityFlag){
          beforeCancelQuantityFlag = 1;
        }
        this.$api.post('dragon/csParamConfig/updateConfig', {id:1,sellQuantity:sellQuantity,buyOneQuantity:buyOneQuantity,bigOrder:bigOrder,bigOrderBuyQuantity:bigOrderBuyQuantity,cancelBuyOneQuantity:cancelBuyOneQuantity,
          beforeCancelQuantity:beforeCancelQuantity,cancelBuyOneQuantitySec:cancelBuyOneQuantitySec,beforeCancelQuantitySec:beforeCancelQuantitySec,
          sellQuantityFlag:sellQuantityFlag,buyOneQuantityFlag:buyOneQuantityFlag,bigOrderAndSealingFlag:bigOrderAndSealingFlag,cancelBuyOneQuantityFlag:cancelBuyOneQuantityFlag,beforeCancelQuantityFlag:beforeCancelQuantityFlag}, r => {
          alert(r.msg);
          /*if(r.code==0){
            location.reload()
          }*/
        })
      },
      onSubmit2() {
        // 这里可以处理表单提交的逻辑，例如发送数据到服务器
        var sellQuantity=this.form2.sellQuantity;
        var buyOneQuantity=this.form2.buyOneQuantity;
        var bigOrder=this.form2.bigOrder;
        var bigOrderBuyQuantity=this.form2.bigOrderBuyQuantity;
        var cancelBuyOneQuantity=this.form2.cancelBuyOneQuantity;
        var beforeCancelQuantity=this.form2.beforeCancelQuantity;
        var cancelBuyOneQuantitySec=this.form2.cancelBuyOneQuantitySec;
        var beforeCancelQuantitySec=this.form2.beforeCancelQuantitySec;
        var sellQuantityFlag=0;
        if(this.form2.sellQuantityFlag){
          sellQuantityFlag = 1;
        }
        var buyOneQuantityFlag=0;
        if(this.form2.buyOneQuantityFlag){
          buyOneQuantityFlag = 1;
        }
        var bigOrderAndSealingFlag=0;
        if(this.form2.bigOrderAndSealingFlag){
          bigOrderAndSealingFlag = 1;
        }
        var cancelBuyOneQuantityFlag=0;
        if(this.form2.cancelBuyOneQuantityFlag){
          cancelBuyOneQuantityFlag = 1;
        }
        var beforeCancelQuantityFlag=0;
        if(this.form2.beforeCancelQuantityFlag){
          beforeCancelQuantityFlag = 1;
        }
        this.$api.post('dragon/csParamConfig/updateConfig', {id:2,sellQuantity:sellQuantity,buyOneQuantity:buyOneQuantity,bigOrder:bigOrder,bigOrderBuyQuantity:bigOrderBuyQuantity,cancelBuyOneQuantity:cancelBuyOneQuantity,
          beforeCancelQuantity:beforeCancelQuantity,cancelBuyOneQuantitySec:cancelBuyOneQuantitySec,beforeCancelQuantitySec:beforeCancelQuantitySec,
          sellQuantityFlag:sellQuantityFlag,buyOneQuantityFlag:buyOneQuantityFlag,bigOrderAndSealingFlag:bigOrderAndSealingFlag,cancelBuyOneQuantityFlag:cancelBuyOneQuantityFlag
          ,beforeCancelQuantityFlag:beforeCancelQuantityFlag}, r => {
          alert(r.msg);
          /*if(r.code==0){
            location.reload()
          }*/
        })
      },
      onSubmit3() {
        // 这里可以处理表单提交的逻辑，例如发送数据到服务器
        var sellQuantity=this.form3.sellQuantity;
        var buyOneQuantity=this.form3.buyOneQuantity;
        var bigOrder=this.form3.bigOrder;
        var bigOrderBuyQuantity=this.form3.bigOrderBuyQuantity;
        var cancelBuyOneQuantity=this.form3.cancelBuyOneQuantity;
        var beforeCancelQuantity=this.form3.beforeCancelQuantity;
        var cancelBuyOneQuantitySec=this.form3.cancelBuyOneQuantitySec;
        var beforeCancelQuantitySec=this.form3.beforeCancelQuantitySec;
        var sellQuantityFlag=0;
        if(this.form3.sellQuantityFlag){
          sellQuantityFlag = 1;
        }
        var buyOneQuantityFlag=0;
        if(this.form3.buyOneQuantityFlag){
          buyOneQuantityFlag = 1;
        }
        var bigOrderAndSealingFlag=0;
        if(this.form3.bigOrderAndSealingFlag){
          bigOrderAndSealingFlag = 1;
        }
        var cancelBuyOneQuantityFlag=0;
        if(this.form3.cancelBuyOneQuantityFlag){
          cancelBuyOneQuantityFlag = 1;
        }
        var beforeCancelQuantityFlag=0;
        if(this.form3.beforeCancelQuantityFlag){
          beforeCancelQuantityFlag = 1;
        }
        this.$api.post('dragon/csParamConfig/updateConfig', {id:3,sellQuantity:sellQuantity,buyOneQuantity:buyOneQuantity,bigOrder:bigOrder,bigOrderBuyQuantity:bigOrderBuyQuantity,cancelBuyOneQuantity:cancelBuyOneQuantity,
          beforeCancelQuantity:beforeCancelQuantity,cancelBuyOneQuantitySec:cancelBuyOneQuantitySec,beforeCancelQuantitySec:beforeCancelQuantitySec,
          sellQuantityFlag:sellQuantityFlag,buyOneQuantityFlag:buyOneQuantityFlag,bigOrderAndSealingFlag:bigOrderAndSealingFlag,cancelBuyOneQuantityFlag:cancelBuyOneQuantityFlag
          ,beforeCancelQuantityFlag:beforeCancelQuantityFlag}, r => {
          alert(r.msg);
          /*if(r.code==0){
            location.reload()
          }*/
        })
      }

    }
  }
</script>
