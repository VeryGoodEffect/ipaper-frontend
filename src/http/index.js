import axios from 'axios'

const service = axios.create({
  baseURL: '',
  timeout: 0
})

export default service