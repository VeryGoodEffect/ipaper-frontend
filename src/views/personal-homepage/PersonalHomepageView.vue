<template>
    <!-- <Transition name="fade">
      <div class="model" v-if="moveVisible">
        <div class="inner-box">
          <h3 class="move-title">
            {{ $t('move_favourites') }}
          </h3>
          <Pagination class="pagination">
              <Favourites v-for="(info, index) in favouritesInfo" :key="index" :favourites="favouritesInfo[index]" 
              ref="favouritesRefs"> </Favourites>
          </Pagination>
        </div>
        
      </div>
    </Transition> -->
      
    <div class="main-part">
      <div class="return-part" @click="returnToMainPage">
        <svg t="1701847227942" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="886" width="200" height="200"><path d="M578.2016 113.7664a51.2 51.2 0 0 1 76.3904 67.9424l-3.9936 4.4544-325.888 325.7856 325.888 325.888a51.2 51.2 0 0 1 3.9936 67.9424l-3.9936 4.4544a51.2 51.2 0 0 1-67.9424 3.9936l-4.4544-3.9936-362.0352-361.984a51.2 51.2 0 0 1-3.9936-67.9936l3.9936-4.4544 361.984-362.0352z" fill="#909399" p-id="887"></path></svg>
        <div class="return-text">{{ $t('favourites_return') }}</div>
      </div>
      <div class="info-tag-list">
        <div class="personal-info">
            <div class="personal-image">
              <img src="https://img0.baidu.com/it/u=3451423443,2749950479&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" alt="Personal Image">
            </div>
            <div class="personal-info-text">
              <p class="personal-info-text-item">{{ $t('personal_info_nick_name') }}: {{ this.personalInfo.nickName }}</p>
              <p class="personal-info-text-item">{{ $t('personal_info_real_name') }}: {{ this.personalInfo.realName }}</p>
              <p class="personal-info-text-item">{{ $t('personal_info_region') }}: {{ this.personalInfo.region }}</p>
              <p class="personal-info-text-item">{{ $t('personal_info_work_concepts') }}: {{ this.personalInfo.workingConcepts }}</p>
              <p class="personal-info-text-item">{{ $t('personal_info_email') }}: {{ this.personalInfo.email }}</p>
            </div>            
        </div>
        <div class="tag-and-list">
          <div class="list">
            <div class="favourites-header">
              <div class="favourites-subscribe-tab">
                
                <h4 :class="[{'follow-title': !favouritesVisible}, { 'favourites-title': favouritesVisible }]" @click="favouritesVisible = true">{{ $t('favourites') }}</h4>
                <h4 :class="[{'favourites-title': !favouritesVisible}, { 'follow-title': favouritesVisible }]" @click="favouritesVisible = false">{{ $t('personal_follow_list') }}</h4>
              </div>
              <div class="favourites-creation" @click="isCreating = true" v-if="favouritesVisible">
                {{ $t('create_favourites') }}
              </div>  
            </div>
            <div class="favorites-list" v-if="favouritesVisible">
              <FavouriteList 
              @cancelCreation="cancelCreation"
              @updateCreation="updateCreation"
              :isCreating="isCreating"
              :favouritesInfo="favouritesInfo" />
            </div>
            <div class="favorites-list" v-else>
              关注列表
            </div>
          </div>
          <div class="personal-tag">
            Interest Tags
          </div>
        </div>
      </div>  
    </div>

    
</template>
  
  <script>
  import FavouriteListItem from '../../components/favorites/FavouriteListItem.vue'
  import i18n from '../../language'
  import FavouriteList from '../../components/favorites/FavouriteList.vue'
  export default {
    components: {
      FavouriteListItem,
      FavouriteList,
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
        personalInfo: {
          nickName: 'Xenon',
          realName: '暂未设置',
          region: '中国',
          workingConcepts: '北京航空航天大学',
          email: '21373272@buaa.edu.cn'
        },
        isCreating: false,
        moveVisible: false,
        favouritesVisible: true,
        favouritesInfo: [
          {
            name: "感兴趣的内容",
            showContextMenu: false
          },
          {
            name: "我的收藏",
            showContextMenu: false
          }, 
          {
            name: "我的收藏",
            showContextMenu: false
          },  
          {
            name: "我的收藏",
            showContextMenu: false
          }, 
          {
            name: "量子力学",
            showContextMenu: false
          }, 
          {
            name: "有机化学",
            showContextMenu: false
          }, 
          {
            name: "Diffusion model",
            showContextMenu: false
          }, 
          {
            name: "CV",
            showContextMenu: false
          }
        ],
      }
    },
    
    
    methods: {
      handleMove() {
        this.moveVisible = true
      },
      handleMoveClick(index) {
        this.moveVisible = false
      },
      cancelCreation() {
        this.isCreating = false;
      },
      updateCreation(name) {
        this.isCreating = false;
        this.favouritesInfo.unshift({
          name: name,
            showContextMenu: false
        })
      },
      returnToMainPage() {
        this.$router.push('/'); 
      }
    },
  }
  window.addEventListener('scroll', function() {
      var container = document.querySelector('.model')

      if (container === null || getComputedStyle(container).display === 'none') {
        return; 
      }

      var scrollTop = window.pageYOffset || document.documentElement.scrollTop
      var windowHeight = window.innerHeight;

      var topPosition = scrollTop + (windowHeight / 2)
      container.style.top = topPosition + 'px';
    });
  </script>
  
<style scoped>
* {
  box-sizing: border-box;
  max-width: 100%;
  overflow: hidden;
}

.return-part {
  display: flex;
  width: 80px;
  cursor: pointer;
  height: 35px;
}
.icon {
  width: 30px;
  height: 30px;
  background-size: cover;
  cursor: pointer;
  transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
  fill: #666;
}
.return-text {
  font-size: 20px;
  /* color: #666; */
  margin-top: 2px;
}

.main-part {
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
    display: flex;
    width: 300px;
    height: 80px;
    justify-content: center;
    align-items: center;
    font-size: 30px;
}
.info-tag-list {
  display: flex;
}
/* .personal-info {
} */
.personal-image {
  height: 200px;
  width: 200px;
  margin-left: 50px;
  border-radius: 50%;
  overflow: hidden;
}
.personal-info-text {
  min-height: 400px;
  width: 300px;
  margin-top: 20px;   
  font-size: 30px;
}
.personal-info-text-item {
  margin-bottom: 5px;
  margin-left: 20px;
}
.tag-and-list {
  margin-left: 5%;
  width: 60%;
}
.personal-tag {
    min-height: 100px;
    border: 2px solid red;
    /* width: 50%;  */
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
}
.list {
  margin-top: 0;

  /* display: flex; */
  /* justify-content: space-around;
  flex-wrap: wrap; */
  /* width: 50%; */
  height: 300px;
}
/* .favorites-list {
} */
.favourites-subscribe-tab {
  display: flex;
}
.favourites-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.favourites-title {
  height: 35px;
  font-size: 20px;
  /* margin-left: 60px; */
  background-color: rgb(3,122,255);
  color: white;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 0 0 10px 10px;
  cursor: pointer;
}
.favourites-title:hover {
  height: 35px;
  font-size: 20px;
  /* margin-left: 60px; */
  background-color: rgb(45, 141, 250);
  color: white;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 0 0 10px 10px;
  cursor: pointer;
}
.follow-title {
  height: 35px;
  font-size: 20px;
  /* margin-left: 60px; */
  background-color: rgb(202, 202, 202);
  color: rgb(0, 0, 0);
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 0 0 10px 10px;
  cursor: pointer;
}
.follow-title:hover {
  height: 35px;
  font-size: 20px;
  /* margin-left: 60px; */
  background-color: rgb(228, 227, 227);
  color: rgb(0, 0, 0);
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 0 0 10px 10px;
  cursor: pointer;
}
.favourites-creation {
  background-color: rgb(98,186,70);
  width: 120px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  /* margin-right: 70px; */
  cursor: pointer;
  color: white;
}

.favourites-creation:hover {
  background-color: rgb(131, 192, 113);
  color: white;
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
  padding-top: 25px;
  padding-bottom: 25px;
  padding-left: 30px;
  padding-right: 30px;
  display: flex;
  justify-content: center;
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

.inner-box {
  width: 70%;
}
.move-title {
  color: black;
  text-align: center;
  font-size: 30px;
  margin-bottom: 30px;
}



@media screen and (max-width: 1450px) {
  .personal-info {
    justify-content: center;
  }
}


@media screen and (max-width: 900px) {
  .personal-image {
    margin-left: 30px;
  }

}

@media screen and (max-width: 768px) {
  .main-part {
    width: 100%;
    margin-left: 0;
  }
  .info-tag-list {
    display: block;
  }
  .personal-info-text {
    width: 80%;
    min-height: 300px;
  }
  .personal-image {
    margin-left: 0px;
}
  .personal-info {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .tag-and-list {
    width: 100%;
    margin: 0;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .list {
    width: 80%;
  }
  .personal-tag {
    width: 80%;
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