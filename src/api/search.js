import service from "../http";
const url = {
    searchAuthors: "/search/authors/",
    searchConcepts: "/search/concepts/",
    searchInstitutions: "/search/institutions/",
    searchWorks: "/search/works/"
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

    static async workRetrieve(id) {
        return service(url.searchWorks + id + "/", {
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