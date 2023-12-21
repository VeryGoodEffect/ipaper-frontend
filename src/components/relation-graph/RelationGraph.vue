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
  props: ['relationList'],
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
  watch: {
    relationList: {
      immediate: true, // 立即执行一次
      handler(newVal) {
        if (newVal.length > 0) {
          this.demo()
          this.showSeeksGraph()
          // this.demo()
        }
      }
    }
  },
    // mounted() {
    //   this.showSeeksGraph();
    // },
  beforeDestroy() {
    console.log("beforeDestroy stop layout");
    this.$refs.graphRef.getInstance().stopAutoLayout();
  },
  methods: {
    demo() {
      console.log(11111111)
    },
    showSeeksGraph() {
      // this.sleep(4000)
      console.log(this.relationList)
      let __graph_json_data = {
        // rootId: 'root',
        nodes: [
          //  {id:'root', opacity:0}
          // { id: "a", text: "a" },
          // { id: "b", text: "b" },
          // { id: "b1", text: "b1" },
          // { id: "b1-1", text: "b1-1" },
          // { id: "b1-2", text: "b1-2" },
          // { id: "b1-3", text: "b1-3" },
          // { id: "b1-4", text: "b1-4" },
          // { id: "b1-5", text: "b1-5" },
          // { id: "b1-6", text: "b1-6" },
          // { id: "b2", text: "b2" },
          // { id: "b2-1", text: "b2-1" },
          // { id: "b2-2", text: "b2-2" },
          // { id: "b2-3", text: "b2-3" },
          // { id: "b2-4", text: "b2-4" },
          // { id: "b3", text: "b3" },
          // { id: "b3-1", text: "b3-1" },
          // { id: "b3-2", text: "b3-2" },
          // { id: "b3-3", text: "b3-3" },
          // { id: "b3-4", text: "b3-4" },
          // { id: "b3-5", text: "b3-5" },
          // { id: "b3-6", text: "b3-6" },
          // { id: "b3-7", text: "b3-7" },
          // { id: "b4", text: "b4" },
          // { id: "b4-1", text: "b4-1" },
          // { id: "b4-2", text: "b4-2" },
          // { id: "b4-3", text: "b4-3" },
          // { id: "b4-4", text: "b4-4" },
          // { id: "b4-5", text: "b4-5" },
          // { id: "b4-6", text: "b4-6" },
          // { id: "b4-7", text: "b4-7" },
          // { id: "b4-8", text: "b4-8" },
          // { id: "b4-9", text: "b4-9" },
          // { id: "b5", text: "b5" },
          // { id: "b5-1", text: "b5-1" },
          // { id: "b5-2", text: "b5-2" },
          // { id: "b5-3", text: "b5-3" },
          // { id: "b5-4", text: "b5-4" },
          // { id: "b6", text: "b6" },
          // { id: "b6-1", text: "b6-1" },
          // { id: "b6-2", text: "b6-2" },
          // { id: "b6-3", text: "b6-3" },
          // { id: "b6-4", text: "b6-4" },
          // { id: "b6-5", text: "b6-5" },
        ],
        lines: [
          // { from: "a", to: "b" },
          // { from: "b", to: "b1" },
          // { from: "b1", to: "b1-1" },
          // { from: "b1", to: "b1-2" },
          // { from: "b1", to: "b1-3" },
          // { from: "b1", to: "b1-4" },
          // { from: "b1", to: "b1-5" },
          // { from: "b1", to: "b1-6" },
          // { from: "b", to: "b2" },
          // { from: "b2", to: "b2-1" },
          // { from: "b2", to: "b2-2" },
          // { from: "b2", to: "b2-3" },
          // { from: "b2", to: "b2-4" },
          // { from: "b", to: "b3" },
          // { from: "b3", to: "b3-1" },
          // { from: "b3", to: "b3-2" },
          // { from: "b3", to: "b3-3" },
          // { from: "b3", to: "b3-4" },
          // { from: "b3", to: "b3-5" },
          // { from: "b3", to: "b3-6" },
          // { from: "b3", to: "b3-7" },
        ],
      };
      for(let i = 0; i < this.relationList.length; i++) {
        if(i === 0) {
          __graph_json_data.rootId = this.relationList[i].id
        }
        __graph_json_data.nodes.push({
          id: this.relationList[i].id,
          text: this.relationList[i].display_name
        })
        if(i !== 0) {
            __graph_json_data.lines.push({
            from: this.relationList[0].id,
            to: this.relationList[i].id
          })
        }
      }
      this.$refs.graphRef.setJsonData(__graph_json_data, (graphInstance) => {
        // 这些写上当图谱初始化完成后需要执行的代码
        graphInstance.setZoom(30)
      });
    },
    onNodeClick(nodeObject, $event) {
      console.log("onNodeClick:", nodeObject)
      var startIndex = nodeObject.id.indexOf('org/')
      var id = nodeObject.id.substring(startIndex + 4)
      console.log("ID:", id)
      this.$router.push({ path: `/scholar_portal/${id}` })
    },
    onLineClick(lineObject, linkObject, $event) {
      console.log("onLineClick:", lineObject)
    },
  },
};
</script>
  
<style>
.my-graph {
  background: transparent !important;
}
</style>
