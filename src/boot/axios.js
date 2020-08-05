import { Model } from 'vue-api-query'
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
})

export default function ({ Vue, router }) {
  // Inject axios as http client to Model
  Model.$http = axiosInstance

  // Allow reference as this.$axios
  Vue.prototype.$axios = axiosInstance

  axiosInstance.interceptors.response.use((response) => {
    return response
  }, (error) => {
    // Upstream rate limiting
    if (error.response.status === 429 && router.currentRoute.path !== '/429') {
      router.push({ path: '/429', query: { redirect: router.currentRoute.fullPath } })
    }

    return Promise.reject(error)
  })
}

export { axiosInstance }
