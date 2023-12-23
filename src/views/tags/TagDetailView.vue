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
        <div>
          {{ $t('tag_detail_wiki') }}
          <a :href="this.wikiURL">{{ this.wikiURL }}</a>
        </div>
        
        <div v-if="institutions != ''">
          <p class="tags">
            {{ $t('tag_detail_institution') }}
          </p>
          <div class="institution-relevant-institution-list">
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
          {{ $t('tag_detail_author') }}
          <div v-for="(author, idx) in authors" :key="idx" @click="gotoAuthor(author)">
            {{ author.display_name }}
            ({{ author.works_count }})
            </div>
        </div>
        <div>
          {{ $t('tag_detail_tags') }}
          <div v-for="(tag, idx) in relatedTags" :key="idx">
            <div v-if="this.$i18n.locale == 'en'"> 
              {{ tag.display_name }}
            </div>
            <div v-else>
              {{ tag.display_name_zh }}
            </div>
          </div>
        </div>
      </div>

      <div class="right-row"> 
        <div>
          {{ $t('tag_detail_paper') }}
          <SearchResultListItem v-for="(info,index) in infoItems" :key="index" :infoItem="info"></SearchResultListItem>
        </div>
      </div>
    </div> 

  </div>
  
</template>

<script>
import { Search } from '../../api/search'
import SearchResultListItem from '../../components/search-result-list/SearchResultListItem.vue'
import i18n from '../../language'
export default {
  components: {
    SearchResultListItem,
    i18n
  },
  data() {
    return {
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
    }
  },
  created() {
    this.getTagDetail()
  },
  methods: {
    getTagDetail() {
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
              this.getPapers(this.papersURL)
          }
        )
      }
    },
    getTags(url) {
      Search.getEntities(url).then(
        (response) => {
          this.relatedTags = response.data.results
        }
      )
    },
    getInstitutions(url) {
      Search.getEntities(url).then(
        (response) => {
          this.institutions = response.data.results
          console.log(this.institutions)
        }
      )
    },
    getAuthors(url) {
      Search.getEntities(url).then(
        (response) => {
          this.authors = response.data.results
        }
      )
    },
    getPapers(url) {
      Search.getEntities(url).then(
        (response) => {
          this.infoItems = response.data.results
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
}
.right-row {
  width: 50%;
  padding-left: 30px;
  border-left: 2px solid var(--theme-mode-contrast);
}
.tags {
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
}
</style>
