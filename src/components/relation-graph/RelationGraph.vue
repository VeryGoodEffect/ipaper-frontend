<template>
  <div>
    <div style="height: 60vh" class="my-graph">
      <RelationGraph ref="graphRef" :options="graphOptions" :on-node-click="onNodeClick"
        :on-line-click="onLineClick" />
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
        defaultJunctionPoint: "border",
        backgroundColor: 'transparent',
        defaultLineWidth: 3,
        defaultLineShape: 5,
        defaultNodeColor: 'var(--theme-mode)',
        defaultNodeBorderWidth: 2,
        defaultNodeBorderColor: 'var(--theme-color)',
        defaultFocusRootNode: false,
        defaultNodeFontColor: "var(--default-text-color)",
        checkedLineColor: "var(--theme-color)",
        checkedNodeColor: "var(--theme-color)",
        // disableZoom: true,
        layout: {
          layoutName: 'force',
          from: 'left',
          maxLayoutTimes: 500,
          force_node_repulsion: 1, // 全局设置，节点之间的斥力系数，默认为1，建议合理的取值范围:0.1 -- 10
          force_line_elastic: 1 // 全局设置，线条的牵引系数，默认为1, 建议合理的取值范围:0.1 -- 10
        }
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
        nodes: [],
        lines: [],
      };
      for (let i = 0; i < this.relationList.length && i <= 20; i++) {
        if (i === 0) {
          __graph_json_data.rootId = this.relationList[i].id
        }
        __graph_json_data.nodes.push({
          id: this.relationList[i].id,
          text: this.relationList[i].display_name
        })
        if (i !== 0) {
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
  
<style scoped>
.my-graph {
  background: transparent !important;
  border: var(--theme-color) 5px solid;
  border-radius: 10px;
  margin: 3% auto;
}

:deep(.relation-graph .rel-map) {
  cursor: grab !important;
}


:deep(.rel-node-shape-0.rel-node-type-node.rel-node) {
  cursor: pointer !important;
  overflow: hidden !important;
  transition: all ease-in-out 0.2s;
}

:deep(.rel-node:hover) {
  background: var(--theme-color) !important;
    box-shadow: 0 0 0 8px var(--theme-color-50) !important;
}

:deep(.rel-node .c-node-text span) {
  transition: all ease-in-out 0.2s;
}

:deep(.rel-node:hover .c-node-text span) {
  color: var(--theme-mode) !important;
}

:deep(.c-rg-line-checked-bg) {
  stroke: var(--theme-color-50) !important;
}

:deep(.relation-graph .rel-node-checked) {
  box-shadow: 0 0 0 8px var(--theme-color-50);
}
</style>
