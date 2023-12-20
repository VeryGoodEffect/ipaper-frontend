<template>
  <div>
    领域名称
  </div>
  <div>
    维基百科
  </div>
  <div>
    领域热点文献
    <SearchResultListItem v-for="(info,index) in infoItems" :key="index" :infoItem="info"></SearchResultListItem>
  </div>
  <div>
    机构
  </div>
  <div>
    领域学者
    <div v-for="(author, idx) in authors" :key="idx" @click="gotoAuthor(author)">
      {{ author.name }}
      ({{ author.works_count }})
      </div>
  </div>
</template>

<script>
import SearchResultListItem from '../../components/search-result-list/SearchResultListItem.vue'
export default {
  components: {
    SearchResultListItem,
  },
  data() {
    return {
    resultlist: null,
    infoItems: [
      {
      title: "低碳经济: 人类经济发展方式的新变革",
      author: "鲍健强， 苗阳， 陈锋 - 中国工业经济, 2008 - cqvip.com",
      excerpt: "低碳经济(Low-carbon Economy)是未来经济发展方式的新选择.本文从大时空跨度和能源利用方conomy)是未来经济发展方式的新选择.本文从大时空跨度和能源利conomy)是未来经济发展方式的新选择.本文从大时空跨度和能源利conomy)是未来经济发展方式的新选择.本文从大时空跨度和能源利conomy)是未来经济发展方式的新选择.本文从大时空跨度和能源利conomy)是未来经济发展方式的新选择.本文从大时空跨度和能源利conomy)是未来经济发展方式的新选择.本文从大时空跨度和能源利式上,分析了人类经济发展形态演变历程;探讨了低碳经济… 了低碳经济产生与发展.本文研究了低碳",
      timeCited: 57,
      keyword: "经济"
      }
    ],
    authors: [
        {
          id: 1,
          name: '吕云翔',
          works_count: '10'
        },
        {
          id: 2,
          name: '小明',
          works_count: '20'
        },
        {
          id: 3,
          name: 'aaaa',
          works_count: '100'
        }
      ]
    }
  }
}
</script>
<style scoped>

</style>
