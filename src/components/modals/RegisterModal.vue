<template>
  <PopoutModal :show="show" @close="handleClose">
    <div class="container">
      <h3>注册<span>：加入 iPaper</span></h3>
      <input type="text" class="basic-input" placeholder="邮箱" v-model="email">
      <span>邮箱可用于登录和找回密码。</span>
      <input type="text" class="basic-input" placeholder="用户名" v-model="username">
      <input 
        type="password" class="basic-input" placeholder="密码" 
        v-model="password"
      >
      <input 
        type="password" class="basic-input" placeholder="确认密码" 
        v-model="confirmedPassword"
        @keyup.enter="register"
      >
      
      <div class="btn-box">
        <button class="basic-btn-outline">登录</button>
        <button class="basic-btn" @click="register">注册</button>
      </div>
    </div>
  </PopoutModal>
</template>

<script>
import PopoutModal from '../popout-modal/PopoutModal.vue'

export default {
  name: 'RegisterModal',
  emits: ['close'],
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
    PopoutModal
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    register() {
      alert('邮箱：' + this.username + 
            '，用户名：' + this.password + 
            '，密码：' + this.password + 
            '，确认密码：' + this.comfirmedPassword)
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
    font-size: 35px;
    font-weight: bold;
    margin-bottom: 30px
  }

  .container>h3 span {
    display: none;
  }

  .container>input {
    height: 40px;
    font-size: 20px;
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
    width: 100px;
    height: 40px;
    font-size: 20px;
  }

  .container>span,
  .container>span>a {
    font-size: 14px;
  }
}

</style>