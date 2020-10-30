export default function () {
  return {
    name: null,
    ready: false,
    captionLocale: null,
    subtitleLocale: null,
    playbackRate: 1.0,
    controls: true,
    fullscreen: false,
    settings: {},
    data: {
      model: null,
      buffered: null,
      currentTime: 0,
      duration: 0,
      error: false,
      metadata: false,
      paused: true,
      play: null,
      seekTime: 0,
      tracks: [],
      waiting: true
    }
  }
}
