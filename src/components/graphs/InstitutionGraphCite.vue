<template>
  <div id="graph-cite" style="width: 100%; height: 400px; z-index: 999"></div>
</template>
  
  <script>
import * as echarts from "echarts/core";
import { TooltipComponent, GridComponent } from "echarts/components";
import { BarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";

export default {
  props: ["info"],
  mounted() {
    // console.log(this.info[0])

    setTimeout(() => {
      this.initChart();
    }, 100); // 延迟 1 秒执行 initChart
  },
  data() {
    return {
      option: {
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
        xAxis: [
          {
            type: "category",
            data: [],
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "引用数量",
            type: "bar",
            barWidth: "60%",
            data: [],
          },
        ],
      },
    };
  },
  beforeDestroy() {
    this.destroyChart();
  },
  methods: {
    initChart() {
      // 引入需要使用的组件和渲染器
      echarts.use([TooltipComponent, GridComponent, BarChart, CanvasRenderer]);

      // 获取图表容器
      const chartDom = document.getElementById("graph-cite");

      // 初始化图表
      this.chart = echarts.init(chartDom);

      // 设置图表配置项

      // 设置图表配置项并渲染图表
      // this.chart.setOption(this.option);

      // var len = this.info.length;
      // console.log(this.info, "!!!!!!!");

      // this.info.reverse().forEach((element) => {
      //   this.option.xAxis[0].data.push(element.year);
      //   this.option.series[0].data.push(element.cited_by_count);
      // });

      this.chart.setOption(this.option);
    },
    destroyChart() {
      // 销毁图表
      if (this.chart) {
        this.chart.dispose();
        this.chart = null;
      }
    },
  },
  watch: {
    info(oldVal, newVal) {
      this.option.xAxis[0].data = []
      this.option.series[0].data = []
      newVal.reverse().forEach((element) => {
        
        this.option.xAxis[0].data.push(element.year);
        this.option.series[0].data.push(element.cited_by_count);
      });
      this.chart.setOption(this.option);
    },
  },
};
</script>