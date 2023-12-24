<template>
<PopoutModal :show="show" @close="handleClose">
    <div class="container">
        <h3>{{ $t('authenticate_text') }}<span>{{ $t('authenticate_prompt') }}</span></h3>
        <input type="text" class="basic-input" :placeholder="$t('realName_text')" v-model="realName">
        <input type="text" class="basic-input" :placeholder="$t('institution_text')" v-model="institution">
        <input type="text" class="basic-input" :placeholder="$t('position_text')" v-model="position">
        <input type="text" class="basic-input" :placeholder="$t('concepts_text')" v-model="concepts">
        <input type="text" class="basic-input" :placeholder="$t('workEmail_text')" v-model="workEmail">
        <input type="text" class="basic-input" :placeholder="$t('content_text')" v-model="content">
        <div class="img-upload">
            <svg @click="openFilePicker" v-if="images.length != 3" t="1703213230471" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7173" :width="size" height="100">
                <path d="M853.344 341.344C853.344 294.4 814.944 256 768 256s-85.344 38.4-85.344 85.344 38.4 85.344 85.344 85.344 85.344-38.4 85.344-85.344z" p-id="7174"></path>
                <path d="M0 85.344v853.344h512v-85.344H85.344V742.4l256-256L512 657.056l59.744-59.744-230.4-230.4-256 256V170.656h853.344v298.656l85.344 85.344V85.312z" p-id="7175"></path>
                <path d="M951.456 840.544L1011.2 780.8l-200.544-200.544-200.544 200.544 59.744 59.744L768 742.4v238.944h85.344V742.4z" p-id="7176"></path>
            </svg>
            <div class="img-wrapper" v-for="(img, index) in images" :key="index">
                <svg @click="deleteImage(index)" t="1703233797259" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3593" width="200" height="200">
                    <path d="M512 832c-176.448 0-320-143.552-320-320S335.552 192 512 192s320 143.552 320 320-143.552 320-320 320m0-704C300.256 128 128 300.256 128 512s172.256 384 384 384 384-172.256 384-384S723.744 128 512 128" p-id="3594"></path>
                    <path d="M649.824 361.376a31.968 31.968 0 0 0-45.248 0L505.6 460.352l-98.976-98.976a31.968 31.968 0 1 0-45.248 45.248l98.976 98.976-98.976 98.976a32 32 0 0 0 45.248 45.248l98.976-98.976 98.976 98.976a31.904 31.904 0 0 0 45.248 0 31.968 31.968 0 0 0 0-45.248L550.848 505.6l98.976-98.976a31.968 31.968 0 0 0 0-45.248" p-id="3595"></path>
                </svg>
                <img class="upload-img" :src="img">
            </div>
            <div class="hint" v-if="images.length == 3">{{ $t('maximum_image')}}</div>
        </div>
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

import {
    Application
} from '../../api/applications.js'

import {
    mapMutations
} from 'vuex'

export default {
    name: 'ModifyAuthenticateModal',
    emits: ['close'],
    data() {
        return {
            oldAuthenticateInfo: null,
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
    mounted() {
        Application.getSubmittedList().then(
            response => {
                if (response.data.length != 0) {
                    this.oldAuthenticateInfo = response.data[0]
                    if (this.oldAuthenticateInfo != null) {
                        this.auditor = this.oldAuthenticateInfo.auditor.id
                        this.realName = this.oldAuthenticateInfo.real_name
                        this.concepts = this.oldAuthenticateInfo.concepts.concepts
                        this.institution = this.oldAuthenticateInfo.institution
                        this.position = this.oldAuthenticateInfo.position
                        this.workEmail = this.oldAuthenticateInfo.work_email
                        this.content = this.oldAuthenticateInfo.content
                    }
                }
            },
            error => {
                alert('Error')
            }
        )
    },
    components: {
        PopoutModal,
        ImageUpload,
        i18n
    },
    methods: {
        ...mapMutations(['setIsLoggedIn']),
        handleClose() {
            this.realName = ''
            this.institution = ''
            this.position = ''
            this.concepts = ''
            this.workEmail = ''
            this.content = ''
            this.images = []
            this.imageFiles = []
            this.$emit('close')
        },
        handleAuthenticate() {
            let formData = new FormData()
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
                    // alert('提交认证成功！')
                },
                (error) => {
                    // alert(error.data)
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
        },
        deleteImage(i) {
            this.images.splice(i, 1)
            this.imageFiles.splice(i, 1)
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

.img-upload {
    width: 70%;
    margin-bottom: 20px;
}

.img-upload>svg {
    width: 50px;
    height: 50px;
    cursor: pointer;
    fill: var(--default-text-color);
    margin-right: 30px;
}

.img-upload div.hint {
    color: #777;
    font-size: 12px;
    font-weight: bold;
}

.img-wrapper {
    display: inline-block;
    margin-right: 30px;
    position: relative;
}

.img-wrapper svg {
    width: 20px;
    height: 20px;
    background: var(--theme-mode);
    fill: red;
    position: absolute;
    top: -5px;
    right: -5px;
    cursor: pointer;
}

img.upload-img {
    width: 80px;
    height: 80px;
    border-radius: 5px;
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
