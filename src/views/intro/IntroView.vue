<template>
  <!-- <LoadingBar style="position: fixed;width: 1000px;z-index: -1;" :progress="progress"></LoadingBar> -->
  <main>
    <div>
      <h2>{{ $t("frontpage_intro") }}</h2>
      <div class="huge-input-wrapper">
        <input
          class="basic-input huge-input"
          type="text"
          :placeholder="$t('huge_input_placeholder')"
          v-model="searchKeyword"
          @keydown.down="navigateDown"
          @keydown.up="navigateUp"
          @keydown.enter="searchOrChangeContent"
          @focus="showAutoCompleteMenu"
          @blur="hideAutoCompleteMenu"
        />
        
        <svg
          @click="basicSearch"
          t="1699356103686"
          class="icon search-icon"
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
          ></path>
        </svg>
      </div>
    </div>
  </main>
</template>

<script>
import LoadingBar from "../../components/loading-bar/LoadingBar.vue";
import i18n from "../../language";
import { AutoComplete } from '../../api/autocomplete.js';

export default {
  name: "IntroView",
  components: {
    LoadingBar,
    i18n,
  },
  data() {
    return {
      searchKeyword: "", // 搜索关键字
      autoCompleteLists: [],
      activeSuggestionIndex: -1,
      autoCompleteShouldShow: false,
      searchtype: ""
    };
  },
  // watch: {
  //   searchKeyword(newValue, oldValue) {
  //     if (newValue.length == 0) {
  //       setTimeout(() => {
  //         this.autoCompleteLists = [];
  //       }, 100);
  //     } else {
  //       this.autoComplete();
  //     }
  //   },
  // },
  // institution
  // author
  // work
  // concept
  methods: {
    basicSearch() {
      if (this.searchKeyword != "") {
        // alert('搜索关键字：' + this.searchKeyword)
        // this.searchKeyword = ''
        const searchdata = {
          filter: "",
          search: this.searchKeyword,
          sort: "",
          perpage: "10",
          page: "1",
          cursor: "",
          search_type: 1,
        };
        // if(this.searchtype == "work"){
        //   searchdata.search_type =1
        // }else if(this.searchtype == "author"){
        //   searchdata.search_type =2
        // }else if(this.searchtype == "concept"){

        // }else if(this.searchtype == "institution"){
        //   searchdata.search_type =4
        // }

        // let userId = this.$cookies.get("user_id");
        // if (userId == null) {
        //   // alert("未登录");
        // } else {
          // console.log(userId)
          this.$router.push({
            path: "/search_result",
            query: searchdata,
          })
        // }
      }
    },

    // hideAutoCompleteMenu() {
    //   setTimeout(() => {
    //     this.autoCompleteShouldShow = false
    //     this.activeSuggestionIndex = -1
    //   }, 100)
    // },
    // autoComplete() {
    //   let data = {
    //     q: this.searchKeyword,
    //     entity_type: ""
    //   };
    //   console.log(data);
    //   AutoComplete.getAutoAllInfo(data).then((res)=>{
    //     console.log(data)
    //     this.autoCompleteLists = res.data.results; 
    //   })
    // },
    // showAutoCompleteMenu() {
    //   this.activeSuggestionIndex = -1;
    //   this.autoCompleteShouldShow = true;
    // },

    // searchOrChangeContent() {
    //   if (this.activeSuggestionIndex === -1) {
    //     this.search()
    //   } else {
    //     this.changeContent(this.autoCompleteLists[this.activeSuggestionIndex].display_name)
    //   }
    // },

    // changeContent(item) {
    //   this.searchKeyword = item.display_name;
    //   this.activeSuggestionIndex = -1;
    //   this.searchtype = item.entity_type

    // },
    // navigateDown() {
    //   if (this.activeSuggestionIndex < this.autoCompleteLists.length - 1) {
    //     this.activeSuggestionIndex++;
    //   } else {
    //     this.activeIndex = 0;
    //   }
    // },
    // navigateUp() {
    //   if (this.activeSuggestionIndex > 0) {
    //     this.activeSuggestionIndex--;
    //   } else {
    //     this.activeSuggestionIndex = this.autoComplete.length - 1;
    //   }
    // },
  },
};
</script>

<style scoped>
main {
  height: calc(100vh - 80px);
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}

main > div {
  display: flex;
  max-width: 900px;
  flex-wrap: wrap;
  justify-content: center;
}

main h2 {
  font-size: 80px;
  color: var(--theme-color);
  font-weight: bold;
  padding-bottom: 50px;

  transition-property: font-size;
  transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.icon {
  width: 50px;
  height: 50px;
  background-size: cover;
  cursor: pointer;
  transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
  fill: #666;
}

.icon:hover {
  scale: 1.2;
  fill: var(--theme-color);
}

.search-icon {
  position: absolute;
  right: 15px;
  z-index: 10;
}

@media screen and (max-width: 850px) {
  .icon {
    width: 40px;
    height: 40px;
  }
  main h2 {
    font-size: 50px;
  }
}

@media screen and (max-width: 600px) {
  main h2 {
    font-size: 30px;
  }
}

@media screen and (max-width: 450px) {
  main h2 {
    font-size: 20px;
  }
}



</style>