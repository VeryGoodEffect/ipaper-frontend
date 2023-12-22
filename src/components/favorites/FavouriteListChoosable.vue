<template>
  <div class="favourite-list" ref="container">
    <CreateFavourite
      v-if="isCreating"
      @cancelCreation="cancelCreation"
      @updateCreation="updateCreation"
    >
    </CreateFavourite>
    <FavouriteListItemChoosable 
      v-for="(info, index) in favouritesInfo" :key="index"
      :favourites="favouritesInfo[index]" 
      @IWantToShow="letItShow(index)"
      @deleteFavourites="handleDelete(index)"
      @choose="moveToList(index)"
    />
  </div>
</template>

<script>
import CreateFavourite from './CreateFavourite.vue'
import FavouriteListItemChoosable from './FavouriteListItemChoosable.vue'
import { User } from '../../api/users.js'
// import FavorateContentModal from '../modals/FavorateContentModal.vue'
export default {
  name: 'FavoriteListChoosable',
  props: ['isCreating', 'favouritesInfo', 'fid', 'paperId'],
  components: {
    FavouriteListItemChoosable,
    CreateFavourite,
    // FavorateContentModal
  },
  emits: {
    cancelCreation: null,
    updateCreation: null,
    chooseList: null
  },
  data() {
    return {
      isPopout: false,
      popoutInfo: {
        name: '',
        id: '',
      },
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
    showFavoriteDetail(index) {
      this.favorateContentModalShouldShow = true
    },
    moveToList(index) {
      // ===============================
      // 【真正实现移动收藏内容的方法】
      // 方法含义参见 alert 内容
      // ===============================
      User.collectFavorite(this.favouritesInfo[index].id, {
        paper_id: this.paperId
      }).then(
        (response) => {
          User.deleteFavorite(this.fid)
          // alert('将学术成果(id: ' + this.paperId + ')移动到' + 
          // '收藏夹(id: ' + this.favouritesInfo[index].id + ')')
        },
        (error) => {
          console.log(error)
        }
      )
    }
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
</style>