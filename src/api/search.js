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

    static async searchInstitutions() {
        return service(url.searchInstitutions, {
            method: "get",
        })
    }

    static async searchWorks(data) {
        return service(url.searchWorks, {
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
    // static async searchWorks(endpoint,params) {

    // }


    /**
     * // api.js

import axios from 'axios';

const baseURL = 'https://example.com/api';

const api = axios.create({
  baseURL,
});

export const fetchData = (endpoint, params) => {
  return api.get(endpoint, {
    params,
  });
};
     * 
     * 
     * 
     * import { fetchData } from './api';

const endpoint = '/data';
const params = {
  param1: 'value1',
  param2: 'value2',
};

fetchData(endpoint, params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
     */
}