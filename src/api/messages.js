import service from "../http";
const url = {
    messages: "/messages/",
    messagesReceived: "/messages/received/",
    deleteAllRead: "/messages/received/delete_all_read/",
    readAllMessage: "/messages/received/read_all/",
    messagesSent: "/messages/sent/",
    deleteAllSent: "/messages/sent/delete_all"
}

export class Messages {
    static async createMessage(data) {
        return service(url.messages, {
            method: "post",
            data
        })
    }

    static async getAllReceivedMessages() {
        return service(url.messagesReceived, {
            method: "get"
        })
    }

    static async getReceivedMessageById(id) {
        return service(url.messagesReceived + id + "/", {
            method: "get"
        })
    }

    static async updateReceivedMessage(id, data) {
        return service(url.messagesReceived + id + "/", {
            method: "put",
            data
        })
    }

    static async setMessageReadById(id, data) {
        return service(url.messagesReceived + id + "/", {
            method: "patch",
            data
        })
    }

    static async deleteMessageById(id) {
        return service(url.messagesReceived + id + "/", {
            method: "delete"
        })
    }

    static async deleteAllReadMessages() {
        return service(url.deleteAllRead, {
            method: "delete"
        })
    }

    static async setAllMessageRead() {
        return service(url.readAllMessage, {
            method: "patch"
        })
    }

    static async getAllSentMessages() {
        return service(url.messagesSent, {
            method: "get"
        })
    }

    static async getSentMessageById(id) {
        return service(url.messagesSent + id + "/", {
            method: "get"
        })
    }

    static async deleteSentMessage(id) {
        return service(url.messagesSent + id + "/", {
            method: "delete"
        })
    }

    static async deleteAllSentMessage() {
        return service(url.deleteAllSent, {
            method: "delete"
        })
    }
}