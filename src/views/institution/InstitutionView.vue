<template>
  <div class="institution-area">
    <div class="area">
      <div>
        <p class="name" v-if="this.$i18n.locale == 'en'">{{ institutionName }}</p>
        <p class="name" v-else>{{ institutionNameZh }}</p>
        <p class="country">{{ institutionCountry }}</p>
      </div>
      <div class="graph-and-author">
        <div class="left-row">
          <h4 class="achievement">
            {{ $t('institution_achievement') }}
          </h4>
          <InstitutionGraph :info="counts_by_year" class="graph"></InstitutionGraph>
          <div>
            <h4 class="tags">
            {{ $t('institution_main_tag') }}
            </h4>
            <div class="tags-list">
              <div v-for="(tag, idx) in institutionTags" :key="idx" class="tag-item" @click="gotoTag(tag)">
                {{ tag.display_name }}
              </div>
            </div>
          </div>
            <div v-if="relevantInstitution != ''">
              <p class="tags">
                {{ $t('institution_relevant_institution') }}
              </p>
              <div class="institution-relevant-institution-list">
                <div v-for="(institution, idx) in relevantInstitution" :key="idx" class="relevant-institution"
                @click="gotoRelevantInstitution(institution)">
                  {{ institution.display_name }}
                </div>
              </div>
          </div>
          <div>
            <p class="tags">
               {{ $t('institution_URL') }}
            </p>

            <a :href="institutionURL" target="_blank" class="institution-url">
              {{ this.institutionURL }}
            </a>
          </div>
            <div class="author-list">
              <p class="tags">
                {{ $t('institution_main_scholar') }}
              </p>
              
              <div v-for="(author, idx) in institutionAuthors" :key="idx" @click="gotoAuthor(author)" class="author-name">
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
        
        <div class="paper-list">
          <div class="papers">
            <p class="author-title">
              {{ $t('institution_main_papers') }}
            </p>
            
            <Pagination :defaultItemsPerPage="5">
              <SearchResultListItem v-for="(info,index) in infoItems" :key="index" :infoItem="info"></SearchResultListItem>
            </Pagination>
          </div>
        </div>
      </div>
    
      <div>
        <!-- <InstitutionGraphCite :info="counts_by_year"></InstitutionGraphCite> -->
      </div>
    </div>
  </div>
</template>
<script>
import SearchResultListItem from '../../components/search-result-list/SearchResultListItem.vue'
import { Search } from '../../api/search'
import InstitutionGraph from '../../components/graphs/InstitutionGraph.vue'
import InstitutionGraphCite from '../../components/graphs/InstitutionGraphCite.vue'
import Pagination from "../../components/pagination/Pagination.vue"
export default {
  components: { 
    SearchResultListItem,
    InstitutionGraph,
    InstitutionGraphCite,
    Pagination,
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
  watch: {
    '$route.params.id': {
      immediate: true,
      handler(newVal, oldVal) {
        this.getInstitutionDetail()
      },
    },
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
            this.institutionNameZh = response.data.display_name_zh
            this.institutionCountry = response.data.country_code
            this.authorURL = response.data.authors_api_url
            this.getAuthors(this.authorURL)
            this.institutionURL = response.data.homepage_url
            this.relevantInstitution = response.data.associated_institutions
            this.institutionTags = response.data.x_concepts
            this.paperURL = response.data.works_api_url
            // alert("counts_by_year"+response.data.counts_by_year)
            this.counts_by_year = response.data.counts_by_year
            this.getPapers(this.paperURL)
          }
        )
      }
    },
    getAuthors(url) {
      Search.getEntities(url).then(
        (response) => {
          console.log(response)
          this.institutionAuthors = []
          for(let i = 0; i < 10; i++) {
            this.institutionAuthors.push(response.data.results[i])
          }
          // console.log(this.institutionAuthors)
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
      this.$router.push('/tag_detail/' + tag.id)
    },
    gotoRelevantInstitution(institution) {
      this.$router.push('/institution_detail/' + institution.id)
      // location.reload()
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
  width: 80%;
}
.name {
  font-size: 35px;
  font-weight: bold;
  margin: 0 auto;
  text-align: center;
  /* border: 2px red solid; */
  width: 80%;
}
.country {
  /* margin-left: 10px; */
  width: 80%;
  margin: 0 auto;
  text-align: center;
  margin-top: 10px;
  font-size: 20px;
  /* font-weight: bold; */
}
.graph-and-author {
  display: flex;
  margin-top: 20px;
}
.left-row {
  width: 50%;
}
.graph {
  /* width: 300px; */
  width: 50%;
}
.paper-list {
  font-size: 25px;
  width: 50%;
  border-left: 2px solid var(--theme-mode-contrast);
  padding-left: 30px;
}
.tags {
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
  /* padding-left: 10px; */
}
.tags-list {
  padding-left: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
}
.tags-list :hover {
  text-decoration: underline;
}
.tag-item {
  /* margin: 0 5px 0 0; */
  margin-bottom: 10px;
  margin-right: 10px;
  /* border: 2px solid red; */
  color: var(--theme-color);
  cursor: pointer;
}
.papers {
  font-size: 25px;
}
.author-tag-item {
  font-size: 16px;
  margin: 0 5px;
}
.achievement {
  font-size: 18px;
  font-weight: bold;
  /* margin: 10px 0; */
}
.institution-relevant-institution-list {
  display: flex;
  flex-wrap: wrap;
  margin-left: 10px;
}

.institution-relevant-institution-list :hover {
  text-decoration: underline;
}
.relevant-institution {
  color: var(--theme-color);  
  cursor: pointer;
  margin-bottom: 10px;
  margin-right: 10px;
}
.institution-url {
  margin-left: 10px;
  word-wrap: break-word;
}
.author-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}
.author-name {
  color: var(--theme-color);  
  cursor: pointer;
  margin-bottom: 10px;
  margin-right: 10px;
  display: flex;
  flex-wrap: wrap;
}

@media screen and (max-width: 768px) {
  .graph-and-author {
    display: block;
  }
  .left-row {
    width: 100%;
  }
  .paper-list {
    font-size: 25px;
    width: 100%;
    border-left: unset;
    padding-left: unset;
  }
}
</style>
