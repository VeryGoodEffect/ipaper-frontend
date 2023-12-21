<template>
    <PopoutModal :show="show" @close="handleClose">
      <div class="container">
        <h3>{{ $t('authenticate_text') }}<span>{{ $t('authenticate_prompt') }}</span></h3>
        <input
          type="text" class="basic-input" 
          :placeholder="$t('auditor_text')" v-model="auditor">
        <input
        type="text" class="basic-input" 
        :placeholder="$t('realName_text')" v-model="realName">
        <input
        type="text" class="basic-input" 
        :placeholder="$t('institution_text')" v-model="institution">
        <input
        type="text" class="basic-input" 
        :placeholder="$t('position_text')" v-model="position">
        <input
        type="text" class="basic-input" 
        :placeholder="$t('concepts_text')" v-model="concepts">
        <input
        type="text" class="basic-input" 
        :placeholder="$t('workEmail_text')" v-model="workEmail">
        <input
        type="text" class="basic-input" 
        :placeholder="$t('content_text')" v-model="content">
        <div class="btn-box">
          <button class="basic-btn-outline" @click="handleClose">{{ $t('cancel_text') }}</button>
          <button class="basic-btn" @click="handleAuthenticate">{{ $t('authenticate_text') }}</button>
        </div>
      </div>
    </PopoutModal>
  </template>
  
  <script>
  import PopoutModal from '../popout-modal/PopoutModal.vue'
  
  import i18n from '../../language'
  
  import { Application } from '../../api/applications.js'
  
  import { mapMutations } from 'vuex'
  
  export default {
    name: 'AuthenticateIdentityModal',
    emits: ['close'],
    data() {
      return {
        auditor: '',
        realName: '',
        institution: '',
        position: '',
        concepts: '',
        workEmail: '',
        content: ''
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
      handleAuthenticate() {
        let form = {
          auditor: this.auditor,
          real_name: this.realName,
          institution: this.institution,
          position: this.position,
          concepts: this.concepts,
          work_email: this.workEmail,
          content: this.content
        }
        Application.applications(form).then(
          (response) => {
            alert('提交认证成功！')
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
  margin-bottom: 30px;
}

.container>h3,
.container>h3 * {
  font-size: 30px;
  font-weight: bold;
}

.container>input {
  width: 70%;
  height: 50px;
  font-size: 20px;
  padding-left: 20px;
  padding-right: 20px;
}

.container>input::placeholder {
  color: var(--theme-mode-high-contrast);
}

.container>input {
  margin-bottom: 20px;
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
  font-size: 20px;
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
    font-size: 18px;
    padding-left: 10px;
    padding-right: 5px;
  }

  .container>input,
  .container>span,
  .btn-box {
    min-width: 80%;
  }

  .btn-box button {
    width: 100px;
    height: 40px;
    font-size: 16px;
  }

  .container>span,
  .container>span>a {
    font-size: 14px;
  }
}

</style>