<template>
  <div class="manage">
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <!-- 用户的表单信息 -->
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        :inline="true"
        :rules="rules"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>

        <el-form-item label="年龄" prop="age">
          <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="出生日期" prop="birth">
          <el-date-picker
            v-model="form.birth"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-DD"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="地址" prop="addr">
          <el-input v-model="form.addr" placeholder="请输入地址"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="handleAdd"> + 新增 </el-button>
      <!-- form搜索区 -->
      <el-form :model="userform" :inline="true">
        <el-form-item>
          <el-input v-model="userform.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item>
    <el-button type="primary" @click="onSubmit">查询</el-button>
  </el-form-item>
      </el-form>
    </div>
    <div class="common-table">
      <el-table :data="tableData" style="width: 100%" height="90%" stripe>
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="sex" label="性别">
          <template slot-scope="scope">
            <span>{{ scope.row.sex == 1 ? "男" : "女" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄"> </el-table-column>
        <el-table-column prop="birth" label="出生日期"> </el-table-column>
        <el-table-column prop="addr" label="地址"> </el-table-column>
        <el-table-column prop="addr" label="地址">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div>
        <el-pagination
          class="pager"
          layout="prev, pager, next"
          :total="total"
          @current-change="handlePage"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getUser, addUser, editUser, delUser } from "../api";
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: "",
      },
      rules: {
        name: [{ required: true, message: "请输入姓名" }],
        age: [{ required: true, message: "请输入年龄" }],
        sex: [{ required: true, message: "请选择性别" }],
        birth: [{ required: true, message: "请选择出生日期" }],
        addr: [{ required: true, message: "请输入地址" }],
      },
      tableData: [],
      modelType: 0, //0表示新增的弹窗 1表示编辑
      total: 0, //当前总条数
      pageData: {
        page: 1,
        limit: 10,
      },
      userform:{
        name:''
      }
    };
  },
  methods: {
    //提交用户表单
    submit() {
      this.$refs.form.validate((a) => {
        if (a) {
          //后续对表单的处理
          if (this.modelType === 0) {
            addUser(this.form).then(() => {
              //重新获取列表的接口
              this.getList();
            });
          } else {
            editUser(this.form).then(() => {
              //重新获取列表的接口
              this.getList();
            });
          }
          console.log(this.form, "form");
          //清空
          this.$refs.form.resetFields();
          //关闭弹窗
          this.dialogVisible = false;
        }
      });
    },
    //弹窗关闭的时候
    handleClose() {
      console.log(this.$refs.form);
      //清空
      this.$refs.form.resetFields();
      //关闭弹窗
      this.dialogVisible = false;
    },
    //编辑事件
    handleEdit(row) {
      this.modelType = 1;
      this.dialogVisible = true;
      //特别注意 这里不能直接赋值 以达到数据的回显 不然修改之后 直接影响到原数据 所以使用深拷贝 开一块新空间来存同样的原数据
      this.form = JSON.parse(JSON.stringify(row));
    },
    //删除事件
    handleDelete(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delUser({ id: row.id }).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            //重新获取列表的接口
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //获取列表的数据
    getList() {
      //获取列表的数据
      getUser({ params: {...this.userform,...this.pageData} }).then(({ data }) => {
        console.log(data);
        this.tableData = data.list;
        this.total = data.count ? data.count : 0;
      });
    },
    handleAdd() {
      this.modelType = 0;
      this.dialogVisible = true;
    },
    //切换页面
    handlePage(val) {
      // console.log(val);
      this.pageData.page = val;
      this.getList();
    },
    //列表的查询
    onSubmit(){
      this.getList()
    }
  },
  mounted() {
    this.getList();
  },
};
</script>

<style lang="less" scoped>
.manage {
  height: 90%;
  .manage-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .common-table{
    position: relative;
    height: calc(100% - 62px);
    .pager{
      position: absolute;
      bottom: 0;
      right: 20px;

    }
  }
}
</style>