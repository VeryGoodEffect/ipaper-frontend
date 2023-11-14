import service from "../http";
const url = {
    users: "/users/",
    follow: "/users/follow/",
    settings: "/users/settings/"
}

export class Application {
    static async getUserList() {
        return service(url.login, {
            method: "get"
        })
    }

    static async getUser(id) {
        return service(url.users + id + "/", {
            method: "get"
        })
    }

    static async updateUserAll(id, data) {
        return service(url.users + id + "/", {
            method: "put",
            data
        })
    }

    static async updateUserPartial(id, data) {
        return service(url.users + id + "/", {
            method: "patch",
            data
        })
    }
    
    static async getUserAvatar(id) {
        return service(url.users + id + "/avatar/", {
            method: "get"
        })
    }

    static async getUserFollowers(id) {
        return service(url.users + id + "/followers/", {
            method: "get"
        })
    }

    static async getUserFollowing(id) {
        return service(url.users + id + "/following/", {
            method: "get"
        })
    }

    static async followUser(data) {
        return service(url.follow, {
            method: "post",
            data
        })
    }

    static async cancelFollowUser(data) {
        return service(url.follow, {
            method: "delete",
            data
        })
    }

    static async getUserSettings() {
        return service(url.settings, {
            method: "get"
        })
    }

    static async updateUserSettingsAll(data) {
        return service(url.settings, {
            method: "put",
            data
        })
    }

    static async updateUserSettingsPartical(data) {
        return service(url.settings, {
            method: "patch",
            data
        })
    }
}
