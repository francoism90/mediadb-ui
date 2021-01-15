export default () => {
  return {
    ready: false,
    id: null,
    model: null,
    buffered: null,
    controls: true,
    currentTime: 0,
    duration: Infinity,
    failed: false,
    playable: false,
    playing: false,
    playbackRate: 1.0,
    requestFullscreen: false,
    requestPlayback: false,
    requestRate: 1.0,
    requestTime: 0,
    requestTracks: [],
    waiting: false
  }
}
