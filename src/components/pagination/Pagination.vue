<template>
  <div>
    <!-- 条目显示 -->
    <div ref="container" class="page-content">
      <slot>
      </slot>
    </div>
    <!-- Pagination Component -->
    <pagination-bar :items-per-page="itemsPerPage" :current-page="currentPage" :total-pages="totalPages"
      @page-change="changePage" @item-per-page-change="changeItemsPerPage" />
  </div>
</template>

<script>
import PaginationBar from './PaginationBar.vue'
export default {
  name: "Pagination",
  components: {
    PaginationBar,
  },
  data() {
    return {
      clickable: true,
    }
  },
  props: {
    itemsPerPage: {
      type: Number,
      default: 5
    },
    currentPage: {
      type:Number,
      required: true,
      default:1
    },
    totalPages:{
      type: Number,
      required: true,
      default:1
    }
  },
  methods: {
    changePage(page) {
      //延时生效以防止有人乱按
      if (this.clickable) {
        this.clickable = false
        setTimeout(() => this.clickable = true, 200)
        this.$emit('change-page',page)
        // this.currentPage = page
      }
    },
    changeItemsPerPage(itemsPerPage) {
      console.log(itemsPerPage, this.itemsPerPage)
      // this.itemsPerPage = itemsPerPage
      this.$emit('change-item-per-page',itemsPerPage)
      console.log(itemsPerPage, this.itemsPerPage)
    }
  },
  // watch: {
    // 'this.$refs.container.children.length'() {
    //   this.totalPages = Math.ceil(this.$refs.container.children.length / this.itemsPerPage)
    // },
    // itemsPerPage() {
    //   this.totalPages = Math.ceil(this.$refs.container.children.length / this.itemsPerPage)
    // },
    // totalPages() {
    //   this.currentPage = 1
    //   let container = document.querySelector('.page-content')
    //   Object.values(this.$refs.container.children).forEach((node, index) => {
    //     if (index >= (this.currentPage - 1) * this.itemsPerPage && index < this.currentPage * this.itemsPerPage) {
    //       node.style.display = ""
    //     }
    //     else {
    //       node.style.display = "none"
    //     }
    //   })
    // },
    // currentPage(newval) {
    //   let container = document.querySelector('.page-content')
    //   Object.values(this.$refs.container.children).forEach((node, index) => {
    //     if (index >= (newval - 1) * this.itemsPerPage && index < newval * this.itemsPerPage) {
    //       node.style.display = ""
    //     }
    //     else {
    //       node.style.display = "none"
    //     }
    //   })
    // }
  // },
}
</script>