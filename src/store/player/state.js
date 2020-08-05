export default function () {
  return {
    ready: false,
    model: {},
    tracks: [],
    controls: true,
    fullscreen: false,
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
