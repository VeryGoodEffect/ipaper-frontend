<template>
  <div>
    <div style="height: calc(100vh - 60px)" class="my-graph">
      <RelationGraph
        ref="graphRef"
        :options="graphOptions"
        :on-node-click="onNodeClick"
        :on-line-click="onLineClick"
      />
    </div>
  </div>
</template>
  
  <script>
// 如果您没有在main.js文件中使用Vue.use(RelationGraph); 就需要使用下面这一行代码来引入relation-graph
import RelationGraph from "relation-graph/vue3";
export default {
  name: "Demo",
  components: { RelationGraph },
  data() {
    return {
      isShowCodePanel: false,
      graphOptions: {
        debug: false,
        defaultNodeBorderWidth: 0,
        allowSwitchLineShape: true,
        allowSwitchJunctionPoint: true,
        defaultLineShape: 1,
        layouts: [
          {
            label: "自动布局",
            layoutName: "force",
            layoutClassName: "seeks-layout-force",
          },
        ],
        defaultJunctionPoint: "border",

        // 这里可以参考"Graph 图谱"中的参数进行设置
      },
    };
  },
  mounted() {
    this.showSeeksGraph();
  },
  beforeDestroy() {
    console.log("beforeDestroy stop layout");
    this.$refs.graphRef.getInstance().stopAutoLayout();
  },
  methods: {
    showSeeksGraph() {
      const __graph_json_data = {
        rootId: "a",
        nodes: [
          { id: "a", text: "a", cid: "111" },
          { id: "b", text: "b" },
          { id: "b1", text: "b1" },
          { id: "b1-1", text: "b1-1" },
          { id: "b1-2", text: "b1-2" },
          { id: "b1-3", text: "b1-3" },
          { id: "b1-4", text: "b1-4" },
          { id: "b1-5", text: "b1-5" },
          { id: "b1-6", text: "b1-6" },
          { id: "b2", text: "b2" },
          { id: "b2-1", text: "b2-1" },
          { id: "b2-2", text: "b2-2" },
          { id: "b2-3", text: "b2-3" },
          { id: "b2-4", text: "b2-4" },
          { id: "b3", text: "b3" },
          { id: "b3-1", text: "b3-1" },
          { id: "b3-2", text: "b3-2" },
          { id: "b3-3", text: "b3-3" },
          { id: "b3-4", text: "b3-4" },
          { id: "b3-5", text: "b3-5" },
          { id: "b3-6", text: "b3-6" },
          { id: "b3-7", text: "b3-7" },
          { id: "b4", text: "b4" },
          { id: "b4-1", text: "b4-1" },
          { id: "b4-2", text: "b4-2" },
          { id: "b4-3", text: "b4-3" },
          { id: "b4-4", text: "b4-4" },
          { id: "b4-5", text: "b4-5" },
          { id: "b4-6", text: "b4-6" },
          { id: "b4-7", text: "b4-7" },
          { id: "b4-8", text: "b4-8" },
          { id: "b4-9", text: "b4-9" },
          { id: "b5", text: "b5" },
          { id: "b5-1", text: "b5-1" },
          { id: "b5-2", text: "b5-2" },
          { id: "b5-3", text: "b5-3" },
          { id: "b5-4", text: "b5-4" },
          { id: "b6", text: "b6" },
          { id: "b6-1", text: "b6-1" },
          { id: "b6-2", text: "b6-2" },
          { id: "b6-3", text: "b6-3" },
          { id: "b6-4", text: "b6-4" },
          { id: "b6-5", text: "b6-5" },
        ],
        lines: [
          { from: "a", to: "b" },
          { from: "b", to: "b1" },
          { from: "b1", to: "b1-1" },
          { from: "b1", to: "b1-2" },
          { from: "b1", to: "b1-3" },
          { from: "b1", to: "b1-4" },
          { from: "b1", to: "b1-5" },
          { from: "b1", to: "b1-6" },
          { from: "b", to: "b2" },
          { from: "b2", to: "b2-1" },
          { from: "b2", to: "b2-2" },
          { from: "b2", to: "b2-3" },
          { from: "b2", to: "b2-4" },
          { from: "b", to: "b3" },
          { from: "b3", to: "b3-1" },
          { from: "b3", to: "b3-2" },
          { from: "b3", to: "b3-3" },
          { from: "b3", to: "b3-4" },
          { from: "b3", to: "b3-5" },
          { from: "b3", to: "b3-6" },
          { from: "b3", to: "b3-7" },

        ],
      };
      this.$refs.graphRef.setJsonData(__graph_json_data, (graphInstance) => {
        // 这些写上当图谱初始化完成后需要执行的代码
        graphInstance.setZoom(30);
      });
    },
    onNodeClick(nodeObject, $event) {
      console.log("onNodeClick:", nodeObject);
    },
    onLineClick(lineObject, linkObject, $event) {
      console.log("onLineClick:", lineObject);
    },
  },
};
</script>
  
  <style >
.my-graph {
  background: transparent !important;
}
</style>
  
  <style scoped>
</style>
  