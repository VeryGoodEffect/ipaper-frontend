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
            这里是文章的标题<!-- 调接口 -->
          </div>
          <div class="paper-author">
            作者<!-- 调接口 -->
          </div>
          <div class="paper-institution">
            机构<!-- 调接口 -->
          </div>
        </div>
        <div class="paper-content">
          <div class="paper-abstract">
            {{ $t('paper_detail_abstract') }}
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
export default {
  methods: {
    collectPaper() {

    },
    citePaper() {

    },
    sharePaper() {

    },
    downloadPaper() {

    }
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
