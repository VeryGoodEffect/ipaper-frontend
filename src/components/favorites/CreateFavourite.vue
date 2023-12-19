<template>
    <div class="favorites-main-part" @contextmenu.prevent="handleRightClick">
      <div class="cross" @click="cancelCreation">
        <svg t="1701859180254" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1174" width="30" height="30"><path d="M848 214.464a12.8 12.8 0 0 1 0 18.08L568.608 512l279.456 279.456a12.8 12.8 0 0 1 1.6 16.096l-1.6 1.984-38.496 38.496a12.8 12.8 0 0 1-18.08 0L512 568.576 232.544 848a12.8 12.8 0 0 1-16.096 1.6l-1.984-1.6-38.496-38.496a12.8 12.8 0 0 1 0-18.08L455.424 512 176 232.544a12.8 12.8 0 0 1-1.6-16.096l1.6-1.984 38.496-38.496a12.8 12.8 0 0 1 18.08 0L512 455.424 791.456 176a12.8 12.8 0 0 1 16.096-1.6l1.984 1.6z" p-id="1175"></path></svg>
      </div>
      <div>
        <svg t="1701851520556" class="star" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1174" width="200" height="200"><path d="M296.96 943.9744a103.9872 103.9872 0 0 1-102.4-121.4976l28.0576-163.4816a42.3936 42.3936 0 0 0-12.1856-37.5296L91.8528 505.7024a103.8848 103.8848 0 0 1 57.5488-177.152l164.1472-23.8592A42.496 42.496 0 0 0 345.4976 281.6l73.3696-148.48a103.8336 103.8336 0 0 1 186.2656 0l73.4208 148.48a42.3936 42.3936 0 0 0 31.8976 23.1936l164.1472 23.8592a103.8848 103.8848 0 0 1 57.5488 177.152l-118.7328 115.7632a42.2912 42.2912 0 0 0-12.2368 37.5296l28.2624 163.3792A103.8336 103.8336 0 0 1 678.5536 931.84l-146.7904-76.8a42.3936 42.3936 0 0 0-39.4752 0l-146.8416 76.8a103.9872 103.9872 0 0 1-48.4864 12.1344z m215.04-807.68a41.6768 41.6768 0 0 0-38.0416 23.6544L400.5888 308.6848A104.0384 104.0384 0 0 1 322.56 365.5168L158.2592 389.12a42.3936 42.3936 0 0 0-23.5008 72.3456l118.7328 115.7632a104.0384 104.0384 0 0 1 29.9008 92.16l-28.0576 163.4304a42.3936 42.3936 0 0 0 61.44 44.7488l146.7904-77.2096a103.936 103.936 0 0 1 96.6656 0l146.7904 77.2096a42.4448 42.4448 0 0 0 61.44-44.7488l-28.0576-163.4304a104.0384 104.0384 0 0 1 29.9008-92.16l118.7328-115.7632A42.3936 42.3936 0 0 0 865.7408 389.12L701.44 365.5168a103.8848 103.8848 0 0 1-78.1824-56.832l-73.4208-148.48a41.6256 41.6256 0 0 0-37.8368-23.9104z" p-id="1175"></path><path d="M414.72 694.272h-3.5328a30.72 30.72 0 0 1-27.0336-34.048l7.0144-60.5184a33.8944 33.8944 0 0 0-10.24-28.1088l-42.5472-40.96A30.72 30.72 0 1 1 381.184 486.4l42.5984 40.96a95.6416 95.6416 0 0 1 28.6208 79.5136L445.44 667.0336a30.72 30.72 0 0 1-30.72 27.2384z"  p-id="1176"></path></svg>
      </div>
            <!-- <div ref="name" class="favorites-main-part-name">
        {{ favourites.name }}
      </div>   -->
      <div class="creation-block"> 
        <input :placeholder="$t('favourites_name')" type="text" ref="nameInput" v-model="name" class="name-input" >
        <div class="complete-creation" @click="updateCreation">
        <svg 
        t="1702972632873" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4535" id="mx_n_1702972632874" width="200" height="200"><path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474c-6.1-7.7-15.3-12.2-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1 0.4-12.8-6.3-12.8z" p-id="4536"></path></svg>
        </div>
      </div>
    </div>
</template>

<script>


export default {
  name: 'CreateFavourite',
  emits: {
    deleteFavourites: null,
    cancelCreation: null,
    updateCreation: null,
    moveFavourites: null,
    IWantToShow: null
  },
  data() {
    return {
      name: '',
    }
  },
  methods: {
    cancelCreation() {
      this.name = ''
      this.$emit('cancelCreation')
      // this.$refs.container.style.cursor = 'pointer'
    },
    updateCreation() {
      this.$emit('updateCreation', this.name)
      this.name = ''
      // 调用接口
    },
  },
  mounted() {
    this.$refs.nameInput.focus()
  }
}

</script>

<style scoped>
    .favorites-main-part {
        /* border: 2px solid blue; */
        flex: 0 0 auto;
        width: 300px;
        height: 150px;
        border-radius: 10px;
        background-color: var(--theme-color);
        font-size: 20px;
        text-align: center;
        margin-top: 10px;
        margin-right: 20px;
        position: relative;
    }
    svg {
      width: 100px;
      height: 100px;
      margin-top: -20px;
      fill: var(--theme-mode) !important;
    }
    .favorites-main-part-name {
      color: rgb(255, 255, 255);
    }

.cross {
  width: 30px;
  height: 30px;
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 10px;
}

.cross svg {
  width: 30px;
  height: 30px;
}

.complete-creation {
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  bottom: 5px;
  right: 20px;
}
.complete-creation svg {
  width: 30px;
  height: 30px;
}

.name-input {
  width: 70%;
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

.name-input::placeholder {
  font-size: 14px;
  font-weight: bold;
  color: var(--theme-mode-slight-contrast);
}

.creation-block {
  display: flex;
  justify-content: center;
}
.button-row {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
}

.star {
  margin-top: 10px;
}

</style>