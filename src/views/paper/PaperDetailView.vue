<template>
  <div class="paper-area">
    <div>
      <div class="paper-header">
        <div>{{ $t('public_date')}}{{ this.date }}</div>
        <div>
          <button class="button" @click="collectPaper">
            收藏<!-- 需要换成icon -->
          </button>
          <button class="button" @click="citePaper">
            引用<!-- 需要换成icon -->
          </button>
          <button class="button" @click="sharePaper">
            分享<!-- 需要换成icon -->
          </button>
        </div>
      </div>  
      <div class="paper-body">
        <div class="paper-head">
          <div class="paper-title">
            {{ this.title }}
          </div>
          <div class="paper-author" v-for="(authorship, idx) in this.authorships" :key="idx" 
            @click="gotoAuthorPage(authorship.author.id)">
            {{ authorship.author.display_name }}
          </div>
          <div class="paper-institution" v-for="(institution, idx) in this.institutions" :key="idx"
            @click="gotoInstitutionPage(institution.id)">
            {{ institution.display_name }}
          </div>
        </div>
        <div class="paper-content">
          <div class="paper-abstract">
            {{ $t('paper_detail_abstract') }}
            {{ this.abstract }}
          </div>
          <div class="paper-keywords" v-if="keywords.length != 0">
            {{ $t('paper_detail_keywords') }}
            <span class="paper-keyword" v-for="(keyword, idx) in this.keywords" :key="idx">
              {{ keyword }}
            </span>
          </div>
          <div class="paper-doi" v-if = "doi != ''">
            {{ $t('paper_detail_doi') }}
            <a :href="doi"> {{this.doi}} </a>
          </div>
          <div class="paper-source" v-if = "source != ''">
            {{ $t('paper_detail_source') }}
            {{ this.source }}
          </div>
          <div class="paper-tags">
            {{ $t('paper_detail_tag') }}
            <span class="paper-tag" v-for="(tag, idx) in this.tags" :key="idx">
              {{ tag.display_name }}
            </span>
          </div>
          <button @click="gotoPaperLandingURL">
            在线阅读
          </button>
          <button v-if="pdf_url != ''" @click="gotoPdfURL">
            PDF阅读
          </button>
          <button @click="downloadPaper">
            PDF下载
          </button>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
import { Search } from '../../api/search'
import { useRouter } from 'vue-router'
export default {
  data() {
    return {
      title: '暂无标题',
      authorships: [],
      institution: '暂无机构',
      abstract: '',
      keywords: [],
      doi: '',
      source: '',
      tags: [],
      date: '',
      pdf_url: '',
    }
  },
  created() {
    this.getPaperDetail()
  },
  methods: {
    getPaperDetail() {
      // let paperId = this.$route.params.paperId
      let paperId = 'W2911964244'
      if (paperId) {
        Search.workRetrieve(paperId).then(
          (response) => {
            this.title = response.data.title
            this.authorships = response.data.authorships
            this.institutions = response.data.authorships.institutions 
            if(response.data.abstract != null) {
              this.abstract = response.data.abstract
            }    
            this.keywords = response.data.keywords
            if(response.data.doi != null) {
              this.doi = response.data.doi
            }
            if(response.data.primary_location.source != null) {
              this.source = response.data.primary_location.source.display_name
            }
            this.tags = response.data.concepts
            this.date = response.data.publication_date
            if(response.data.primary_location.pdf_url != null) {
              this.pdf_url = response.data.primary_location.pdf_url
            } 
          }
        )
      }
    },
    collectPaper() {

    },
    citePaper() {

    },
    sharePaper() {
      var text = window.location.href;
      const type = 'text/plain';
      const blob = new Blob([text], { type });
      const data = [new ClipboardItem({ [type]: blob })];
      navigator.clipboard.write(data);
      alert('已复制到剪切板');
    },
    downloadPaper() {
    },
    gotoAuthorPage(id) {

    },
    gotoInstitutionPage(id) {

    },
    gotoPaperLandingURL() {
      window.open(this.doi, "_blank")
    },
    gotoPdfURL() {
      window.open(this.pdf_url, "_blank")
    },
  }
}
</script>

<style scoped>
.paper-area {
  display: flex;
  justify-content: center;
}
.paper-header {
  width: 1000px;
  display: flex;
  justify-content: space-between;
}
.paper-head {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.paper-body {
  width: 1000px;
}
.paper-title {
  text-align:center;
}
.paper-author {
  text-align:center;
}
.paper-institution {
  text-align:center;
}
.button {
  margin:0 10px;
}
</style>
