<template>
  <div v-if="this.$i18n.locale == 'en'">
    {{ tagName }}
  </div>
  <div v-else>
    {{ tagNameZh }}
  </div>
  <div>
    {{ $t('tag_detail_wiki') }}
    <a :href="this.wikiURL">{{ this.wikiURL }}</a>
  </div>
  <div>
    {{ $t('tag_detail_paper') }}
    <SearchResultListItem v-for="(info,index) in infoItems" :key="index" :infoItem="info"></SearchResultListItem>
  </div>
  <div>
    {{ $t('tag_detail_institution') }}
    <div v-for="(institution, idx) in institutions" :key="idx">
      <div v-if="this.$i18n.locale == 'en'"> 
        {{ institution.display_name }}
      </div>
      <div v-else>
        {{ institution.display_name_zh }}
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
    infoItems: [
      {
      title: "低碳经济: 人类经济发展方式的新变革",
      author: "鲍健强， 苗阳， 陈锋 - 中国工业经济, 2008 - cqvip.com",
      excerpt: "低碳经济(Low-carbon Economy)是未来经济发展方式的新选择.本文从大时空跨度和能源利用方conomy)是未来经济发展方式的新选择.本文从大时空跨度和能源利conomy)是未来经济发展方式的新选择.本文从大时空跨度和能源利conomy)是未来经济发展方式的新选择.本文从大时空跨度和能源利conomy)是未来经济发展方式的新选择.本文从大时空跨度和能源利conomy)是未来经济发展方式的新选择.本文从大时空跨度和能源利conomy)是未来经济发展方式的新选择.本文从大时空跨度和能源利式上,分析了人类经济发展形态演变历程;探讨了低碳经济… 了低碳经济产生与发展.本文研究了低碳",
      timeCited: 57,
      keyword: "经济"
      }
    ],
    }
  },
  created() {
    this.getTagDetail()
  },
  methods: {
    getTagDetail() {
      let tagId = 'C41008148'
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
  }
}
</script>
<style scoped>

</style>
