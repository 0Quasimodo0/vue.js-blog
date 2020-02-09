<template>
  <div>
    <!--
    <el-row :gutter="10">
      <el-col :span="8">
        <el-card shadow="hover">
          <div style="width: 100%;padding-top: 100%;position: relative;">
            <div id="main" style="position: absolute;top: 0;left:0;width: 100%;height: 100%;"></div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <h4>访客量统计</h4>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <h4>访客量统计</h4>
        </el-card>
      </el-col>
    </el-row>
    -->
  </div>
</template>

<script>
// 1. 导入 echarts
// import echarts from 'echarts'
export default {
  data () {
    return {}
  },
  created () {},
  // 此时页面上的元素已经被渲染完毕
  mounted () {
    // 3. 基于准备好的dom, 初始化echarts实例
    /* var myChart = echarts.init(document.getElementById('main'))

    // 4. 指定图表的配置项和数据
    var option = {
      series: {
        type: 'sunburst',
        data: [{
          name: 'A',
          value: 10,
          children: [{
            value: 3,
            name: 'Aa'
          },
          {
            value: 5,
            name: 'Ab'
          }]
        },
        {
          name: 'B',
          children: [{
            name: 'Ba',
            value: 4
          }, {
            name: 'Bb',
            value: 2
          }]
        },
        {
          name: 'C',
          value: 3
        }]
      }
    }

    // 5. 展示数据
    myChart.setOption(option) */
  },
  methods: {}
}
</script>

<style lang="less" scoped>
</style>
