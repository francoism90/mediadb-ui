import { axiosInstance } from 'boot/axios'

export async function fetch ({ commit }) {
  commit('setReady', false)

  try {
    const response = await axiosInstance.get('api/v1/auth/me')

    commit('setUser', response.data)
  } catch (e) {
    commit('setUser', {})
  }

  commit('setReady', true)
}

export async function login ({ commit }, payload = {}) {
  // Initialize CSRF protection
  await axiosInstance.get('api/v1/sanctum/csrf-cookie')

  // Try to login the user
  await axiosInstance.post('api/v1/auth/login', payload)

  // Reset state
  commit('resetState')
}

export async function logout ({ commit }) {
  // Try to logout
  await axiosInstance.get('api/v1/auth/logout')

  // Reset state
  commit('resetState')
}
