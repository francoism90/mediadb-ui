export default function () {
  return {
    ready: false,
    model: {},
    callback: {},
    data: {
      buffered: null,
      current: 0,
      duration: 0,
      ended: false,
      error: null,
      paused: false,
      readyState: 0,
      volume: 1
    }
  }
}
