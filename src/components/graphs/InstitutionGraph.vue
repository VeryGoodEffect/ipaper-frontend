<template>
  <div>
    <new-loading-bar :isReal="isReal" :display="displayLoading" :accelerate="accelerateLoading" :progress="progress"
      @stop-display="displayLoading = false"></new-loading-bar>
    <div id="graph-count" style="width: 100%; height: 400px"></div>
  </div>
</template>
  
<script>
import * as echarts from "echarts/core";
import { TooltipComponent, GridComponent } from "echarts/components";
import { BarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import NewLoadingBar from '../loading-bar/NewLoadingBar.vue';
export default {
  props: ["info"],
  components: {
    NewLoadingBar
  },
  mounted() {
    this.progress = 0
    this.displayLoading = true
    setTimeout(() => {
      this.progress = 100
      this.initChart();
    }, 500); // 延迟 1 秒执行 initChart
  },
  data() {
    return {
      displayLoading: false,
      accelerate: false,
      isReal: false,
      progress: 0,

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
            name: this.$t('institution_achievement_number'),
            type: "bar",
            barWidth: "30%",
            data: [],
          },
          {
            name: this.$t('institution_cite_number'),
            type: "bar",
            barWidth: "30%",
            data: [],
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
      if (len < i) i = len;
      console.log(len, "?????");
      for (; i >= 0; i--) {
        this.option.xAxis[0].data.push(newVal[i].year);
        this.option.series[0].data.push(newVal[i].works_count);
        this.option.series[1].data.push(newVal[i].cited_by_count);
      }

      console.log(this.option.xAxis[0].data, "!!!!!!!");
      // newVal.forEach((element) => {
      //   this.option.xAxis[0].data.push(element.year);
      //   this.option.series[0].data.push(element.works_count);
      //   this.option.series[1].data.push(element.cited_by_count);
      // });
      if (!this.chart) {
        const chartDom = document.getElementById("graph-count");
        this.chart = echarts.init(chartDom);
      }
      this.chart.setOption(this.option);
    },
  },
};
</script>