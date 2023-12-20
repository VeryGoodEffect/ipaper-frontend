<template>
    <div class="main-part">
      <div class="info-tag-list">
        <div class="personal-info">
            <!-- <div class="personal-image">
              <img :src="authorInfo.avatarUrl" alt="Personal Image">
            </div> -->
            <div class="personal-info-text">
              <p class="personal-info-text-nickname">
                <!-- {{ $t('personal_info_nick_name') }}:  -->
                <a :href="authorInfo.orcid">{{ authorInfo.nickName }}</a>
              </p>
              <div>
                  <div class="follow is-follow" @click="isFollowing = true" v-if="!isFollowing">
                      {{ $t('scholar_portal_follow') }}
                  </div>  
                  <div class="follow un-follow" @click="isFollowing = false" v-else>
                      {{ $t('scholar_portal_unfollow') }}
                  </div> 
              </div>
              <p class="personal-info-text-region">
                <em>{{ $t('personal_info_region') }}</em>&nbsp;&nbsp;
                {{ authorInfo.region }}
              </p>
              <p class="personal-info-text-institution" v-if="authorInfo.institution.name !== null">
                <em>{{ $t('personal_info_institution') }}</em>&nbsp;&nbsp;
                {{ authorInfo.institution.name }}
              </p>
              <!-- <p class="personal-info-text-major">
                <em>{{ $t('personal_info_major') }}</em>&nbsp;&nbsp;
                {{ authorInfo.major }}
              </p> -->
              <p class="personal-info-text-email" v-if="authorInfo.email !== null && authorInfo.email !== ''">
                <em>{{ $t('personal_info_email') }}</em>&nbsp;&nbsp;
                {{ authorInfo.email }}
              </p>
              <p class="personal-info-text-institution">
                <em>{{ $t('scholar_portal_total_publications') }}</em>&nbsp;&nbsp;
                {{ authorInfo.totalWork }}
              </p>
              <p class="personal-info-text-institution">
                <em>{{ $t('scholar_portal_total_citations') }}</em>&nbsp;&nbsp;
                {{ authorInfo.totalCitations }}
              </p>
              <p class="personal-info-text-institution">
                <em>{{ $t('scholar_portal_this_year_citations') }}</em>&nbsp;&nbsp;
                {{ authorInfo.yearCitations }}
              </p>
              <p class="personal-info-text-url" v-if="authorInfo.urls.length !== 0"> 
                <em>{{ $t('personal_info_url') }}</em>
                <ul class="personal-info-text-url-list">
                  <li v-for="(url, index) in authorInfo.urls" :key="index">
                    &nbsp;&nbsp;&nbsp;<svg t="1702890339983" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4227"><path d="M377.6 473.6C377.6 448 384 422.4 403.2 403.2l70.4-70.4 57.6-57.6c19.2-19.2 38.4-25.6 64-25.6 25.6 0 44.8 6.4 64 25.6 38.4 38.4 38.4 89.6 0 128l-128 128C512 550.4 492.8 556.8 467.2 556.8L416 608C428.8 614.4 448 620.8 467.2 620.8 512 620.8 544 601.6 576 576l128-128c57.6-57.6 57.6-153.6 0-211.2-57.6-57.6-153.6-57.6-211.2 0l-128 128C320 403.2 307.2 467.2 326.4 524.8L377.6 473.6z"  p-id="4228"></path><path d="M646.4 550.4c0 25.6-6.4 51.2-25.6 70.4l-128 128c-19.2 19.2-38.4 25.6-64 25.6-25.6 0-44.8-6.4-64-25.6-38.4-38.4-38.4-89.6 0-128l128-128c19.2-19.2 44.8-25.6 70.4-25.6l51.2-51.2C588.8 409.6 576 403.2 556.8 403.2 512 403.2 473.6 422.4 448 448L320 576c-57.6 57.6-57.6 153.6 0 211.2 57.6 57.6 153.6 57.6 211.2 0l128-128c44.8-44.8 57.6-108.8 32-160L646.4 550.4z"  p-id="4229"></path></svg>
                    <a :href="url" target="_blank">{{ url }}</a>
                  </li>
                </ul>
              </p>
            </div> 
            <div class="focus-area">
              <h3>{{ $t('scholar_portal_focus_areas') }}</h3>
              <div class="tag-container">
                <p v-for="(tag, index) in interestTag" :key="index" class="tag-item">
                  {{ tag.name }}
                </p>
              </div>
            </div> 
        </div>
        <div class="tag-and-list">
          <div class="list">
            <div class="favourites-header">
              <div class="favourites-subscribe-tab">
                <h3>{{ $t('scholar_portal_articles') }}</h3>
              </div>
            </div>
            <div class="favorites-list">
                <Pagination class="pagination">
                    <SearchResultListItem :infoItem="infoItem"></SearchResultListItem>
                    <SearchResultListItem :infoItem="infoItem"></SearchResultListItem>
                    <SearchResultListItem :infoItem="infoItem"></SearchResultListItem>
                    <SearchResultListItem :infoItem="infoItem"></SearchResultListItem>
                    <SearchResultListItem :infoItem="infoItem"></SearchResultListItem>
                    <SearchResultListItem :infoItem="infoItem"></SearchResultListItem>
                </Pagination>
            </div>
          </div>
          
        </div>
      </div>  
    </div>
    <div class="relation-network">
      <!-- <h3>{{ $t('scholar_portal_net') }}</h3> -->
      <RelationGraphDemo></RelationGraphDemo>
    </div>
    
</template>
  
  <script>
  import RelationGraphDemo from '../../components/relation-graph/RelationGraph.vue'
  import InstitutionListItem from '../../components/list-item/InstitutionListItem.vue'
  import SearchResultListItem from '../../components/search-result-list/SearchResultListItem.vue'
  import Pagination from '../../components/pagination/Pagination.vue'
  import FavouriteListItem from '../../components/favorites/FavouriteListItem.vue'
  import i18n from '../../language'
  import FavouriteList from '../../components/favorites/FavouriteList.vue'
  import { Search } from '../../api/search.js'
  import FollowList from '../../components/follow-list/FollowList.vue'
  export default {
    components: {
      FavouriteListItem,
      FavouriteList,
      FollowList,
      SearchResultListItem,
      Pagination,
      InstitutionListItem,
      RelationGraphDemo,
      i18n
    },
    data() {
      return { 
        isFollowing: false,
        isArticle: true,
        isFocusArea: false,
        isRelationNetwork: false,
        authorInfo: {
          id: '',
          orcid: '',
          worksApiUrl: '',
          nickName: '',
          realName: '',
          region: '',
          institution: {
            id: '',
            ror: '',
            name: '',
          },
          email: '',
          gender: '',
          urls: [],
          major: '',
          totalCitations: 0,
          totalWork: 0,
          yearCitations: 0,

        },
        infoItem: {
            title: "低碳经济: 人类经济发展方式的新变革",
            author: "鲍健强， 苗阳， 陈锋 - 中国工业经济, 2008 - cqvip.com",
            excerpt: "低碳经济(Low-carbon Economy)是未来经济发展方式的新选择.本文从大时空跨度和能源利用方conomy)是未来经济发展方式的新选择.本文从大时空跨度和能源利conomy)是未来经济发展方式的新选择.本文从大时空跨度和能源利conomy)是未来经济发展方式的新选择.本文从大时空跨度和能源利conomy)是未来经济发展方式的新选择.本文从大时空跨度和能源利conomy)是未来经济发展方式的新选择.本文从大时空跨度和能源利conomy)是未来经济发展方式的新选择.本文从大时空跨度和能源利式上,分析了人类经济发展形态演变历程;探讨了低碳经济… 了低碳经济产生与发展.本文研究了低碳",
            timeCited: 57,
            keyword: "经济"
        },
        institutionInfo: [
          {
            name: 'google',
            profile: '这是google的简介',
            link: ''
          },
          {
            name: '北京航空航天大学',
            profile: '这是google的简介',
            link: ''
          },{
            name: '北航附中',
            profile: '这是google的简介',
            link: ''
          },{
            name: '北航附小',
            profile: '这是google的简介',
            link: '这是google的简介'
          },{
            name: 'Huawei',
            profile: '这是google的简介',
            link: ''
          },{
            name: 'google',
            profile: '这是google的简介',
            link: ''
          },
        ],
        isCreating: false,
        moveVisible: false,
        isFavourite: true,
        favouritesInfo: [
          // {
          //   name: "感兴趣的内容",
          //   showContextMenu: false
          // },
          // {
          //   name: "我的收藏",
          //   showContextMenu: false
          // }, 
          // {
          //   name: "我的收藏",
          //   showContextMenu: false
          // },  
          // {
          //   name: "我的收藏",
          //   showContextMenu: false
          // }, 
          // {
          //   name: "量子力学",
          //   showContextMenu: false
          // }, 
          // {
          //   name: "有机化学",
          //   showContextMenu: false
          // }, 
          // {
          //   name: "Diffusion model",
          //   showContextMenu: false
          // }, 
          // {
          //   name: "CV",
          //   showContextMenu: false
          // }
        ],
        interestTag: [
          {
            name: '量子力学',
            wikidata: '',
            id: '',
          },
          {
            name: '扩散模型',
            wikidata: '',
            id: '',
          },
          {
            name: '语义分割',
            wikidata: '',
            id: '',
          },
          {
            name: '全景视觉',
            link: '',
            id: '',
          },
          
        ]
      }
    },
    
    created() {
      this.getAuthorInfo()
    },
    methods: {
      getAuthorInfo() {
        //get author id
        let authorID = 'A5040654425'
        if (authorID) {
          Search.searchAuthorInfo(authorID).then(
            (response) => {
              console.log(response)
              // console.log(response.data.username)
              this.authorInfo.nickName = response.data.display_name
              this.isFollowing = response.data.is_followed
              this.authorInfo.region = response.data.last_known_institution.country_code
              this.authorInfo.institution.id = response.data.last_known_institution.id
              this.authorInfo.institution.ror = response.data.last_known_institution.ror
              this.authorInfo.institution.name = response.data.last_known_institution.display_name
              this.authorInfo.works_api_url = response.data.works_api_url
              this.authorInfo.totalWork = response.data.works_count
              this.authorInfo.totalCitations = response.data.cited_by_count
              this.authorInfo.yearCitations = response.data.counts_by_year[0].cited_by_count

              this.interestTag.splice(0, this.interestTag.length)
              for(let i = 0; i < response.data.x_concepts.length; i++) {
                this.interestTag.push({
                  id: response.data.x_concepts[i].id,
                  name: response.data.x_concepts[i].display_name,
                  wikidata: response.data.x_concepts[i].wikidata
                })
              }
            },
            (error) => {
              console.log(error)
            }
          )
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
        this.$router.push('/')
      },
      selectArticle() {
        this.isArticle = true
        this.isFocusArea = false
        this.isRelationNetwork = false
      },
      selectFocusArea() {
        this.isArticle = false
        this.isFocusArea = true
        this.isRelationNetwork = false
      },
      selectRelationNetwork() {
        this.isArticle = false
        this.isFocusArea = false
        this.isRelationNetwork = true
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
    /* margin-top: 50px; */
    /* margin-left: 80px; */
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
  align-content: flex-start;
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

.personal-info-text p:nth-child(4) {
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
  font-size: 30px;
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
.focus-area {
    min-height: 100px;
    width: 100%;
    /* border: 2px solid red; */
    /* width: 50%;  */
}
.focus-area h3{
  font-size: 25px;
  font-weight: bold;
  margin-top: 20px;
}
.tag-container {
  display: flex;
  flex-wrap: wrap;
}
.tag-item {
  margin-top: 10px;
  margin-right: 10px;
  color: var(--theme-color);
  cursor: pointer;
}

.tag-item :hover {
  text-decoration: underline;
  cursor: pointer;
}
.list {
  margin-top: 0;

  /* display: flex; */
  /* justify-content: space-around;
  flex-wrap: wrap; */
  /* width: 50%; */
  min-height: 300px;
  
}

.favourites-subscribe-tab {
  display: flex;
}
.favourites-subscribe-tab h3 {
  font-size: 25px;
  font-weight: bold;
}
.favourites-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.follow {
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
.follow:last-of-type {
    margin-top: 10px;
  /* margin-left: 20px; */
}
.is-follow {
  background-color: var(--theme-color);
  font-weight: bold;
}
.is-follow:hover {
  background-color: var(--theme-color-80);
}
.un-follow {
  color: var(--default-text-color);
  background-color: var(--theme-mode-contrast);
}
.un-follow:hover {
  background-color: var(--theme-mode-high-contrast);
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
/* .tab {
  margin-left: 20px;
} */
.tab + .tab  {
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

.relation-network {
  width: 80%;
  margin-left: 10%;
}

.relation-network h3 {
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 20px;
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
  .focus-area {
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