import service from "../http";
const url = {
    searchHistory: '/history/search_history/',
    viewHistory: '/history/view_history/'
}

export class Search {
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
}