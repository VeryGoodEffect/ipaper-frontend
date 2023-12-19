<template>
  <div class="institution-area">
    <div class="area">
      <div>
        <span class="name">机构名称</span>
        <span class="country">中国</span>
      </div>
      <div class="author-list">
          机构主要作者
          <div v-for="(author, idx) in authors" :key="idx" @click="gotoAuthor(author)">
            {{ author.name }}
            ({{ author.works_count }})
            <span v-for="(tag, idx) in author.tags" :key="idx" class="author-tag-item" @click="gotoTag(tag)">
              {{ tag }}
            </span>
          </div>
      </div>
      <div >
        <div class="tags">
        机构重点领域
        </div>
        <div>
          <span v-for="(tag, idx) in tags" :key="idx" class="tag-item" @click="gotoTag(tag)">
            {{ tag }}
          </span>
        </div>
      </div>
      <div class="papers">
        机构文献
        <SearchResultListItem v-for="(info,index) in infoItems" :key="index" :infoItem="info"></SearchResultListItem>
      </div>
      <div>
        引用情况（考虑图表？）
      </div>
      <div>
        相关机构
      </div>
      <div>
        官网链接
      </div>
    </div>
  </div>
</template>
<script>
import SearchResultListItem from '../../components/search-result-list/SearchResultListItem.vue'
export default {
  components: { 
    SearchResultListItem
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
      tags: [
        "农业", "医学", "软件工程"
      ],
      authors: [
        {
          id: 1,
          name: '吕云翔',
          works_count: '10',
          tags: ["软件工程", "科学"]
        },
        {
          id: 2,
          name: '小明',
          works_count: '20',
          tags: ["软件工程", "科学", "7777"]
        },
        {
          id: 3,
          name: 'aaaa',
          works_count: '100',
          tags: ["科学", "7777"]
        }
      ]
    }
  },
  methods: {
    gotoTag(tag) {
    //路由跳转到领域详情页 
    },
    gotoAuthor(author) {
      //路由跳转到学者详情页
    }
  }
}
</script>
<style scoped>
.institution-area {
  display: flex;
  justify-content: center;
}
.area {
  width: 70%;
}
.name {
  font-size: 35px;
}
.country {
  margin-left: 10px;
}
.author-list {
  font-size: 25px;
}
.tags {
  font-size: 25px;
}
.tag-item {
  margin: 0 5px 0 0;
}
.papers {
  font-size: 25px;
}
.author-tag-item {
  font-size: 16px;
  margin: 0 5px;
}
</style>
