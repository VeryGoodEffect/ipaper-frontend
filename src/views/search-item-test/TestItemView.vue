<template>
    <search_item :jsonData="info"></search_item>
    <div>
    </div>
</template>
  
  <script>
  import search_item from '../../components/search-result-list/search-result-list-item.vue';
  export default {
    components: {
        search_item
    },
    data() {
      return {
        info: {
            title: "低碳经济: 人类经济发展方式的新变革",
            author: "鲍健强， 苗阳， 陈锋 - 中国工业经济, 2008 - cqvip.com",
            excerpt: "低碳经济(Low-carbon Economy)是未来经济发展方式的新选择.本文从大时空跨度和能源利用方式上,分析了人类经济发展形态演变历程;探讨了低碳经济… 了低碳经济产生与发展.本文研究了低碳",
            time_cited: 537,
        }
      }
    },
    mounted() {
    }
  }
  </script>
  
  <style scoped>

  </style>