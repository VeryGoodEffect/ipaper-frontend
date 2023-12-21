<template>
  <header>
    <section>
      <div class="logo"></div>
      <h1>iPaper<span>{{ $t('web_name_text') }}</span></h1>
    </section>
    <section>
      <!-- <button >{{ $t('language') }}</button> -->
      <div @click="jumpToMessage">
        <div v-if="!hasUnreadMessage"><MailIcon></MailIcon></div>
        <div v-else><UnreadMailIcon></UnreadMailIcon></div>
      </div>
      <svg @click="translate"
          t="1700014496111" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4957" width="200" height="200"><path d="M360.228571 505.234286c-8.594286 0-12.8-4.388571-12.8-13.165715v-74.24h-76.068571c-5.12 0-9.325714-1.645714-12.617143-4.937142s-4.754286-7.68-4.754286-12.982858v-81.005714c0-5.302857 1.645714-9.691429 4.754286-12.982857s7.497143-4.937143 12.617143-4.937143H347.428571v-34.742857c0-8.777143 4.205714-13.165714 12.8-13.165714s12.8 4.388571 12.8 13.165714v34.742857h77.165715c5.12 0 9.325714 1.645714 12.617143 4.937143s4.754286 7.68 4.754285 12.982857v81.005714c0 5.302857-1.645714 9.691429-4.754285 12.982858s-7.497143 4.937143-12.617143 4.937142H373.028571v74.24c0 8.777143-4.205714 13.165714-12.8 13.165715z m-75.337142-112.64H347.428571v-66.56h-62.537142c-4.205714 0-6.4 2.194286-6.4 6.582857v53.394286c0 4.388571 2.194286 6.582857 6.4 6.582857z m88.137142 0h62.537143c4.205714 0 6.4-2.194286 6.4-6.582857v-53.394286c0-4.388571-2.194286-6.582857-6.4-6.582857H373.028571v66.56zM704.548571 694.674286h-78.445714l-15.908571 50.285714c-2.011429 0.914286-4.022857 1.645714-6.217143 2.011429-2.194286 0.548571-4.754286 0.731429-7.68 0.731428-5.302857 0-9.691429-1.28-13.165714-3.657143-3.474286-2.377143-5.12-6.034286-5.12-10.971428 0-2.377143 0.365714-4.754286 0.914285-6.948572 0.548571-2.377143 1.462857-4.937143 2.56-7.862857 2.925714-9.142857 6.765714-21.028571 11.702857-35.84s10.422857-30.171429 16.091429-46.445714c5.668571-16.274286 11.52-32.182857 17.371429-48.091429s10.788571-29.257143 15.177142-40.411428c2.194286-1.28 5.485714-2.56 9.874286-3.84s8.96-2.011429 13.714286-2.011429c6.217143 0 11.885714 0.914286 16.822857 2.742857 4.937143 1.828571 8.228571 4.937143 10.057143 9.325715 4.571429 12.434286 9.874286 26.697143 15.36 42.605714 5.668571 15.908571 11.154286 32.365714 16.822857 49.371428 5.485714 17.005714 10.971429 33.645714 16.091429 49.737143 5.12 16.274286 9.874286 30.902857 13.897142 44.251429-2.011429 2.194286-4.571429 4.022857-7.68 5.485714-3.108571 1.462857-6.765714 2.194286-11.154285 2.194286-5.668571 0-9.874286-1.097143-12.434286-3.474286s-4.754286-6.217143-6.582857-11.702857l-12.068572-37.485714z m-39.497142-121.965715c-2.194286 5.851429-4.571429 12.617143-7.131429 20.114286-2.56 7.497143-5.302857 15.36-8.045714 23.588572-2.742857 8.228571-5.485714 16.64-8.228572 25.051428-2.742857 8.411429-5.485714 16.64-7.862857 24.685714h63.268572c-2.925714-8.777143-5.668571-17.737143-8.594286-26.697142-2.925714-8.96-5.668571-17.554286-8.228572-25.6s-5.12-15.725714-7.497142-22.857143c-2.377143-7.131429-4.205714-13.348571-5.851429-18.468572h-1.828571z" p-id="4958"></path><path d="M521.142857 606.171429H189.622857a65.097143 65.097143 0 0 1-65.097143-64.914286V202.605714c0-35.84 29.257143-65.097143 65.097143-65.097143H521.142857c35.84 0 64.914286 29.257143 64.914286 65.097143V541.257143a64.914286 64.914286 0 0 1-64.914286 64.914286zM189.622857 174.08c-15.725714 0-28.525714 12.8-28.525714 28.525714V541.257143c0 15.725714 12.8 28.342857 28.525714 28.342857H521.142857c15.725714 0 28.342857-12.8 28.342857-28.342857V202.605714c0-15.725714-12.8-28.525714-28.342857-28.525714H189.622857z" p-id="4959"></path><path d="M834.56 886.491429H503.04a65.097143 65.097143 0 0 1-65.097143-64.914286V587.885714c0-10.057143 8.228571-18.285714 18.285714-18.285714h64.914286c15.725714 0 28.342857-12.8 28.342857-28.342857v-105.142857c0-10.057143 8.228571-18.285714 18.285715-18.285715h266.788571c35.84 0 64.914286 29.257143 64.914286 65.097143v338.651429a64.914286 64.914286 0 0 1-64.914286 64.914286zM474.514286 606.171429v215.405714c0 15.725714 12.8 28.342857 28.525714 28.342857h331.52c15.725714 0 28.342857-12.8 28.342857-28.342857V482.925714c0-15.725714-12.8-28.525714-28.342857-28.525714H586.057143v86.857143a64.914286 64.914286 0 0 1-64.914286 64.914286h-46.628571z" p-id="4960"></path></svg>
      <template v-if="!isLoggedIn">
        <button class="basic-btn" @click="loginModalShouldShow = true">{{ $t('login_text') }}</button>
        <button class="basic-btn-outline" @click="registerModalShouldShow = true">{{ $t('register_text') }}</button>
        <div class="dropdown-icon">
          <ul class="dropdown-list">
            <li @click="loginModalShouldShow = true">{{ $t('login_text') }}</li>
            <li @click="registerModalShouldShow = true">{{ $t('register_text') }}</li>
          </ul>
        </div>
      </template>
      <template v-else>
        <a class="homepage-link">
          <div>{{ $t('hello_message') + currentUsername }}</div>
          <ul class="dropdown-list">
            <li @click="jumpToPersonalHomepage">{{ $t('personal_homepage_text') }}</li>
            <li @click="jumpToChangePassword">{{ $t('change_password_text') }}</li>
            <li @click="handleLogout">{{ $t('logout_text') }}</li>
          </ul>
        </a>
      </template>
    </section>
  </header>
  <LoginModal 
    :show="loginModalShouldShow" 
    @close="loginModalShouldShow = false" 
    @jumpToRigister="registerModalShouldShow = true"
    @jumpToRetrievePassword="retrievePasswordModalShouldShow = true"
  />

  <RegisterModal 
    :show="registerModalShouldShow" 
    @close="registerModalShouldShow = false" 
    @jumpToLogin="loginModalShouldShow = true"
  />

  <RetrievePasswordModal 
    :show="retrievePasswordModalShouldShow" 
    @close="retrievePasswordModalShouldShow = false"
  />
  
  <ChangePasswordModal
    :show="changePasswordModalShow"
    @close="changePasswordModalShow = false"
  />
  
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import LoginModal from '../modals/LoginModal.vue'
import RegisterModal from '../modals/RegisterModal.vue'
import RetrievePasswordModal from '../modals/RetrievePasswordModal.vue'
import MailIcon from '../svg/MailIcon.vue'
import UnreadMailIcon from '../svg/UnreadMailIcon.vue'
import ChangePasswordModal from '../modals/ChangePasswordModal.vue'

import { Account } from '../../api/accounts.js'
import { User } from '../../api/users.js'

import i18n from '../../language'
export default {
  name: 'NavBar',
  components: {
    LoginModal,
    RegisterModal,
    RetrievePasswordModal,
    ChangePasswordModal,
    i18n,
    MailIcon,
    UnreadMailIcon
  },
  data() {
    return {
      hasUnreadMessage: false,
      loginModalShouldShow: false,
      registerModalShouldShow: false,
      retrievePasswordModalShouldShow: false,
      changePasswordModalShow: false,
      currentUsername: ''
    }
  },
  computed: {
    ...mapState(['isLoggedIn'])
  },
  watch: {
    isLoggedIn(newValue) {
      if (newValue === true) {
        this.getUserIdAndSayHello()
      }
    }
  },
  mounted() {
    console.log(this.$cookies.get('user_id'))
    this.$bus.on('judgeHasUnreadMsg', this.handleJudgeHasUnreadMsg)
    this.getUserIdAndSayHello()
  },
  methods: {
    ...mapMutations(['setIsLoggedIn']),
    getUserIdAndSayHello() {
      let userId = this.$cookies.get('user_id')
      if (userId) {
        this.setIsLoggedIn(true)
        User.getUser(userId).then(
          (response) => {
            this.currentUsername = response.data.username
          },
          (error) => {
            console.log(error)
          }
        )
      } 
    },
    // mq: 跳转到消息详情页面
    jumpToMessage() {
        this.$router.push('/message')
    },
    translate() {
      document.documentElement.classList.add('document-fade-out')
      setTimeout(() => {
        document.documentElement.classList.remove('document-fade-out')
        if (this.$i18n.locale == 'zh') {
          this.$i18n.locale = 'en'
        }
        else {
          this.$i18n.locale = 'zh'
        }
        document.documentElement.classList.add('document-fade-in')
        setTimeout(() => {
          document.documentElement.classList.remove('document-fade-in')
        }, 610)
      }, 200)
    },
    jumpToPersonalHomepage() {
      this.$router.push('/personal_homepage')
    },
    handleLogout() {
      Account.logout().then(
        (response) => {
          alert("登出成功！")
          this.setIsLoggedIn(false)
        },
        (error) => {
          alert("登出失败！")
        }
      )
    },
    jumpToChangePassword() {
      console.log(111);
      this.changePasswordModalShow = true
    }
  }
}
</script>

<style scoped>
header {
  position: sticky;
  top: 0;
  width: 98.5%;
  height: 60px;
  background: var(--theme-mode);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  z-index: 999;
}

header>section {
  display: flex;
  align-items: center;
}

header h1,
header h1 span {
  font-size: 25px;
  /* font-weight: bold; */
  color: var(--theme-color);
}

header h1 {
  margin-left: 10px;
}

.logo {
  width: 40px;
  height: 40px;
  background: green;
  border-radius: 50%;
  flex: none;
}

header button {
  margin: 0 10px;
}

.dropdown-icon {
  width: 40px;
  height: 40px;
  background: url('../../components/svg/menu.svg');
  background-size: cover;
  display: none;
  cursor: pointer;
  position: relative;
  transition: .5s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.dropdown-list {
  position: absolute;
  top: calc(100%);
  right: -10px;
  padding: 10px;
  background: var(--theme-mode-like);
  border-radius: 5px;
  display: none;
}

.dropdown-list li {
  width: 100px;
  display: flex;
  justify-content: center;
  background: var(--theme-mode-contrast);
  color: var(--theme-mode-high-contrast);
  font-size: 16px;
  font-weight: bold;
  padding: 5px;
  border-radius: 5px;
  transition: .3s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.dropdown-list li:first-child {
  margin-bottom: 10px;
}

.dropdown-list li:hover {
  scale: 1.05;
}

.icon {
  width: 40px;
  height: 40px;
  background-size: cover;
  cursor: pointer;
  transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
  fill: #666;
}

.icon:hover {
  scale: 1.2;
  fill: var(--theme-color);
}

header svg {
  margin: 0 10px;
}

.homepage-link {
  margin-right: 10px;
  position: relative;
}

.homepage-link div {
  font-size: 18px;
  color: var(--theme-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.homepage-link:hover .dropdown-list {
  display: block;
}

@media screen and (max-width: 1000px) {
  header h1,
  header h1 span {
    font-size: 20px;
  }
}

@media screen and (max-width: 850px) {
  .icon {
    width: 40px;
    height: 40px;
  }
}

@media screen and (max-width: 768px) {
  .dropdown-icon {
    display: block;
  }

  .dropdown-icon:hover ul {
    display: block;
  }

  header button {
    display: none;
  }

  header h1 span {
    display: none;
  }
}

@media screen and (max-width: 600px) {
  .dropdown-icon {
    width: 40px;
    height: 40px;
  }
  .homepage-link div {
    max-width: 150px;
  }
}
</style>