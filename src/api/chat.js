import service from "../http";
const url = {
    completions: "/chat/completions/",
    conversations: "/chat/conversations/"
}
export class Chat {
    static async createCompletion(data) {
        return service(url.completions, {
            method: "post",
            data
        })
    }

    static async getConversationsList() {
        return service(url.conversations, {
            method: "get"
        })
    }

    static async createConversation(data) {
        return service(url.conversations, {
            method: "post",
            data
        })
    }

    static async getConversationById(id) {
        return service(url.conversations + id + "/", {
            method: "get"
        })
    }

    static async updateConversation(id, data) {
        return service(url.conversations + id + "/", {
            method: "put",
            data
        })
    }

    static async updateConversationPartial(id, data) {
        return service(url.conversations + id + "/", {
            method: "patch",
            data
        })
    }

    static async deleteConversation(id) {
        return service(url.conversations + id + "/", {
            method: "delete",
            data
        })
    }

    static async getChatMessagesList(id) {
        return service(url.conversations + id + "/chat_messages/", {
            method: "get"
        })
    }
}