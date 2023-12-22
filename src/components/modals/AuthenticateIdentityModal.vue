<template>
    <PopoutModal :show="show" @close="handleClose">
      <div class="container">
        <h3>{{ $t('authenticate_text') }}<span>{{ $t('authenticate_prompt') }}</span></h3>
        <!-- <input
          type="text" class="basic-input" 
          :placeholder="$t('auditor_text')" v-model="auditor"> -->
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
        <div>
          <ImageUpload v-if="images.length != 3" @click="openFilePicker"></ImageUpload>
          <img v-for="(img, index) in images" :key="index" :src="img" style="height: 100px; width: 100px;">
        </div>
        <div v-if="images.length == 3">已达图片上传上限</div>
        <input type="file" ref="fileInput" style="display: none" @change="handleFileUpload">
        <div>
        </div>
        <div class="btn-box">
          <button class="basic-btn-outline" @click="handleClose">{{ $t('cancel_text') }}</button>
          <button class="basic-btn" @click="handleAuthenticate">{{ $t('authenticate_text') }}</button>
        </div>
      </div>
    </PopoutModal>
  </template>
  
  <script>
  import PopoutModal from '../popout-modal/PopoutModal.vue'
  import ImageUpload from '../svg/ImageUpload.vue'
  
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
        content: '',
        images: [],
        imageFiles: [],
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
      ImageUpload,
      i18n
    },
    methods: {
      ...mapMutations(['setIsLoggedIn']),
      handleClose() {
        this.$emit('close')
      },
      handleAuthenticate() {
        let formData = new FormData()
        formData.append('auditor', 22)
        formData.append('real_name', this.realName)
        formData.append('institution', this.institution)
        formData.append('position', this.position)
        let concepts_data = {
          concepts: this.concepts
        }
        console.log(concepts_data);
        formData.append('concepts', JSON.stringify(concepts_data))
        formData.append('work_email', this.workEmail)
        if (this.content.length == 0) {
          formData.append('content', '无备注')
        } else {
          formData.append('content', this.content)
        }
        for (let i = 1; i <= this.imageFiles.length; i++) {
          formData.append('image' + i, this.imageFiles[i - 1])
        }
        Application.applications(formData).then(
          (response) => {
            alert('提交认证成功！')
          },
          (error) => {
            alert(error.data)
          }
        )
      },
      openFilePicker() {
        this.$refs.fileInput.click();
      },
      handleFileUpload(e) {
        let imgUpload = e.target.files[0]
        let imgUrl = URL.createObjectURL(imgUpload)
        this.images.push(imgUrl)
        this.imageFiles.push(imgUpload)
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