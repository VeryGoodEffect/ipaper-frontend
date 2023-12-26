<template>
  <div
    id="scholar-graph"
    style="width: 100%; height: 400px; z-index: 999"
  ></div>
</template>
  
  <script>
import * as echarts from "echarts/core";
import { TooltipComponent, GridComponent } from "echarts/components";
import { BarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";

export default {
  props: ["info"],
  mounted() {
    this.initChart();
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
            min: 0,
            max: 40000, // 引用数量的Y轴上限
            // 可以为此轴添加额外的样式和配置
            position: "right",
          },
          {
            type: "value",
            min: 0,
            max: 2000, // 成果数量的Y轴上限
            // 可以为此轴添加额外的样式和配置
            // 设置为右侧的 Y 轴
            position: "left",
          },
        ],
        series: [
          {
            name: this.$t("institution_achievement_number"),
            type: "bar",
            barWidth: "35%",
            data: [],
            yAxisIndex: 1, // 使用第二个Y轴（右侧）
          },
          {
            name: this.$t("institution_cite_number"),
            type: "bar",
            barWidth: "35%",
            data: [],
            yAxisIndex: 0, // 使用第一个Y轴（左侧）
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
      const chartDom = document.getElementById("scholar-graph");

      // 初始化图表
      this.chart = echarts.init(chartDom);

      // 设置图表配置项

      // 设置图表配置项并渲染图表
      // this.chart.setOption(this.option);

      // var len = this.info.length;
      // console.log(this.info, "!!!!!!!");
      // // const reversedInfo = this.info.reverse();
      // const sortedInfo = this.info.sort((a, b) => b.year - a.year);

      // sortedInfo.reverse().forEach((element) => {
      //   this.option.xAxis[0].data.push(element.year);
      //   this.option.series[0].data.push(element.works_count);
      //   this.option.series[1].data.push(element.cited_by_count);
      // });
      if(this.chart)
      this.chart.setOption(this.option);

      window.addEventListener("resize", this.manualResize);

    },

    destroyChart() {
      // 销毁图表
      if (this.chart) {
        this.chart.dispose();
        this.chart = null;
      }
    },
    manualResize() {
      this.chart.resize();
    },
  },

  watch: {
    info(oldVal, newVal) {
      // var len = this.info.length;
      if (!newVal || !Array.isArray(newVal)) {
        return;
      }

      console.log(this.info, "!!!!!!!");
      // const reversedInfo = newVal.reverse();
      // const sortedInfo = reversedInfo.sort((a, b) => a.year - b.year);
      this.option.xAxis[0].data = [];
      this.option.series[0].data = [];
      this.option.series[1].data = [];

      var len = newVal.length;
      var i = 5;
      if(!len) i=0;
      else if (len < i) i = len;

      // console.log(len, "?????");
      let maxWorksCount = 0;
      let maxCitedByCount = 0;
      for (; i >= 0; i--) {
        this.option.xAxis[0].data.push(newVal[i].year);
        this.option.series[0].data.push(newVal[i].works_count);
        this.option.series[1].data.push(newVal[i].cited_by_count);

        if (newVal[i].works_count > maxWorksCount) {
          maxWorksCount = newVal[i].works_count;
        }
        if (newVal[i].cited_by_count > maxCitedByCount) {
          maxCitedByCount = newVal[i].cited_by_count;
        }
      }

      // 根据需要调整最大值，例如增加一些额外空间
      maxWorksCount = Math.ceil(maxWorksCount * 1.1);
      maxCitedByCount = Math.ceil(maxCitedByCount * 1.1);

      this.option.yAxis[0].max = maxCitedByCount; // 引用数量的 Y 轴
      this.option.yAxis[1].max = maxWorksCount; // 成果数量的 Y 轴

      console.log(this.option.xAxis[0].data, "!!!!!!!");
      // newVal.forEach((element) => {
      //   this.option.xAxis[0].data.push(element.year);
      //   this.option.series[0].data.push(element.works_count);
      //   this.option.series[1].data.push(element.cited_by_count);
      // });

      this.chart.setOption(this.option);
    },
  },
};
</script>