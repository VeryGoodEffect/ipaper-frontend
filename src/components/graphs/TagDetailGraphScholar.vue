<template>
  <div ref="tagdetailgraph" style="width: 300px; height: 300px"></div>
</template>
  
  <script>
import * as echarts from "echarts";

export default {
  props: ["authorList"],
  data() {
    return {
      chart: null,
      option: {
        title: {
          text: "Top Scholar",
          subtext: "top 5",
          left: "left",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "horizontal",
          left: "center",
          top: 'bottom' 
        },
        series: [
          {
            name: " ",
            type: "pie",
            radius: "50%",
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
    };
  },
  mounted() {
    this.chart = echarts.init(this.$refs.tagdetailgraph);
    this.chart.setOption(this.option);
  },
  beforeUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  },
  watch: {
    authorList(newVal, oldVal) {
      if (!newVal || !Array.isArray(newVal)) {
        return;
      }
      // console.log(`myProp changed from ${oldVal} to ${newVal}`);
      // alert("meow")
      this.option.series[0].data = [];

      var len = newVal.length;
      var i = 5;
      if (!len) i = 0;
      else if (len < i) i = len;
      for(i=i-1;i>=0;i--){
        this.option.series[0].data.push({ value:newVal[i].works_count , name: newVal[i].display_name })
      }
      if(this.chart)
      this.chart.setOption(this.option);
      /***
       * {{ author.display_name }} 
            &ensp;&ensp;
            {{ $t('institution_author_achievement') }}
            {{ author.works_count }}
       */
    },
  },
};
</script>
  
  <style>
/* 添加你的样式（如果需要的话） */
</style>
  