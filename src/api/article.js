import service from "../http";
const url = {
    hotspotRecommend: '/article/hotspot/recommend/',
    interest: '/article/interest/',
}

export class Article {
    static async getHotspotRecommend() {
        return service(url.hotspotRecommend, {
            method: "get"
        })
    }

    static async getInterestList() {
        return service(url.interest + 'list/', {
            method: "get"
        })
    }

    static async getInterestRecommend() {
        return service(url.interest + 'recommend/', {
            method: "get"
        })
    }

    static async modifyInterest(data) {
        return service(url.interest + 'select/', {
            method: "post",
            data
        })
    }
}