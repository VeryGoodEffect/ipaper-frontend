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
    <div class="flatten"> {{ $t('pagination_current_page_1') }} </div>
    <input v-model="jumpPage" @input="handleJumpNumberInput" @keydown.enter="jumpToPage" min="1" :max="totalPages" placeholder="Go to Page"
      class="jump_page_number flatten">
    <div class="flatten"> / {{ totalPages }} {{ $t('pagination_current_page_2') }} </div>
    <button @click="jumpToPage"> {{ $t('pagination_jump') }} </button>
    <select class="flatten" :value="itemsPerPage" @change="$emit('item-per-page-change', Number($event.target.value))">
      <option :value="5">5</option>
      <option :value="10">10</option>
      <option :value="20">20</option>
      <option :value="50">50</option>
    </select>
    <div class="flatten">{{ $t('pagination_per_page') }}</div>
  </div>
</template>

<script>
import i18n from '../../language'
export default {
  components: {
    i18n
  },
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
    },
    handleJumpNumberInput() {
      if (!/^[1-9]\d*$/.test(this.jumpPage)) {
        this.jumpPage=this.currentPage
      }
      else {
        this.jumpPage=parseInt(this.jumpPage)
      }
    }
  },
}
</script>

<style scoped>
.pagination {
  font-weight: 700;
  width: 80%;
  display: flex;
  justify-content: space-between;
}

.pagination div {
  color: var(--theme-color);
}

button {
  background: var(--theme-mode-like);
  color: var(--theme-color);
  font-weight: 700;
  margin: 10px 5px;
}
button:hover{
  background: var(--theme-mode-contrast);
}
button.active {
  background: var(--theme-color);
  color: rgb(243, 243, 243);
}

button.disabled {
  background: rgba(#777, 0.3);
  color: var(--theme-color-50);
  cursor: not-allowed;
}

select {
  background: var(--theme-mode);
  color: var(--theme-color);
  border-radius: 5px;
  cursor: pointer;
}

select option {
  color: var(--theme-color);
  transition: all linear 0.5s;
}

.jump_page_number {
  color: var(--theme-color);
  background: var(--theme-mode-like);
  border: 1px solid var(--theme-mode-contrast) ;
  border-radius: 5px;
  padding: 5px;
  max-width: 100px;
}

.flatten {
  display: ruby;
  margin: auto 10px;
}


</style>