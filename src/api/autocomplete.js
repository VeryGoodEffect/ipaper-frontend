import service from "../http";
const url = {
    autoComplete: '/autocomplete/'
}

export class AutoComplete {
    static async getAutoAllInfo(data) {
        return service(url.autoComplete, {
            method: "get",
            params: data
        })
    }

    static async getAutoAuthor(data) {
        return service(url.autoComplete + 'authors/', {
            method: "get",
            params: data
        })
    }

    static async getAutoConcepts(data) {
        return service(url.autoComplete + 'concepts/', {
            method: "get",
            params: data
        })
    }

    static async getAutoInstitutions(data) {
        return service(url.autoComplete + 'institutions/', {
            method: "get",
            params: data
        })
    }

    static async getAutoWorks(data) {
        return service(url.autoComplete + 'works/', {
            method: "get",
            params: data
        })
    }
}