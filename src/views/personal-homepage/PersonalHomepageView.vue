<template>
    <!-- <Transition name="fade">
      <div class="model" v-if="moveVisible">
        <div class="inner-box">
          <h3 class="move-title">
            {{ $t('move_favourites') }}
          </h3>
        </div>
        
      </div>
    </Transition> -->
      
    <div class="main-part">
      <!-- <div class="return-part" @click="returnToMainPage">
        <svg t="1701847227942" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="886" width="200" height="200"><path d="M578.2016 113.7664a51.2 51.2 0 0 1 76.3904 67.9424l-3.9936 4.4544-325.888 325.7856 325.888 325.888a51.2 51.2 0 0 1 3.9936 67.9424l-3.9936 4.4544a51.2 51.2 0 0 1-67.9424 3.9936l-4.4544-3.9936-362.0352-361.984a51.2 51.2 0 0 1-3.9936-67.9936l3.9936-4.4544 361.984-362.0352z" fill="#909399" p-id="887"></path></svg>
        <div class="return-text">{{ $t('favourites_return') }}</div>
      </div> -->

      <div class="info-tag-list">
        <div class="personal-info">
            <div class="personal-image">
              <img :src="personalInfo.avatarUrl" alt="Personal Image">
            </div>
            <div class="personal-info-text">
              <p class="personal-info-text-nickname">
                <!-- {{ $t('personal_info_nick_name') }}:  -->
                {{ personalInfo.nickName }}
              </p>
              <p class="personal-info-text-real-name">
                <!-- {{ $t('personal_info_real_name') }}:  -->
                {{ personalInfo.realName }}
              </p>
              <p class="personal-info-text-region">
                <em>{{ $t('personal_info_region') }}</em>&nbsp;&nbsp;
                {{ personalInfo.region }}
              </p>
              <p class="personal-info-text-gender">
                <em>{{ $t('personal_info_gender') }}</em>&nbsp;&nbsp;
                {{ personalInfo.gender }}
              </p>
              <p class="personal-info-text-institution">
                <em>{{ $t('personal_info_institution') }}</em>&nbsp;&nbsp;
                {{ personalInfo.institution }}
              </p>
              <p class="personal-info-text-major">
                <em>{{ $t('personal_info_major') }}</em>&nbsp;&nbsp;
                {{ personalInfo.major }}
              </p>
              <p class="personal-info-text-email">
                <em>{{ $t('personal_info_email') }}</em>&nbsp;&nbsp;
                {{ personalInfo.email }}
              </p>
              <p class="personal-info-text-url">
                <em>{{ $t('personal_info_url') }}</em>
                <ul class="personal-info-text-url-list">
                  <li v-for="(url, index) in personalInfo.urls" :key="index">
                    &nbsp;&nbsp;&nbsp;<svg t="1702890339983" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4227"><path d="M377.6 473.6C377.6 448 384 422.4 403.2 403.2l70.4-70.4 57.6-57.6c19.2-19.2 38.4-25.6 64-25.6 25.6 0 44.8 6.4 64 25.6 38.4 38.4 38.4 89.6 0 128l-128 128C512 550.4 492.8 556.8 467.2 556.8L416 608C428.8 614.4 448 620.8 467.2 620.8 512 620.8 544 601.6 576 576l128-128c57.6-57.6 57.6-153.6 0-211.2-57.6-57.6-153.6-57.6-211.2 0l-128 128C320 403.2 307.2 467.2 326.4 524.8L377.6 473.6z"  p-id="4228"></path><path d="M646.4 550.4c0 25.6-6.4 51.2-25.6 70.4l-128 128c-19.2 19.2-38.4 25.6-64 25.6-25.6 0-44.8-6.4-64-25.6-38.4-38.4-38.4-89.6 0-128l128-128c19.2-19.2 44.8-25.6 70.4-25.6l51.2-51.2C588.8 409.6 576 403.2 556.8 403.2 512 403.2 473.6 422.4 448 448L320 576c-57.6 57.6-57.6 153.6 0 211.2 57.6 57.6 153.6 57.6 211.2 0l128-128c44.8-44.8 57.6-108.8 32-160L646.4 550.4z"  p-id="4229"></path></svg>
                    <a :href="url" target="_blank">{{ url }}</a>
                  </li>
                </ul>
              </p>
            </div>            
        </div>
        <div class="tag-and-list">
          <div class="list">
            <div class="favourites-header">
              <div class="favourites-subscribe-tab">
                
                <h4 
                  :class="[{'tab tab-not-selected': !isFavourite}, { 'tab tab-selected': isFavourite }]" 
                  @click="isFavourite = true"
                >
                  {{ $t('favourites') }}
                </h4>
                <h4 
                  :class="[{'tab tab-selected': !isFavourite}, { 'tab tab-not-selected': isFavourite }]" 
                  @click="isFavourite = false"
                >
                  {{ $t('personal_follow_list') }}
                </h4>
              </div>
              <div class="favourites-creation" @click="isCreating = true" v-if="isFavourite">
                {{ $t('create_favourites') }}
              </div>  
            </div>
            <div class="favorites-list" v-if="isFavourite">
              <FavouriteList 
              @cancelCreation="cancelCreation"
              @updateCreation="updateCreation"
              :isCreating="isCreating"
              :favouritesInfo="favouritesInfo" />
            </div>
            <div class="follow-list" v-else>
              <FollowListVue/>
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
  import { User } from '../../api/users.js'
  import FollowListVue from '../../components/follow-list/followList.vue'
  export default {
    components: {
      FavouriteListItem,
      FavouriteList,
      FollowListVue,
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
          id: '',
          avatarUrl: '',
          nickName: '',
          realName: '',
          region: '',
          institution: '',
          email: '',
          gender: '',
          urls: [],
          major: ''
        },
        isCreating: false,
        moveVisible: false,
        isFavourite: true,
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
    
    created() {
      this.getUserInfo()
    },
    methods: {
      getUserInfo() {
        console.log(this.$cookies.get('user_id'))
        let userId = this.$cookies.get('user_id')
        if (userId) {
          User.getUser(userId).then(
            (response) => {
              // console.log(response)
              // console.log(response.data.username)
              this.personalInfo.id = userId
              this.personalInfo.nickName = response.data.username
              if(response.data.real_name === '' || response.data.real_name === null) {
                this.personalInfo.realName = '暂未设置'
              }
              else {
                this.personalInfo.realName = response.data.real_name
              }
              this.personalInfo.region = response.data.region
              if(response.data.gender === '' || response.data.gender === null) {
                this.personalInfo.gender = '保密'
              }
              else {
                this.personalInfo.gender = response.data.gender
              }
              if(response.data.institution === '' || response.data.institution === null) {
                this.personalInfo.institution = '暂未设置'
              }
              else {
                this.personalInfo.institution = response.data.institution
              }
              this.personalInfo.email = response.data.email
              this.personalInfo.urls = response.data.websites
              this.personalInfo.avatarUrl = 'api/users/' + userId + '/avatar/'
              console.log(this.personalInfo.avatarUrl)
            },
            (error) => {
              console.log(error)
            }
          )
          let data = {
            width: 250,
            height: 250
          }
          // User.getUserAvatar(userId, data).then(
          //   (response) => {
          //     console.log('111')
          //     console.log(response)
          //   },
          //   (error) => {
          //     console.log(error)
          //   }
          // )
        } 
      },
      handleMove() {
        this.moveVisible = true
      },
      handleMoveClick(index) {
        this.moveVisible = false
      },
      cancelCreation() {
        this.isCreating = false
      },
      updateCreation(name) {
        this.isCreating = false
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
      container.style.top = topPosition + 'px'
    });
  </script>
  
<style scoped>
* {
  box-sizing: border-box;
  max-width: 100%;
}

em {
  font-weight: bold;
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
  /* min-height: 800px; */
  width: 100%;
  /* min-width: 500px; */
  display: flex;
  justify-content: center;
  margin-top: 30px;
  /* margin-left: 10%; */
}
.title-part {
    display: flex;
    margin-top: 50px;
    margin-left: 80px;
    justify-content: space-around;
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
  width: 80%;
  justify-content: space-around;

}
.personal-info {
  /* border: 1px solid red; */
  width: 300px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.personal-image img {
  height: 250px;
  width: 250px;
  border-radius: 50%;
}
.personal-info-text {
  /* min-height: 400px; */
  width: 300px;
  margin-top: 10px;   
}

.personal-info-text p:not(:nth-child(1), :nth-child(2)) {
  background: var(--theme-mode-like);
  padding-left: 20px;
  padding-top: 15px;
}

.personal-info-text p:nth-child(3) {
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}
.personal-info-text p:last-child {
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  padding-bottom: 15px;
}

.personal-info-text * {
  color: var(--default-text-color);
}

.personal-info-text-nickname {
  font-size: 25px;
  text-align: center;
  font-weight: bold;
}

.personal-info-text-real-name {
  font-size: 16px;
  text-align: center;
  margin-bottom: 10px;
}

.personal-info-text-url-list li {
  margin-left: 5px;
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.personal-info-text-url-list li svg {
  width: 30px;
  height: 30px;
  fill: var(--default-text-color);
}

.personal-info-text-url-list li:last-child {
  margin-bottom: 0;
}

.personal-info-text-url-list li:hover * {
  font-size: 17px;
  font-weight: bold;
  color: var(--theme-color);
  fill: var(--theme-color);
}


/* .personal-info-text-item {
  margin-bottom: 5px;
  margin-left: 20px;
} */
.tag-and-list {
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
  min-height: 300px;
  
}
.follow-list {
  overflow-y: auto;
  height: 550px; 
}
.favourites-subscribe-tab {
  display: flex;
}
.favourites-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.tab {
  height: 40px;
  font-size: 18px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}
.tab:last-of-type {
  margin-left: 20px;
}
.tab-selected {
  background-color: var(--theme-color);
  font-weight: bold;
}
.tab-selected:hover {
  background-color: var(--theme-color-80);
}
.tab-not-selected {
  color: var(--default-text-color);
  background-color: var(--theme-mode-contrast);
}
.tab-not-selected:hover {
  background-color: var(--theme-mode-high-contrast);
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
    /* margin-left: 30px; */
  }

}

@media screen and (max-width: 768px) {
  .main-part {
    width: 100%;
    /* border: 1px solid red; */
    margin-left: 0;
  }
  .personal-info {
    width: 80%;
    margin-left: 10%;
    /* border: 1px solid red; */
    margin-bottom: 30px;
  }
  .info-tag-list {
    display: block;
    width: 100%;
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