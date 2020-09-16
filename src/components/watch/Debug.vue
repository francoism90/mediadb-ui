<template>
  <q-card-section>
    <q-input
      :value="video.codec_name || 'N/A'"
      square
      readonly
      filled
      label="Video Codec"
    />

    <q-input
      :value="bitRate + ' kbps'"
      square
      readonly
      filled
      label="Video Bitrate"
    />

    <q-input
      :value="videoResolution"
      square
      readonly
      filled
      label="Video Resolution"
    />
  </q-card-section>
</template>

<script>
import VideoModel from 'src/models/Video'

export default {
  props: {
    video: {
      type: VideoModel,
      required: true
    }
  },

  computed: {
    bitRate () {
      const bitrate = this.video.bitrate || 1024

      return Math.round(
        bitrate / 1024
      )
    },

    videoResolution () {
      const width = this.video.width || 0
      const height = this.video.height || 0

      return `${width} x ${height}`
    }
  }
}
</script>
