<template>
  <!-- <button>Create</button> -->
  <Pagination class="pagination">
      <!-- <CreateFav v-if=isCreating /> -->
      <!-- 
        - input
        - button: check cross
        - emit
       -->
      <FavouriteListItem 
        v-for="(info, index) in favouritesInfo" :key="index"
        :favourites="favouritesInfo[index]" 
        @IWantToShow="letItShow(index)"
      />
  </Pagination>
</template>

<script>
import FavouriteListItem from './FavouriteListItem.vue'
import Pagination from '../pagination/Pagination.vue'
export default {
  name: 'FavouriteList',
  components: {
    FavouriteListItem,
    Pagination,
  },
  data() {
    return {
      favouritesInfo: [
        {
          name: "感兴趣的内容",
          isCreating: false,
          showContextMenu: false
        },
        {
          name: "我的收藏",
          isCreating: false,
          showContextMenu: false
        }, 
        {
          name: "量子力学",
          isCreating: false,
          showContextMenu: false
        }, 
        {
          name: "有机化学",
          isCreating: false,
          showContextMenu: false
        }, 
        {
          name: "Diffusion model",
          isCreating: false,
          showContextMenu: false
        }, 
        {
          name: "CV",
          isCreating: false,
          showContextMenu: false
        }
      ],
      
      
    }
  },
  mounted() {
    window.addEventListener('click', this.closeAllContextMenu)
  },
  beforeUnmount() {
    window.removeEventListener('click', this.closeAllContextMenu)
  },
  methods: {
    handleDelete(index) {
      this.favouritesInfo.splice(index, 1)
      // 调用接口
    },
    letItShow(index) {
      this.favouritesInfo[index].showContextMenu = true
      for (let i = 0 ; i < this.favouritesInfo.length; i++) {
        if (i !== index) {
          this.favouritesInfo[i].showContextMenu = false
        }
      }
    },
    closeAllContextMenu() {
      for (let i = 0 ; i < this.favouritesInfo.length; i++) {
        this.favouritesInfo[i].showContextMenu = false
      }
    }
  }
}
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>