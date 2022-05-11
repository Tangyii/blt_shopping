<template>
  <div>
    <el-page-header @back="handleBack" content="编辑商品信息"></el-page-header>
    <el-row>
      <el-col :span="24">
        <el-form
          :model="addForm"
          label-width="auto"
          ref="addForm"
          :rules="rules"
        >
          <el-form-item size="mini" prop="name" label="商品名称">
            <el-input
              placeholder="请输入"
              clearable
              v-model.trim="addForm.name"
            ></el-input>
          </el-form-item>
          <el-form-item size="mini" prop="price" label="商品价格">
            <el-input
              placeholder="请输入"
              clearable
              v-model.number="addForm.price"
            ></el-input>
          </el-form-item>
          <el-form-item size="mini" prop="zheKou" label="商品折扣">
            <el-input
              placeholder="请输入"
              clearable
              v-model.number="addForm.zheKou"
            ></el-input>
          </el-form-item>
          <el-form-item size="mini" prop="count" label="商品库存">
            <el-input
              placeholder="请输入"
              clearable
              v-model.number="addForm.count"
            ></el-input>
          </el-form-item>
          <el-form-item size="mini" prop="goodsTypeId" label="商品类型">
            <el-select
              placeholder="请选择"
              clearable
              v-model.trim="addForm.goodsTypeId"
            >
              <el-option
                v-for="item in goodsTypeList"
                :key="'' + item.shopsTypeId"
                :label="item.name"
                :value="item.shopsTypeId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item size="mini" label="商品logo" prop="logo">
            <el-upload
              action="/api/file/upload"
              :limit="1"
              ref="upload"
              :multiple="false"
              :auto-upload="true"
              :file-list="fileList"
              list-type="picture-card"
              :on-progress="submitUpload"
            >
              <el-button slot="trigger" size="small" type="primary"
                >选取文件</el-button
              >
              <div slot="tip" class="el-upload__tip">
                上传图片大小不超过500kb
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item size="mini" label="商品图片" prop="pics">
            <el-upload
              action="/api/file/upload"
              :limit="3"
              ref="upload1"
              :multiple="false"
			  :on-remove="removepic"
              :auto-upload="true"
              :file-list="fileList1"
              list-type="picture-card"
              :on-progress="submitUpload1"
            >
              <el-button slot="trigger" size="small" type="primary"
                >选取文件</el-button
              >
              <div slot="tip" class="el-upload__tip">
                上传图片大小不超过500kb
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item size="mini" prop="description" label="商品描述">
            <el-input
              show-word-limit
              maxlength="300"
              type="textarea"
              placeholder="请输入"
              clearable
              v-model.number="addForm.description"
            ></el-input>
          </el-form-item>
          <el-form-item size="mini" prop="remark" label="商品备注">
            <el-input
              show-word-limit
              maxlength="300"
              type="textarea"
              placeholder="请输入"
              clearable
              v-model.number="addForm.remark"
            ></el-input>
          </el-form-item>
          <el-form-item size="mini">
            <el-button :loading="subLoading" @click="handleAdd" type="primary"
              >提交</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "goods-add",
  data() {
    let _this = this;
    return {
      rules: {
        name: [
          {
            required: true,
            message: "请输入商品名称",
          },
        ],
        price: [
          {
            required: true,
            validator(rules, value, callback) {
              if (value < 0) {
                callback("商品价格不能为负数");
              } else {
                callback();
              }
            },
          },
        ],
        count: [
          {
            required: true,
            validator(rules, value, callback) {
              if (value < 0) {
                callback("库存不能为负数");
              } else {
                callback();
              }
            },
          },
        ],
        zheKou: [
          {
            required: true,
            validator(rules, value, callback) {
              if (value < 1 || value > 10) {
                callback("商品折扣只能在1-10之间");
              } else {
                callback();
              }
            },
          },
        ],
        goodsTypeId: [
          {
            required: true,
            message: "请选择商品类型",
          },
        ],
        logo: [
          {
            required: true,
            validator(rules, value, callback) {
              if (_this.fileList.length > 0) {
                callback();
              } else {
                callback(new Error("请上传一个logo"));
              }
            },
          },
        ],
        pics: [
          {
            required: true,
            validator(rules, value, callback) {
              if (_this.fileList1.length > 0) {
                callback();
              } else {
                callback(new Error("请上至少上传一个商品图片"));
              }
            },
          },
        ],
        description: [
          {
            required: true,
            message: "请输入商品描述",
          },
        ],
      },
      fileList: [],
      fileList1: [],
      addForm: {
        name: "",
        price: 0,
        zheKou: 10,
        goodsTypeId: "",
        description: "",
        logo: "",
        pics: [],
        remark: "",
        count: 0,
      },
      subLoading: false,
    };
  },
  async created() {
    let id = this.$route.query.id;
    await this.getGoodsTypeListAll();
    this.addForm = await this.findById(id);
    this.fileList = [
      {
        url: require("@/assets/pic/" + this.addForm.logo),
      },
    ];
    let arr = this.addForm.pics.split(',')
	arr.forEach((item) => {
		this.fileList1.push({url:require("@/assets/pic/" +item)})
	})
},
  computed: {
    ...mapState("goodsModel", ["goodsTypeList"]),
  },
  methods: {
    ...mapActions("goodsModel", ["getGoodsTypeListAll", "update", "findById"]),
    handleBack() {
      this.$router.history.go(-1);
    },
    // 文件上传
    async submitUpload() {
      this.fileList.push("1");
      const fileArray = this.$refs.upload.uploadFiles;
      const aname = fileArray[0].name;
      const fd = new FormData();
      fd.append("key", fileArray[0].raw);
      await this.uploadPic(fd);
      this.addForm.logo = "img-" + aname;
    },
    // 文件上传
    async submitUpload1() {
      this.fileList1.push("1");
      const fileArray = this.$refs.upload1.uploadFiles;
      const aname = fileArray[0].name;
      const fd = new FormData();
      fd.append("key", fileArray[0].raw);
      await this.uploadPic(fd);
      this.addForm.pics.push("img-" + aname);
    },
    async handleAdd() {
      let valid = await this.$refs.addForm.validate().catch((err) => err);
      if (valid) {
        this.subLoading = true;
        await this.update(this.addForm);
        this.subLoading = false;
        this.handleBack();
      }
    },
  },
};
</script>

<style scoped="scoped" lang="scss">
</style>
