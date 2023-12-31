<template>
  <PopoutModal :show="show" @close="handleClose">
    <div class="container">
      <h3>{{ $t('register_text') }}<span>{{ $t('register_prompt') }}</span></h3>
      <input 
        type="text" class="basic-input" 
        :placeholder="$t('email_text')" v-model="email"
      >
      <span>{{ $t('email_usage_prompt') }}</span>
      <input 
        type="text" class="basic-input" 
        :placeholder="$t('username_text')" v-model="username"
      >
      <input 
        type="password" class="basic-input" 
        :placeholder="$t('password_text')" 
        v-model="password"
      >
      <input 
        type="password" class="basic-input" 
        :placeholder="$t('confirm_password_text')" 
        v-model="confirmedPassword"
        @keyup.enter="register"
      >
      
      <div class="btn-box">
        <button class="basic-btn-outline" @click="handleJumpToLogin">{{ $t('login_text') }}</button>
        <button class="basic-btn" @click="register">{{ $t('register_text') }}</button>
      </div>
    </div>
  </PopoutModal>
</template>

<script>
import PopoutModal from '../popout-modal/PopoutModal.vue'
import i18n from '../../language'
import { Account } from '../../api/accounts.js'

export default {
  name: 'RegisterModal',
  emits: ['close', 'jumpToLogin'],
  data() {
    return {
      email: '',
      username: '',
      password: '',
      confirmedPassword: ''
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
    handleClose() {
      this.$emit('close')
    },
    handleJumpToLogin() {
      this.handleClose()
      this.$emit('jumpToLogin')
    },
    register() {
      let registerForm = {
        username: this.username,
        email: this.email,
        password: this.password,
        password_confirm: this.confirmedPassword,
      }
      Account.register(registerForm).then(
        (response) => {
          this.$bus.emit('message', { title: this.$t('register_success'), content: this.$t('check_email_hint'), time: 1500 })
          this.handleClose()
          setTimeout(() => {
            this.handleJumpToLogin()
          }, 3000)
        },
        (error) => {
          if (this.password !== this.confirmedPassword) {
            this.$bus.emit('message', { title: this.$t('register_failure'), content: this.$t('different_password'), time: 1500 })
          } else {
            this.$bus.emit('message', { title: this.$t('register_failure'), content: this.$t('register_failure_hint'), time: 1500 })
          }
        }
      )
    }
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
  margin-bottom: 40px;
}

.container>h3,
.container>h3 * {
  font-size: 35px;
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
  margin-bottom: 5px;
}
.container>input:nth-of-type(2),
.container>input:nth-of-type(3),
.container>input:nth-of-type(4) {
  margin-bottom: 40px;
}

.container>span {
  width: 70%;
  font-size: 16px;
  margin-bottom: 35px;
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

  .container>input:nth-of-type(2),
  .container>input:nth-of-type(3),
  .container>input:nth-of-type(4) {
    margin-bottom: 20px;
  }

  .container>span {
    margin-bottom: 15px;
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