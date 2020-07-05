import { axiosInstance } from 'boot/axios'

export async function create ({ state }, params = {}) {
  const { path = null, body = {} } = params

  const response = await axiosInstance.post(path, body)

  return response
}

export async function fetch ({ commit, dispatch }, route = {}) {
  commit('setReady', false)
  commit('resetState')
  commit('setRoute', route)

  await dispatch('refresh')
}

export async function refresh ({ commit, state }) {
  commit('setReady', false)

  const response = await axiosInstance.get(state.path, {
    params: state.params
  })

  commit('setModel', response.data)
  commit('setReady', true)
}

export async function remove ({ state }, params = {}) {
  const { path = null, body = {} } = params

  const response = await axiosInstance.delete(path || state.path, body)

  return response
}

export async function update ({ commit, state }, params = {}) {
  const { path = null, body = {} } = params

  const response = await axiosInstance.put(path || state.path, body)

  commit('setModel', response.data)

  return response
}
