<template>
  <div class="paper-area">
    <div>
      <div class="paper-header">
        <div>{{ $t('public_date')}}{{ this.date }}</div>
        <div class="button-container">
          <div class="button-circle" @click="collectPaper">
            <svg t="1703230769981" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6848" width="200" height="200"><path d="M512 800.427L290.859 892.8a42.667 42.667 0 0 1-58.966-42.965l20.054-236.928L95.659 433.195a42.667 42.667 0 0 1 22.528-69.547l233.088-54.23 124.288-203.86a42.667 42.667 0 0 1 72.874 0l124.246 203.86 233.088 54.187a42.667 42.667 0 0 1 22.528 69.547L772.01 612.907l20.096 236.928A42.667 42.667 0 0 1 733.14 892.8L512 800.47z m-189.141-13.44L512 707.968l189.141 79.019-17.194-202.838 133.461-153.472-198.912-46.293L512 209.749 405.504 384.384l-198.912 46.293L340.053 584.15 322.86 786.987z" p-id="6849"></path></svg>
          </div>
          <div class="button-circle" @click="citePaper">
            <svg t="1703230919351" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12214" width="200" height="200"><path d="M563.2 607.168a52.224 52.224 0 0 1 0-0.192v-0.064-0.192a460.48 460.48 0 0 1 223.104-394.56 51.2 51.2 0 0 1 52.928 87.68A359.04 359.04 0 0 0 699.648 454.4 153.472 153.472 0 1 1 563.2 607.168z m-409.6 0a52.224 52.224 0 0 1 0-0.192v-0.064-0.192a460.48 460.48 0 0 1 223.104-394.56 51.2 51.2 0 0 1 52.928 87.68A359.04 359.04 0 0 0 290.048 454.4 153.472 153.472 0 1 1 153.6 607.168z" p-id="12215"></path></svg>
          </div>
          <div class="button-circle" @click="sharePaper">
            <svg t="1703230967193" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14131" width="200" height="200"><path d="M769.714 589.547c-51.754 0-97.702 24.851-126.571 63.269L394.479 528.059c3.93-13.798 6.034-28.364 6.034-43.424 0-16.496-2.527-32.399-7.211-47.35l247.724-124.288c28.71 40.052 75.647 66.151 128.687 66.151 87.388 0 158.229-70.84 158.229-158.229 0-87.388-70.841-158.229-158.229-158.229-87.389 0-158.229 70.841-158.229 158.229 0 6.046 0.352 12.009 1.011 17.88L351.22 369.884c-28.371-26.943-66.723-43.479-108.938-43.479-87.388 0-158.229 70.84-158.229 158.229s70.84 158.229 158.229 158.229c43.752 0 83.354-17.758 111.997-46.459l258.676 129.779c-0.964 7.062-1.474 14.266-1.474 21.592 0 87.389 70.84 158.229 158.229 158.229s158.229-70.84 158.229-158.229C927.938 660.388 857.103 589.547 769.714 589.547L769.714 589.547z" p-id="14132"></path></svg>
          </div>
        </div>
      </div>  
      <div class="paper-body">
        <div class="paper-head">
          <h3 class="paper-title">
            {{ this.title }}
          </h3>
          <div class="author-container">
            <div class="paper-author" v-for="(authorship, idx) in this.authorships" :key="idx" 
              @click="gotoAuthorPage(authorship.author.id)">
              {{ authorship.author.display_name }}
            </div>
          </div>
          <div class="paper-institution" v-for="(institution, idx) in this.institutions" :key="idx"
            @click="gotoInstitutionPage(institution.id)">
            {{ institution.display_name }}
          </div>
        </div>
        <div class="paper-content">
          <div  class="paper-abstract">
            <h4 class="little-title"> 
              {{ $t("paper_detail_abstract") }}
            </h4>
            <p class="abstract-wrapper">
              {{ this.abstract }}
            </p>
            <!-- <vue-latex :displayMode="true"  :expression="this.displayAbstract"></vue-latex> -->
            <!-- <p v-html=this.displayAbstract></p> -->
          </div>
          <div class="paper-keywords" v-if="keywords.length != 0">
            <h4 class="little-title"> 
            {{ $t('paper_detail_keywords') }}
            </h4>
            <span class="paper-keyword" v-for="(keyword, idx) in this.keywords" :key="idx">
              {{ keyword }}
            </span>
          </div>
          <div class="paper-doi" v-if = "doi != ''">
            <h4 class="little-title"> 
            {{ $t('paper_detail_doi') }}
            </h4>
            <a :href="doi" target="_blank"> {{this.doi}} </a>
          </div>
          <div class="paper-articles" v-if = "doi != ''">
            <h4 class="little-title"> 
            {{ $t('paper_detail_relevant_articles') }}
            </h4>
            <div class="relevant-articles" v-for="(article, idx) in this.relevantArticles" :key="idx" @click="gotoAnotherPaper(article)">
              {{ article.title }}
            </div>
          </div>
          <div class="paper-source" v-if = "source != ''">
            <h4 class="little-title"> 
            {{ $t('paper_detail_source') }}
            </h4>
            {{ this.source }}
          </div>
          
          <button class="basic-btn-outline function-btn" @click="gotoPaperLandingURL" >
            {{ $t('paper_detail_read_online') }}
          </button>
          <button class="basic-btn-outline function-btn" v-if="pdf_url != ''" @click="gotoPdfURL">
            {{ $t('paper_detail_readPDF') }}
          </button>
          <button class="basic-btn-outline function-btn" v-if="pdf_url != ''" @click="downloadPaper" >
           {{ $t('paper_detail_downloadPDF') }}
          </button>
        </div>
      </div>
    </div>
  </div>
  <ChooseFavoriteModal :paperId="paperId" :show="collectModalShouldShow" @close="collectModalShouldShow = false"/>
  <CiteModal :citations="citations" :show="citeModalShouldShow" @close="citeModalShouldShow = false"/>
</template>

<script>
import { useRouter } from 'vue-router'
import { Search } from "../../api/search";
import ChooseFavoriteModal from '../../components/modals/ChooseFavoriteModal.vue';
import CiteModal from '../../components/modals/CiteModal.vue';

// import katex from 'katex';
// import 'katex/dist/katex.css'
// import { VueLatex } from "vatex";

export default {
  components: {
    ChooseFavoriteModal,
    CiteModal
},
  watch: {
    '$route.params.id': {
      immediate: true,
      handler(newVal, oldVal) {
        this.getPaperDetail()
      },
    },
  },
  data() {
    return {
      paperId: undefined,
      title: "暂无标题",
      authorships: [],
      institution: '暂无机构',
      abstract: '',
      keywords: [],
      doi: '',
      source: '',
      tags: [],
      date: '',
      pdf_url: '',
      citations: [],
      collectModalShouldShow: false,
      citeModalShouldShow: false,
      relevantArticles: [],
    }
  },
  created() {
    this.getPaperDetail()
  },
  methods: {
    getPaperDetail() {
      this.paperId = this.$route.params.id
      if (this.paperId) {
        Search.workRetrieve(this.paperId).then(
          (response) => {
            // console.log(response)
            // console.log(1111)
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
              var result = response.data.primary_location.source.display_name.replace(/=/g, "");
              this.source = result
            }
            this.tags = response.data.concepts
            this.date = response.data.publication_date
            if(response.data.primary_location.pdf_url != null) {
              this.pdf_url = response.data.primary_location.pdf_url
            }
            this.citations = response.data.citations
            this.related_works_count = response.data.related_works_count
            if(response.data.related_works_count > 0) {
              this.getRelatedArticles(response.data.related_works_api_url) 
            }
          }
        )
      }
    },
    // formatAbstract() {
    //   // 转换LaTeX公式的特殊字符

    //   var regex = /\$/g;
    //   this.abstract = this.abstract.replace(regex, "");
      
    // },

    // renderFormula() {
    //   this.$el.innerHTML = "\\[ " + this.abstract + " \\]";
    //   MathJax.typeset([this.$el]);
    // },

    collectPaper() {
      this.collectModalShouldShow = true
    },
    citePaper() {
      this.citeModalShouldShow = true
    },
    sharePaper() {
      var text = window.location.href;
      const type = "text/plain";
      const blob = new Blob([text], { type });
      const data = [new ClipboardItem({ [type]: blob })];
      navigator.clipboard.writeText(text);
      this.$bus.emit('message', { title: this.$t('already_copied'), content: text, time: 3000 })
      // alert("已复制到剪切板");
    },
    downloadPaper(event) {
      // event.preventDefault()
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = 'https://www.isound.live/api/download?url=' + this.pdf_url + '&filename=' + this.title + '.pdf'
      
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    getRelatedArticles(url) {
      Search.getEntities(url).then(
        (response) => {
          console.log(response)
          // console.log(222)
          // console.log(this.institutionAuthors)
          this.relevantArticles = []
          if(this.related_works_count <= 3) {
            this.relevantArticles = response.data.results
          }
          else {
            for(let i = 0; i < 3; i++) {
              this.relevantArticles.push(response.data.results[i])
            }
          }
          console.log(this.relevantArticles)
        }
      )
    },
    gotoAuthorPage(id) {
      this.$router.push('/scholar_portal/' + id);
    },
    gotoInstitutionPage(id) {

    },
    gotoPaperLandingURL() {
      window.open(this.doi, "_blank")
    },
    gotoPdfURL() {
      window.open(this.pdf_url, "_blank")
    },
    gotoAnotherPaper(article) {
      this.$router.push('/paper_detail/' + article.id);
    },
  }
}
</script>

<style scoped>
.paper-area {
  display: flex;
  justify-content: center;
  width: 80%;
  margin: 0 auto;
  /* border: 2px solid red; */
}
.paper-header {
  margin-top: 20px;
  width: 100%;
  /* border: 2px solid red;  */
  display: flex;
  justify-content: space-between;
}
.paper-header :first-child {
  font-size: 15px;
  font-weight: bold;
  color: var(--theme-color-60)
}
.paper-head {
  display: flex;
  margin-top: 10px;
  flex-direction: column;
  justify-content: center;
}
.paper-body {
  width: 100%;
}
.paper-title {
  width: 80%;
  margin: 0 auto;
  text-align: center;
  font-size: 35px;
  margin-bottom: 10px;
  font-weight: bold;
}
.author-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.paper-author {
  text-align: center;
  cursor: pointer;
  /* border: 2px solid red; */
  min-width: 100px;
  /* width: 100px; */
  color: var(--theme-color);
  margin-right: 20px;
}
.paper-author:hover {
  text-decoration: underline;
}
.paper-author :hover {
  text-decoration: underline;
}
.paper-institution {
  text-align: center;
}
.button-container {
  display: flex;
}
.button-circle {
  margin: 0 10px;
  width: 40px;
  height: 40px;
  background: var(--theme-mode-slight-contrast);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: .5s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.button-circle:hover {
  background: var(--theme-mode-contrast);
  transform: translate(-3px, -3px) scale(1.2);
}

.button-circle:hover svg {
  transition: .5s cubic-bezier(0.075, 0.82, 0.165, 1);
  scale: 1.05;
}

/* .button-long {
  margin: 0 10px;
  width: 40px;
  height: 40px;
  background-color: var(--theme-mode-slight-contrast);
  width: 90px;
} */
.icon {
  width: 25px;
  height: 25px;
  fill: var(--theme-color)
}
.paper-content {
  width: 80%;
  margin: 30px auto;
  /* border: 2px red solid; */
  box-sizing: border-box;
  padding: 25px 40px;
  background-color: var(--theme-mode-like);
  box-shadow: 5px 5px 5px var(--theme-mode-contrast);
  border-radius: 10px;
}
.little-title {
  margin-bottom: 10px;
  font-weight: bold;
}
.paper-keywords {
  margin-top: 30px;
  border-top: 1px solid var(--theme-mode-high-contrast);
}
.paper-keywords h4 {
  margin-top: 30px;
}
.paper-doi, .paper-source, .paper-tags {
  margin-top: 10px;
}
.paper-source {
  margin-bottom: 20px;
}

.paper-keywords h4,
.paper-doi h4,
.paper-articles h4,
.paper-source h4 {
  display: inline-block;
  margin-right: 20px;
}

.function-btn {
  font-size: 16px;
}

.function-btn:not(:last-of-type) {
  margin-right: 10px;
}
p.abstract-wrapper {
  /* overflow-wrap: break-word; */
  word-wrap: break-word;
  /* word-break: break-all; */
}
.relevant-articles {
  margin-bottom: 5px;
  color: var(--theme-color);
  cursor: pointer;
  margin-left: 10px;
}
.paper-articles :hover {
  text-decoration: underline;
}
</style>
