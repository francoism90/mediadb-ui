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

  // Allow reference as this.$http
  Vue.prototype.$http = axiosInstance

  axiosInstance.interceptors.response.use((response) => {
    return response
  }, (error) => {
    // Upstream rate limiting
    if (error.response.status === 429 && router.currentRoute.name !== '429') {
      router.push({ name: '429' })
    }

    return Promise.reject(error)
  })
}

export { axiosInstance }
