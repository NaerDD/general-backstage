<template>
  <div>
    <el-container>
      <el-aside width="auto">
        <commonAside/>
      </el-aside>
      <el-container>
        <el-header>
          <commonHeader/>
        </el-header>
        <CommonTag/>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import commonAside from '../components/CommonAside'
import commonHeader from '../components/CommonHeader'
import CommonTag from '../components/CommonTag'
export default {
  data() {
    return {};
  },
  components:{
    commonAside,commonHeader,CommonTag


  }
};
</script>

<style scoped>
  .el-header{
    padding: 0;
  }
</style>