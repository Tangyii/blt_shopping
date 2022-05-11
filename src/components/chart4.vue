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
  name: "echart4",
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
    timer = setInterval(draw, 200);
  },
  methods: {
    draw() {
      var myChart = echarts.init(document.getElementById("myChart4"));

      startAngle = startAngle - 5;
      if (isBig) {
        radius = radius + 0.5;
        if (radius > maxradius) {
          isBig = false;
        }
      } else {
        radius = radius - 0.5;
        if (radius < minradius) {
          isBig = true;
        }
      }
      let option = getOption(startAngle, radius);
      myChart.setOption(option, true);
    },
  },
};
</script>
 
<style scoped>
</style>