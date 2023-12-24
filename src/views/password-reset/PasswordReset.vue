<template>
<div>
    重新设置你的密码
    <div>
        <input type="password" class="basic-input" :placeholder="$t('password_text')" v-model="password" />
        <input type="password" class="basic-input" :placeholder="$t('confirm_password')" v-model="password_confirm" @keyup.enter="resetPassword" />
    </div>
</div>
</template>

<script>
import { Account } from '../../api/accounts.js'
export default {
    name: "PasswordReset",
    data() {
        return {
            token: "",
            password: "",
            password_confirm: "",
        };
    },
    mounted() {
        // get token
        this.token = this.$route.query.token
        console.log(this.token)
    },
    methods: {
        resetPassword() {
            let data = {
                token: this.token,
                password: this.password,
                password_confirm: this.password_confirm,
            }
            Account.passwordReset(data).then(
                response => {
                    // alert('密码重置成功')
                },
                error => {
                    // alert('密码重置失败')
                }
            )
        },
    },
};
</script>

<style scoped></style>
