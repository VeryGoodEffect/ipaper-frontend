<template>
    <div :class="[{'favorites-main-part': !isRenaming, 'favorites-main-part wider-card': isRenaming}]" 
    @contextmenu.prevent="handleRightClick"
    @click="handleClick">
      <svg t="1701851520556" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1174" width="200" height="200"><path d="M296.96 943.9744a103.9872 103.9872 0 0 1-102.4-121.4976l28.0576-163.4816a42.3936 42.3936 0 0 0-12.1856-37.5296L91.8528 505.7024a103.8848 103.8848 0 0 1 57.5488-177.152l164.1472-23.8592A42.496 42.496 0 0 0 345.4976 281.6l73.3696-148.48a103.8336 103.8336 0 0 1 186.2656 0l73.4208 148.48a42.3936 42.3936 0 0 0 31.8976 23.1936l164.1472 23.8592a103.8848 103.8848 0 0 1 57.5488 177.152l-118.7328 115.7632a42.2912 42.2912 0 0 0-12.2368 37.5296l28.2624 163.3792A103.8336 103.8336 0 0 1 678.5536 931.84l-146.7904-76.8a42.3936 42.3936 0 0 0-39.4752 0l-146.8416 76.8a103.9872 103.9872 0 0 1-48.4864 12.1344z m215.04-807.68a41.6768 41.6768 0 0 0-38.0416 23.6544L400.5888 308.6848A104.0384 104.0384 0 0 1 322.56 365.5168L158.2592 389.12a42.3936 42.3936 0 0 0-23.5008 72.3456l118.7328 115.7632a104.0384 104.0384 0 0 1 29.9008 92.16l-28.0576 163.4304a42.3936 42.3936 0 0 0 61.44 44.7488l146.7904-77.2096a103.936 103.936 0 0 1 96.6656 0l146.7904 77.2096a42.4448 42.4448 0 0 0 61.44-44.7488l-28.0576-163.4304a104.0384 104.0384 0 0 1 29.9008-92.16l118.7328-115.7632A42.3936 42.3936 0 0 0 865.7408 389.12L701.44 365.5168a103.8848 103.8848 0 0 1-78.1824-56.832l-73.4208-148.48a41.6256 41.6256 0 0 0-37.8368-23.9104z" p-id="1175"></path><path d="M414.72 694.272h-3.5328a30.72 30.72 0 0 1-27.0336-34.048l7.0144-60.5184a33.8944 33.8944 0 0 0-10.24-28.1088l-42.5472-40.96A30.72 30.72 0 1 1 381.184 486.4l42.5984 40.96a95.6416 95.6416 0 0 1 28.6208 79.5136L445.44 667.0336a30.72 30.72 0 0 1-30.72 27.2384z" p-id="1176"></path></svg>
      <div ref="name" class="favorites-main-part-name" v-if="!isRenaming">
        {{ favourites.name }}
      </div>
      <div class="renaming-block" v-else> 
        <input type="text" ref="nameInput" v-model="favourites.name" class="name-input" @click.stop>
        <svg @click.stop="updateRenaming"
        t="1702972632873" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4535" id="mx_n_1702972632874" width="200" height="200"><path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474c-6.1-7.7-15.3-12.2-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1 0.4-12.8-6.3-12.8z" p-id="4536"></path></svg>
      </div>  
    </div>
  
    <div 
        class="menu" 
        v-if="favourites.showContextMenu"
        :style="{ left: x + 'px', top: y + 'px'}"
      >
        <button class="basic-btn block-btn" @click="triggerRename">{{ $t('rename') }}</button>
        <button class="basic-btn block-btn" @click="triggerDelete">{{ $t('delete') }}</button>
    </div>
</template>

<script>
import { User } from '../../api/users.js'

export default {
  
  name: 'FavouriteListItem',
  props: ['favourites'],
  emits: {
    deleteFavourites: null,
    cancelCreation: null,
    moveFavourites: null,
    IWantToShow: null
  },
    data() {
      return {
        // showContextMenu: false,
        x: 0,
        y: 0,
        moveVisible: false,
        isRenaming: false,
      }
    },
    mounted() {
      // window.addEventListener('click', this.hideMenu)
      // if (this.type !== 'normal') {
      //   this.$nextTick(() => {
      //     this.$refs.deleted.style.cursor = 'default'
      //   })
      // }
      // this.$bus.on('renameFailRequest', this.handleRenameFailDisplay)
    },
    beforeUnmount() {
      // window.removeEventListener('click', this.hideMenu)
    },
    methods: {
      handleClick() {
        this.$emit('showFavoriteDetail')
      },
      handleRightClick(event) {
        // console.log("111")
        // this.showContextMenu = true
        this.$emit('IWantToShow')
        const scrollX = window.pageXOffset || document.documentElement.scrollLeft
        const scrollY = window.pageYOffset || document.documentElement.scrollTop
        this.x = event.clientX + scrollX
        this.y = event.clientY + scrollY
        // console.log(this.showContextMenu)
        // console.log(this.x)
        // console.log(this.y)
      },
      hideMenu() {
        if (this.showContextMenu) this.showContextMenu = false
      },
      triggerDelete() {
        this.$emit('deleteFavourites')
      },
      triggerRename() {
        this.isRenaming = true
        this.$nextTick(() => {
          this.$refs.nameInput.focus()
        })
      },
      updateRenaming() {
        this.isRenaming = false
        let data = {
          name: this.favourites.name
        }
        // console.log("222")
        // console.log(this.favourites.id)
        // console.log(data)
        // 调用接口
        User.renameFavorite(this.favourites.id, data).then(
          (response) => {
            console.log(response)
          },
          (error) => {
            console.log(error)
          }
        )
      }
    },
    computed: {
    
  }
}

</script>

<style scoped>
  .favorites-main-part,
  .favorites-main-part * {
    transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
  }
    .favorites-main-part {
        /* border: 2px solid blue; */
        flex: 0 0 auto;
        width: 150px;
        height: 150px;
        border-radius: 10px;
        background-color: var(--theme-color-60);
        font-size: 20px;
        text-align: center;
        cursor: pointer;
        margin-top: 10px;
        margin-right: 20px;
    }
    .favorites-main-part:hover{
      background: var(--theme-color);
    }
    svg {
      width: 100px;
      height: 100px;
      margin-top: 10px;
      fill: var(--theme-mode) !important;
    }
    .favorites-main-part .favorites-main-part-name {
      color: var(--theme-mode);
    }
    .favorites-main-part:hover .favorites-main-part-name {
      font-weight: bold;
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
}

.menu button:first-child {
  margin-bottom: 10px;
}

.block-btn {
  display: block;
}

.renaming-block {
  display: flex;
  width: 90%;
  height: 30px;
  margin: 0 auto;
  justify-content: space-around;
  align-items: center;
}

.renaming-block input {
  width: 80%;
  height: 30px;
  box-sizing: border-box;
  background: transparent;
  border: 1px solid var(--theme-mode);
  color: var(--theme-mode);
  font-size: 16px;
  padding: 0 5px;
  border-radius: 5px;
}

.name-input:focus {
  outline: 2px solid var(--theme-mode);
}

.renaming-block svg {
  width: 30px;
  height: 30px;
  margin-bottom: 10px;
}



.button-row {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
}

.wider-card {
  width: 300px;
  background: var(--theme-color);
}

</style>