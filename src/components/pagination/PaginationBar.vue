<template>
  <div class="pagination">
    <!-- 第一页 -->
    <button @click="firstPage">
      &lt;&lt;
    </button>
    <!-- 前一页 -->
    <button @click="prevPage" :disabled="currentPage === 1" :class="{ 'disabled': currentPage === 1 }">
      &lt;
    </button>
    <!-- 页面前省略号 -->
    <span
      v-if="currentPage - (currentPage > 2 ? (totalPages - currentPage > 2 ? 2 : 4 - (totalPages - currentPage)) : currentPage - 1) > 1">
      ... </span>
    <!-- 很多页码.显示前后五页 -->
    <button
      v-for="page in [...Array(Math.min(totalPages, currentPage + (currentPage > 2 ? (totalPages - currentPage > 2 ? 2 : totalPages - currentPage) : 5 - currentPage)) + 1).keys()]
        .slice(Math.max(1, currentPage - (currentPage > 2 ? (totalPages - currentPage > 2 ? 2 : 4 - (totalPages - currentPage)) : currentPage - 1)))"
      :key="page" @click="changePage(page)" :class="{ active: page === currentPage }">
      {{ page }}
    </button>
    <!-- 页面后省略号 -->
    <span
      v-if="currentPage + (currentPage > 2 ? (totalPages - currentPage > 2 ? 2 : totalPages - currentPage) : 5 - currentPage) < totalPages">
      ... </span>
    <button @click="nextPage" :disabled="currentPage === totalPages" :class="{ 'disabled': currentPage === totalPages }">
      &gt;
    </button>
    <button @click="lastPage">
      &gt;&gt;
    </button>
    <div>
      <span> 第 </span>
      <input type="number" v-model="jumpPage" @keydown.enter="jumpToPage" min="1" :max="totalPages"
        placeholder="Go to Page">
      <span> / {{ totalPages }} 页 </span>
      <button @click="jumpToPage"> 跳转 </button>

      <select :value="itemsPerPage" @change="$emit('item-per-page-change', Number($event.target.value))">
        <option :value="5">5</option>
        <option :value="10">10</option>
        <option :value="20">20</option>
        <option :value="50">50</option>
      </select>
      <span>条 / 页</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      jumpPage: 1,
    }
  },
  props: {
    currentPage: {
      type: Number,
      default: 1.
    },
    totalPages: {
      type: Number,
      default: 10
    },
    itemsPerPage: {
      type: Number,
      default: 10
    },
  },
  methods: {
    firstPage() {
      this.$emit('page-change', 1)
    },
    lastPage() {
      this.$emit('page-change', this.totalPages)
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.$emit('page-change', this.currentPage - 1)
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.$emit('page-change', this.currentPage + 1)
      }
    },
    changePage(page) {
      this.$emit('page-change', page)
    },
    jumpToPage() {
      if (this.jumpPage > 0 && this.jumpPage <= this.totalPages)
        this.$emit('page-change', this.jumpPage)
    }
  },
}
</script>

<style scoped>
/* Add your CSS styles for the pagination component here */
button {
  background: #222;
  margin: 10px 5px;
}

button.active {
  background: #777;
}

button.disabled {
  background: #000;
  color: #444;
  cursor: not-allowed;
}

select {
  background: #222;
  border-radius: 5px;
  cursor: pointer;
}
</style>