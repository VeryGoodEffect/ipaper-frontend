<template>
  <div class="institution-area">
    <div class="name">
      机构名称(国家)
    </div>
    <div class="author-list">
        机构主要作者
    </div>
    <div class="tags">
      机构重点领域
      <div v-for="(tag, idx) in tags" :key="idx" class="tag-item" @click="gotoTag(tag)">
        {{ tag }}
      </div>
    </div>
    <div class="papers">
      机构论文
    </div>
    <div>
      引用情况（考虑图表？）
    </div>
    <div>
      相关机构
    </div>
    <div>
      官网链接
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tags: [
        "农业", "医学", "软件工程"
      ]
    }
  },
  methods: {
    gotoTag(tag) {

    }
  }
}
</script>
<style scoped>
.institution-area {
  display: flex;
  justify-content: center;
}
.tags {
  display: flex;
  justify-content: flex-start;
}
</style>
