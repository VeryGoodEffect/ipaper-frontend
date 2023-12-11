<template>
    <div class="mainArea">
      <div class="condArea">
        Filter Criteria
      </div>
      <div class="middleArea">
        <div class="searchBar">
          <input type="text" class="basic-input search-input" />
          <button class="basic-btn search-btn">
          <svg t="1699356103686" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4162" width="200" height="200"><path d="M945.066667 898.133333l-189.866667-189.866666c55.466667-64 87.466667-149.333333 87.466667-241.066667 0-204.8-168.533333-373.333333-373.333334-373.333333S96 264.533333 96 469.333333 264.533333 842.666667 469.333333 842.666667c91.733333 0 174.933333-34.133333 241.066667-87.466667l189.866667 189.866667c6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333c8.533333-12.8 8.533333-34.133333-2.133333-46.933334zM469.333333 778.666667C298.666667 778.666667 160 640 160 469.333333S298.666667 160 469.333333 160 778.666667 298.666667 778.666667 469.333333 640 778.666667 469.333333 778.666667z"  p-id="4163" fill="#fff"></path></svg>
        </button>
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
            excerpt: "低碳经济(Low-carbon Economy)是未来经济发展方式的新选择.本文从大时空跨度和能源利用方conomy)是未来经济发展方式的新选择.本文从大时空跨度和能源利conomy)是未来经济发展方式的新选择.本文从大时空跨度和能源利conomy)是未来经济发展方式的新选择.本文从大时空跨度和能源利conomy)是未来经济发展方式的新选择.本文从大时空跨度和能源利conomy)是未来经济发展方式的新选择.本文从大时空跨度和能源利conomy)是未来经济发展方式的新选择.本文从大时空跨度和能源利式上,分析了人类经济发展形态演变历程;探讨了低碳经济… 了低碳经济产生与发展.本文研究了低碳",
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
  /* border: 2px solid red; */
  height: 60px;
  /* width: 500px; */
  margin-top: 30px;
  margin-left: 30px;

  display: flex;
  /* justify-content: center; */
  align-items: center;
  font-size: 30px;
}

.search-input {
  max-width: 640px;
  width: 80%;
  border-color: var(--theme-mode-contrast);
  border-width: 2px;
}

.search-btn {
  width: 50px;
  height: 50px;
  margin: 0;
  margin-left: 10px;
}

.search-btn svg {
  width: 30px;
  height: 30px;
  margin: auto;
}

.pagination {
  margin-top: 30px;
  margin-left: 30px;
}
  </style>