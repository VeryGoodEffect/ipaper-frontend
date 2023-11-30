<template>
    <div class="favorites-main-part" @contextmenu.prevent="handleRightClick">
      <div ref="name">
        {{ favourites.name }}
      </div>  
        <template v-if="favourites.isCreating" class="creation-block">
          <div class="creation-block"> 
            <input type="text" ref="nameInput" v-model="favourites.name" class="nameInput">
            <div class="button-row">
              <div class="check-button" @click.stop="cancelCreation">
                <!-- <CrossIcon size="15px"/> -->
                取消 
              </div>
              <div class="check-button" @click.stop="updateCreation">
                <!-- <CheckIcon size="15px -->
                创建
              </div>
            </div>
            
          </div>
            
        </template>
    </div>
  
    <div 
        class="menu" 
        v-if="showContextMenu"
        :style="{ left: x + 'px', top: y + 'px'}"
      >
        <button @click="triggerMove">移动</button>
        <button @click="triggerDelete">删除</button>
    </div>
</template>

<script>


export default {
  props: ['favourites'],
    data() {
      return {
        showContextMenu: false,
        x: 0,
        y: 0,
        moveVisible: false,
      }
    },
    mounted() {
      window.addEventListener('click', this.hideMenu)
      // if (this.type !== 'normal') {
      //   this.$nextTick(() => {
      //     this.$refs.deleted.style.cursor = 'default'
      //   })
      // }
      // this.$bus.on('renameFailRequest', this.handleRenameFailDisplay)
    },
    beforeUnmount() {
      window.removeEventListener('click', this.hideMenu)
    },
    methods: {
      handleRightClick() {
        // console.log("111")
        this.showContextMenu = true
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
      handleCreation() {
        this.$nextTick(() => {
          this.$refs.name.style.display = 'none'
          this.$refs.nameInput.style.display = 'inline-block'
          // this.$refs.nameInput.style.color = 'rgb(0,0,0)'
          this.$refs.nameInput.focus()
        })
      },
      cancelCreation() {
        this.$emit('cancelCreation')
        this.$refs.name.style.display = 'block'
        // this.$refs.container.style.cursor = 'pointer'
      },
      updateCreation() {
        this.favourites.isCreating = false
        this.$refs.name.style.display = 'block'
        // 调用接口
      },
      triggerMove() {
        this.$emit('moveFavourites')

      }
    },
    computed: {
    
  }
}
window.addEventListener('scroll', function() {
      var container = document.querySelector('.menu');
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      var containerHeight = container.offsetHeight;
      var windowHeight = window.innerHeight;

      var topPosition = scrollTop + (windowHeight / 2);
      container.style.top = topPosition + 'px';
    });
</script>

<style scoped>
    .favorites-main-part {
        /* border: 2px solid blue; */
        width: 300px;
        height: 100px;
        border-radius: 10px;
        background-color: rgb(3,122,255);
        font-size: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: rgb(255, 255, 255);
        cursor: pointer;
    }
    .favorites-main-part:hover{
        /* border: 2px solid blue; */
        width: 300px;
        height: 100px;
        border-radius: 10px;
        background-color: rgb(44, 143, 255);
        font-size: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: rgb(255, 255, 255);
        cursor: pointer;
    }
  .menu {
  width: 80px;
  /* height: 90px; */
  padding: 10px;
  background: white;
  /* border: 2px solid rgba(199, 29, 35, 1); */
  box-shadow: 1px 1px 10px grey;
  border-radius: 5px;
  position: absolute;
}

.menu button {
  display: block;
  width: 80px;
  height: 40px;
  box-shadow: 0px 0px 3px grey;
  background: transparent;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.menu button:hover {
  background: rgba(199, 29, 35, 1);
  color: white;
}

.menu button:nth-child(2) {
  margin-top: 10px;
  margin-bottom: 10px;
}
.nameInput {
  background-color: rgb(3,122,255);
  color: white;
  text-align: center;
}
.creation-block {
  display: block;
}
.button-row {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
}
</style>