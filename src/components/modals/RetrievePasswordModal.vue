<template>
  <PopoutModal :show="show" @close="handleClose">
    <div class="container">
      <h3>{{ $t('retrieve_password_text') }}</h3>
      <input 
        type="text" class="basic-input" 
        :placeholder="$t('email_text')" v-model="email"
      >
      <span>{{ $t('retrieve_password_message') }}</span>
      
      <div class="btn-box">
        <button class="basic-btn-outline" @click="handleClose">{{ $t('cancel_text') }}</button>
        <button class="basic-btn" @click="resetPassword">{{ $t('confirm_text') }}</button>
      </div>
    </div>
  </PopoutModal>
</template>

<script>
import PopoutModal from '../popout-modal/PopoutModal.vue'
import i18n from '../../language'
import { Account } from '../../api/accounts.js'

export default {
  name: 'RetrievePasswordModal',
  emits: ['close'],
  data() {
    return {
      email: '',
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
    resetPassword() {
      let resetPasswordForm = {
        email: this.email
      }
      Account.sendPasswordResetEmail(resetPasswordForm).then(
        (response) => {
          alert("请查看邮箱链接")
        },
        (error) => {
          alert(error.data)
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
    font-size: 35px;
    font-weight: bold;
    margin-bottom: 30px
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

}

</style>