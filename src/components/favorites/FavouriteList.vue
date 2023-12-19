<template>
  <!-- <button>Create</button> -->
      <!-- <CreateFav v-if=isCreating /> -->
      <!-- 
        - input
        - button: check cross
        - emit
       -->
  <div class="favourite-list-list">
    <CreateFavourite
    v-if="isCreating"
    @cancelCreation="cancelCreation"
    @updateCreation="updateCreation"></CreateFavourite>
    <FavouriteListItem 
      v-for="(info, index) in favouritesInfo" :key="index"
      :favourites="favouritesInfo[index]" 
      @IWantToShow="letItShow(index)"
      @deleteFavourites="handleDelete(index)"
    />
  </div>
</template>

<script>
import CreateFavourite from './CreateFavourite.vue'
import FavouriteListItem from './FavouriteListItem.vue'
export default {
  name: 'FavouriteList',
  props: ['isCreating', 'favouritesInfo'],
  components: {
    FavouriteListItem,
    CreateFavourite,
  },
  emits: {
    cancelCreation: null,
    updateCreation: null,
  },
  data() {
    return {
      
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
      console.log("111")
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
    },
    cancelCreation() {
      this.$emit('cancelCreation')
    },
    updateCreation(name) {
      this.$emit('updateCreation', name)
    }
  }
}
</script>

<style scoped>
.favourite-list-list {
  display: flex;
  overflow-x: auto;
}
.favourite-list-list::-webkit-scrollbar {
  display: none;
}
/* .list-item {
  margin-right: 10px;
} */
</style>