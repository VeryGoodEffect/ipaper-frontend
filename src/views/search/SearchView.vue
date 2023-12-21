<template>
  <div>
    <AsideBar @setSearchType="setSearchType" @advsearch="advsearch"></AsideBar>
    <main class="container">
      <section class="search-panel">
        <h2>
          {{ $t("ipaper_scholar_text") }}
        </h2>
        <search></search>
      </section>
      <section class="recommendation">
        <h3>为你推荐</h3>
        <button @click="showHotspotRecommend = true">学术热点</button>
        <button @click="showHotspotRecommend = false">猜你想看</button>
        <ArticleRecommendation :show="showHotspotRecommend" />
        <InterestRecommendation :show="!showHotspotRecommend" />
      </section>
    </main>
  </div>
</template>

<script>
import i18n from "../../language";

import ArticleRecommendation from "../../components/recommendation/ArticleRecommendation.vue";
import InterestRecommendation from "../../components/recommendation/InterestRecommendation.vue";

import { AutoComplete } from '../../api/autocomplete.js';
import AsideBar from "../../components/search-property/AsideBar.vue";
import search from "./search.vue";
// import i18n from "../../language";
export default {
  name: "SearchView",
  components: {
    i18n,
    AsideBar,
    ArticleRecommendation,
    InterestRecommendation,
    search
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
      place_holder: "输入文献"
    };
  },
  watch: {
    search_search(newValue, oldValue) {
      if (newValue.length == 0) {
        setTimeout(() => {
          this.autoCompleteLists = []
        }, 100)
      } else {
        this.autoComplete()
      }
    }
  },
  methods: {
    searchOrChangeContent() {
      if (this.activeSuggestionIndex === -1) {
        this.search()
      } else {
        this.changeContent(this.autoCompleteLists[this.activeSuggestionIndex].display_name)
      }
    },
    navigateDown() {
      if (this.activeSuggestionIndex < this.autoCompleteLists.length - 1) {
        this.activeSuggestionIndex++;
      } else {
        this.activeIndex = 0;
      }
    },
    navigateUp() {
      if (this.activeSuggestionIndex > 0) {
        this.activeSuggestionIndex--;
      } else {
        this.activeSuggestionIndex = this.autoComplete.length - 1;
      }
    },

    hideAutoCompleteMenu() {
      setTimeout(() => {
        this.autoCompleteShouldShow = false
        this.activeSuggestionIndex = -1
      }, 100)
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