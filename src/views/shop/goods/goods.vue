<template>
  <div class="page">
    <p-page-header title="商品管理"></p-page-header>
    <el-form inline :model="queryForm">
      <el-form-item size="mini" label="商品名称">
        <el-input
          placeholder="请输入"
          clearable
          v-model="queryForm.name"
        ></el-input>
      </el-form-item>
      <el-form-item size="mini" label="商品类型">
        <el-select
          placeholder="请选择"
          clearable
          v-model.trim="queryForm.goodsTypeId"
        >
          <el-option
            v-for="item in goodsTypeList"
            :key="'' + item.shopsTypeId"
            :label="item.name"
            :value="item.shopsTypeId"
          ></el-option>
        </el-select>
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
    </el-form>
    <el-table border size="mini" :data="list">
      <el-table-column label="商品名称" prop="name"></el-table-column>
      <el-table-column label="商品价格" prop="price"></el-table-column>
      <el-table-column label="商品折扣" prop="zheKou"></el-table-column>
      <el-table-column label="商品logo">
        <template v-slot="{ row }">
          <el-image
            style="width: 100px; height: 100px; border-radius: 9px"
            fit="cover"
            :src="
              row.logo.indexOf('http') == -1
                ? require('@/assets/pic/' + row.logo)
                : row.logo
            "
          >
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="商品类型">
        <template v-slot="{ row }">
          <el-tag size="small">
            {{ getName(row.shopsTypeId) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="商品库存" prop="count"> </el-table-column>
      <el-table-column label="添加时间" show-overflow-tooltip>
        <template v-slot="{ row }">
          {{ formatTime(row.insertTime) }}
        </template>
      </el-table-column>
      <el-table-column width="300px" label="操作">
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
  name: "goods",
  data() {
    return {
      queryForm: {
        name: "",
        goodsTypeId: "",
        isOnSale: "",
        pno: 1,
        psize: 10,
      },
      queryLoading: false,
    };
  },
  computed: {
    ...mapState("goodsModel", ["list", "page", "goodsTypeList"]),
    formatTime() {
      return function (time) {
        time = time.replace("T", " ").replace("Z", " ").split(".")[0];
        return time;
      };
    },
  },
  async created() {
    await this.getGoodsTypeListAll();
    await this.getListForPage(this.queryForm);
  },
  async activated() {
    await this.getGoodsTypeListAll();
    await this.getListForPage(this.queryForm);
  },
  methods: {
    ...mapActions("goodsModel", [
      "getListForPage",
      "deleteById",
      "getGoodsTypeListAll",
      "setIsOnSale",
    ]),
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
      this.$router.push("/goods-add");
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
      this.$router.push({ path: "/goods-edit", query: { id } });
    },
    getName(num) {
      let re = "";
      this.goodsTypeList.forEach((item) => {
        if (item.shopsTypeId == num) {
          re = item.name;
        }
      });
      return re;
    },
    async handleSetIsOnSale(row) {
      let message;
      let isOnSale;

      if (row.isOnSale == 1) {
        message = "正在下架当前商品，点击确认继续";
        isOnSale = 0;
      } else {
        message = "正在上架当前商品，点击确认继续";
        isOnSale = 1;
      }
      let confirm = await this.$confirm(message, "提示", {
        type: "warning",
      }).catch((err) => err);
      if (confirm == "confirm") {
        await this.setIsOnSale({
          id: row.id,
          isOnSale: isOnSale,
        });
        await this.getListForPage(this.queryForm);
      }
    },
  },
};
</script>

<style>
</style>
