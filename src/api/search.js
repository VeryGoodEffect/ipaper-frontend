import service from "../http";
const url = {
    searchAuthors: "/search/authors/",
    searchConcepts: "/search/concepts/",
    searchInstitutions: "/search/institutions/",
    searchWorks: "/search/works/",
    searchSources: "/search/sources",
}

export class Search {
    static async searchAuthor(data) {
        return service(url.searchAuthors, {
            method: "get",
            params: data
        })
    }

    static async searchAuthorInfo(id) {
        return service(url.searchAuthors + "/" + id + "/", {
            method: "get"
        })
    }


    static async searchConcepts() {
        return service(url.searchConcepts, {
            method: "get"
        })
    }

    static async searchInstitutions(data) {
        return service(url.searchInstitutions, {
            method: "get",
            params: data
        })
    }

    static async searchWorks(data) {
        return service(url.searchWorks, {
            method: "get",
            params: data
        })
    }

    static async searchSources(data) {
        return service(url.searchSources, {
            method: "get",
            params: data
        })
    }

    static async workRetrieve(id) {
        return service(url.searchWorks + id + "/", {
            method: "get"
        })
    }

    static async institutionRetrieve(id) {
        return service(url.searchInstitutions + id + "/", {
            method: "get"
        })
    }

    static async conceptRetrieve(id) {
        return service(url.searchConcepts + id + "/", {
            method: "get"
        })
    }
    static async getEntities(url) {
        return service(url, {
            method: "get"
        })
    }
    static async getPagnationEntities(url, data) {
        return service(url, {
            method: "get",
            params: data
        })
    }
}