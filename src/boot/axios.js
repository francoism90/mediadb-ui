import Vue from 'vue'
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: '/api/v1/',
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
})

Vue.prototype.$axios = axiosInstance

export { axiosInstance }
