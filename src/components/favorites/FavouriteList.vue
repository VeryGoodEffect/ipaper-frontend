<template>
  <!-- <button>Create</button> -->
      <!-- <CreateFav v-if=isCreating /> -->
      <!-- 
        - input
        - button: check cross
        - emit
       -->
  <div class="favourite-list" ref="container">
    <CreateFavourite
    v-if="isCreating"
    @cancelCreation="cancelCreation"
    @updateCreation="updateCreation"></CreateFavourite>
    <FavouriteListItem 
      v-for="(info, index) in favouritesInfo" :key="index"
      :favourites="favouritesInfo[index]" 
      @showFavoriteDetail="showFavoriteDetail(info.id)"
      @IWantToShow="letItShow(index)"
      @deleteFavourites="handleDelete(index)"
    />
  </div>

  <!-- <PopoutModal :show="isPopout" @close="isPopout = false">
    <h3>{{ popoutInfo.name }}</h3>
    <div class="favourite-list" ref="container-1"> -->
    <!-- <FavouriteListItem 
      v-for="(info, index) in favouritesInfo" :key="index"
      :favourites="favouritesInfo[index]" 
      @showFavoriteDetail="showFavoriteDetail(index)"
      @IWantToShow="letItShow(index)"
      @deleteFavourites="handleDelete(index)"
    /> -->

  <!-- </div>
  </PopoutModal> -->
  <FavorateContentModal :favoriteId="favoriteId" :show="favorateContentModalShouldShow" @close="favorateContentModalShouldShow = false"/>
</template>

<script>
import CreateFavourite from './CreateFavourite.vue'
import FavouriteListItem from './FavouriteListItem.vue'
import { User } from '../../api/users.js'
import FavorateContentModal from '../modals/FavorateContentModal.vue'
export default {
  name: 'FavouriteList',
  props: ['isCreating', 'favouritesInfo'],
  components: {
    FavouriteListItem,
    CreateFavourite,
    FavorateContentModal
  },
  emits: {
    cancelCreation: null,
    updateCreation: null,
  },
  data() {
    return {
      isPopout: false,
      popoutInfo: {
        name: '',
        id: '',
      },
      favoriteId: '',
      favorateContentModalShouldShow: false
    }
  },
  mounted() {
    window.addEventListener('click', this.closeAllContextMenu)
    this.$refs.container.addEventListener('wheel', this.changeScrollOrient)
  },
  beforeUnmount() {
    window.removeEventListener('click', this.closeAllContextMenu)
    this.$refs.container.removeEventListener('wheel', this.changeScrollOrient)
  },
  methods: {
    handleDelete(index) {
      console.log("111")
      // console.log(this.favouritesInfo[index].id + this.favouritesInfo[index].name)
      User.deleteFavorite(this.favouritesInfo[index].id).then(
          (response) => {
            console.log(response)
          },
          (error) => {
            console.log(error)
          }
        )
      this.favouritesInfo.splice(index, 1)
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
    },
    changeScrollOrient(e) {
      if (e.deltaX === 0 && Math.abs(e.deltaY) > 80) {
        e.preventDefault()
        this.$refs.container.scrollLeft += e.deltaY * 2
      }
    },
    showFavoriteDetail(infoId) {
      // this.popoutInfo = this.favouritesInfo[index]
      // this.isPopout = true
      this.favorateContentModalShouldShow = true
      this.favoriteId = infoId
    },
  }
}
</script>

<style scoped>
.favourite-list {
  display: flex;
  overflow-x: auto;
}
.favourite-list::-webkit-scrollbar {
  display: none;
}
/* .list-item {
  margin-right: 10px;
} */
</style>