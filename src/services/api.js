import axios from 'axios'

const api = axios.create({
  baseURL: 'http://172.19.50.130:3333'
})

export default api;