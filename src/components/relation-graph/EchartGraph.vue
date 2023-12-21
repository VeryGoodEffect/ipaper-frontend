<template>
  <div ref="chart" style="width: 100%; height: 500px"></div>
</template>
  
  <script>
import * as echarts from "echarts";

export default {
  name: "EChartsGraph",
  props: ["relationList"],
  data() {
    return {
      myChart: null,
      data: [
        {
          fixed: true,
          x: 0,
          y: 0,
          symbolSize: 20,
          id: "-1",
          userid: "",
          description: "这是中心节点",
        },
      ],
      edges: [],
    };
  },
  mounted() {
    this.initChart();
    console.log(this.relationList)
    this.$nextTick(() => {
      // 这里的代码会在DOM更新后执行
      if (this.relationList && this.relationList.length > 0) {
        this.relationList.forEach((item) => {
          this.addData(item.userid);
        });
      }
    });

    
    //   this.startAddingNodes();
  },
  methods: {
    initChart() {
      this.myChart = echarts.init(this.$refs.chart);
      const option = {
        series: [
          {
            type: "graph",
            layout: "force",
            animation: false,
            data: this.data,
            force: {
              repulsion: 100,
              edgeLength: 5,
            },
            edges: this.edges,
          },
        ],
      };
      this.myChart.setOption(option);
      this.myChart.on("click", this.handleNodeClick);
    },
    handleNodeClick(event) {
      if (event.dataType === "node") {
        // 如果点击的是节点
        console.log("Clicked node:", event.data);
        // 你可以在这里添加更多的逻辑，比如显示节点信息
      }
    },
    //   startAddingNodes() {
    //     setInterval(() => {
    //       this.addData();
    //     }, 200);
    //   },
    addData(userid) {
      this.data.push({
        id: this.data.length.toString(),
        userid: this.userid,
      });
      const source = Math.round((this.data.length - 1) * Math.random());
      const target = Math.round((this.data.length - 1) * Math.random());
      if (source !== target) {
        this.edges.push({
          source: source,
          target: target,
        });
      }
      this.myChart.setOption({
        series: [
          {
            roam: true,
            data: this.data,
            edges: this.edges,
          },
        ],
      });
    },

    processRelationList() {
      this.relationList.forEach((item) => {
        this.addData(item.userid);
      });
    },
  },

  watch: {
    relationList(newList) {
      if (newList && newList.length > 0) {
        this.processRelationList();
      }
    },
  },
};
</script>
  
  <style>
/* Style your component */
</style>
  