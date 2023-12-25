<template>
  <div class="main-area">
    <div class="cond-area" style="display: vertical;">
      <h3 class="filter-switch" :class="{ 'filter-switch-active': show_filte }" @click="show_filte = !show_filte">
        {{ $t('filter') }}

      </h3>
      <div v-show="show_filte">
        <div class="filter-card" style="
            display: vertical;
            margin-left: auto;
            margin-right: auto;
            margin-top: 10%;
            margin-bottom: 10%;
            text-align: center;
          ">
          <ul>
            <li>{{ $t("filte_by_time") }}</li>
            <li @click="setFilterTime(1)" style="cursor: pointer">
              {{ $t("no_limit_time") }}
            </li>
            <li @click="setFilterTime(2)" style="cursor: pointer">
              {{ $t("since_2023") }}
            </li>
            <li @click="setFilterTime(3)" style="cursor: pointer">
              {{ $t("since_2022") }}
            </li>
            <li @click="setFilterTime(4)" style="cursor: pointer">
              {{ $t("since_2021") }}
            </li>
            <li @click="setFilterTime(5)" style="cursor: pointer">
              {{ $t("self_define_time_range") }}
              <span><input v-model="search_start_time" type="text" style="width: 30%" />
                 ~ 
                <input v-model="search_end_time" type="text" style="width: 30%" /></span>
            </li>
          </ul>
        </div>

        <div v-if="search_type == 1" class="filter-card" style="display: vertical; text-align: center">
          <ul>
            <li @click="setLanguage(1)" style="cursor: pointer">
              {{ $t("no_language_limit") }}
            </li>
            <li @click="setLanguage(2)" style="cursor: pointer">
              {{ $t("chinece_language") }}
            </li>
            <li @click="setLanguage(3)" style="cursor: pointer">
              {{ $t("english_language") }}
            </li>
            <!-- <li>时间不限</li> -->
          </ul>
        </div>

        <!-- <div
        v-if="search_type == 1"
        class="filter-card"
        style="display: vertical; text-align: center"
      >
        <ul>
          <li style="cursor: pointer"><input type="checkbox" />包含专利</li>
          <li style="cursor: pointer"><input type="checkbox" />包含引用</li>
        </ul>
      </div> -->
        <div v-if="search_type == 3" class="filter-card" style="display: vertical; text-align: center">
          <ul>
            <li v-for="(option, index) in options" :key="index">
              <input type="radio" :value="option.value" v-model="selectedOption" />
              <label>{{ option.text }}</label>
            </li>
          </ul>
        </div>
      </div>

      <h3 class="sort-switch" :class="{ 'sort-switch-active': show_sort }" @click="show_sort = !show_sort">
        {{ $t("sort") }}
      </h3>
      <div v-show="show_sort">
        <div v-if="search_type == 1" class="filter-card" style="display: vertical; text-align: center">
          <ul>
            <li @click="show_sort_by_date = !show_sort_by_date">{{ $t('sort_by_date') }}</li>
            <li v-show="show_sort_by_date" @click="sortByTime(2)" style="cursor: pointer">
              {{ $t('ascending_sort') }}
            </li>
            <li v-show="show_sort_by_date" @click="sortByTime(1)" style="cursor: pointer">
              {{ $t('descending_sort') }}
            </li>
          </ul>
        </div>

        <div v-if="search_type == 1" class="filter-card" style="display: vertical; text-align: center">
          <ul>
            <li @click="show_sort_by_cite = !show_sort_by_cite">
              {{ $t('sort_by_citation') }}
            </li>
            <li @click="sortByCite(1)" v-show="show_sort_by_cite" style="cursor: pointer">
              {{ $t('ascending_sort') }}
            </li>
            <li @click="sortByCite(2)" v-show="show_sort_by_cite" style="cursor: pointer">
              {{ $t('descending sort') }}
            </li>
          </ul>
        </div>
      </div>

      <!-- <hr> -->
    </div>

    <div class="search-container-wrapper">
      <new-loading-bar :isReal="isReal" :display="displayLoading" :accelerate="accelerate" :progress="progress"
        @stop-display="displayLoading = false"></new-loading-bar>
      <div class="search-container">
        <SearchPanel ref="searchPanelRef" @senddata="handleModoleSearch"></SearchPanel>
      </div>
      <div>
        <ul>
          <li v-for="(item, index) in autoCompleteLists" :key="index">
            {{ item.display_name }}
          </li>
        </ul>
      </div>

      <!--     //this.$emit('change-item-per-page',itemsPerPage)
    //this.$emit('change-page',page) -->
      <!-- 
       -->
      <Pagination @change-item-per-page="changeItemPerpage" @change-page="changePages" :itemsPerPage="itemsPerPage"
        :currentPage="currentPage" :totalPages="totalPages" class="pagination" :defaultItemsPerPage="5">
        <div v-if="search_type == 1">
          <SearchResultListItem v-for="(info, index) in infoItems" :key="index" :infoItem="info"></SearchResultListItem>
        </div>
        <div v-else-if="search_type == 2">
          <ScholarListItem v-show="search_type == 2" v-for="(info, index) in infoItems" :key="index" :infoItem="info">
          </ScholarListItem>
        </div>
        <div v-else-if="search_type == 3">
          <JournalListItem v-for="(info, index) in infoItems" :key="index" :infoItem="info"></JournalListItem>
        </div>

        <div v-else>
          <InstitutionListItem v-show="search_type == 4" v-for="(info, index) in infoItems" :key="index" :infoItem="info">
          </InstitutionListItem>
        </div>
      </Pagination>
    </div>
    <!-- <ChatGPT style="display: vertical; position: sticky; top: 60px"></ChatGPT> -->
    <div class="chat">
      <template v-if="showChat">
        <ChatGPT />
        <svg @click="showChat = false" t="1703445209964" class="fold-icon" viewBox="0 0 1024 1024" version="1.1"
          xmlns="http://www.w3.org/2000/svg" p-id="8413" width="200" height="200">
          <path
            d="M584.533333 512l-302.933333 302.933333L341.333333 874.666667l302.933334-302.933334 59.733333-59.733333-59.733333-59.733333L341.333333 145.066667 281.6 209.066667l302.933333 302.933333z"
            fill="#444444" p-id="8414"></path>
        </svg>
      </template>
      <template v-else>
        <svg @click="showChat = true" t="1703444908491" viewBox="0 0 1024 1024" version="1.1"
          xmlns="http://www.w3.org/2000/svg" p-id="8273" width="200" height="200">
          <path
            d="M401.066667 512l302.933333 302.933333-59.733333 59.733334L341.333333 571.733333 281.6 512 341.333333 452.266667l302.933334-302.933334 59.733333 59.733334L401.066667 512z"
            fill="#444444" p-id="8274"></path>
        </svg>
        <span @click="showChat = true">{{ $t('talk_with_chat') }}</span>
      </template>
    </div>
  </div>
</template>
  
<script>
import SearchResultListItem from "../../components/search-result-list/SearchResultListItem.vue";
import Pagination from "../../components/pagination/Pagination.vue";
import i18n from "../../language";
import { Search } from "../../api/search.js";
import { AutoComplete } from "../../api/autocomplete.js";
import NewLoadingBar from '../../components/loading-bar/NewLoadingBar.vue'
// import AsideBar from "../../components/search-property/AsideBar.vue";
import InstitutionListItem from "../../components/list-item/InstitutionListItem.vue";
import JournalListItem from "../../components/list-item/JournalListItem.vue";
import ScholarListItem from "../../components/list-item/ScholarListItem.vue";
// import SearchModelVue
import SearchPanel from "../search/SearchPanel.vue";
import ChatGPT from "../../components/chat/Chat.vue";
import { ref } from "vue";
import NewLoadingBarVue from '../../components/loading-bar/NewLoadingBar.vue';
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
    NewLoadingBar
  },
  data() {
    return {
      show_sort_by_date: false,
      show_sort_by_cite: false,
      show_sort: false,
      show_filte: false,
      showChat: false,

      totalPages: 1,
      currentPage: 1,
      itemsPerPage: 5,
      //加载条参数
      accelerate: false,
      isReal: false,
      displayLoading: false,
      progress: 0,

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

      placehold: "",
      searchPanelRef: null,
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
    changePages(data) {
      this.currentPage = data
      this.searchmethod(true)
    },
    changeItemPerpage(data) {
      this.itemsPerPage = data
      this.searchmethod(true)
    },
    // #region resultlistToInfoItems
    resultlistToInfoItems() {
      this.infoItems = this.resultlist;
    },

    changeSearchPanelContent() {
      this.searchPanelRef = this.$refs.searchPanelRef.setSearchContent(
        this.search
      );
    },
    //this.$emit('change-item-per-page',itemsPerPage)
    //this.$emit('change-page',page)


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
        //alert("abstract.search:");
        this.search_filter = "abstract.search:";
        this.search_type = 1;
      } else if (type == 2) {
        //alert("fulltext.search:");
        this.search_filter = "fulltext.search:";
        this.search_type = 1;
      } else if (type == 3) {
        //alert("display_name.search:");
        this.search_filter = "display_name.search:";
        this.search_type = 1;
      }
      // Author search
      else if (type == 4) {
        //alert("search author");
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
          this.search_end_time +
          "";
      }
      this.searchdata.filter = this.filter;
      console.log(JSON.parse(JSON.stringify(this.searchdata)));
      // JSON.parse(JSON.stringify(this.searchdata));
      Search.searchWorks(JSON.parse(JSON.stringify(this.searchdata))).then(
        (res) => {
          console.log(res.data);
          this.resultlist = res.data.results;
          this.resultlistToInfoItems();
        },
        (err) => { }
      );
    },

    setLanguage(type) {
      this.accelerate = true
      this.displayLoading = true
      this.progress = 0
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

          this.progress = 100
        },
        (err) => { }
      );
    },

    advsearch(data) {
      //alert("data sent to advsearch");
      // inParts = [];

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
      this.searchmethod(false);

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
        this.sort = "publication_date:";
        // if (
        //   (alert(this.sort + 1),
        //   this.sort.includes("publication_date:") ||
        //     this.sort.includes("publication_date:desc"))
        // ) {
        //   this.sort = this.sort.replace(
        //     /publication_date(:desc)?,/,
        //     "publication_date:"
        //   );
        // } else {
        //   this.sort += "publication_date:";
        // }
      }
      // 晚
      else if (type == 2) {
        this.sort = "publication_date:desc";
        // if (
        //   (alert(this.sort + 2),
        //   this.sort.includes("publication_date:") ||
        //     this.sort.includes("publication_date:desc"))
        // ) {
        //   this.sort = this.sort.replace(
        //     /publication_date(:desc)?,/,
        //     "publication_date:desc"
        //   );
        // } else {
        //   this.sort += "publication_date:desc";
        // }
      }
      this.searchmethod();
    },

    sortByCite(type) {
      if (type == 1) {
        this.sort = "cited_by_count:";
      } else if (type == 2) {
        this.sort = "cited_by_count:desc";
      }
      this.searchmethod();
    },

    handleModoleSearch(searchdata) {
      // alert("data send to here");
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

      // console.log(searchdata);

      this.searchmethod(false);
    },
    // 真正做搜索后端
    // 请传入是否快加速的参数accelerate
    searchmethod(accelerate) {
      if (accelerate) {
        this.accelerate = accelerate
      }
      this.displayLoading = true
      this.progress = 0

      this.perpage = this.itemsPerPage;
      this.page = this.currentPage;
      const searchdata = {
        filter: this.filter.replace(/,$/, ""),
        search: this.search,
        sort: this.sort,
        per_page: this.perpage,
        cursor: this.cursor,
        page: this.page,
      };

      // alert("fuck");
      // this.searchdata.filter = this.filter.replace(/,$/, "");
      // this.searchdata.search = this.search;
      // this.searchdata.sort = this.sort;
      // this.searchdata.perpage = this.perpage;
      // this.searchdata.cursor = this.cursor;
      // this.searchdata.page = this.page;
      // console.log(JSON.parse(JSON.stringify(this.searchdata)));
      // JSON.parse(JSON.stringify(this.searchdata));

      // #region search
      if (this.search_type == 1) {
        Search.searchWorks(searchdata).then(
          (res) => {
            console.log(res.data);

            this.resultlist = res.data.results;
            this.resultlistToInfoItems();

            this.totalPages = res.data.meta.count;
            this.currentPage = res.data.meta.page;
            this.per_page = res.data.meta.per_page;
            this.progress = 100
          },
          (err) => { }
        );
      }
      // author
      else if (this.search_type == 2) {
        Search.searchAuthor(searchdata).then(
          (res) => {
            this.resultlist = res.data.results;
            this.resultlistToInfoItems();

            this.totalPages = res.data.meta.count;
            this.currentPage = res.data.meta.page;
            this.per_page = res.data.meta.per_page;

            this.progress = 100
          },
          (err) => { }
        );
      }
      // 期刊
      else if (this.search_type == 3) {
        Search.searchSources(searchdata).then(
          (res) => {
            console.log(res.data.results);
            this.resultlist = res.data.results;
            this.resultlistToInfoItems();

            this.totalPages = res.data.meta.count;
            this.currentPage = res.data.meta.page;
            this.per_page = res.data.meta.per_page;

            this.progress = 100
          },
          (err) => { }
        );
      }
      // 机构
      else if (this.search_type == 4) {
        Search.searchInstitutions(searchdata).then(
          (res) => {
            console.log(res.data.results);
            this.resultlist = res.data.results;
            this.resultlistToInfoItems();

            this.totalPages = res.data.meta.count;
            this.currentPage = res.data.meta.page;
            this.per_page = res.data.meta.per_page;

            this.progress = 100
          },
          (err) => { }
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
    this.changeSearchPanelContent(this.search);
    if (this.searchdata && "search_type" in this.searchdata) {
      delete this.searchdata["search_type"];
    }
    console.log(searchdata);
    if (searchdata.filter != null)
      searchdata.filter = searchdata.filter.replace(/,$/, "");
    this.searchmethod();
  },

  computed: {
    currentComponent() {
      // alert(
      //   "current search type decide the component render",
      //   this.search_type
      // );
      switch (this.search_type) {
        case 1:
          return ref("SearchResultListItem"); // 搜索结果
        case 2:
          return ref("ScholarListItem"); // 学者列表项
        case 3:
          return ref("JournalListItem"); // 期刊列表项
        case 4:
          return ref("InstitutionListItem"); // 机构列表项
        default:
          return null; // 默认情况（可选）
      }
    },
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
  justify-content: space-between;
}

.cond-area {
  width: 20%;
  /* height: 600px; */
  margin-top: 50px;
  margin-left: 30px;

  /* display: flex; */
  justify-content: center;
  align-items: center;
  font-size: 30px;
}


.cond-area .filter-switch,
.cond-area .sort-switch {
  background: var(--theme-mode-contrast);
  border-radius: 10px;
  cursor: pointer;
  transition: all ease-in-out 0.15s;
  text-align: center;
  margin: 0 auto;
  margin-bottom: 10%;
  padding: 2% 2%;
  font-size: 0.8em;
  width: 80%;
}

.cond-area .filter-switch:hover,
.cond-area .sort-switch:hover {
  background: var(--theme-color);
  color: var(--theme-mode);
  padding: 5% 2%;
}

.cond-area .filter-switch-active,
.cond-area .sort-switch-active {
  background: var(--theme-color);
  color: var(--theme-mode);
}

.cond-area .filter-card {
  border: 2px solid var(--theme-mode-contrast);
  margin-top: 10%;

  margin-bottom: 5%;
  border-radius: 2%;
}

.cond-area .filter-card li {
  padding: 10px 15px;
  border-bottom: 1px solid #ddd;
  /* 条目之间的分隔线 */
  cursor: pointer;
  display: flex;
  align-items: center;
  font-family: Arial, sans-serif;
  transition: all ease-in-out 0.2s;
}

.cond-area .filter-card li:hover {
  background: var(--theme-mode-contrast);
}

.search-container-wrapper {
  width: 50%;
  position: relative;
  height: 90vh;
  overflow: auto;
}

.search-container-wrapper ::-webkit-scrollbar {
  display: none;
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

.chat {
  margin-top: 20px;
  width: 30%;
  display: flex;
  align-items: flex-start;
  position: relative;
}

.chat svg {
  fill: var(--default-text-color);
  width: 30px;
  height: 30px;
  margin-right: 10px;
  cursor: pointer;
}

.chat span {
  font-size: 20px;
  cursor: pointer;
}

.chat span:hover {
  text-decoration: underline;
}

.fold-icon {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 200;
}

@media screen and (max-width: 1000px) {
  .main-area {
    display: block;
  }

  .cond-area {
    width: 90%;
    height: unset;
    /* min-height: 300px; */
    display: block;
  }

  .cond-area .filter-switch,
  .cond-area .sort-switch {
    width: fit-content;
    padding: 0 30%;
    margin: 5% auto;
  }

  .cond-area .filter-switch:hover,
  .cond-area .sort-switch:hover {
    background: var(--theme-color);
    color: var(--theme-mode);
    padding: 2% 30%;
  }
}
</style>