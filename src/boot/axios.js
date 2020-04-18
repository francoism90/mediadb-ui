import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: location.protocol + '//' + location.hostname + '/api/v1/',
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
})

export default function ({ Vue, store }) {
  Vue.prototype.$axios = axiosInstance

  axiosInstance.interceptors.response.use((response) => {
    return response
  }, (error) => {
    if (error.response.status === 429) {
      alert('Rate limit exceeded. Try again later.')
    }

    return Promise.reject(error)
  })
}

export { axiosInstance }
