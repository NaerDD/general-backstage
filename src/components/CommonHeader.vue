<template>
  <div class="header-container">
    <div class="l-content">
      <el-button
        icon="el-icon-menu"
        size="mini"
        @click="handleMenu"
        style="margin-right:20px"
      ></el-button>
      <!-- 面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{item.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img class="user" src="../assets/images/user.png" alt="" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
// vuex的store中mutation方法已经写好了 
// 方法一 直接this.$store取
// 方法二 mapstate辅助函数
import { mapState } from 'vuex'
export default {
  name: "",
  data() {
    return {};
  },
  methods: {
    async handleMenu() {
      this.$store.commit("collapseMenu");
    },
  },
  computed:{
    //直接调用这个方法会返回一个对象 所以使用扩展运算符... es6语法 将这个返回的对象进行解构
    ...mapState({
      tags:state => state.tab.tabsList
    }),
  },
  mounted() {
    console.log(this.tags,'tags');
  },
};
</script>

<style lang="less" scoped>
.header-container {
  background-color: #333;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  .text {
    font-size: 14px;
    color: #fff;
    margin-left: 10px;
  }
  .r-content {
    .user {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
  .l-content{
    display: flex;
    align-items: center;
    // 样式穿刺
    /deep/.el-breadcrumb__item{
      .el-breadcrumb__inner {
        font-weight: normal;
        &.is-link{
          color: #666;
        }
      }
      &:last-child{
        .el-breadcrumb__inner {
          color: #fff;
        }
      }
    }
  }
}
</style>