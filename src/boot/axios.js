import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: location.protocol + '//' + location.hostname + '/api/v1/',
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
})

export default function ({ Vue, router }) {
  Vue.prototype.$axios = axiosInstance

  axiosInstance.interceptors.response.use((response) => {
    return response
  }, (error) => {
    // Upstream rate limiting error
    if (error.response.status === 429 && router.currentRoute.path !== '/429') {
      router.push({ path: '/429', query: { redirect: router.currentRoute.fullPath } })
    }

    return Promise.reject(error)
  })
}

export { axiosInstance }
