import service from "../http";
const url = {
    applications: "applications/",
    audited: "applications/audited/",
    submitted: "applications/submitted/"
}

export class Application {
    static async applications(data) {
        return service(url.login, {
            method: "post",
            data
        })
    }

    static async getAuditedList() {
        return service(url.audited, {
            method: "get"
        })
    }

    static async getAuditedById(id) {
        return service(url.audited + id + "/", {
            method: "get"
        })
    }

    static async approveAudited(id, data) {
        return service(url.audited + id + "/approve/", {
            method: "patch",
            data
        })
    }

    static async failAudited(id, data) {
        return service(url.audited + id + "/fail/", {
            method: "patch",
            data
        })
    }

    static async getSubmittedList() {
        return service(url.submitted, {
            method: "get"
        })
    }

    static async getSubmittedById(id) {
        return service(url.submitted + id + "/", {
            method: "get"
        })
    }

    static async deleteSubmittedById(id) {
        return service(url.submitted + id + "/", {
            method: "delete"
        })
    }
}
