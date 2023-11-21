<template>
    <div class="navBar">
      navBar
    </div>
    <!-- <searchItem :infoItem="infoItem"></searchItem> -->
    <div class="mainArea">
      <div class="condArea">
        Filter Criteria
      </div>
      <div class="middleArea">
        <div class="searchBar">
          searchBar
        </div>
        <pagination class="pagination">
          <searchItem :infoItem="infoItem"></searchItem>
          <searchItem :infoItem="infoItem"></searchItem>
          <searchItem :infoItem="infoItem"></searchItem>
          <searchItem :infoItem="infoItem"></searchItem>
          <searchItem :infoItem="infoItem"></searchItem>
          <searchItem :infoItem="infoItem"></searchItem>
        </pagination>
      </div>
    </div>
    
</template>
  
  <script>
  import searchItem from '../../components/searchResultList/searchResultListItem.vue';
  import pagination from '../../components/pagination/Pagination.vue';
  export default {
    components: {
        searchItem,
        pagination
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