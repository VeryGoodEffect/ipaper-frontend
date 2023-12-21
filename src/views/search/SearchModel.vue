<template >
  <div>
    <div class="search-area">
      <div>
        <input
          v-model="search_search"
          type="text"
          class="basic-input search-input"
          :placeholder="place_holder"
          @keydown.down="navigateDown"
          @keydown.up="navigateUp"
          @keydown.enter="searchOrChangeContent"
          @focus="showAutoCompleteMenu"
          @blur="hideAutoCompleteMenu"
        />
        <ul v-if="autoCompleteShouldShow && autoCompleteLists.length > 0">
          <li
            :class="{ 'suggestion-active': index === activeSuggestionIndex }"
            v-for="(item, index) in autoCompleteLists"
            :key="index"
            @mouseover="activeSuggestionIndex = index"
            @click="changeContent(item.display_name)"
          >
            {{ item.display_name }}
          </li>
        </ul>
      </div>
      <button @click="search" class="basic-btn search-btn">
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
  </div>
</template>
<script>
import { AutoComplete } from "../../api/autocomplete.js";
import AsideBar from "../../components/search-property/AsideBar.vue";
import i18n from "../../language";
export default {
  emits: ["senddata"],
  components: {
    i18n,
    AsideBar,
    AutoComplete,
  },

  data() {
    return {
      show_property_search: false,
      is_advanced_search: true,
      showHotspotRecommend: true,
      search_content: "",
      search_filter: "",
      search_search: "",
      search_sort: "",
      search_perpage: 10,
      search_page: 1,
      cur_search_cursor: "",
      search_type: 1,
      queryParts: {},
      autoCompleteLists: [],
      activeSuggestionIndex: -1,
      autoCompleteShouldShow: false,
      place_holder: "输入文献",
    };
  },

  watch: {
    search_search(newValue, oldValue) {
      if (newValue.length == 0) {
        setTimeout(() => {
          this.autoCompleteLists = [];
        }, 100);
      } else {
        this.autoComplete();
      }
    },
  },

  methods: {
    showAsideBar() {
      this.show_property_search = !this.show_property_search;
    },
    search() {
      const query = {
        filter: this.search_filter,
        search: this.search_search,
        sort: this.search_sort,
        per_page: this.search_perpage,
        page: this.search_page,
        cursor: "",
        search_type: this.search_type,
      };

      // 在组件中的某个方法中
      if (this.$route.path === "/search") {
        // 当前路由与目标路径匹配
        // 执行相关逻辑
        this.$router.push({
          path: "/search_result",
          // type: this.search_type,
          query: query,
        });
      } else {
        this.$emit("senddata", query);
        alert("SendData")
        // 当前路由与目标路径不匹配
        // 执行其他逻辑
      }
    },
    buildQuery() {},
    advsearch(data) {
      // alert("data sent to advsearch");
      // queryParts = [];

      //!暂时先置空吧
      this.search_filter = "";
      if (data.author) {
        this.search_filter += `author.search:${encodeURIComponent(
          data.author
        )},`;
      }
      if (data.publication) {
        this.search_filter += `source.search:${encodeURIComponent(
          data.publication
        )},`;
      }
      if (data.start_time && data.end_time) {
        this.search_filter += `publication_year:${data.start_time}-${data.end_time},`;
      }
      if (data.keyword) {
        const field = data.is_key_title ? "title.search" : "abstract.search";
        this.search_filter += `${field}:${encodeURIComponent(data.keyword)},`;
      }
      console.log(this.search_filter);
      this.search();
    },
    // https://api.openalex.org/authors?filter=display_name.search:einstein
    // https://api.openalex.org/works?filter=type:book
    // https://api.openalex.org/authors?filter=display_name.search:tupolev
    // https://api.openalex.org/authors?filter=display_name.search:john%20smith
    setSearchType(type) {
      if (type == 0) {
        // display_name.search:
        // this.search_filter = "display_name.search:"
        this.search_filter = "";
        this.search_type = 1;
        this.place_holder = "文献搜索-默认搜索";
      } else if (type == 1) {
        // alert("abstract.search:");
        this.search_filter = "abstract.search:";
        this.search_type = 1;
        this.place_holder = "文献搜索-摘要搜索";
      } else if (type == 2) {
        // alert("fulltext.search:");
        this.search_filter = "fulltext.search:";
        this.search_type = 1;
        this.place_holder = "文献搜搜-全文内容";
      } else if (type == 3) {
        // alert("display_name.search:");
        this.search_filter = "display_name.search:";
        this.search_type = 1;
        this.place_holder = "输入标题:例如 3D Gauss";
      }
      // Author search
      else if (type == 4) {
        // alert("search author");
        this.search_type = 2;
        this.place_holder = "输入作者:例如 孟";
      }

      // 期刊
      else if (type == 5) {
        this.search_type = 3;
        this.place_holder = "输入期刊:例如Nature";
      }
      // 机构
      else if (type == 6) {
        this.search_type = 4;
        this.place_holder = "输入机构:例如NASA";
      }
    },
    autoComplete() {
      let data = {
        q: this.search_search,
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
    showAutoCompleteMenu() {
      this.activeSuggestionIndex = -1;
      this.autoCompleteShouldShow = true;
    },
    changeContent(str) {
      this.search_search = str;
      this.activeSuggestionIndex = -1;
    },
    searchOrChangeContent() {
      if (this.activeSuggestionIndex === -1) {
        this.search();
      } else {
        this.changeContent(
          this.autoCompleteLists[this.activeSuggestionIndex].display_name
        );
      }
    },
  },
};
</script>
<style scoped>
* {
  max-width: 100%;
  /* overflow: hidden; */
}
.container {
  width: 80%;
  /* height: calc(100vh - 80px); */
  margin: 0 auto;
}

.search-panel h2 {
  color: var(--theme-color);
  text-align: center;
  padding: 50px 0;
  font-size: 50px;
  font-weight: bold;
}

.search-area {
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
}

.search-area div {
  width: 50%;
  position: relative;
}

.search-input {
  max-width: 640px;
  width: 100%;
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

.search-area ul {
  position: absolute;
  left: 0;
  right: 0;
  top: 60px;
  max-width: 640px;
  width: 100%;
  background: var(--theme-mode-like);
  box-sizing: border-box;
  padding: 10px;
  border-radius: 5px;
}

.search-area ul li {
  font-size: 16px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  box-sizing: border-box;
  padding: 2px 5px;
  border-radius: 5px;
  cursor: pointer;
}

.search-area ul li:not(:last-of-type) {
  margin-bottom: 10px;
}

.suggestion-active {
  background: var(--theme-mode-contrast);
  font-weight: bold;
}

.recommendation {
  width: 95%;
  margin: 0 auto;
}

.recommendation h3 {
  color: var(--theme-color);
  font-size: 30px;
  font-weight: bold;
}

@media screen and (max-width: 450px) {
  .search-panel h2 {
    font-size: 40px;
  }

  .recommendation {
    width: 100%;
  }
}

/* for property search */

.aside {
  width: 20%;
  top: 20%;
  height: 80%;
  position: relative;
  z-index: 1;
  /* background-color: lightblue;
  background-color: antiquewhite; */
  position: absolute;
}
</style>