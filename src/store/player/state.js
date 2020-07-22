export default function () {
  return {
    ready: false,
    model: {},
    callback: {},
    controls: true,
    fullscreen: false,
    tracks: [],
    data: {
      buffered: null,
      currentTime: 0,
      duration: 0,
      ended: false,
      error: null,
      paused: false,
      readyState: 0
    }
  }
}
