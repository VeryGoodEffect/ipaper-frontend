<template>
    <div class="favourite-list" ref="container">
      <FavouriteListItem 
        v-for="(info, index) in favouritesInfo" :key="index"
        :favourites="favouritesInfo[index]" 
        @showFavoriteDetail="showFavoriteDetail(index)"
        @IWantToShow="letItShow(index)"
        @deleteFavourites="handleDelete(index)"
      />
    </div>
  </template>
  
  <script>
  import PopoutModal from '../popout-modal/PopoutModal.vue'
  import FavouriteListItem from './FavouriteListItem.vue'
  import { User } from '../../api/users.js'
  export default {
    name: 'FavouriteList',
    props: ['isCreating', 'favouritesInfo'],
    components: {
      FavouriteListItem,
      CreateFavourite,
      PopoutModal
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
  
        }
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
      showFavoriteDetail(index) {
        this.popoutInfo = this.favouritesInfo[index]
        this.isPopout = true
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