<template>
    <div class="favorites-main-part" @contextmenu.prevent="handleRightClick">
      <!-- <svg t="1701851286062" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1599" width="200" height="200"><path d="M453.4784 501.9648l-7.5264 43.8272 39.3728-20.6848c16.128-8.4992 35.3792-8.4992 51.5072 0l39.3728 20.6848-7.5264-43.8272c-3.072-17.9712 2.8672-36.3008 15.9232-48.9984l31.8464-31.0272-43.9808-6.4c-18.0224-2.6112-33.6384-13.9264-41.6768-30.3104l-19.6608-39.8848-19.6608 39.8848a55.552 55.552 0 0 1-41.6768 30.3104l-43.9808 6.4 31.8464 31.0272c12.9536 12.7488 18.8928 31.0784 15.8208 48.9984z" fill="#FF5757" p-id="1600"></path><path d="M731.3408 97.0752H290.816c-89.344 0-161.792 72.448-161.792 161.792v503.296c0 89.344 72.448 161.792 161.792 161.792h440.5248c89.344 0 161.792-72.448 161.792-161.792v-503.296c0-89.3952-72.448-161.792-161.792-161.792zM340.0192 400.5888c6.5536-20.1728 23.7056-34.6112 44.6976-37.6832l53.0432-7.68L461.4656 307.2c9.4208-19.0464 28.416-30.8736 49.664-30.8736 21.248 0 40.2432 11.8272 49.664 30.8736l23.7056 48.0256 53.0432 7.68c20.992 3.072 38.144 17.5104 44.6976 37.6832 6.5536 20.1728 1.1776 41.9328-14.0288 56.7296l-38.3488 37.376 9.0624 52.7872c3.584 20.9408-4.864 41.6768-22.016 54.1696a55.00416 55.00416 0 0 1-58.3168 4.1984l-47.4112-24.9344-47.4112 24.9344a54.96832 54.96832 0 0 1-58.2656-4.2496c-17.152-12.4928-25.6-33.2288-22.016-54.1696l9.0624-52.7872-38.3488-37.376c-15.36-14.7456-20.736-36.4544-14.1824-56.6784z m331.8784 377.9584H350.3104c-16.9472 0-30.72-13.7728-30.72-30.72s13.7728-30.72 30.72-30.72h321.5872c16.9472 0 30.72 13.7728 30.72 30.72s-13.7728 30.72-30.72 30.72z" fill="#FF5757" p-id="1601"></path></svg> -->
      <!-- <svg t="1701851442667" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1034" width="200" height="200"><path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#DE7AFD" p-id="1035"></path><path d="M140.4844 241.955886a46.55193 101.696557 29.75 1 0 80.832661 46.199672 46.55193 101.696557 29.75 1 0-80.832661-46.199672Z" fill="#FFFFFF" p-id="1036"></path><path d="M93.495652 431.86087m-22.260869 0a22.26087 22.26087 0 1 0 44.521739 0 22.26087 22.26087 0 1 0-44.521739 0Z" fill="#FFFFFF" p-id="1037"></path><path d="M832.556522 857.043478a24.486957 24.486957 0 1 0 0-48.973913 24.486957 24.486957 0 0 0 0 48.973913z m0 24.486957a48.973913 48.973913 0 1 0 0-97.947826 48.973913 48.973913 0 0 0 0 97.947826z" fill="#FFFFFF" p-id="1038"></path><path d="M213.704348 430.881391c0-39.66887 10.462609-78.4384 30.061078-111.339965 19.589565-32.901565 47.415652-58.448139 79.925426-73.371826 32.50087-14.932591 68.207304-18.556661 102.551374-10.418087 34.335165 8.147478 65.749704 27.692522 90.209948 56.1152 24.460243-28.431583 55.874783-47.967722 90.209948-56.106296 34.335165-8.147478 70.0416-4.523409 102.551374 10.400279 32.50087 14.932591 60.335861 40.479165 79.925426 73.38073C808.728487 352.442991 819.2 391.212522 819.2 430.881391c0.06233 31.138504-6.3488 61.858504-18.734748 89.666783-12.385948 27.817183-30.390539 51.939061-52.553461 70.424487l-199.546434 185.896069c-11.103722 10.329043-25.092452 15.876452-39.46407 15.618227-14.380522-0.258226-28.208974-6.28647-39.009948-17.007305L275.527235 582.442296c-19.411478-18.69913-34.976278-41.939478-45.652592-68.100453A221.005913 221.005913 0 0 1 213.704348 430.872487z" fill="#FFFFFF" p-id="1039"></path></svg> -->
      <div class="cross" @click="cancelCreation">
        <svg t="1701859180254" class="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1174" width="30" height="30"><path d="M848 214.464a12.8 12.8 0 0 1 0 18.08L568.608 512l279.456 279.456a12.8 12.8 0 0 1 1.6 16.096l-1.6 1.984-38.496 38.496a12.8 12.8 0 0 1-18.08 0L512 568.576 232.544 848a12.8 12.8 0 0 1-16.096 1.6l-1.984-1.6-38.496-38.496a12.8 12.8 0 0 1 0-18.08L455.424 512 176 232.544a12.8 12.8 0 0 1-1.6-16.096l1.6-1.984 38.496-38.496a12.8 12.8 0 0 1 18.08 0L512 455.424 791.456 176a12.8 12.8 0 0 1 16.096-1.6l1.984 1.6z" fill="#dbdbdb" p-id="1175"></path></svg>
      </div>
      <div>
        <svg t="1701851520556" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1174" width="200" height="200"><path d="M296.96 943.9744a103.9872 103.9872 0 0 1-102.4-121.4976l28.0576-163.4816a42.3936 42.3936 0 0 0-12.1856-37.5296L91.8528 505.7024a103.8848 103.8848 0 0 1 57.5488-177.152l164.1472-23.8592A42.496 42.496 0 0 0 345.4976 281.6l73.3696-148.48a103.8336 103.8336 0 0 1 186.2656 0l73.4208 148.48a42.3936 42.3936 0 0 0 31.8976 23.1936l164.1472 23.8592a103.8848 103.8848 0 0 1 57.5488 177.152l-118.7328 115.7632a42.2912 42.2912 0 0 0-12.2368 37.5296l28.2624 163.3792A103.8336 103.8336 0 0 1 678.5536 931.84l-146.7904-76.8a42.3936 42.3936 0 0 0-39.4752 0l-146.8416 76.8a103.9872 103.9872 0 0 1-48.4864 12.1344z m215.04-807.68a41.6768 41.6768 0 0 0-38.0416 23.6544L400.5888 308.6848A104.0384 104.0384 0 0 1 322.56 365.5168L158.2592 389.12a42.3936 42.3936 0 0 0-23.5008 72.3456l118.7328 115.7632a104.0384 104.0384 0 0 1 29.9008 92.16l-28.0576 163.4304a42.3936 42.3936 0 0 0 61.44 44.7488l146.7904-77.2096a103.936 103.936 0 0 1 96.6656 0l146.7904 77.2096a42.4448 42.4448 0 0 0 61.44-44.7488l-28.0576-163.4304a104.0384 104.0384 0 0 1 29.9008-92.16l118.7328-115.7632A42.3936 42.3936 0 0 0 865.7408 389.12L701.44 365.5168a103.8848 103.8848 0 0 1-78.1824-56.832l-73.4208-148.48a41.6256 41.6256 0 0 0-37.8368-23.9104z" fill="#ffffff" p-id="1175"></path><path d="M414.72 694.272h-3.5328a30.72 30.72 0 0 1-27.0336-34.048l7.0144-60.5184a33.8944 33.8944 0 0 0-10.24-28.1088l-42.5472-40.96A30.72 30.72 0 1 1 381.184 486.4l42.5984 40.96a95.6416 95.6416 0 0 1 28.6208 79.5136L445.44 667.0336a30.72 30.72 0 0 1-30.72 27.2384z" fill="#ffffff" p-id="1176"></path></svg>
      </div>
            <!-- <div ref="name" class="favorites-main-part-name">
        {{ favourites.name }}
      </div>   -->
      <div class="creation-block"> 
        <input type="text" ref="nameInput" v-model="name" class="nameInput">
        <div class="complete-creation" @click="updateCreation">
          <svg t="1701860585457" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5920" width="20" height="20"><path d="M935.03 212.628c-28.659-28.662-75.123-28.662-103.78 0l-449.723 449.72L191.26 472.08c-28.66-28.655-75.124-28.655-103.784 0-28.656 28.662-28.656 75.124 0 103.786l242.16 242.156c28.657 28.654 75.123 28.654 103.781 0L935.03 316.404c28.66-28.66 28.66-75.122 0-103.776z" p-id="5921" fill="#dbdbdb"></path></svg>
        </div>
      </div>
        <!-- <template v-if="favourites.isCreating" class="creation-block">
          <div class="creation-block"> 
            <input type="text" ref="nameInput" v-model="favourites.name" class="nameInput">
            <div class="button-row">
              <div class="check-button" @click.stop="cancelCreation">
                取消 
              </div>
              <div class="check-button" @click.stop="updateCreation">
                创建
              </div>
            </div>
            
          </div>
            
        </template> -->
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
    computed: {
    
  }
}

</script>

<style scoped>
    .favorites-main-part {
        /* border: 2px solid blue; */
        flex: 0 0 auto;
        width: 150px;
        height: 150px;
        border-radius: 10px;
        background-color: rgb(3,122,255);
        font-size: 20px;
        text-align: center;
        margin-top: 10px;
        margin-right: 20px;
    }
    .favorites-main-part:hover{
        /* border: 2px solid blue; */
        flex: 0 0 auto;
        width: 150px;
        height: 150px;
        border-radius: 10px;
        background-color: rgb(44, 143, 255);
        font-size: 20px;
        color: rgb(255, 255, 255);
    }
    .icon {
      width: 100px;
      height: 100px;
      margin-top: -20px;
      color: #ffffff !important;
      margin-bottom: 5px;
    }
    .favorites-main-part-name {
      color: rgb(255, 255, 255);
    }
/* .menu button {
  display: block;
  width: 80px;
  height: 40px;
  box-shadow: 0px 0px 3px grey;
  background: transparent;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
} */

/* .menu button:hover {
  background: rgba(199, 29, 35, 1);
  color: white;
}

.menu button:nth-child(2) {
  margin-top: 10px;
  margin-bottom: 10px;
} */


.cross {
  width: 30px;
  height: 30px;
  margin-left: 117px;
  cursor: pointer;
}
.nameInput {
  background-color: rgb(3,122,255);
  color: white;
  text-align: center;
  width: 60%;
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
.complete-creation {
  width: 20px;
  height: 20px;
  margin-left: 10px;
  cursor: pointer;
}
</style>