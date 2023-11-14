import service from "../http";
const url = {
    active: "/accounts/active",
    login: "/accounts/login",
    logout: "/accounts/logout",
    passwordChange: "/accounts/password_change",
    passwordResetConfirm: "/accounts/password_reset_confirm",
    passwordReset: "/accounts/password_reset",
    register: "/accounts/register"
}

export class Account {
    static async login(data) {
        return service(url.login, {
            method: "post",
            data
        })
    }

    static async logout() {
        return service(url.logout, {
            method: "get"
        })
    }

    static async passwordChange(data) {
        return service(url.passwordChange, {
            method: "patch",
            data
        })
    }

    static async passwordResetConfirm() {
        return service(url.passwordResetConfirm, {
            method: "get"
        })
    }

    static async passwordReset(data) {
        return service(url.passwordReset, {
            method: "post",
            data
        })
    }

    static async register(data) {
        return service(url.register, {
            method: "post",
            data
        })
    }
}