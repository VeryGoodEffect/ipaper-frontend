<template>
    <div class="navBar">
      navBar
    </div>
    <div class="mainArea">
      <div class="condArea">
        Filter Criteria
      </div>
      <div class="middleArea">
        <div class="searchBar">
          searchBar
        </div>
        <Pagination class="pagination">
          <SearchResultListItem :infoItem="infoItem"></SearchResultListItem>
          <SearchResultListItem :infoItem="infoItem"></SearchResultListItem>
          <SearchResultListItem :infoItem="infoItem"></SearchResultListItem>
          <SearchResultListItem :infoItem="infoItem"></SearchResultListItem>
          <SearchResultListItem :infoItem="infoItem"></SearchResultListItem>
          <SearchResultListItem :infoItem="infoItem"></SearchResultListItem>
        </Pagination>
      </div>
    </div>
    
</template>
  
  <script>
  import SearchResultListItem from '../../components/search-result-list/SearchResultListItem.vue'
  import Pagination from '../../components/pagination/Pagination.vue'
  export default {
    name: 'SearchResultView',
    components: {
        SearchResultListItem,
        Pagination
    },
    data() {
      return { 
        infoItem: {
            title: "低碳经济: 人类经济发展方式的新变革",
            author: "鲍健强， 苗阳， 陈锋 - 中国工业经济, 2008 - cqvip.com",
            excerpt: "低碳经济(Low-carbon Economy)是未来经济发展方式的新选择.本文从大时空跨度和能源利用方式上,分析了人类经济发展形态演变历程;探讨了低碳经济… 了低碳经济产生与发展.本文研究了低碳",
            timeCited: 57,
            keyword: "经济"
        }
      }
    },
    mounted() {
    }
  }
  </script>
  
<style scoped>
* {
  box-sizing: border-box;
  max-width: 100%;
  overflow: hidden;
}

.navBar {
  height: 80px;
  border: 2px solid red;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
}
.mainArea {
  border: 2px solid blue;
  display: flex;
}
.condArea {
  border: 2px solid red;
  width: 300px;
  height: 600px;
  margin-top: 30px;
  margin-left: 30px;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
}
.searchBar {
  border: 2px solid red;
  height: 60px;
  width: 500px;
  margin-top: 30px;
  margin-left: 30px;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
}
.pagination {
  margin-top: 30px;
  margin-left: 30px;
}
  </style>