import service from "../http";
const url = {
    searchHistory: '/history/search_history/',
    viewHistory: '/history/view_history/',
    relationMap: '/history/get_relation_map/'
}

export class History {
    static async getSearchHistory() {
        return service(url.searchHistory, {
            method: "get"
        })
    }
    static async getViewHistory() {
        return service(url.viewHistory, {
            method: "get"
        })
    }
    static async getRelationMap(id) {
        return service(url.relationMap + id + '/', {
            method: "get"
        })
    }
}