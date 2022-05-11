<template>
  <div>
    <div id='myChart3' :style="{width: width + 'px', height: height + 'px'}"></div>
  </div>
</template>
 
<script>
import * as echarts from 'echarts' 
export default {
  name: 'echart3',
  props: {
    text: {
      type: Array,
      default () {
        return []
      }
    },
    digitalData: {
      type: Array,
      default () {
        return []
      }
    },
    title: {
      type: String,
      default () {
        return ''
      }
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    radius: {
      type: Number,
      default: 100
    }
  },
  data () {
    return {}
  },
  mounted () {
    this.drawChart()
  },
  methods: {
    drawChart () {
      var myChart = echarts.init(document.getElementById('myChart3'))
      let option = {
        title: {
          text: this.title,
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          top: 'bottom',
          data: this.text
        },
        series: [
          {
            name: '占比',
            type: 'pie',
            radius: [20, this.radius],
            center: ['50%', '60%'],
            roseType: 'area',
            data: this.digitalData
          }
        ]
      }
 
      myChart.setOption(option, true)
    }
  }
}
</script>
 
<style lang='scss' scoped>
</style>