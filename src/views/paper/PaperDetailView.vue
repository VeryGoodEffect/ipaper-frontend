<template>
  <div class="paper-area">
    <div>
      <div class="paper-header">
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
      <div class="paper-body">
        <div class="paper-head">
          <div class="paper-title">
            {{ this.title }}
          </div>
          <div class="paper-author" v-for="(authorship, idx) in this.authorships" :key="idx">
            {{ authorship.author.display_name }}
          </div>
          <div class="paper-institution" v-for="(institution, idx) in this.institutions" :key="idx">
            {{ institution.display_name }}
          </div>
        </div>
        <div class="paper-content">
          <div class="paper-abstract">
            {{ $t('paper_detail_abstract') }}
            {{ this.abstract }}
          </div>
          <div class="paper-keywords">
            {{ $t('paper_detail_keywords') }}
          </div>
          <div class="paper-doi">
            {{ $t('paper_detail_doi') }}
          </div>
          <div class="paper-source">
            {{ $t('paper_detail_source') }}
          </div>
          <div class="paper-tag">
            {{ $t('paper_detail_tag') }}
          </div>
          <button>
            PDF阅读
          </button>
          <button @click="downloadPaper">
            下载
          </button>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
import { Search } from '../../api/search'
// import katex from 'katex';
// import 'katex/dist/katex.css'

export default {
  data() {
    return {
      title: '暂无标题',
      authorships: [],
      institution: '暂无机构',
      abstract: 'the number of order ${\mathit{N}}_{\mathrm{atoms}}^{3}$ operations',
      keywords: [],
      doi: '',
      source: '',
      tag: [],
    }
  },
  created() {
    this.getPaperDetail()
  },
  // computed: {
  //   renderedMarkdown() {
  //     return marked(this.abstract);
  //   }
  // },
  methods: {
    getPaperDetail() {
      // let paperId = this.$route.params.paperId
      let paperId = 'W2083222334'
      if (paperId) {
        Search.workRetrieve(paperId).then(
          (response) => {
            this.title = response.data.title
            this.institutions = response.data.authorships.institutions
            this.authorships = response.data.authorships
            if(response.data.abstract != null) {
              this.abstract = response.data.abstract
            }            
            this.keywords = response.data.keywords
          }
        )}
      }
    },
    // renderFormula() {
    //   this.$el.innerHTML = "\\[ " + this.abstract + " \\]";
    //   MathJax.typeset([this.$el]);
    // },
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
  justify-content: flex-end;
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
