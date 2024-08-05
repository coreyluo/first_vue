<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        position: relative;
        border-radius: 1000px;
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
        <Menu active-name="1-8" theme="dark" width="auto" :open-names="['1']" @on-select="routeTo">
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
        <Layout :style="{textAlign: 'center'}">
            <div style="height: 30px">
            </div>
            <template>
                <div>
                    <font style="font-weight:bold;font-size:15px;">账号：</font><Input name= "param1" v-model="param1" placeholder="" style="width: 300px" />
                </div>
                <div>
                    <font style="font-weight:bold;font-size:15px;">密码：</font><Input name= "param2" v-model="param2" placeholder="" style="width: 300px" />
                </div>
                <div>
                  <Button type="primary" icon="ios-search" @click="login()">登录</Button>
                </div>
            </template>

        </Layout>
    </div>
</template>
<script>
    export default {
        created () {

        },
        data () {
            return {
                data6: [

                ]
            }
        },
        methods: {
            login(){
                var userName = this.param1;
                var password = this.param2;
                this.$api.get('dragon/userInfo/login', {userName:userName,password:password}, r => {
                   if(r.data.loginSuccess==true){
                      this.$router.push({path: "/"})
                   }
                })
            }
        }
    }
</script>
