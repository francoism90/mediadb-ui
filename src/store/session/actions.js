import { axiosInstance } from 'boot/axios'

export async function fetch ({ commit }) {
  try {
    const response = await axiosInstance.get('auth/me')

    commit('setUser', response.data)
  } catch (e) {
    commit('setUser', { data: {}, meta: {} })
  }

  commit('setReady', true)
}

export async function login ({ state }, payload = {}) {
  // Initialize CSRF protection
  await axiosInstance.get('sanctum/csrf-cookie')

  // Try to login
  await axiosInstance.post('auth/login', payload)
}

export async function logout ({ commit }) {
  // Try to logout
  await axiosInstance.get('auth/logout')

  // Reset state
  commit('resetState')
}
