<template>
  <PopoutModal :show="show" @close="handleClose">
    <div class="container">
      <h3>{{ favoriteTitle }} </h3>
      <div class="list-item-wrapper" v-for="(item, idx) in contentList" :key="idx" 
        @contextmenu.prevent="handleRightClick($event, idx)"
        :id="'item-' + String(idx)"
      >
        <SearchResultListItem :infoItem="item"/>
        <div 
          class="menu" 
          v-if="item.showContext"
          :style="{ left: x + 'px', top: y + 'px'}"
        >
          <button class="basic-btn block-btn" @click="moveFavorate(idx)">{{ $t('move_favorite') }}</button>
          <button class="basic-btn block-btn" @click="deleteFavorite(idx)">{{ $t('delete') }}</button>
        </div>
      </div>
    </div>
  </PopoutModal>

  <ChooseFavoriteModal :fid="idTobeMoved" :paperId="paperIdTobeMoved" :show="chooseFavoriteModalShouldShow" @close="chooseFavoriteModalShouldShow = false"/>

</template>

<script>
import PopoutModal from '../popout-modal/PopoutModal.vue'
import SearchResultListItem from '../search-result-list/SearchResultListItem.vue'
import i18n from '../../language'
import ChooseFavoriteModal from './ChooseFavoriteModal.vue'
import { User } from '../../api/users.js'
export default {
  name: 'FavorateContentModal',
  components: {
    PopoutModal,
    SearchResultListItem,
    ChooseFavoriteModal,
    User,
    i18n
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    favoriteId: {
      type: String
    }
  },
  data() {
    return {
      contentList: [],
      chooseFavoriteModalShouldShow: false,
      x: 0,
      y: 0,
      idTobeMoved: '',
      paperIdTobeMoved: '',
      favoriteTitle: '',
    }
  },
  emits: ['close'],
  mounted() {
    this.fetchData()
    window.addEventListener('click', this.closeAll)
  },
  updated() {
    this.fetchData()
  },
  beforeUnmount() {
    window.removeEventListener('click', this.closeAll)
  },
  methods: {
    fetchData() {
      // ===========================
      // 【获取收藏夹内容方法】
      // 必须在这里调用获取收藏夹内容接口
      // 存到 `this.contentList`
      // ==========================
      if (this.favoriteId) {
        User.getFavoriteList(this.favoriteId).then(
          (response) => {
            this.contentList = response.data
          }
        )
        User.getFavorite(this.favoriteId).then(
          (response) => {
            this.favoriteTitle = response.data.name
          }
        )
      }
      // 模拟一下死数据
      // for (let i = 0; i < 1; i++)
      // {
      //   this.contentList.push(this.infoItem)
      // }
      // 下面的不能删
      this.closeAll()
    },
    handleClose() {
      this.$emit('close')
    },
    handleRightClick(event, idx) {
      for (let i = 0; i < this.contentList.length; i++) {
        this.contentList[i].showContext = false
      }
      this.contentList.splice(idx, 1, {...this.contentList[idx], showContext: true})
      const itemObj = document.getElementById('item-' + String(idx))
      this.x = event.clientX - itemObj.getBoundingClientRect().left
      this.y = event.clientY - itemObj.getBoundingClientRect().top
    },
    closeAll() {
      for (let i = 0; i < this.contentList.length; i++)
      {
        this.contentList[i].showContext = false
      }
    },
    moveFavorate(idx) {
      // ===========================
      // 【移动收藏夹内容方法】
      // 将 `contentList` 中第 `idx` 项进行移动
      // 这里并不需要实现接口
      // ===========================
      this.chooseFavoriteModalShouldShow = true

      // 实现了 fetchData 后，必须解开下面这句注释
      this.idTobeMoved = this.contentList[idx].favorite_id
      this.paperIdTobeMoved = this.contentList[idx].id
    },
    deleteFavorite(idx) {
      // ===========================
      // 【删除收藏夹内容方法】
      // 删除 `contentList` 中第 `idx` 项
      // ===========================
      User.deleteFavorite(this.contentList[idx].favorite_id)
      this.contentList.splice(idx, 1)
    }
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
  max-height: 600px;
  overflow-y: auto;
}
.container>h3 {
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
  min-width: 60%;
}

.container>h3,
.container>h3 * {
  font-size: 40px;
  font-weight: bold;
}

.container>*:not(h3) {
  margin-left: 40px;
}

.container::-webkit-scrollbar {
  display: none;
}

.list-item-wrapper {
  position: relative;

}

.menu {
  /* width: 80px; */
  /* height: 90px; */
  padding: 10px;
  background: var(--theme-mode-like);
  /* border: 2px solid rgba(199, 29, 35, 1); */
  box-shadow: 1px 1px 10px grey;
  border-radius: 5px;
  position: absolute;
  z-index: 10;
}

.menu button:first-child {
  margin-bottom: 10px;
}

.block-btn {
  display: block;
}
</style>