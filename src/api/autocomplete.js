import service from "../http";
const url = {
    autoComplete: '/autocomplete/'
}

export class AutoComplete {
    static async getAutoAllInfo() {
        return service(url.autoComplete, {
            method: "get"
        })
    }

    static async getAutoAuthor() {
        return service(url.autoComplete + 'authors/', {
            method: "get"
        })
    }

    static async getAutoConcepts() {
        return service(url.autoComplete + 'concepts/', {
            method: "get"
        })
    }

    static async getAutoInstitutions() {
        return service(url.autoComplete + 'institutions/', {
            method: "get"
        })
    }

    static async getAutoWorks() {
        return service(url.autoComplete + 'works/', {
            method: "get"
        })
    }
}