<template>
  <div>
    <!-- <div class="aside"> -->
        <!-- <svg xmlns="http://www.w3.org/2000/svg"  xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 2048 2048"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="48" d="M88 152h336"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="48" d="M88 256h336"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="48" d="M88 360h336"></path></svg>      -->
      
    <!-- </div> -->
    <AsideBar @setSearchType="setSearchType"></AsideBar>

    <main class="container">
      <section class="search-panel">
        <h2>
          {{ $t("ipaper_scholar_text") }}
        </h2>

        <div  class="search-area">
          <!-- <AsideBar v-show="show_property_search"></AsideBar> -->
          <!-- <hr class="vertical-line"  style="height: 100px; 
                                          border: none; 
                                          border-left: 2px solid #8a2be2;
                                          margin: 0 20px; 
                                          background-image: linear-gradient(to bottom, #32a852, #32a8d8, #3248a8, #6a32a8); 
                                          box-shadow: 0 0 5px rgba(0, 0, 0, 0.5); "> -->

          <input v-model="search_content" type="text" class="basic-input search-input" />
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
      </section>
      <section class="recommendation">
        <h3>为你推荐</h3>
        <button @click="showHotspotRecommend = true">学术热点</button>
        <button @click="showHotspotRecommend = false">猜你想看</button>
        <ArticleRecommendation :show="showHotspotRecommend"/>
        <InterestRecommendation :show="!showHotspotRecommend"/>
      </section>
      <!-- <MulSearch /> -->
    </main>
    

  </div>
</template>
<script>
import i18n from "../../language";
import AsideBar from "../../components/search-property/AsideBar.vue";
import ArticleRecommendation from '../../components/recommendation/ArticleRecommendation.vue';
import InterestRecommendation from '../../components/recommendation/InterestRecommendation.vue';

// import AdvancedSearchModal from "../../components/modals/AdvancedSearchModal.vue";
// import MulSearch from '../../components/search-property/MulSearch.vue';
export default {
  name: "SearchView",
  components: {
    i18n,
    AsideBar,
    ArticleRecommendation,
    InterestRecommendation
    // AdvancedSearchModal
  },
  data() {
    // https://api.openalex.org/authors?filter=display_name.search:einstein
    // https://api.openalex.org/works?filter=type:book

    /** 在OpenAlex中，您可以使用多种过滤器搜索属性来精确地缩小搜索结果。这些过滤器通过在查询中使用filter参数来应用。以下是一些关键的过滤器搜索属性及其功能：
        具体字段搜索：您可以在特定字段上执行搜索，方法是在您想要过滤的属性后面加上.search。例如，可以在标题字段上使用title.search来搜索特定的标题内容。
        作者数量 (authors_count)：按作品的作者数量进行过滤。您可以使用不等式过滤器选择范围，例如authors_count:>5表示选择作者数量超过5的作品。
        作者机构所在大洲 (authorships.institutions.continent)：返回至少有一位作者所在机构位于特定大洲的作品。
        作者机构是否位于全球南部 (authorships.institutions.is_global_south)：根据作者所在机构是否位于全球南部来过滤作品。
        最佳开放版本 (best_open_version)：按作品的最佳开放访问版本进行过滤，例如可以选择已提交版本、已接受版本或已发布版本。
        被引用 (cited_by) 和 引用 (cites)：根据作品被引用或引用其他作品的情况进行过滤。
        概念数量 (concepts_count)：按分配给作品的概念数量进行过滤。
        创建日期 (from_created_date)、发布日期 (from_publication_date) 和 **更新日期 (`from_updated_date */

    return {
      show_property_search: false,
      is_advanced_search: true,
      showHotspotRecommend: true,
      // for filter type
      // abstract.search
      // display_name.search
      // fulltext.search
      // title.search
      // default.search
      search_filter: "",
      // for filter content
      search_content: "",
      // exp https://api.openalex.org/works?filter=concepts.id:{机器学习ID},from_publication_date:2021-01-01&search=深度学习
      search_search: "",
      search_sort: "",
      search_perpage: 10,
      search_page: 1,
      cur_search_cursor: ""
    };
  },
  methods:{
    showAsideBar(){
      this.show_property_search = !this.show_property_search;
    },
    search(){
      alert("????");
      let searchdata = {
        filter : this.search_filter + this.search_content,
        search : this.search_search,
        sort : this.search_sort,
        per_page : this.search_perpage,
        page : this.search_page,
        cursor : ""
      }
      this.$router.push({
          path: '/search_result',
          query:{
            filter : this.search_filter + this.search_content,
            search : this.search_search,
            sort : this.search_sort,
            per_page : this.search_perpage,
            page : this.search_page,
            cursor : ""
          }
      })
      
      // Search.searchWorks(searchdata).then(res=>{
      //   alert("搜索成了")
      //   console.log(res.data)

      // },(error)=>{
      //   alert("搜索失败！")
      // })

    },
    setSearchType(type){
      if(type == 1){
          alert("abstract.search")
        this.search_filter = "abstract.search"
      }else if(type == 2){
        alert("fulltext.search")
        this.search_filter = "fulltext.search"
      }else if(type == 3){
        alert("type:display_name.search:")
        this.search_filter = "type:display_name.search:"
        console.log(this.search_filter)
      }
    }
  }
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