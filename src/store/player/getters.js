import { getField } from 'vuex-map-fields'
import { clamp } from 'lodash'

export const getState = (state) => {
  return getField(state)
}

export const bufferedPct = (state) => {
  const buffered = state.buffered
  const duration = state.duration

  if (!buffered || !buffered.length) {
    return [0, 100]
  }

  const r = buffered
  r.start(0)

  const end = r.end(0)

  const bufferedPct = Math.round((end / duration) * 100)
  const remainingPct = Math.round(100 - bufferedPct)

  return [bufferedPct, remainingPct]
}

export const bufferStyle = (state, getters) => {
  return {
    '--buffer': `${getters.bufferedPct[0]}%`,
    '--remaining': `${getters.bufferedPct[1]}%`
  }
}

export const getTimeByPct = (state) => (value) => {
  const frame = state.duration * (value / 100)

  return clamp(frame, 0, state.duration)
}
