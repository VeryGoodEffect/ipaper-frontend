<template>
    <div class="navBar">
      navBar
    </div>
    <Transition name="fade">
      <div class="model" v-if="moveVisible">

      </div>
    </Transition>
    <div class="main-part">
        <div class="title-part">
            <div class="title">
                Homepage
            </div>
            <div class="color-setting">
                Color Setting
            </div>
        </div>
        <div class="personal-info">
            <div class="personal-image">
                Personal Image
            </div>
            <div class="personal-info-text">
                Personal Info
            </div>            
        </div>
        <div class="personal-tag">
          Interest Tags
        </div>
        <div class="list">
            <div class="follow-list">
            Follow List
            </div>

            <div class="favorites-list">
              <div class="favourites-header">
                <h4 class="favourites-title">{{ $t('favourites') }}</h4>
                <div class="favourites-creation" @click="handleCreate">
                  {{ $t('create_favourites') }}
                </div>  
              </div>
                <Pagination class="pagination">
                  <div class="favourites" v-for="(info, index) in favouritesInfo">
                    <Favourites :favourites="favouritesInfo[index]" 
                    @deleteFavourites="handleDelete(index)"
                    @cancelCreation="handleCancelCreation"
                    @moveFavourites="handleMove"
                    ref="favouritesRefs"> </Favourites>
                  </div>
                </Pagination>
            </div>
        </div>


        
    </div>
</template>
  
  <script>
  import Favourites from '../../components/favorites/Favourites.vue'
  import Pagination from '../../components/pagination/Pagination.vue'
  import i18n from '../../language'
  export default {
    components: {
      Favourites,
      Pagination,
      i18n
    },
    data() {
      return { 
        infoItem: {
            title: "低碳经济: 人类经济发展方式的新变革",
            author: "鲍健强， 苗阳， 陈锋 - 中国工业经济, 2008 - cqvip.com",
            excerpt: "低碳经济(Low-carbon Economy)是未来经济发展方式的新选择.本文从大时空跨度和能源利用方式上,分析了人类经济发展形态演变历程;探讨了低碳经济… 了低碳经济产生与发展.本文研究了低碳",
            timeCited: 57,
            keyword: "经济",
        },
        favouritesInfo: [{
          name: "感兴趣的内容",
          isCreating: false
        },{
          name: "我的收藏",
          isCreating: false
        }, {
          name: "量子力学",
          isCreating: false
        }, {
          name: "有机化学",
          isCreating: false
        }, {
          name: "Diffusion model",
          isCreating: false
        }, {
          name: "CV",
          isCreating: false
        },],
        moveVisible: false,
      }
    },
    
    
    methods: {
      handleDelete(index) {
        this.favouritesInfo.splice(index, 1)
        // 调用接口
      },
      handleCreate() {
        this.favouritesInfo.unshift({
          name: '',
          isCreating: true
        })
        this.$refs.favouritesRefs[0].handleCreation()
        // console.log("222")
      },
      handleCancelCreation() {
        this.favouritesInfo.splice(0, 1)
      },
      handleMove() {
        this.moveVisible = true
      },
    },
  }
  window.addEventListener('scroll', function() {
      var container = document.querySelector('.model');
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      var containerHeight = container.offsetHeight;
      var windowHeight = window.innerHeight;

      var topPosition = scrollTop + (windowHeight / 2);
      container.style.top = topPosition + 'px';
    });
  </script>
  
<style scoped>
* {
  box-sizing: border-box;
  max-width: 100%;
  overflow: hidden;
}

.navBar {
  height: 80px;
  border: 2px solid red;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
}
.main-part {
  border: 2px solid red;
  min-height: 800px;
  width: 80%;
  min-width: 500px;
  margin-left: 10%;
}
.title-part {
    display: flex;
    margin-top: 50px;
    margin-left: 80px;
    justify-content: space-between;
    flex-wrap: wrap;
}
.title {
    border: 2px solid red;
    display: flex;
    width: 300px;
    height: 80px;
    justify-content: center;
    align-items: center;
    font-size: 30px;
}
.color-setting {
    border: 2px solid red;
    display: flex;
    width: 300px;
    height: 80px;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    margin-right: 50px;
}
.personal-info {
    display: flex;
    flex-wrap: wrap;
}
.personal-image {
    border: 2px solid red;
    height: 350px;
    width: 500px;
    margin-left: 70px;
    margin-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
}
.personal-info-text {
    border: 2px solid red;
    height: 250px;
    width: 500px;
    margin-left: 8%;
    margin-top: 100px;   
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;

    order: 1;
}
.personal-tag {
    border: 2px solid red;
    min-height: 100px;
    width: 60%;
    margin-left: 20%;   
    margin-top: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;

    order: 1;
}
.list {
    margin-top: 50px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}
.follow-list {
    border: 2px solid red;
    height: 600px;
    width: 450px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
}
.favorites-list {
    border: 2px solid red;
    min-height: 600px;
    width: 450px;
    font-size: 30px;
}
.pagination {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.favourites {
  margin-bottom: 10px;
}

.favourites-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.favourites-title {
  font-size: 26px;
  margin-left: 60px;
}
.favourites-creation {
  background-color: rgb(98,186,70);
  width: 120px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin-right: 70px;
  cursor: pointer;
}

.favourites-creation:hover {
  background-color: rgb(131, 192, 113);
}

.model {
  background-color: white;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  min-width: 600px;
  min-height: 400px;
  border-radius: 20px;
  position: absolute;
}

.fade-enter-from,
.fade-leave-to {
opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
opacity: 1;
}

.fade-enter-active,
.fade-leave-active {

transition: opacity 0.5s linear 0s;
}



@media screen and (max-width: 1450px) {
  .personal-info {
    justify-content: center;
  }
  .personal-info-text {
    margin-left: 0px;
  }
  .personal-image {
    margin-left: 0px;
  }
}

@media screen and (max-width: 1350px) {
  .personal-info-text {
    margin-left: 0px;
  }
}

@media screen and (max-width: 1250px) {
  .personal-info-text {
    margin-top: 40px;
  }

  .personal-tag {
    width: 70%;
    margin-left: 15%;
  }
}

@media screen and (max-width: 1100px) {
  .favorites-list {
    margin-top: 40px;
  }
}

@media screen and (max-width: 950px) {
  .title-part {
    justify-content: center;
    margin-left: 0px;
  }
  .color-setting {
    margin-right: 0px;
  }
  .personal-image {
    margin-left: 0px;
  }
}

@media screen and (max-width: 900px) {
  .title-part {
    justify-content: center;
    margin-left: 0px;
  }

  .personal-image {
    margin-left: 0px;
  }
}
@media screen and (max-width: 750px) {
  .color-setting {
    margin-top: 20px;
    margin-right: 0px;
  }
}
@media screen and (max-width: 700px) {
  .personal-info {
    justify-content: center;
  }
  .personal-image {
    margin-left: 0px;
}
.personal-info-text {
    margin-left: 0px;
}
}
@media screen and (max-width: 600px) {
  .main-part {
    width: 100%;
    margin-left: 0;
  }
}
@media screen and (max-width: 450px) {
  .download, .collect {
    display: none;
  }
  .more {
    display: block;
  }
}
  </style>