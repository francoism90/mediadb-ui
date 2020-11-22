<template>
  <q-card-section class="q-px-none">
    <q-input
      v-if="model.codec_name"
      :value="model.codec_name"
      square
      readonly
      filled
      label="Codec Name"
    />

    <q-input
      v-if="model.bitrate"
      :value="bitRate + ' kbps'"
      square
      readonly
      filled
      label="Bitrate"
    />

    <q-input
      v-if="model.height && model.width"
      :value="resolution"
      square
      readonly
      filled
      label="Resolution"
    />
  </q-card-section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('player', [
      'model'
    ]),

    bitRate () {
      const bitrate = this.model.bitrate || 1024

      return Math.round(bitrate / 1024)
    },

    resolution () {
      const width = this.model.width || 0
      const height = this.model.height || 0

      return `${width} x ${height}`
    }
  }
}
</script>
