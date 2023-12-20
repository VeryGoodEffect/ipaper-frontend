<template>
  <div class="main-area">
    <div class="cond-area" style="display: vertical; position: sticky; top: 0">
      <div
        class="cond-in-1"
        style="
          display: vertical;
          margin-left: auto;
          margin-right: auto;
          margin-top: 10%;
          margin-bottom: 10%;
          text-align: center;
        "
      >
        <ul>
          <li @click="setFilterTime(1)" style="cursor: pointer">时间不限</li>
          <li @click="setFilterTime(2)" style="cursor: pointer">2023以来</li>
          <li @click="setFilterTime(3)" style="cursor: pointer">2022以来</li>
          <li @click="setFilterTime(4)" style="cursor: pointer">2021以来</li>
          <li @click="setFilterTime(5)" style="cursor: pointer">自定义范围</li>
          <li v-if="show_range" @click="setFilterTime(5)">
            <input v-model="search_start_time" type="text" style="width: 30%" />
            <input v-model="search_end_time" type="text" style="width: 30%" />
          </li>
        </ul>
      </div>
      <hr />
      <div
        class="cond-in-2"
        style="
          display: vertical;
          margin-left: auto;
          margin-right: auto;
          margin-top: 10%;
          margin-bottom: 10%;
          text-align: center;
        "
      >
        <ul>
          <li style="cursor: pointer">相关性排序</li>
          <li style="cursor: pointer">日期排序</li>
        </ul>
      </div>
      <hr />
      <div
        class="cond-in-3"
        style="
          display: vertical;
          margin-left: auto;
          margin-right: auto;
          margin-top: 10%;
          margin-bottom: 10%;
          text-align: center;
        "
      >
        <ul>
          <li @click="setLanguage(1)" style="cursor: pointer">不限语言</li>
          <li @click="setLanguage(2)" style="cursor: pointer">中文网页</li>
          <li @click="setLanguage(3)" style="cursor: pointer">英文网页</li>
          <!-- <li>时间不限</li> -->
        </ul>
      </div>

      <hr />
      <div
        class="cond-in-4"
        style="
          display: vertical;
          margin-left: auto;
          margin-right: auto;
          margin-top: 10%;
          margin-bottom: 10%;
          text-align: center;
        "
      >
        <ul>
          <li style="cursor: pointer">类型不限</li>
          <li style="cursor: pointer">时间不限</li>
          <li style="cursor: pointer">时间不限</li>
        </ul>
      </div>
      <hr />
      <div
        class="cond-in-5"
        style="
          display: vertical;
          margin-left: auto;
          margin-right: auto;
          margin-top: 10%;
          margin-bottom: 10%;
          text-align: center;
        "
      >
        <ul>
          <li style="cursor: pointer"><input type="checkbox" />包含专利</li>
          <li style="cursor: pointer"><input type="checkbox" />包含引用</li>
          <li style="cursor: pointer">时间不限</li>
        </ul>
      </div>
      <!-- <hr> -->
    </div>
    <div>
      <div class="search-bar">
        <input v-model="search" type="text" class="basic-input search-input" />
        <button @click="searchmethod" class="basic-btn search-btn">
          <svg
            t="1699356103686"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4162"
            width="200"
            height="200"
          >
            <path
              d="M945.066667 898.133333l-189.866667-189.866666c55.466667-64 87.466667-149.333333 87.466667-241.066667 0-204.8-168.533333-373.333333-373.333334-373.333333S96 264.533333 96 469.333333 264.533333 842.666667 469.333333 842.666667c91.733333 0 174.933333-34.133333 241.066667-87.466667l189.866667 189.866667c6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333c8.533333-12.8 8.533333-34.133333-2.133333-46.933334zM469.333333 778.666667C298.666667 778.666667 160 640 160 469.333333S298.666667 160 469.333333 160 778.666667 298.666667 778.666667 469.333333 640 778.666667 469.333333 778.666667z"
              p-id="4163"
              fill="#fff"
            ></path>
          </svg>
        </button>
      </div>
      <!-- works -->
      <Pagination
        v-if="search_type == 1"
        class="pagination"
        :defaultItemsPerPage="5"
      >
        <SearchResultListItem
          v-for="(info, index) in infoItems"
          :key="index"
          :infoItem="info"
        ></SearchResultListItem>
      </Pagination>
      <!-- author -->
      <Pagination
        v-if="search_type == 2"
        class="pagination"
        :defaultItemsPerPage="5"
      >
        <scholar-list-item
          v-for="(info, index) in infoItems"
          :key="index"
          :scholarInfo="info"
        >
        </scholar-list-item>
      </Pagination>
      <!-- 期刊 -->
      <Pagination
        v-if="search_type == 3"
        class="pagination"
        :defaultItemsPerPage="5"
      >
        <journal-list-item
          v-for="(info, index) in infoItems"
          :key="index"
          :JounalListItemInfo="info"
        >
        </journal-list-item>
      </Pagination>
      <!-- 机构 -->
      <Pagination
        v-if="search_type == 4"
        class="pagination"
        :defaultItemsPerPage="5"
      >
        <institution-list-item
          v-for="(info, index) in infoItems"
          :key="index"
          :institutionInfo="info"
        >
        </institution-list-item>
      </Pagination>
    </div>
  </div>
</template>
  
  <script>
import SearchResultListItem from "../../components/search-result-list/SearchResultListItem.vue";
// import InstitutionListItem from "../../components/list-item/InstitutionListItem.vue";
// import JournalListItemVue from "../../components/list-item/JournalListItem.vue";
// import ScholarListItemVue from "../../components/list-item/ScholarListItem.vue";
import Pagination from "../../components/pagination/Pagination.vue";
import i18n from "../../language";
import { Search } from "../../api/search.js";
// import JournalListItemVue from "../../components/list-item/JournalListItem.vue";
// import ScholarListItemVue from "../../components/list-item/ScholarListItem.vue";
import InstitutionListItem from "../../components/list-item/InstitutionListItem.vue";
import JournalListItem from "../../components/list-item/JournalListItem.vue";
import ScholarListItem from "../../components/list-item/ScholarListItem.vue";
export default {
  name: "SearchResultView",
  components: {
    SearchResultListItem, 
    Pagination,
    i18n,
    InstitutionListItem,
    JournalListItem,
    ScholarListItem,
  },
  data() {
    return {
      resultlist: null,
      infoItems: [],
      infoItem: {
        title: "低碳经济: 人类经济发展方式的新变革",
        author: "鲍健强， 苗阳， 陈锋 - 中国工业经济, 2008 - cqvip.com",
        excerpt: "0",
        timeCited: 57,
        keyword: "经济",
        publicationYear: 2008,
        journalName: "中国工业经济",
        abstract:
          "This work discusses the new changes in human economic development towards a low carbon economy...",
        url: "https://example.com/link-to-work",
      },
      searchdata: null,

      // search
      filter: "",
      search: "",
      sort: "cited_by_count:desc",
      perpage: "10",
      page: "1",
      cursor: "",

      search_start_time: 2020,
      search_end_time: 2022,
      show_range: true,

      search_type: 0,
    };
  },
  methods: {
    resultlistToInfoItems() {
      // works
      if (this.search_type == 1) {
        this.infoItems = this.resultlist.map((item) => {
          // console.log(item.authorships[0].author.display_name);
          // console.log(item.abstract);
          return {
            // title: item,s
            title: item.title,
            author:
              item.authorships[0] != null
                ? item.authorships[0].author.display_name
                : "unkown",
            // author: "author",
            excerpt: "0",
            timeCited: item.cited_by_count,
            keyword: "经济",
            related_times: item.related_works_count,
            publicationYear: item.publication_year,
            journalName: item.host_venue
              ? item.host_venue.display_name
              : "unknown",
            abstract: item.abstract,
            url: item.url,
            language: item.language,
          };
        });
      }
      // author
      else if (this.search_type == 2) {
        this.infoItems = this.resultlist.map((item) => {
          return {
            title: item.display_name,
            profile: item.works_api_url,
          };
        });
      }
      // qikan
      else if (this.search_type == 3) {
        this.infoItems = this.resultlist.map((item) => {
          return {
            title: item.display_name_zh,
            profile: item.homepage_url,
          };
        });
      }
      // jigou
      else if (this.search_type == 4) {
        this.infoItems = this.resultlist.map((item) => {
          return {
            title: item.display_name,
            profile: item.homepage_url,
          };
        });
      }
    },
    //! 在我重新筛选或者搜索的时候都算是搜索
    setFilterTime(type) {
      if (type == 1) {
        // this.filter = "publication_year:2023-"
      } else if (type == 2) {
        // 2023
        this.filter = "publication_year:2023-";
      } else if (type == 3) {
        // 2022
        this.filter = "publication_year:2022-";
      } else if (type == 4) {
        this.filter = "publication_year:2021-";
      } else if (type == 5) {
        this.filter =
          "publication_year:" +
          this.search_start_time +
          "-" +
          this.search_end_time;
      }
      this.searchdata.filter = this.filter;
      console.log(JSON.parse(JSON.stringify(this.searchdata)));
      JSON.parse(JSON.stringify(this.searchdata));
      Search.searchWorks(JSON.parse(JSON.stringify(this.searchdata))).then(
        (res) => {
          console.log(res.data.results);
          this.resultlist = res.data.results;
          this.resultlistToInfoItems();
        },
        (err) => {}
      );
    },

    setLanguage(type) {
      if (type == 1) {
        this.filter = "";
      } else if (type == 2) {
        this.filter = "language:zh-cn";
      } else if (type == 3) {
        this.filter = "language:en";
      }

      this.searchdata.filter = this.filter;
      console.log(JSON.parse(JSON.stringify(this.searchdata)));
      JSON.parse(JSON.stringify(this.searchdata));
      Search.searchWorks(JSON.parse(JSON.stringify(this.searchdata))).then(
        (res) => {
          console.log(res.data.results);
          this.resultlist = res.data.results;
          this.resultlistToInfoItems();
        },
        (err) => {}
      );
    },

    /***
       * 
       *    filter : this.search_filter,
            search : this.search_search,
            sort : this.search_sort,
            per_page : this.search_perpage,
            page : this.search_page,
            cursor : ""
       */
    searchmethod() {
      this.searchdata.filter = this.filter;
      this.searchdata.search = this.search;
      this.searchdata.sort = this.sort;
      this.searchdata.perpage = this.perpage;
      this.searchdata.cursor = this.cursor;
      this.searchdata.page = this.page;
      console.log(JSON.parse(JSON.stringify(this.searchdata)));
      JSON.parse(JSON.stringify(this.searchdata));

      Search.searchWorks(JSON.parse(JSON.stringify(this.searchdata))).then(
        (res) => {
          console.log(res.data.results);
          this.resultlist = res.data.results;
          this.resultlistToInfoItems();
        },
        (err) => {}
      );
    },
  },

  mounted() {
    const searchdata = this.$route.query;
    this.searchdata = searchdata;
    this.search = searchdata.search;
    this.sort = searchdata.sort;
    this.perpage = searchdata.perpage;
    this.cursor = searchdata.cursor;

    this.search_type = searchdata.search_type;

    if (this.searchdata && "search_type" in this.searchdata) {
      delete this.searchdata["search_type"];
    }
    // console.log(this.$route)
    alert(this.search_type);
    /**
     * 
     * filter : this.search_filter,
            search : this.search_search,
            sort : this.search_sort,
            per_page : this.search_perpage,
            page : this.search_page,
            cursor : ""
     */
    console.log(searchdata);

    // #region search
    if (this.search_type == 1) {
      Search.searchWorks(searchdata).then(
        (res) => {
          console.log(res.data.results);
          this.resultlist = res.data.results;
          this.resultlistToInfoItems();
        },
        (err) => {}
      );
    }
    // author
    else if (this.search_type == 2) {
      Search.searchAuthor(searchdata).then(
        (res) => {
          console.log(res.data.results);
          this.resultlist = res.data.results;
          this.resultlistToInfoItems();
        },
        (err) => {}
      );
    }
    // 期刊
    else if (this.search_type == 3) {
      Search.searchConcepts(searchdata).then(
        (res) => {
          console.log(res.data.results);
          this.resultlist = res.data.results;
          this.resultlistToInfoItems();
        },
        (err) => {}
      );
    }
    // 机构
    else if (this.search_type == 4) {
      Search.searchInstitutions(searchdata).then(
        (res) => {
          console.log(res.data.results);
          this.resultlist = res.data.results;
          this.resultlistToInfoItems();
        },
        (err) => {}
      );
    }
    // #endregion
    // works
  },
};
</script>
  
<style scoped>
* {
  box-sizing: border-box;
  max-width: 100%;
  /* overflow: hidden; */
}
.main-area {
  /* border: 2px solid blue; */
  display: flex;
}
.cond-area {
  border: 2px solid red;
  width: 300px;
  height: 600px;
  margin-top: 30px;
  margin-left: 30px;

  /* display: flex; */
  justify-content: center;
  align-items: center;
  font-size: 30px;
}
.search-bar {
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

@media screen and (max-width: 1000px) {
  .main-area {
    display: block;
  }
  .cond-area {
    width: 90%;
    height: unset;
    min-height: 300px;
  }
}
</style>