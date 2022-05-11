<template>
  <div class="page">
    <p-page-header title="用户管理"></p-page-header>
    <el-form inline :model="queryForm">
      <el-form-item size="mini" label="用户账号">
        <el-input
          placeholder="请输入"
          clearable
          v-model="queryForm.username"
        ></el-input>
      </el-form-item>
      <el-form-item size="mini">
        <el-button
          type="primary"
          :loading="queryLoading"
          @click="handleClick"
          icon="el-icon-search"
          >查询</el-button
        >
      </el-form-item>
      <el-form-item size="mini">
        <el-button
          type="success"
          :loading="queryLoading"
          @click="handleAdd"
          icon="el-icon-plus"
          >新增</el-button
        >
      </el-form-item>
    </el-form>
    <el-table border size="mini" :data="list">
      <el-table-column label="账号" prop="username"></el-table-column>
      <el-table-column label="昵称" prop="nickname"></el-table-column>
      <el-table-column label="头像">
        <template v-slot="{ row }">
          <img
            style="width: 100px; height: 100px; border-radius: 9px"
            fit="cover"
            :src="row.face ? require('@/assets/pic/'+ row.face) : '/'"
          >
        </template>
      </el-table-column>
      <el-table-column label="角色" prop="roleName">
        <template v-slot="{ row }">
          <el-tag size="small">
            {{ row.roleName }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="insertTime">
        <template v-slot="{ row }">
          {{ formatTime(row.insertTime) }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="{ row }">
          <el-button
            size="mini"
            icon="el-icon-edit"
            @click="handleEdit(row.id)"
            type="warning"
            >修改</el-button
          >
          <el-button
            size="mini"
            @click="handleRemove(row.id)"
            icon="el-icon-remove"
            type="danger"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.pno"
      :page-size="page.psize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.totalElements"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "user",
  data() {
    return {
      queryForm: {
        username: "",
        pno: 1,
        psize: 10,
      },
      queryLoading: false,
    };
  },
  computed: {
    ...mapState("userModel", ["list", "page"]),
    formatTime() {
      return function (time) {
        let d = new Date(time);
        return `${d.getFullYear()}-${
          d.getMonth() + 1
        }-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
      };
    },
  },
  async created() {
    await this.getListForPage(this.queryForm);
  },
  async activated() {
    await this.getListForPage(this.queryForm);
  },
  methods: {
    ...mapActions("userModel", ["getListForPage", "deleteById"]),
    async handleClick() {
      this.queryLoading = true;
      this.queryForm.pno = 1;
      await this.getListForPage(this.queryForm);
      this.queryLoading = false;
    },
    async handleSizeChange(psize) {
      this.queryForm.psize = psize;
      this.queryForm.pno = 1;
      await this.getListForPage(this.queryForm);
    },
    async handleCurrentChange(pno) {
      this.queryForm.pno = pno;
      await this.getListForPage(this.queryForm);
    },
    handleAdd() {
      this.$router.push("/user-add");
    },
    async handleRemove(id) {
      let confirm = await this.$confirm("正在删除", "提示", {
        type: "warning",
      }).catch((err) => err);
      if (confirm == "confirm") {
        await this.deleteById(id);
        await this.getListForPage(this.queryForm);
      }
    },
    handleEdit(id) {
      this.$router.push({ path: "/user-edit", query: { id } });
    },
  },
};
</script>

<style>
</style>
