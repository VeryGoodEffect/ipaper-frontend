<template>
  <div class="main-area">
    
    <div class="cond-area" style="display: vertical">
      <!-- <div class="filter-card"  v-html="test_v_html"></div> -->
      <h3
        class="filter-switch"
        :class="{ 'filter-switch-active': show_filte }"
        @click="show_filte = !show_filte"
      >
        {{ $t("filter") }}
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
            <li @click="show_filte_by_time = !show_filte_by_time">
              {{ $t("filte_by_time") }}
            </li>
            <li
              @click="setFilterTime(1)"
              v-show="show_filte_by_time"
              style="cursor: pointer"
            >
              {{ $t("no_limit_time") }}
            </li>
            <li
              @click="setFilterTime(2)"
              v-show="show_filte_by_time"
              style="cursor: pointer"
            >
              {{ $t("since_2023") }}
            </li>
            <li
              @click="setFilterTime(3)"
              v-show="show_filte_by_time"
              style="cursor: pointer"
            >
              {{ $t("since_2022") }}
            </li>
            <li
              @click="setFilterTime(4)"
              v-show="show_filte_by_time"
              style="cursor: pointer"
            >
              {{ $t("since_2021") }}
            </li>
            <li
              @click="setFilterTime(5)"
              v-show="show_filte_by_time"
              style="cursor: pointer"
            >
              {{ $t("self_define_time_range") }}
              <span
                ><input
                  v-model="search_start_time"
                  type="text"
                  style="width: 30%" />
                ~
                <input v-model="search_end_time" type="text" style="width: 30%"
              /></span>
            </li>
          </ul>
        </div>

          <div
          v-show="search_type == 1 || search_type == 3"
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
            <li @click="show_filte_by_cite = !show_filte_by_cite">
              {{ $t("filte_cite") }}
            </li>
            <li
              @click="filteByCount(0)"
              v-show="show_filte_by_cite"
              style="cursor: pointer"
            >
              {{ $t("filte_cite_no_limit") }}
            </li>
            <li
              @click="filteByCount(1)"
              v-show="show_filte_by_cite"
              style="cursor: pointer"
            >
              {{ $t("filte_cite_more_than") }}
              <input
                type="text"
                v-model="filte_count_value"
                style="width: 30%"
              />
            </li>
          </ul>
        </div>

        <div
          v-show="search_type == 1"
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
            <li @click="show_filte_by_cite = !show_filte_by_cite">
              {{ $t("filte_cite") }}
            </li>
            <li
              @click="filteByCount(0)"
              v-show="show_filte_by_cite"
              style="cursor: pointer"
            >
              {{ $t("filte_cite_no_limit") }}
            </li>
            <li
              @click="filteByCount(1)"
              v-show="show_filte_by_cite"
              style="cursor: pointer"
            >
              {{ $t("filte_cite_more_than") }}
              <input
                type="text"
                v-model="filte_count_value"
                style="width: 30%"
              />
            </li>
          </ul>
        </div>

        <div
          v-show="search_type == 1"
          class="filter-card"
          style="display: vertical; text-align: center"
        >
          <ul>
            <li
              @click="show_filte_by_language = !show_filte_by_language"
              style="cursor: pointer"
            >
              {{ $t("filte_language") }}
            </li>
            <li
              @click="setLanguage(1)"
              v-show="show_filte_by_language"
              style="cursor: pointer"
            >
              {{ $t("no_language_limit") }}
            </li>
            <li
              @click="setLanguage(2)"
              v-show="show_filte_by_language"
              style="cursor: pointer"
            >
              {{ $t("chinece_language") }}
            </li>
            <li
              @click="setLanguage(3)"
              v-show="show_filte_by_language"
              style="cursor: pointer"
            >
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
        <div v-show="search_type == 3" class="filter-card" style="display: vertical; text-align: center">
          <ul>
            <!--  -->
            <li
              @click="show_filte_publication = !show_filte_publication"
              style="cursor: pointer"
            >
              {{ $t("filte_source") }}
            </li>
            <li
              @click="setJounalType(0)"
              v-show="show_filte_publication"
              style="cursor: pointer"
            >
              {{ $t("filte_source_no_limit") }}
            </li>
            <li
              @click="setJounalType(1)"
              v-show="show_filte_publication"
              style="cursor: pointer"
            >
              {{ $t("filte_source_journal") }}
            </li>
            <li
              @click="setJounalType(2)"
              v-show="show_filte_publication"
              style="cursor: pointer"
            >
              {{ $t("filte_source_respository") }}
            </li>
            <li
              @click="setJounalType(3)"
              v-show="show_filte_publication"
              style="cursor: pointer"
            >
              {{ $t("filte_source_conference") }}
            </li>
            <!-- <li @click="setJounalType(4)" v-show="show_filte_publication" style="cursor: pointer">
              ebook
            </li>
            <li @click="setJounalType(5)" v-show="show_filte_publication" style="cursor: pointer">
              platform
            </li>
            <li @click="setJounalType(5)" v-show="show_filte_publication" style="cursor: pointer">
              book series
            </li> -->
          </ul>
        </div>
      </div>

      <h3 class="sort-switch" :class="{ 'sort-switch-active': show_sort }" @click="show_sort = !show_sort">
        {{ $t("sort") }}
      </h3>
      <div v-show="show_sort">
        <div
          v-show="search_type == 1"
          class="filter-card"
          style="display: vertical; text-align: center"
        >
          <ul>
            <li
              v-show="search_type == 1"
              @click="show_sort_by_date = !show_sort_by_date"
            >
              {{ $t("sort_by_date") }}
            </li>
            <li
              v-show="show_sort_by_date && search_type == 1"
              @click="sortByTime(2)"
              style="cursor: pointer"
            >
              {{ $t("ascending_sort") }}
            </li>
            <li
              v-show="show_sort_by_date && search_type == 1"
              @click="sortByTime(1)"
              style="cursor: pointer"
            >
              {{ $t("descending_sort") }}
            </li>
          </ul>
        </div>

        <div
          v-show="
            search_type == 1 ||
            search_type == 2 ||
            search_type == 3 ||
            search_type == 4
          "
          class="filter-card"
          style="display: vertical; text-align: center"
        >
          <ul>
            <li
              v-show="
                search_type == 1 ||
                search_type == 2 ||
                search_type == 3 ||
                search_type == 4
              "
              @click="show_sort_by_cite = !show_sort_by_cite"
            >
              {{ $t("sort_by_cite_count") }}
            </li>
            <li
              @click="sortByCite(1)"
              v-show="
                show_sort_by_cite &&
                (search_type == 1 ||
                  search_type == 2 ||
                  search_type == 3 ||
                  search_type == 4)
              "
              style="cursor: pointer"
            >
              {{ $t("ascending_sort") }}
            </li>
            <li
              @click="sortByCite(2)"
              v-show="
                show_sort_by_cite &&
                (search_type == 1 ||
                  search_type == 2 ||
                  search_type == 3 ||
                  search_type == 4)
              "
              style="cursor: pointer"
            >
              {{ $t("descending_sort") }}
            </li>
          </ul>
        </div>

        <div
          v-show="search_type == 2 || search_type == 3 || search_type == 4"
          class="filter-card"
          style="display: vertical; text-align: center"
        >
          <ul>
            <li
              v-show="search_type == 2 || search_type == 3 || search_type == 4"
              @click="show_sort_by_works_count = !show_sort_by_works_count"
            >
              {{ $t("sort_by_works_count") }}
            </li>
            <li
              @click="sortByWorksCount(1)"
              v-show="
                show_sort_by_works_count &&
                (search_type == 2 || search_type == 3 || search_type == 4)
              "
              style="cursor: pointer"
            >
              {{ $t("ascending_sort") }}
            </li>
            <li
              @click="sortByWorksCount(2)"
              v-show="
                show_sort_by_works_count &&
                (search_type == 2 || search_type == 3 || search_type == 4)
              "
              style="cursor: pointer"
            >
              {{ $t("descending_sort") }}
            </li>
          </ul>
        </div>

        <div
          v-show="
            search_type == 1 ||
            search_type == 2 ||
            search_type == 3 ||
            search_type == 4
          "
          class="filter-card"
          style="display: vertical; text-align: center"
        >
          <ul>
            <li
              v-show="
                search_type == 1 ||
                search_type == 2 ||
                search_type == 3 ||
                search_type == 4
              "
              @click="show_sort_by_display_name = !show_sort_by_display_name"
            >
              {{ $t("sort_by_alpha") }}
            </li>
            <li
              @click="sortByDisplayName(1)"
              v-show="
                show_sort_by_display_name &&
                (search_type == 1 ||
                  search_type == 2 ||
                  search_type == 3 ||
                  search_type == 4)
              "
              style="cursor: pointer"
            >
              {{ $t("ascending_sort") }}
            </li>
            <li
              @click="sortByDisplayName(2)"
              v-show="
                show_sort_by_display_name &&
                (search_type == 1 ||
                  search_type == 2 ||
                  search_type == 3 ||
                  search_type == 4)
              "
              style="cursor: pointer"
            >
              {{ $t("descending_sort") }}
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
        <SearchPanel
          ref="searchPanelRef"
          @senddata="handleModoleSearch"
          @setSearchTypeChild="handleChildSearchType"
        ></SearchPanel>
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
  </div>
  <div
    id="chat"
    :class="{ chat: true, dragging: isDragging }"
    :style="{ top: topDistance + 'px', left: leftDistance + 'px' }"
    @mousedown.stop="startDrag"
  >
    <template v-if="showChat">
      <ChatGPT />
      <svg
        class="fold-icon"
        @click="showChat = false"
        t="1703515853080"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="3724"
        width="200"
        height="200"
      >
        <path
          d="M904.533333 674.133333l-362.666666-362.666666c-17.066667-17.066667-42.666667-17.066667-59.733334 0l-362.666666 362.666666c-17.066667 17.066667-17.066667 42.666667 0 59.733334 17.066667 17.066667 42.666667 17.066667 59.733333 0L512 401.066667l332.8 332.8c8.533333 8.533333 19.2 12.8 29.866667 12.8s21.333333-4.266667 29.866666-12.8c17.066667-17.066667 17.066667-42.666667 0-59.733334z"
          p-id="3725"
        ></path>
      </svg>
    </template>
    <template v-else>
      <span class="talk-hint">{{ $t("talk_with_chat") }}</span>
      <svg
        class="unfold-chat"
        @click="showChat = true"
        t="1703515339866"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="3584"
        width="200"
        height="200"
      >
        <path
          d="M904.533333 311.466667c-17.066667-17.066667-42.666667-17.066667-59.733333 0L512 644.266667 179.2 311.466667c-17.066667-17.066667-42.666667-17.066667-59.733333 0-17.066667 17.066667-17.066667 42.666667 0 59.733333l362.666666 362.666667c8.533333 8.533333 19.2 12.8 29.866667 12.8s21.333333-4.266667 29.866667-12.8l362.666666-362.666667c17.066667-17.066667 17.066667-42.666667 0-59.733333z"
          p-id="3585"
        ></path>
      </svg>
    </template>
  </div>
</template>
  
<script>
import SearchResultListItem from "../../components/search-result-list/SearchResultListItem.vue";
import Pagination from "../../components/pagination/Pagination.vue";
import i18n from "../../language";
import { Search } from "../../api/search.js";
import { AutoComplete } from "../../api/autocomplete.js";
import NewLoadingBar from "../../components/loading-bar/NewLoadingBar.vue";
// import AsideBar from "../../components/search-property/AsideBar.vue";
import InstitutionListItem from "../../components/list-item/InstitutionListItem.vue";
import JournalListItem from "../../components/list-item/JournalListItem.vue";
import ScholarListItem from "../../components/list-item/ScholarListItem.vue";
// import SearchModelVue
import SearchPanel from "../search/SearchPanel.vue";
import ChatGPT from "../../components/chat/Chat.vue";
import { ref } from "vue";
import NewLoadingBarVue from "../../components/loading-bar/NewLoadingBar.vue";
import FavouriteListChoosableVue from "../../components/favorites/FavouriteListChoosable.vue";
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
    NewLoadingBar,
  },
  data() {
    return {
      /***
     * display_name
        cited_by_count
        works_count
        publication_date
        relevance_score (only exists if there's a search filter active)
     */
      show_sort_by_date: false,
      show_sort_by_cite: false,
      show_sort_by_works_count: false,
      show_sort_by_display_name: false,

      show_filte_by_time: false,
      show_filte_by_cite: false,
      show_filte_by_works_count: false,
      show_filte_by_language: false,
      show_filte_publication: false,

      test_v_html: "",

      filte_count_value: 10,
      filte_cite_value: 100,

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
      per_page: "10",
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

      topDistance: window.innerWidth > 500 ? 200 : 215,
      leftDistance:
        window.innerWidth > 500
          ? window.innerWidth - 330
          : window.innerWidth * 0.5 - 160,
      startX: 0,
      startY: 0,
      isDragging: false,
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
    "$route.query": {
      immediate: true,
      handler(newQuery, oldQuery) {
        const query = newQuery;
        // alert(newQuery.search);
        const searchdata = query;
        this.searchdata = searchdata;
        this.search = searchdata.search;
        this.sort = searchdata.sort;
        this.per_page = searchdata.per_page;
        this.cursor = searchdata.cursor;
        this.search_type = searchdata.search_type;
        this.$nextTick(() => {
          this.changeSearchPanelContent();
        });

        // this.changeSearchPanelContent();
        if (this.searchdata && "search_type" in this.searchdata) {
          delete this.searchdata["search_type"];
        }
        console.log(searchdata);
        if (searchdata.filter != null)
          searchdata.filter = searchdata.filter.replace(/,$/, "");
        this.searchmethod();
        /**
           * 
           *         filter: this.search_filter,
        search: this.search_search,
        sort: this.search_sort,
        per_page: this.search_perpage,
        page: this.search_page,
        cursor: "",
        search_type: this.search_type,
           */

        // 这里是当查询参数变化时执行的代码
        // 比如，您可以根据新的查询参数重新加载数据
      },
    },
  },
  methods: {
    // ==== CHAT ====
    startDrag(event) {
      const rectWidth = 320;
      const rectHeight = 60;

      const div = document.getElementById("chat");

      if (
        event.clientX <= div.getBoundingClientRect().left + rectWidth &&
        event.clientY <= div.getBoundingClientRect().top + rectHeight
      ) {
        this.isDragging = true;
        this.startX = event.clientX - this.leftDistance;
        this.startY = event.clientY - this.topDistance;
        document.addEventListener("mousemove", this.handleDrag);
        document.addEventListener("mouseup", this.stopDrag);
      }
    },
    handleDrag(event) {
      if (this.isDragging) {
        this.leftDistance = event.clientX - this.startX;
        this.topDistance = event.clientY - this.startY;
      }
    },
    stopDrag() {
      this.isDragging = false;
      document.removeEventListener("mousemove", this.handleDrag);
      document.removeEventListener("mouseup", this.stopDrag);
    },

    changePages(data) {
      this.currentPage = data;
      this.searchmethod(true);
    },
    changeItemPerpage(data) {
      this.itemsPerPage = data;
      this.currentPage = 1
      this.searchmethod(true);
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
      this.setQuery();
    },
    setJounalType(type) {
      if (type == 0) {
        this.filter = "";
      } else if (type == 1) {
        this.filter = "type:journal";
      } else if (type == 2) {
        this.filter = "type:repository";
      } else if (type == 3) {
        this.filter = "type:conference";
      } else if (type == 4) {
        this.filter = "type:ebook";
      } else if (type == 5) {
        this.filter = "type:platform";
      } else if (type == 6) {
        this.filter = "type:book series";
      }
      this.searchdata.filter = this.filter;
      this.setQuery();
    },

    setLanguage(type) {
      this.accelerate = true;
      this.displayLoading = true;
      this.progress = 0;
      if (type == 1) {
        this.filter = "";
      } else if (type == 2) {
        this.filter = "language:zh-cn";
      } else if (type == 3) {
        this.filter = "language:en";
      }

      this.searchdata.filter = this.filter;
      this.setQuery();
    },

    // instit
    filteByCount(type) {
      if (type == 0) {
        return;
      }
      if (type == 1) {
        // alert(this.filter)
        this.filter = "cited_by_count:>" + this.filte_count_value;
        alert(this.filter);
        this.setQuery();
      }
    },
    // instit
    filteWorksCount(type) {},
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
    setQuery() {
      const query = {
        filter: this.filter,
        search: this.search,
        sort: this.sort,
        per_page: this.per_page,
        page: this.page,
        cursor: this.cursor,
        search_type: this.search_type,
      };

      this.$router.push({
        query: query,
      });
    },
    sortByTime(type) {
      if (type == 1) {
        this.sort = "publication_date:";
      }
      // 晚
      else if (type == 2) {
        this.sort = "publication_date:desc";
      }
      this.setQuery();
    },

    sortByWorksCount(type) {
      if (type == 1) {
        this.sort = "works_count:";
      } else if (type == 2) {
        this.sort = "works_count:desc";
      }
      this.setQuery();
    },
    sortByCite(type) {
      if (type == 1) {
        this.sort = "cited_by_count:";
      } else if (type == 2) {
        this.sort = "cited_by_count:desc";
      }
      this.setQuery();
    },

    sortByDisplayName(type) {
      if (type == 1) {
        this.sort = "display_name:";
      } else if (type == 2) {
        this.sort = "display_name:desc";
      }
      this.setQuery();
    },

    handleChildSearchType(searchType) {
      this.search_type = searchType;
    },

    handleModoleSearch(searchdata) {
      // alert("data send to here");
      console.log(searchdata);
      this.searchdata = searchdata;
      this.search = searchdata.search;
      this.sort = searchdata.sort;
      this.per_page = searchdata.per_page;
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
        this.accelerate = accelerate;
      }
      this.displayLoading = true;
      this.progress = 0;

      this.per_page = this.itemsPerPage;
      this.page = this.currentPage;
      const searchdata = {
        filter: this.filter.replace(/,$/, ""),
        search: this.search,
        sort: this.sort,
        per_page: this.per_page,
        cursor: this.cursor,
        page: this.page,
      };

      // alert("fuck");
      // this.searchdata.filter = this.filter.replace(/,$/, "");
      // this.searchdata.search = this.search;
      // this.searchdata.sort = this.sort;
      // this.searchdata.per_page = this.per_page;
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

            this.totalPages = Math.ceil(
              res.data.meta.count / res.data.meta.page
            );
            this.currentPage = res.data.meta.page;
            // this.totalPages = Math.ceil(this.totalPages/this.currentPage)
            this.per_page = res.data.meta.per_page;
            this.progress = 100;
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

            this.totalPages = Math.ceil(
              res.data.meta.count / res.data.meta.page
            );
            this.currentPage = res.data.meta.page;
            // this.totalPages = Math.ceil(this.totalPages/this.currentPage)
            this.per_page = res.data.meta.per_page;

            this.progress = 100;
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

            this.totalPages = Math.ceil(
              res.data.meta.count / res.data.meta.page
            );
            this.currentPage = res.data.meta.page;
            // this.totalPages = Math.ceil(this.totalPages/this.currentPage)
            this.per_page = res.data.meta.per_page;

            this.progress = 100;
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

            this.totalPages = Math.ceil(
              res.data.meta.count / res.data.meta.page
            );
            this.currentPage = res.data.meta.page;
            // this.totalPages = Math.ceil(this.totalPages/this.currentPage)
            this.per_page = res.data.meta.per_page;

            this.progress = 100;
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
    // let htmlString =
    //   "<title>Depth-image-based rendering (DIBR), compression, and transmission for a new approach on 3D-TV</title>";
    //   this.test_v_html = htmlString
    // let parser = new DOMParser();
    // let doc = parser.parseFromString(htmlString, "text/html");
    // let title = doc.querySelector("title").textContent;
    // alert(title);

    // const searchdata = this.$route.query;
    // this.searchdata = searchdata;
    // this.search = searchdata.search;
    // this.sort = searchdata.sort;
    // this.per_page = searchdata.per_page;
    // this.cursor = searchdata.cursor;
    // this.search_type = searchdata.search_type;
    // this.changeSearchPanelContent();
    // if (this.searchdata && "search_type" in this.searchdata) {
    //   delete this.searchdata["search_type"];
    // }
    // console.log(searchdata);
    // if (searchdata.filter != null)
    //   searchdata.filter = searchdata.filter.replace(/,$/, "");
    // this.searchmethod();
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

svg {
  cursor: pointer;
}

.main-area {
  /* border: 2px solid blue; */
  display: flex;
  justify-content: flex-start;
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
  width: 60%;
  position: relative;
  max-height: 90vh;
  overflow: auto;
}
.search-container-wrapper::-webkit-scrollbar {
  display: none !important;
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
  width: 320px;
  display: flex;
  align-items: flex-start;
  position: absolute;
  z-index: 9999;
  box-shadow: 1px 1px 5px var(--theme-mode-contrast);
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 10px;
  background: var(--theme-mode);
}

/* .chat svg {
  fill: var(--default-text-color);
  
  margin-right: 10px;
  cursor: pointer;
} */

.fold-icon {
  width: 30px;
  height: 30px;
  position: absolute;
  right: 10px;
  top: 15px;
  z-index: 200;
}

.talk-hint {
  font-size: 18px;
  margin: 0 20px;
  font-weight: bold;
}

.unfold-chat {
  width: 30px;
  height: 30px;
  position: absolute;
  right: 5px;
  top: 5px;
  fill: var(--default-text-color);
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

  .search-container-wrapper {
    margin: 0 auto;
  }
}

@media screen and (max-width: 1000px) {
  .search-container-wrapper {
    padding-top: 50px;
  }
}
</style>