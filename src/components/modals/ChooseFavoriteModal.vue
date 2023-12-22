<template>
  <PopoutModal :show="show" @close="handleClose">
    <div class="container">
      <h3>{{ $t('choose_favorite') }} </h3>
      <FavouriteListChoosable 
        :fid="fid"
        :paperId="paperId"
        @cancelCreation="cancelCreation"
        @updateCreation="updateCreation"
        :isCreating="isCreating"
        :favouritesInfo="favouritesInfo"
      />
      <button class="favourites-creation" @click="isCreating = true">
        {{ $t('create_favourites') }}
      </button>  
    </div>
  </PopoutModal>
</template>

<script>
import PopoutModal from '../popout-modal/PopoutModal.vue'
import i18n from '../../language'
import FavouriteListChoosable from '../favorites/FavouriteListChoosable.vue'

import { User } from '../../api/users'

export default {
  name: 'ChooseFavoriteModal',
  components: {
    PopoutModal,
    FavouriteListChoosable,
    i18n
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    fid: {
      type: String,
      default: ''
    },
    paperId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      favouritesInfo: [],
      isCreating: false
    }
  },
  mounted() {
    this.fetchData()
  },
  updated() {
    this.fetchData()
  },
  emits: ['close'],
  methods: {
    fetchData() {
      let userId = this.$cookies.get('user_id')
      if (userId) {
        User.getFavoriteList(0).then(
          (response) => {
            console.log(response)
            // console.log(response.data.username)
            for (var i = 0; i < response.data.length; i++) {
              this.favouritesInfo.push({
                name: response.data[i].name,
                id: response.data[i].id
              })
            }
          },
          (error) => {
            console.log(error)
          }
        )
      }
    },
    handleClose() {
      this.$emit('close')
    },
    cancelCreation() {
      this.isCreating = false
    },
    updateCreation(name) {
      this.isCreating = false
      let data = {
        name: name
      }
      User.createFavorite(0, data).then(
        (response) => {
          console.log(response)
          // console.log(response.data.username)
        },
        (error) => {
          console.log(error)
        }
      )
      this.favouritesInfo.unshift({
        name: name,
        showContextMenu: false
      })
    },
    returnToMainPage() {
      this.$router.push('/'); 
    },
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  max-width: 700px;
  overflow: hidden;
  position: relative;
}
.container>h3 {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  min-width: 60%;
}

.container>h3,
.container>h3 * {
  font-size: 40px;
  font-weight: bold;
}

.favourites-creation {
  position: absolute;
  top: 50px;
  right: 0;
  font-size: 16px;
  background: transparent;
  color: var(--theme-color);
}

.favourites-creation:hover {
  text-decoration: underline;
}

</style>