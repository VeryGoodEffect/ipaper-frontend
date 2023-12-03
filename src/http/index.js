import axios from 'axios'

const service = axios.create({
  baseURL: '/api',
  timeout: 0,
  withCredentials: true
})

export default service