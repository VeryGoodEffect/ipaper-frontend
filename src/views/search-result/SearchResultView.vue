<template>
  <div class="main-area">
    <div
      v-show="this.search_type == 1"
      class="cond-area"
      style="display: vertical; position: sticky; top: 0"
    >
      <div
        class="filter-card"
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
          <li>按时间筛选</li>
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

      <div class="filter-card" style="display: vertical; text-align: center">
        <ul>
          <li>日期排序</li>
          <li @click="sortByTime(1)" style="cursor: pointer">升序排序</li>
          <li @click="sortByTime(2)" style="cursor: pointer">降序排序</li>
        </ul>
      </div>

      <div class="filter-card" style="display: vertical; text-align: center">
        <ul>
          <li @click="setLanguage(1)" style="cursor: pointer">不限语言</li>
          <li @click="setLanguage(2)" style="cursor: pointer">中文网页</li>
          <li @click="setLanguage(3)" style="cursor: pointer">英文网页</li>
          <!-- <li>时间不限</li> -->
        </ul>
      </div>

      <div class="filter-card" style="display: vertical; text-align: center">
        <ul>
          <li  v-for="(option, index) in options" :key="index"><input type="radio" :value="option.value" v-model="selectedOption" />
          <label>{{ option.text }}</label></li>
        </ul>
      </div>

      <div class="filter-card" style="display: vertical; text-align: center">
        <ul>
          <li style="cursor: pointer"><input type="checkbox" />包含专利</li>
          <li style="cursor: pointer"><input type="checkbox" />包含引用</li>
          <li style="cursor: pointer">时间不限</li>
        </ul>
      </div>
      <!-- <hr> -->
    </div>

    <!-- auth -->
    <div
      v-show="this.search_type == 2"
      class="cond-area"
      style="display: vertical; position: sticky; top: 0"
    ></div>

    <!-- source -->
    <div
      v-show="this.search_type == 3"
      class="cond-area"
      style="display: vertical; position: sticky; top: 0"
    ></div>

    <!-- intst -->
    <div
      v-show="this.search_type == 4"
      class="cond-area"
      style="display: vertical; position: sticky; top: 0"
    ></div>

    <div style="min-width: 50%">
      <div class="search-container">
        <SearchPanel @senddata="handleModoleSearch"></SearchPanel>
      </div>
      <div>
        <ul>
          <li v-for="(item, index) in autoCompleteLists" :key="index">
            {{ item.display_name }}
          </li>
        </ul>
      </div>
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
          :journalListItemInfo="info"
        >
          <!-- journalListItemInfo -->
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
    <ChatGPT style="display: vertical; position: sticky; top: 60px"></ChatGPT>
  </div>
</template>
  
  <script>
import SearchResultListItem from "../../components/search-result-list/SearchResultListItem.vue";
import Pagination from "../../components/pagination/Pagination.vue";
import i18n from "../../language";
import { Search } from "../../api/search.js";
import { AutoComplete } from "../../api/autocomplete.js";
// import AsideBar from "../../components/search-property/AsideBar.vue";
import InstitutionListItem from "../../components/list-item/InstitutionListItem.vue";
import JournalListItem from "../../components/list-item/JournalListItem.vue";
import ScholarListItem from "../../components/list-item/ScholarListItem.vue";
// import SearchModelVue
import SearchPanel from "../search/SearchPanel.vue";
import ChatGPT from "../../components/chat/Chat.vue";
export default {
  name: "SearchResultView",
  components: {
    SearchResultListItem,
    Pagination,
    i18n,
    InstitutionListItem,
    JournalListItem,
    ScholarListItem,
    Search,
    ChatGPT,
    SearchPanel,
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

      autoCompleteLists: [],
      // work type
      options: [
        { text: "Article", value: "article" },
        { text: "Book", value: "book" },
        { text: "Letter", value: "letter" },
      ],
      selectedOption: null,
    };
  },
  watch: {
    search(newValue, oldValue) {
      if (newValue.length == 0 || newValue == this.searchdata.search) {
        this.autoCompleteLists = [];
      } else {
        this.autoComplete();
      }
    },
  },
  methods: {
    // #region resultlistToInfoItems
    resultlistToInfoItems() {
      // works
      if (this.search_type == 1) {
        this.infoItems = this.resultlist.map((item) => {
          // console.log(item.authorships[0].author.display_name);
          // console.log(item.abstract);
          return item;
        });
      }
      // author
      else if (this.search_type == 2) {
        this.infoItems = this.resultlist.map((item) => {
          return item;
        });
      }
      // qikan
      else if (this.search_type == 3) {
        this.infoItems = this.resultlist.map((item) => {
          return item;
        });
      }
      // jigou
      else if (this.search_type == 4) {
        this.infoItems = this.resultlist.map((item) => {
          return item;
        });
      }
    },

    // #region AsideBar
    showAsideBar() {
      this.show_property_search = !this.show_property_search;
    },

    setSearchType(type) {
      if (type == 0) {
        // display_name.search:
        // this.search_filter = "display_name.search:"
        this.search_filter = "";
        this.search_type = 1;
      } else if (type == 1) {
        alert("abstract.search:");
        this.search_filter = "abstract.search:";
        this.search_type = 1;
      } else if (type == 2) {
        alert("fulltext.search:");
        this.search_filter = "fulltext.search:";
        this.search_type = 1;
      } else if (type == 3) {
        alert("display_name.search:");
        this.search_filter = "display_name.search:";
        this.search_type = 1;
      }
      // Author search
      else if (type == 4) {
        alert("search author");
        this.search_type = 2;
      }

      // 期刊
      else if (type == 5) {
        this.search_type = 3;
      }
      // 机构
      else if (type == 6) {
        this.search_type = 4;
      }
    },

    setWorkType() {
      if (this.selectedOption != null) {
        console.log(this.selectedOption);
      }
    },
    // #endregion

    //! 在我重新筛选或者搜索的时候都算是搜索
    setFilterTime(type) {
      if (type == 1) {
        this.filter = "";
      } else if (type == 2) {
        // 2023

        this.filter = "publication_year:2023-,";
      } else if (type == 3) {
        // 2022
        this.filter = "publication_year:2022-,";
      } else if (type == 4) {
        this.filter = "publication_year:2021-,";
      } else if (type == 5) {
        this.filter =
          "publication_year:" +
          this.search_start_time +
          "-" +
          this.search_end_time +
          ",";
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

    advsearch(data) {
      alert("data sent to advsearch");
      // queryParts = [];

      //!暂时先置空吧
      this.search_filter = "";

      /**
       * author: this.author,
        publication: this.publication,
        start_time: this.start_time,
        end_time: this.end_time,
        keyword: this.keyword,
        is_key_title: this.is_key_title
       */
      if (data.author) {
        this.filter += `author.search:${encodeURIComponent(data.author)},`;
      }
      if (data.publication) {
        this.search_filter += `source.search:${encodeURIComponent(
          data.publication
        )},`;
      }
      if (data.start_time && data.end_time) {
        this.filter += `publication_year:${data.start_time}-${data.end_time},`;
      }
      if (data.keyword) {
        const field = data.is_key_title ? "title.search" : "abstract.search";
        this.filter += `${field}:${encodeURIComponent(data.keyword)},`;
      }

      console.log(this.filter);
      this.searchmethod();

      /***
       * 
       *       author: "",
      publication: "",
      start_time: "",
      end_time: "",
      keyword: "",
      is_key_title: true
       */
    },

    /***
     * display_name
        cited_by_count
        works_count
        publication_date
        relevance_score (only exists if there's a search filter active)
     */

    sortByTime(type) {
      // 早
      if (type == 1) {
        if (
          alert(this.sort+1),
          this.sort.includes("publication_date:") ||
          this.sort.includes("publication_date:desc")
        ) {
          this.sort = this.sort.replace(
            /publication_date(:desc)?,/,
            "publication_date:"
          );
        } else {
          this.sort += "publication_date:";
        }
      }
      // 晚
      else if (type == 2) {
        if (
          alert(this.sort+2),
          this.sort.includes("publication_date:") ||
          this.sort.includes("publication_date:desc")
        ) {
          this.sort = this.sort.replace(
            /publication_date(:desc)?,/,
            "publication_date:desc"
          );
        } else {
          this.sort += "publication_date:desc";
        }
      }
      alert(this.sort),
      this.searchmethod();
    },

    sortByCite(type) {
      if (type == 1) {
      } else if (type == 2) {
      }
    },

    handleModoleSearch(searchdata) {
      alert("data send to here");
      console.log(searchdata);
      this.searchdata = searchdata;
      this.search = searchdata.search;
      this.sort = searchdata.sort;
      this.perpage = searchdata.perpage;
      this.cursor = searchdata.cursor;
      this.search_type = searchdata.search_type;
      // this.search_type = searchdata.search_type;
      if (this.searchdata && "search_type" in this.searchdata) {
        delete this.searchdata["search_type"];
      }

      console.log(searchdata);

      this.searchmethod();
    },
    // 真正做搜索后端
    searchmethod() {
      this.searchdata.filter = this.filter.replace(/,$/, "");
      this.searchdata.search = this.search;
      this.searchdata.sort = this.sort;
      this.searchdata.perpage = this.perpage;
      this.searchdata.cursor = this.cursor;
      this.searchdata.page = this.page;
      console.log(JSON.parse(JSON.stringify(this.searchdata)));
      JSON.parse(JSON.stringify(this.searchdata));

      // #region search
      if (this.search_type == 1) {
        Search.searchWorks(this.searchdata).then(
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
        Search.searchAuthor(this.searchdata).then(
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
        Search.searchSources(this.searchdata).then(
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
        Search.searchInstitutions(this.searchdata).then(
          (res) => {
            console.log(res.data.results);
            this.resultlist = res.data.results;
            this.resultlistToInfoItems();
          },
          (err) => {}
        );
      }
    },
    autoComplete() {
      let data = {
        q: this.search,
      };
      console.log(data);
      if (this.search_type == 1) {
        AutoComplete.getAutoWorks(data).then((response) => {
          this.autoCompleteLists = response.data.results;
        });
      } else if (this.search_type == 2) {
        AutoComplete.getAutoAuthor(data).then((response) => {
          this.autoCompleteLists = response.data.results;
        });
      } else if (this.search_type == 3) {
        AutoComplete.getAutoConcepts(data).then((response) => {
          this.autoCompleteLists = response.data.results;
        });
      } else if (this.search_type == 4) {
        AutoComplete.getAutoInstitutions(data).then((response) => {
          this.autoCompleteLists = response.data.results;
        });
      }
    },

    // search
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

    console.log(searchdata);

    searchdata.filter = searchdata.filter.replace(/,$/, "");
    this.searchmethod();
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
  /* height: 600px; */
  margin-top: 30px;
  margin-left: 30px;

  /* display: flex; */
  justify-content: center;
  align-items: center;
  font-size: 30px;
}
.cond-area .filter-card {
  border: 2px solid red;

  margin-top: 10%;
}

.cond-area .filter-card li {
  padding: 10px 15px;
  border-bottom: 1px solid #ddd; /* 条目之间的分隔线 */
  cursor: pointer;
  display: flex;
  align-items: center;
  font-family: Arial, sans-serif;
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

.search-container {
  padding: 10px;
  width: 100%;
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