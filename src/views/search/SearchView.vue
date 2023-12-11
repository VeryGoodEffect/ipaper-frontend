<template>
  <div style="position: relative;">
    <div class="aside">
        <!-- <svg xmlns="http://www.w3.org/2000/svg"  xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 2048 2048"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="48" d="M88 152h336"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="48" d="M88 256h336"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="48" d="M88 360h336"></path></svg>      -->
      <AsideBar  style="top: 0; margin: 0; padding: 0"></AsideBar>
    </div>

    <main class="container" style="margin-left: 200px; /* 留出 aside 的宽度 */">
      <section class="search-panel">
        <h2>
          {{ $t("ipaper_scholar_text") }}
        </h2>

        <div class="search-area">
          <!-- <AsideBar v-show="show_property_search"></AsideBar> -->
          <!-- <hr class="vertical-line"  style="height: 100px; 
                                          border: none; 
                                          border-left: 2px solid #8a2be2;
                                          margin: 0 20px; 
                                          background-image: linear-gradient(to bottom, #32a852, #32a8d8, #3248a8, #6a32a8); 
                                          box-shadow: 0 0 5px rgba(0, 0, 0, 0.5); "> -->

          <input type="text" class="basic-input search-input" />
          <button class="basic-btn search-btn">
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
      </section>
      <!-- <MulSearch /> -->
    </main>
    

  </div>
</template>
<script>
import i18n from "../../language";
import AsideBar from "../../components/search-property/AsideBar.vue";
// import AdvancedSearchModal from "../../components/modals/AdvancedSearchModal.vue";
// import MulSearch from '../../components/search-property/MulSearch.vue';
export default {
  name: "SearchView",
  components: {
    i18n,
    AsideBar,
    // AdvancedSearchModal
  },
  data() {
    return {
      show_property_search: false,
      is_advanced_search: true
    };
  },
  methods:{
    showAsideBar(){
      this.show_property_search = !this.show_property_search;
    }
  }
};
</script>
<style scoped>
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