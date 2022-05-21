<template>
  <div class="back">
    <div class="top">
      <div style="font-size: 20px">
        大厅已服务监视 {{ watchTime.toFixed(1) }} 小时 (h)
      </div>
      <div class="title">便利淘销售管理系统</div>
      <div class="time">
        <div>{{ time }}</div>
        <div>{{ date }}</div>
      </div>
      <div @click="fullScreen(screenAll)">
        <span style="font-size: 20px" v-if="screenAll == 0">进入全屏</span>
        <span style="font-size: 20px" v-if="screenAll == 1">退出全屏</span>
      </div>
    </div>
    <el-row>
      <el-col :span="15">
        <div class="item-left-top">
          <div>
            <chart2
              :width="380"
              :height="250"
              :leftText="chart2Text"
              :digitalData="digitalData"
              :key="componentKey"
              style="padding-top: 20px"
            ></chart2>
          </div>
          <div>
            <div>轮播广告图点击量</div>
            <div>100</div>
            <div>昨日点击&nbsp;&nbsp;&nbsp;100</div>
            <div>对比点击&nbsp;&nbsp;&nbsp;0</div>
          </div>
          <div>
            <div>历史订单</div>
            <div>{{allOrder}}</div>
            <div>昨日订单数&nbsp;&nbsp;&nbsp;{{yesterdayOrder}}</div>
            <div>今日订单数&nbsp;&nbsp;{{todayOrder}}</div>
          </div>
        </div>
        <div class="item-left-bottom">
          <div>
            <p>各类商品销售占比</p>
            <chart3
              :width="340"
              :height="340"
              :radius="80"
              :leftText="chart2Text"
              :digitalData="digitalData2"
              :key="componentKey"
            ></chart3>
          </div>
          <div>
            <p>销售额前五类型商品</p>
            <table
              border="1"
              cellpadding="0"
              cellspacing="0"
              width="90%"
              class="table1"
            >
              <tr height="50px" align="center" style="font-size: 15px">
                <td>序号</td>
                <td>类型名称</td>
                <td>累计销售额</td>
              </tr>
              <tr
                v-for="(item, index) in digitalData2"
                :key="index"
                height="40px"
                align="center"
              >
                <td>{{ ++index }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.price }}</td>
              </tr>
            </table>
          </div>
        </div>
      </el-col>
      <el-col :span="9">
        <div class="item-right">
          <p>近七天订单销售额</p>
          <chart1
            :width="400"
            :height="220"
            :xAxisText="xAxisText1"
            :xFontColor="'#000000'"
            :digitalData="digitalData1"
            :key="componentKey"
          ></chart1>
          <p>
            热销榜前 5 商品 <br />
            更新于{{ date }}
          </p>
          <table
            border="1"
            cellpadding="0"
            cellspacing="0"
            width="90%"
            class="table2"
          >
            <tr height="50px" align="center" style="font-size: 15px">
              <td>序号</td>
              <td>商品名称</td>
              <td>销售量</td>
            </tr>
            <tr
              v-for="(item, index) in tableData1"
              :key="`${++index}`"
              height="40px"
              align="center"
            >
              <td>{{ index }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.count }}</td>
            </tr>
          </table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import moment from "moment";
import chart1 from "@/components/chart1";
import chart2 from "@/components/chart2";
import chart3 from "@/components/chart3";
export default {
  name: "echarts",
  computed: {
    ...mapState("echarsModel", [
      "yesterdayOrder",
      "todayOrder",
      "allOrder",
      "digitalData1",
      "xAxisText1",
      "chart2Text",
      "digitalData",
      "chart3Text",
      "digitalData2",
      "tableData1",
      "tableData2",
    ]),
    date() {
      return moment().format("YYYY 年 MM 月 DD 日");
    },
  },
  data() {
    return {
      componentKey: 0,
      screenAll: 0, // 0退出全屏, 1全屏
      time: "",
      watchTime: 23.4,
    };
  },
  components: {
    chart1,
    chart2,
    chart3,
  },
  watch: {
    chart2Text() {
      this.componentKey += 1;
    },
    digitalData1() {
      this.componentKey += 1;
    },
    digitalData() {
      this.componentKey += 1;
    },
    digitalData2() {
      this.componentKey += 1;
    },
    xAxisText1() {
      this.componentKey += 1;
    },
  },
  mounted() {
    this.timer = setInterval(() => {
      // 更新小时时间
      this.time = moment().format("HH:mm:ss");
    }, 1000);
    this.watchTimer = setInterval(() => {
      // 更新监测时间
      this.watchTime += 0.1;
    }, 360000);
  },
  beforeDestroy() {
    // 清除定时器
    if (this.timer) {
      clearInterval(this.timer);
    }
    if (this.watchTimer) {
      clearInterval(this.watchTimer);
    }
  },
  async created() {
    await this.getGoodsTypeListAll();
    await this.getDigitalData1();
    await this.getTableData1();
    await this.getDigitalData();
    await this.getDigitalData2();
    await this.getAllOrder();
    await this.getTodayOrder();
    await this.getYesterdayOrder();
  },
  async activated() {
    await this.getGoodsTypeListAll();
    await this.getDigitalData1();
    await this.getTableData1();
    await this.getDigitalData();
    await this.getDigitalData2();
    await this.getAllOrder();
    await this.getTodayOrder();
    await this.getYesterdayOrder();
  },
  methods: {
    ...mapActions("echarsModel", [
      "getDigitalData",
      "getGoodsTypeListAll",
      "getDigitalData1",
      "getDigitalData2",
      "getTableData1",
      "getAllOrder",
      "getYesterdayOrder",
      "getTodayOrder"
    ]),
    toPageBack() {
      this.$router.go(-1);
    },
    fullScreen() {
      // # 全屏显示
      if (this.screenAll === 1) {
        this.screenAll = 0;
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        this.screenAll = 1;
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
          document.documentElement.webkitRequestFullScreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.msRequestFullscreen) {
          // IE11
          document.documentElement.msRequestFullscreen();
        }
      }
    },
  },
};
</script>
 
<style lang="scss" scoped>
tr:hover {
  background: #c5c4ff77;
}
.back {
  //   background: #030237;
  width: 100%;
  position: relative;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 18px;
  overflow-x: hidden;
  overflow-y: hidden;
  color: #5a95da;
  .top {
    width: 100%;
    height: 60px;
    line-height: 60px;
    color: #4471a6;
    // background: #050297;
    border-bottom: 2px solid #4471a6;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 1400px;
    position: relative;
    font-size: 16px;
    div:first-child {
      position: relative;
      left: -3%;
    }
    img:nth-child(2) {
      width: 250px;
      height: 40px;
      margin-left: 2%;
    }
    img:nth-child(4) {
      width: 250px;
      height: 40px;
    }
    .title {
      width: 280px;
      //   background-image: url('../../assets/logo.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      text-align: center;
      font-size: 24px !important;
      font-weight: 600;
      letter-spacing: 5px;
    }
    .time {
      width: 200px;
      height: 50px;
      line-height: 25px;
      display: flex;
      flex-direction: column;
      div {
        text-align: center;
        font-weight: 400;
        font-size: 16px;
        font-family: Digital;
      }
    }
    div:nth-child(6) {
      cursor: pointer;
      img {
        position: relative;
        top: 5px;
        margin-left: 5px;
      }
    }
    div:last-child {
      font-size: 16px;
      margin-left: 2%;
      cursor: pointer;
    }
    div:last-child:hover {
      color: cyan;
    }
  }
  .el-row {
    .item-left-top {
      width: 100%;
      height: 300px;
      display: flex;
      justify-content: center;
      align-items: center;
      // background: crimson;
      div {
        width: 26%;
        height: 280px;
        // background: cornflowerblue;
        margin: auto;
        display: flex;
        flex-direction: column;
        position: relative;
        left: 1%;
      }
      div:first-child {
        width: 400px;
        height: 280px;
      }
      div:nth-child(2),
      div:last-child {
        animation: dh1 5s;
        -webkit-animation: dh1 5s; /* Safari and Chrome */
        div {
          width: 100%;
          display: flex;
          justify-content: center;
          text-align: center;
          font-family: digital;
        }
        div:nth-child(2) {
          font-size: 80px;
          padding: 30px 0;
          color: #d3edff;
        }
        div:nth-child(3),
        div:last-child {
          text-align: left;
          text-indent: 30px;
        }
      }
    }
    .item-left-bottom {
      width: 96%;
      height: 350px;
      margin: auto;
      border: 2px solid #0094ff;
      border-radius: 10px;
      margin-bottom: 30px;
      //   background-image: radial-gradient(#1A2D5E 5%, #000337 70%);
      display: flex;
      justify-content: center;
      align-items: center;
      animation: dh2 0.8s;
      -webkit-animation: dh2 0.8s;
      animation-delay: 2s;
      animation-fill-mode: both;
      div {
        height: 380px;
        // background: crimson;
        margin: 0 10px;
        p {
          position: relative;
          top: 30px;
        }
      }
      div:first-child {
        width: 340px;
        display: flex;
        flex-direction: column;
        align-items: center;
        div {
          position: relative;
          bottom: 8%;
          animation: dh4 0.8s;
          -webkit-animation: dh4 0.8s; /* Safari and Chrome */
          animation-delay: 2s;
          animation-fill-mode: both;
        }
      }
      div:last-child {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .table1 {
        position: relative;
        top: 50px;
        border: 1px solid #5a95da;
        font-size: 12px;
        animation: dh4 0.8s;
        -webkit-animation: dh4 0.8s; /* Safari and Chrome */
        animation-delay: 3.4s;
        animation-fill-mode: both;
      }
    }
    .item-right {
      width: 90%;
      height: 610px;
      margin: 40px auto;
      border: 2px solid #0094ff;
      border-radius: 10px;
      //   background-image: linear-gradient(to top, #1A2D5E, #000337);
      animation: dh3 0.8s;
      -webkit-animation: dh3 0.8s; /* Safari and Chrome */
      animation-delay: 3.8s;
      animation-fill-mode: both;
      div {
        position: relative;
        left: 5%;
        animation: dh4 0.8s;
        -webkit-animation: dh4 0.8s; /* Safari and Chrome */
        animation-delay: 3.8s;
        animation-fill-mode: both;
      }
      .table2 {
        border: 1px solid #5a95da;
        font-size: 12px;
        margin: 30px auto;
        animation: dh4 0.8s;
        -webkit-animation: dh4 0.8s; /* Safari and Chrome */
        animation-delay: 5.2s;
        animation-fill-mode: both;
      }
      p {
        // padding-top: 40px;
        font-size: 15px;
        text-align: center;
      }
      p:first-child {
        padding-top: 20px;
        margin: 0;
      }
    }
  }
}
// 渐变效果
@keyframes dh1 {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

// 上移效果
@keyframes dh2 {
  from {
    opacity: 0;
    position: relative;
    top: 100px;
  }
  to {
    opacity: 1;
    position: relative;
    top: 0;
  }
}

// 左移效果
@keyframes dh3 {
  from {
    opacity: 0;
    position: relative;
    left: 500px;
  }
  to {
    opacity: 1;
    position: relative;
    left: 0;
  }
}

// 缩放出现效果
@keyframes dh4 {
  from {
    opacity: 0;
    transform: scale(0, 0);
  }
  to {
    opacity: 1;
    transform: scale(1, 1);
  }
}
</style>