import service from "../http";
const url = {
    active: "/accounts/active/",
    login: "/accounts/login/",
    logout: "/accounts/logout/",
    passwordChange: "/accounts/password_change/",
    passwordReset: "/accounts/password_reset/",
    sendPasswordResetEmail: "/accounts/send_password_reset_email/",
    register: "/accounts/register/"
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

    static async passwordReset(data) {
        return service(url.passwordReset, {
            method: "patch",
            data
        })
    }

    static async sendPasswordResetEmail(data) {
        return service(url.sendPasswordResetEmail, {
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