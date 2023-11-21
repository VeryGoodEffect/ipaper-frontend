<template>
  <div>
    <!-- 条目显示 -->
    <div ref="container" class="page-content">
      <slot>
      <searchItem :infoItem="infoItem"> 
      </searchItem>
      <searchItem :infoItem="infoItem"> 
      </searchItem>
      <searchItem :infoItem="infoItem"> 
      </searchItem>
      <searchItem :infoItem="infoItem"> 
      </searchItem>
      <searchItem :infoItem="infoItem"> 
      </searchItem>
      </slot>
    </div>
    <!-- Pagination Component -->
    <pagination-bar :itemsPerPage="itemsPerPage" :current-page="currentPage" :total-pages="totalPages"
      @page-change="changePage" @item-per-page-change="changeItemsPerPage" />
  </div>
</template>

<script>
import PaginationBar from './PaginationBar.vue'
import searchItem from '../../components/searchResultList/searchResultListItem.vue';
export default {
  components: {
    PaginationBar,
    searchItem,
  },
  data() {
    return {
      currentPage: 0,
      totalPages: 0,
      clickable: true,
      itemsPerPage: this.defaultItemsPerPage,

      // item information
      infoItem: {
        title: "低碳经济: 人类经济发展方式的新变革",
        author: "鲍健强， 苗阳， 陈锋 - 中国工业经济, 2008 - cqvip.com",
        excerpt: "低碳经济(Low-carbon Economy)是未来经济发展方式的新选择.本文从大时空跨度和能源利用方式上,分析了人类经济发展形态演变历程;探讨了低碳经济… 了低碳经济产生与发展.本文研究了低碳",
        timeCited: 57,
        keyword: "经济"
      },
    }
  },
  props: {
    defaultItemsPerPage: {
      type: Number,
      default: 10
    }
  },
  methods: {
    changePage(page) {
      //延时生效以防止有人乱按
      if (this.clickable) {
        this.clickable = false
        setTimeout(() => this.clickable = true, 200)
        this.currentPage = page
      }
    },
    changeItemsPerPage(itemsPerPage) {
      console.log(itemsPerPage, this.itemsPerPage)
      this.itemsPerPage = itemsPerPage
      console.log(itemsPerPage, this.itemsPerPage)
    }
  },
  watch: {
    // 'this.$refs.container.children.length'() {
    //   this.totalPages = Math.ceil(this.$refs.container.children.length / this.itemsPerPage)
    // },
    itemsPerPage() {
      this.totalPages = Math.ceil(this.$refs.container.children.length / this.itemsPerPage)
    },
    totalPages() {
      this.currentPage = 1
      let container = document.querySelector('.page-content')
      Object.values(this.$refs.container.children).forEach((node, index) => {
        if (index >= (this.currentPage - 1) * this.itemsPerPage && index < this.currentPage * this.itemsPerPage) {
          node.style.display = ""
        }
        else {
          node.style.display = "none"
        }
      })
    },
    currentPage(newval) {
      let container = document.querySelector('.page-content')
      Object.values(this.$refs.container.children).forEach((node, index) => {
        if (index >= (newval - 1) * this.itemsPerPage && index < newval * this.itemsPerPage) {
          node.style.display = ""
        }
        else {
          node.style.display = "none"
        }
      })
    }

  },
  mounted() {
    this.totalPages = Math.ceil(this.$refs.container.children.length / this.itemsPerPage)
  }
}
</script>

<style scoped></style>