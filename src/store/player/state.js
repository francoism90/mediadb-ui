export default function () {
  return {
    ready: false,
    captionLocale: null,
    playbackRate: 1.0,
    controls: true,
    fullscreen: false,
    settings: {},
    data: {
      model: null,
      buffered: null,
      currentTime: 0,
      duration: Infinity,
      error: false,
      metadata: false,
      paused: true,
      play: null,
      seekTime: null,
      tracks: [],
      waiting: true
    }
  }
}
