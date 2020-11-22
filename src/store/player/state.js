export default function () {
  return {
    ready: false,
    id: null,
    buffered: null,
    controls: true,
    currentTime: 0,
    duration: Infinity,
    failed: false,
    fullscreen: false,
    metadata: false,
    model: null,
    paused: true,
    playable: false,
    playback: true,
    playbackRate: 1.0,
    seekTime: 0,
    textTracks: [],
    waiting: false
  }
}
