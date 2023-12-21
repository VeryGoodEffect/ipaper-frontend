<template>
    <PopoutModal :show="show" @close="handleClose">
        <div class="container">
        <h3>{{ $t('change_password_text') }}<span>{{ $t('change_password_prompt') }}</span></h3>
        <input
            type="password" class="basic-input" 
            :placeholder="$t('old_password')" v-model="oldPassword">
        <input 
            type="password" class="basic-input" 
            :placeholder="$t('new_password')" 
            v-model="newPassword"
        >
        <input 
            type="password" class="basic-input" 
            :placeholder="$t('confirm_password')" 
            v-model="confirmPassword"
            @keyup.enter="changePassword"
        >
        <div class="btn-box">
            <button class="basic-btn-outline" @click="handleClose">{{ $t('cancel_text') }}</button>
            <button class="basic-btn" @click="changePassword">{{ $t('confirm_text') }}</button>
        </div>
        </div>
    </PopoutModal>
</template>
  
<script>
import PopoutModal from '../popout-modal/PopoutModal.vue'

import i18n from '../../language'

import { Account } from '../../api/accounts.js'
import { User } from '../../api/users.js'

export default {
    name: 'ChangePasswordModal',
    emits: ['close'],
    data() {
        return {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
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
        changePassword() {
            let data = {
                old_password: this.oldPassword,
                password: this.newPassword,
                password_confirm: this.confirmPassword
            }
            Account.passwordChange(data).then(
                response => {
                    alert('修改密码成功, 请重新登录')
                },
                error => {
                    alert('修改密码失败')
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