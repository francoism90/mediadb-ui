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

  commit('setReady', true)
}

export async function refresh ({ commit, state }) {
  const response = await axiosInstance.get(state.path, {
    params: state.params
  })

  commit('setModel', response.data)
}

export async function remove ({ state }, params = {}) {
  const { path = null, body = {} } = params

  const response = await axiosInstance.delete(path, body)

  return response
}

export async function update ({ state }, params = {}) {
  const { path = null, body = {} } = params

  const response = await axiosInstance.put(path, body)

  return response
}
