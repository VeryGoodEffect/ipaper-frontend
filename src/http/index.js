import axios from 'axios'

const service = axios.create({
  baseURL: 'http://123.249.83.217:9995/api',
  timeout: 0,
  withCredentials: true
})

export default service