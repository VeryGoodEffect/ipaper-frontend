import service from "../http";
const url = {
    searchAuthors: "/search/authors/",
    searchConcepts: "/search/concepts/",
    searchInstitutions: "/search/institutions/",
    searchWorks: "/search/works/"
}

export class Search {
    static async searchAuthor() {
        return service(url.searchAuthors, {
            method: "get"
        })
    }

    static async searchConcepts() {
        return service(url.searchConcepts, {
            method: "get"
        })
    }

    static async searchInstitutions() {
        return service(url.searchInstitutions, {
            method: "get"
        })
    }

    static async searchWorks(data) {
        return service(url.searchWorks, {
            method: "get",
            data
        })
    }

    static async workRetrieve(id) {
        return service(url.searchWorks + id + "/", {
            method: "get"
        })
    }
}