export default function () {
  return {
    ready: false,
    model: {},
    buffered: null,
    currentTime: 0,
    duration: 0,
    ended: false,
    error: null,
    metadata: false,
    playable: false,
    playing: false,
    readyState: 0,
    stalled: false,
    tracks: []
  }
}
