export default function () {
  return {
    ready: false,
    buffered: null,
    currentTime: 0,
    duration: 0,
    ended: false,
    error: null,
    metadata: false,
    playing: false,
    tracks: {}
  }
}
