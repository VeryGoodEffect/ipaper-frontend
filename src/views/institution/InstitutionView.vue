<template>
  <div class="institution-area">
    <div class="area">
      <div>
        <span class="name">{{ institutionName }}</span>
        <span class="country">({{ institutionCountry }})</span>
      </div>
      <div class="author-list">
          {{ $t('institution_main_scholar') }}
          <div v-for="(author, idx) in institutionAuthors" :key="idx" @click="gotoAuthor(author)">
            {{ author.display_name }} 
            ({{ author.works_count }})
            <span v-for="(tag, idx) in author.x_concepts" :key="idx" class="author-tag-item" @click="gotoTag(tag)">
              {{ tag.display_name }}
            </span>
          </div>
      </div>
      <div >
        <div class="tags">
        {{ $t('institution_main_tag') }}
        </div>
        <div>
          <span v-for="(tag, idx) in institutionTags" :key="idx" class="tag-item" @click="gotoTag(tag)">
            {{ tag.display_name }}
          </span>
        </div>
      </div>
      <div class="papers">
        {{ $t('institution_main_papers') }}
        <SearchResultListItem v-for="(info,index) in infoItems" :key="index" :infoItem="info"></SearchResultListItem>
      </div>
      <div>
        引用情况（考虑图表？）
      </div>
      <div v-if="relevantInstitution != ''">
        {{ $t('institution_relevant_institution') }}
        <span v-for="(institution, idx) in relevantInstitution" :key="idx">
          {{ institution.display_name }}
        </span>
      </div>
      <div>
        {{ $t('institution_URL') }}
        <a :href="institutionURL" target="_blank">
          {{ this.institutionURL }}
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import SearchResultListItem from '../../components/search-result-list/SearchResultListItem.vue'
import { Search } from '../../api/search'

export default {
  components: { 
    SearchResultListItem
  },
  data() {
    return {
      institutionName: '',
      institutionCountry: '',
      institutionTags: [],
      authorURL: '',
      institutionURL: '',
      relevantInstitution: [],
      institutionAuthors: [],
      paperURL: '',
      infoItems: [],
    }
  },
  created() {
    this.getInstitutionDetail()
  },
  methods: {
    getInstitutionDetail() {
      let institutionId = this.$route.params.id
      console.log(institutionId)
      if (institutionId) {
        Search.institutionRetrieve(institutionId).then(
          (response) => {
            console.log(response)
            this.institutionName = response.data.display_name
            this.institutionCountry = response.data.country_code
            this.authorURL = response.data.authors_api_url
            this.getAuthors(this.authorURL)
            this.institutionURL = response.data.homepage_url
            this.relevantInstitution = response.data.associated_institutions
            this.institutionTags = response.data.x_concepts
            this.paperURL = response.data.works_api_url
            this.getPapers(this.paperURL)
          }
        )
      }
    },
    getAuthors(url) {
      Search.getEntities(url).then(
        (response) => {
          this.institutionAuthors = response.data.results
        }
      )
    },
    getPapers(url) {
      Search.getEntities(url).then(
        (response) => {
          this.infoItems = response.data.results
          console.log(response.data)
        }
      )
    },
    gotoTag(tag) {
    //路由跳转到领域详情页 
    },
    gotoAuthor(author) {
      //路由跳转到学者详情页
    }
  }
}
</script>
<style scoped>
.institution-area {
  display: flex;
  justify-content: center;
}
.area {
  width: 70%;
}
.name {
  font-size: 35px;
}
.country {
  margin-left: 10px;
}
.author-list {
  font-size: 25px;
}
.tags {
  font-size: 25px;
}
.tag-item {
  margin: 0 5px 0 0;
}
.papers {
  font-size: 25px;
}
.author-tag-item {
  font-size: 16px;
  margin: 0 5px;
}
</style>
