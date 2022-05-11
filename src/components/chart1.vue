<template>
  <div>
    <div
      id="myChart1"
      :style="{ width: width + 'px', height: height + 'px' }"
    ></div>
  </div>
</template>
 
<script>
import * as echarts from "echarts";
export default {
  name: "echart1",
  props: {
    digitalData: {
      type: Array,
      default() {
        return [];
      },
    },
    xAxisText: {
      type: Array,
      default() {
        return [];
      },
    },
    title: {
      type: String,
      default() {
        return "";
      },
    },
    width: {
      type: Number,
      default: 0,
    },
    height: {
      type: Number,
      default: 0,
    },
    xFontColor: {
      type: String,
      default: "#a7a7a7",
    },
  },
  data() {
    return {};
  },
  mounted() {
    this.drawChart();
  },
  methods: {
    drawChart() {
      var myChart = echarts.init(document.getElementById("myChart1"));
      let option = {
        title: {
          text: this.title,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: this.xAxisText,
          axisLabel: {
            show: true,
            textStyle: {
              color: this.xFontColor, // 这里用参数代替了
            },
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff', // 这里用参数代替了
            },
          },
        },
        series: [
          {
            barWidth: "60%",
            data: this.digitalData,
            type: "bar",
          },
        ],
      };

      myChart.setOption(option, true);
    },
  },
};
</script>
 
<style scoped>
</style>