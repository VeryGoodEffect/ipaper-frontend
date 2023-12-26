<template>
  <div class="container">
    <div v-if="this.$i18n.locale == 'en'" class="title">
      {{ tagName }}
    </div>
    <div v-else class="title">
      {{ tagNameZh }}
    </div>
    <div class="main-area">
      <div class="left-row">
        <new-loading-bar :isReal="infoReal" :display="displayInfoLoading" :accelerate="infoAccelerate"
          :progress="infoProgress" @stop-display="displayInfoLoading = false"></new-loading-bar>
        <div>
          <p class="tags">
            {{ $t('tag_detail_wiki') }}
          </p>

          <a :href="this.wikiURL">{{ this.wikiURL }}</a>
        </div>

        <div v-if="institutions != ''">
          <p class="tags">
            {{ $t('tag_detail_institution') }}
          </p>
          <div class="relevant-institution-list">
            <div v-for="(institution, idx) in institutions" :key="idx" class="relevant-institution"
              @click="gotoRelevantInstitution(institution)">
              <p v-if="this.$i18n.locale == 'en'">
                {{ institution.display_name }}
              </p>
              <p v-else>
                {{ institution.display_name_zh }}
              </p>
            </div>
          </div>
        </div>

        <div>
          <p class="tags">
            {{ $t('tag_detail_tags') }}
          </p>
          <div class="relevant-institution-list">
            <div v-for="(tag, idx) in relatedTags" :key="idx" class="relevant-institution" @click="gotoTag(tag)">
              <p v-if="this.$i18n.locale == 'en'">
                {{ tag.display_name }}
              </p>
              <p v-else>
                {{ tag.display_name_zh }}
              </p>
            </div>
          </div>
        </div>

        <div>
          <p class="tags">
            {{ $t('tag_detail_author') }}
          </p>
          <div class="author-list">
            <div v-for="(author, idx) in authors" :key="idx" @click="gotoAuthor(author)" class="author-name">
              {{ author.display_name }}
              &ensp;&ensp;
              {{ $t('institution_author_achievement') }}
              {{ author.works_count }}
              <!-- <span v-for="(tag, idx) in author.x_concepts" :key="idx" class="author-tag-item" @click="gotoTag(tag)">
              {{ tag.display_name }}
            </span> -->
            </div>
          </div>
        </div>

        <TagDetailGraphScholarVue :authorList="authors"></TagDetailGraphScholarVue>
      </div>

      <div class="right-row">
        <new-loading-bar :isReal="pageReal" :display="displayPageLoading" :accelerate="pageAccelerate"
          :progress="pageProgress" @stop-display="displayPageLoading = false"></new-loading-bar>
        <div>
          <p class="tags-right">
            {{ $t('tag_detail_paper') }}
          </p>
          <Pagination :itemsPerPage="this.paginationInfo.itemsPerPage" :currentPage="this.paginationInfo.currentPage"
            :totalPages="this.paginationInfo.totalPages" @change-page="handleChangePage"
            @change-item-per-page="handleChangePerPage">
            <SearchResultListItem v-for="(info, index) in infoItems" :key="index" :infoItem="info"></SearchResultListItem>
          </Pagination>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { Search } from '../../api/search'
import SearchResultListItem from '../../components/search-result-list/SearchResultListItem.vue'
import i18n from '../../language'
import Pagination from "../../components/pagination/Pagination.vue"
import TagDetailGraphScholarVue from '../../components/graphs/TagDetailGraphScholar.vue'
import NewLoadingBar from '../../components/loading-bar/NewLoadingBar.vue'

export default {
  components: {
    SearchResultListItem,
    i18n,
    Pagination,
    TagDetailGraphScholarVue,
    NewLoadingBar
  },
  watch: {
    '$route.params.id': {
      immediate: true,
      handler(newVal, oldVal) {
        this.getTagDetail()
      },
    },
  },
  data() {
    return {
      infoReal: true,
      displayInfoLoading: false,
      infoProgress: 0,
      infoSegment: 0,
      infoAccelerate: false,

      pageReal: false,
      displayPageLoading: false,
      pageProgress: 0,
      pageAccelerate: false,

      tagName: '',
      tagNameZh: '',
      wikiURL: '',
      relatedTagsURL: '',
      relatedTags: [],
      institutionURL: '',
      institutions: [],
      authorsURL: '',
      authors: [],
      papersURL: '',
      infoItems: [],
      paginationInfo: {
        itemsPerPage: 5,
        currentPage: 1,
        totalPages: 3,
      },
    }
  },
  created() {
    this.getTagDetail()
  },
  methods: {
    getTagDetail() {
      this.infoSegment = 0
      this.displayInfoLoading = true
      this.pageProgress = 0
      this.displayPageLoading = true
      let tagId = this.$route.params.id
      if (tagId) {
        Search.conceptRetrieve(tagId).then(
          (response) => {
            console.log(response.data)
            this.tagName = response.data.display_name
            this.tagNameZh = response.data.display_name_zh
            this.wikiURL = response.data.wikidata
            this.relatedTagsURL = response.data.related_concepts_api_url
            this.getTags(this.relatedTagsURL)
            this.institutionURL = response.data.institutions_api_url
            this.getInstitutions(this.institutionURL)
            this.authorsURL = response.data.authors_api_url
            this.getAuthors(this.authorsURL)
            this.papersURL = response.data.works_api_url

            const param = {
              per_page: this.paginationInfo.itemsPerPage,
              page: this.paginationInfo.currentPage
            }
            this.getPapers(this.papersURL, param)
          }
        )
      }
    },
    getTags(url) {
      Search.getEntities(url).then(
        (response) => {
          this.relatedTags = response.data.results
          this.infoSegment++
        }
      )
    },
    getInstitutions(url) {
      Search.getEntities(url).then(
        (response) => {
          console.log("institutions" + response.data.results)
          this.institutions = []
          if (response.data.results.length >= 10) {
            for (let i = 0; i < 10; i++) {
              this.institutions.push(response.data.results[i])
            }
          }
          else {
            for (let i = 0; i < response.data.results.length; i++) {
              this.institutions.push(response.data.results[i])
            }
          }
          // this.institutions = response.data.results
          // console.log(this.institutions)
          this.infoSegment++
        }
      )
    },
    getAuthors(url) {
      Search.getEntities(url).then(
        (response) => {
          // console.log( "author"+response.data.results )
          this.authors = []
          if (response.data.results.length >= 10) {
            for (let i = 0; i < 10; i++) {
              this.authors.push(response.data.results[i])
            }
          }
          else {
            for (let i = 0; i < response.data.results.length; i++) {
              this.authors.push(response.data.results[i])
            }
          }
          this.infoSegment++
        }
      )
    },
    getPapers(url, param) {
      this.pageProgress = 0
      this.displayPageLoading = true
      console.log(this.papersURL)
      // Search.getEntities(url).then(
      Search.getPagnationEntities(this.papersURL, param).then(
        (response) => {
          // console.log(11224123123)
          // console.log(this.paginationInfo)
          // console.log(response)
          this.infoItems = []
          this.paginationInfo.totalPages = Math.ceil(response.data.meta.count / this.paginationInfo.itemsPerPage)
          // console.log(this.paginationInfo.totalPages)
          this.infoItems = response.data.results
          // console.log(this.infoItems)
          this.pageProgress = 100
        }
      )
    },
    gotoTag(tag) {
      //路由跳转到领域详情页 
      this.$router.push('/tag_detail/' + tag.id)
    },
    gotoRelevantInstitution(institution) {
      this.$router.push('/institution_detail/' + institution.id)
      // location.reload()
    },
    gotoAuthor(author) {
      this.$router.push('/scholar_portal/' + author.id)
      //路由跳转到学者详情页
    },
    handleChangePage(page) {
      this.pageAccelerate = true
      this.paginationInfo.currentPage = page
      const param = {
        per_page: this.paginationInfo.itemsPerPage,
        page: this.paginationInfo.currentPage
      }
      this.getPapers(this.paperURL, param)
    },
    handleChangePerPage(perPage) {
      this.pageAccelerate = true
      this.paginationInfo.itemsPerPage = perPage
      const param = {
        per_page: this.paginationInfo.itemsPerPage,
        page: 1
      }
      this.getPapers(this.paperURL, param)
    },
  },
  watch: {
    infoSegment(value) {
      this.infoProgress = value * 33 + 1
    }
  }
}
</script>
<style scoped>
.container {
  width: 80%;
  margin: 0 auto;
}

.title {
  font-size: 35px;
  font-weight: bold;
  margin: 0 auto;
  text-align: center;
  /* border: 2px red solid; */
  width: 80%;
  margin-bottom: 20px;
}

.main-area {
  display: flex;
  margin: 0 auto;
}

.left-row {
  width: 50%;
  height: 85vh;
  overflow: auto;
}

.right-row {
  width: 50%;
  height: 85vh;
  overflow: auto;
  padding-left: 30px;
  border-left: 2px solid var(--theme-mode-contrast);
}

.left-row::-webkit-scrollbar,
.right-row::-webkit-scrollbar {
  display: none;
}

.tags {
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
}

.tags-right {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.tags+a {
  margin-left: 10px;
  text-wrap: wrap;
  word-wrap: break-word;
}

.relevant-institution-list {
  margin-left: 10px;
  display: flex;
  flex-wrap: wrap;
}

.relevant-institution-list :hover {
  text-decoration: underline;
}

.relevant-institution {
  /* border: 2px solid red ; */
  margin-right: 10px;
  margin-bottom: 10px;
}

.relevant-institution>p {
  color: var(--theme-color);
  /* text-wrap: nowrap; */
  cursor: pointer;
}

.author-name {
  color: var(--theme-color);
  cursor: pointer;
  margin-bottom: 10px;
  margin-right: 10px;
  display: flex;
  flex-wrap: wrap;
}

.author-name:hover {
  text-decoration: underline;
}

.author-list {
  margin-left: 10px;
}

@media screen and (max-width: 768px) {
  .main-area {
    display: block;
  }

  .left-row {
    width: 100%;
  }

  .right-row {
    font-size: 25px;
    width: 100%;
    border-left: unset;
    padding-left: unset;
  }
}
</style>
