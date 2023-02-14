<template>
  <el-form :model="form" :rules="rules" class="login-container" :inline="true" label-width="70px" ref="form">
    <h3 class="login_title">系统登陆</h3>
    <el-form-item prop="username" label="用户名">
      <el-input v-model="form.username" placeholder="请输入账号"></el-input>
    </el-form-item>
    <el-form-item prop="password" label="密码">
      <el-input type="password" v-model="form.password" placeholder="请输入账号"></el-input>
    </el-form-item>
    <el-form-item >
      <el-button type="primary" style="margin-left:105px;margin-top:10px" @click="submit">登陆</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Mock from 'mockjs'
import Cookie from 'js-cookie'
import { getMenu } from '../api'
export default {
data() {
  return {
    form:{
      username:'',
      password:''
    },
    rules:{
      username:[
        {required:true,trigger:'blur',message:'请输入用户名'}
      ],
      password:[
        {required:true,trigger:'blur',message:'请输入密码'}
      ],

    }
  }
},
methods:{
  //登陆
  submit(){
    
    //token信息
            // const token = Mock.Random.guid()

    //校验通过
    this.$refs.form.validate((valid)=>{
      if(valid){
        getMenu(this.form).then(({ data }) =>{
          console.log(data);
          if(data.code=== 20000){
            //请求成功
            //将token信息存入cookie用于不同页面之间的通信
            Cookie.set('token',data.data.token)

            //获取菜单的数据,存入store中
            this.$store.commit('setMenu',data.data.menu)
            
            this.$store.commit('addMenu',this.$router)

            //跳转到首页
            this.$router.push('/home')
          }else{
            this.$message.error(data.data.message);
          }
        })
      }
    })
  }
}
}
</script>

<style lang="less" scoped>
  .login-container{
    width: 350px;
    margin:180px auto;
    border: 1px solid #eaeaea;
    padding: 35px 35px 15px 35px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 0 25px #cac6c6;
    box-sizing: border-box;
    .el-input{
      width: 198px;
    }
    .login_title{
      text-align: center;
      margin-bottom: 40px;
      color: #505458;

    }
  }
</style>