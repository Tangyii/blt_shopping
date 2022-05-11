<template>
  <div>
    <el-page-header @back="handleBack" content="增加用户信息"></el-page-header>
    <el-row>
      <el-col :span="24">
        <el-form
          :model="addForm"
          label-width="auto"
          ref="addForm"
          :rules="rules"
        >
          <el-form-item size="mini" prop="username" label="账号">
            <el-input
              placeholder="请输入"
              clearable
              v-model.trim="addForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item size="mini" prop="password" label="密码">
            <el-input
              placeholder="请输入"
              clearable
              v-model.trim="addForm.password"
            ></el-input>
          </el-form-item>
          <el-form-item size="mini" prop="nickname" label="昵称">
            <el-input
              placeholder="请输入"
              clearable
              v-model.trim="addForm.nickname"
            ></el-input>
          </el-form-item>
          <el-form-item size="mini" prop="roleId" label="角色">
            <el-select
              placeholder="请选择"
              clearable
              v-model.trim="addForm.roleId"
            >
              <el-option
                v-for="item in roleList"
                :key="item.roleId"
                :label="item.roleName"
                :value="item.roleId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item size="mini" label="头像">
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
  name: "user-add",
  data() {
    let _this = this;
    return {
      rules: {
        username: [
          {
            required: true,
            message: "账号不可以为空",
          },
        ],
        password: [
          {
            required: true,
            message: "密码不可以为空",
          },
        ],
        nickname: [
          {
            required: true,
            message: "昵称不可以为空",
          },
        ],
        roleId: [
          {
            required: true,
            message: "角色不可以为空",
          },
        ]
      },
      fileList: [],
      addForm: {
        username: "",
        password: "",
        nickname: "",
        roleId: "",
        face:""
      },
      subLoading: false,
    };
  },
  async created() {
    await this.getRoleListAll();
  },
  computed: {
    ...mapState("userModel", ["roleList"]),
  },
  methods: {
    ...mapActions("userModel", ["getRoleListAll", "insert","uploadPic"]),
    handleBack() {
      this.$router.history.go(-1);
    },
    async handleAdd() {
      this.submitUpload();
      let valid = await this.$refs.addForm.validate().catch((err) => err);
      if (valid) {
        this.subLoading = true;
        await this.insert(this.addForm);
        this.subLoading = false;
        this.handleBack();
      }
    },
    // 文件上传
    async submitUpload(e) {
      const fileArray = this.$refs.upload.uploadFiles;
      const aname = fileArray[0].name
      const fd = new FormData();
      fd.append('key',fileArray[0].raw);
      await this.uploadPic(fd)
      this.addForm.face = 'img-' + aname
    },
    handleBeforeUpload(file) {
      if (
        !(
          file.name.indexOf("png") != -1 ||
          file.name.indexOf("jpg") != -1 ||
          file.name.indexOf("jpeg") != -1 ||
          file.name.indexOf("gif") != -1
        )
      ) {
        this.$notify({
          title: "提示",
          message: "只能上传图片格式的文件",
          type: "error",
        });
        return Promise.reject();
      }
    },
    handleError(err) {
      this.$notify({
        title: "提示",
        message: "上传失败",
        type: "error",
      });
    },
  },
};
</script>

<style scoped="scoped" lang="scss">
</style>
