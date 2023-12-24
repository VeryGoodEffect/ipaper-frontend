<template>
  <PopoutModal :show="show" @close="handleClose">
    <div class="container">
      <h3>{{ $t('login_text') }}<span>{{ $t('login_prompt') }}</span></h3>
      <input
        type="text" class="basic-input" 
        :placeholder="$t('email_text')" v-model="email">
      <input 
        type="password" class="basic-input" 
        :placeholder="$t('password_text')" 
        v-model="password"
        @keyup.enter="login"
      >
      <span>{{ $t('retrieve_password_prompt_1') }}<a @click="handleJumpToRetrievePassword">{{ $t('retrieve_password_prompt_2') }}</a></span>
      <div class="btn-box">
        <button class="basic-btn-outline" @click="handleJumpToRegister">{{ $t('register_text') }}</button>
        <button class="basic-btn" @click="login">{{ $t('login_text') }}</button>
      </div>
    </div>
  </PopoutModal>
</template>

<script>
import PopoutModal from '../popout-modal/PopoutModal.vue'

import i18n from '../../language'

import { Account } from '../../api/accounts.js'
import { User } from '../../api/users.js'

import { mapMutations } from 'vuex'

export default {
  name: 'LoginModal',
  emits: ['close', 'jumpToRigister', 'jumpToRetrievePassword'],
  data() {
    return {
      email: '',
      password: ''
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  components: {
    PopoutModal,
    i18n
  },
  methods: {
    ...mapMutations(['setIsLoggedIn']),
    handleClose() {
      this.$emit('close')
    },
    handleJumpToRegister() {
      this.handleClose()
      this.$emit('jumpToRigister')
    },
    handleJumpToRetrievePassword() {
      this.handleClose()
      this.$emit('jumpToRetrievePassword')
    },
    login() {
      let loginForm = {
        email: this.email,
        password: this.password
      }
      Account.login(loginForm).then(
        (response) => {
          // alert("登录成功！")
          this.setIsLoggedIn(true)
          this.handleClose()
          if (this.$route.path === '/') {
            this.$router.push('search')
          }
        },
        (error) => {
          // alert("登录失败！")
        }
      )
      
    },
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
}

.container>* {
  min-width: 60%;
}

.container>h3 {
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
}

.container>h3,
.container>h3 * {
  font-size: 40px;
  font-weight: bold;
}

.container>input {
  width: 70%;
  height: 60px;
  font-size: 24px;
  padding-left: 20px;
  padding-right: 20px;
}

.container>input::placeholder {
  color: var(--theme-mode-high-contrast);
}

.container>input:first-of-type {
  margin-bottom: 40px;
}
.container>input:last-of-type {
  margin-bottom: 5px;
}

.container>span {
  width: 70%;
  font-size: 16px;
  margin-bottom: 25px;
}

.btn-box {
  width: 70%;
  display: flex;
  justify-content: space-around;
}

.btn-box button {
  width: 120px;
  height: 50px;
  font-size: 24px;
}

@media screen and (max-width: 768px) {
  .container>h3 {
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 30px
  }

  .container>h3 span {
    display: none;
  }

  .container>input {
    height: 40px;
    font-size: 18px;
    padding-left: 10px;
  }

  .container>input:first-of-type {
    margin-bottom: 20px;
  }

  .container>input,
  .container>span,
  .btn-box {
    min-width: 80%;
  }

  .btn-box button {
    width: 80px;
    height: 30px;
    font-size: 16px;
  }

  .container>span,
  .container>span>a {
    font-size: 14px;
  }
}

</style>