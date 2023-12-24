<template>
  <div id="graph-count" style="width: 100%; height: 400px; z-index: 999"></div>
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
    }, 500); // 延迟 1 秒执行 initChart
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
            data: ['2020','2021','2022'],
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
            name: "成果数量",
            type: "bar",
            barWidth: "30%",
            data: [1000,2000,3000],
          },
          {
            name: "引用数量",
            type: "bar",
            barWidth: "30%",
            data: [1000,2000,3000],
          },
        ],
      },
    };
  },
  beforeDestroy() {
    this.destroyChart();
  },
  beforeUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  },
  methods: {
    initChart() {
      // 引入需要使用的组件和渲染器
      echarts.use([TooltipComponent, GridComponent, BarChart, CanvasRenderer]);

      // 获取图表容器
      const chartDom = document.getElementById("graph-count");
      this.chart = echarts.init(chartDom);

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
      // var len = this.info.length;
      console.log(this.info, "!!!!!!!");
      //   const reversedInfo = this.info.reverse();
      const sortedInfo = this.newVal.sort((a, b) => a.year - b.year);
      this.option.xAxis[0].data = [];
      this.option.series[0].data = [];
      this.option.series[1].data = [];
      sortedInfo.forEach((element) => {
        this.option.xAxis[0].data.push(element.year);
        this.option.series[0].data.push(element.works_count);
        this.option.series[1].data.push(element.cited_by_count);
      });
    },
  },
};
</script>