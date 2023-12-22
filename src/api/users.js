import service from "../http";
const url = {
    users: "/users/",
    follow: "/users/follow/",
    settings: "/users/settings/"
}

export class User {
    static async getUserList() {
        return service(url.users, {
            method: "get"
        })
    }

    static async getUser(id) {
        return service(url.users + id + "/", {
            method: "get"
        })
    }

    static async updateUser(id, data) {
        return service(url.users + id + "/", {
            method: "put",
            data
        })
    }

    static async changePersonalInfo(id, data) {
        return service(url.users + id + "/", {
            method: "patch",
            data
        })
    }
    
    static async getUserAvatar(id, data) {
        // 加了一个data
        return service(url.users + id + "/avatar/", {
            method: "get",
            data
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

    static async updateUserSettings(data) {
        return service(url.settings, {
            method: "put",
            data
        })
    }

    static async updateUserSettingsPartial(data) {
        return service(url.settings, {
            method: "patch",
            data
        })
    }

    static async getFavoriteList(id) {
        return service(url.users + "favorite/list/" + id + "/", {
            method: "get"
        })
    }

    static async createFavorite(id, data) {
        return service(url.users + "favorite/create/" + id + "/", {
            method: "post",
            data
        })
    }

    static async collectFavorite(id, data) {
        return service(url.users + "favorite/collect/" + id + "/", {
            method: "post",
            data
        })
    }

    static async renameFavorite(id, data) {
        return service(url.users + "favorite/rename/" + id + "/", {
            method: "post",
            data
        })
    }

    static async deleteFavorite(id) {
        return service(url.users + "favorite/delete/" + id + "/", {
            method: "delete"
        })
    }
}
