<template>
  <q-card
    v-if="video && video.metadata"
    dark
    :style="{ width: '520px' }"
  >
    <q-inner-loading
      dark
      :showing="!video.id"
    >
      <q-spinner
        size="50px"
        color="primary"
      />
    </q-inner-loading>

    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <q-form>
        <q-card-section class="row items-center">
          <div class="text-h6">
            {{ video.name }}
          </div>
          <q-space />
          <q-btn
            v-close-popup
            icon="close"
            round
            unelevated
            color="grey-9"
            dense
            size="12px"
          />
        </q-card-section>

        <q-separator dark />

        <q-card-section>
          <q-input
            :value="video.metadata.file_name || 'N/A'"
            dark
            square
            readonly
            filled
            label="Original Name"
          />

          <q-input
            :value="fileSize"
            dark
            square
            readonly
            filled
            label="Filesize"
          />

          <q-input
            :value="video.metadata.codec_name || 'N/A'"
            dark
            square
            readonly
            filled
            label="Video Codec"
          />

          <q-input
            :value="bitRate + ' kbps'"
            dark
            square
            readonly
            filled
            label="Video Bitrate"
          />

          <q-input
            :value="videoResolution"
            dark
            square
            readonly
            filled
            label="Video Resolution"
          />

          <q-input
            :value="video.metadata.aspect_ratio || 'N/A'"
            dark
            square
            readonly
            filled
            label="Aspect Ratio"
          />

          <q-input
            :value="video.metadata.probe_score || 0"
            dark
            square
            readonly
            filled
            label="Probe Score"
          />
        </q-card-section>

        <q-separator dark />

        <q-card-actions
          align="right"
        >
          <q-btn
            v-close-popup
            flat
            label="Close"
            color="primary"
          />
        </q-card-actions>
      </q-form>
    </transition>
  </q-card>
</template>

<script>
import { format } from 'quasar'
import Video from 'src/models/Video'

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      video: null
    }
  },

  computed: {
    fileSize () {
      return format.humanStorageSize(
        this.video.metadata.size || 0
      )
    },

    bitRate () {
      const bitrate = this.video.metadata.bitrate || 1024

      return Math.round(
        bitrate / 1024
      )
    },

    videoResolution () {
      const width = this.video.metadata.width || 0
      const height = this.video.metadata.height || 0

      return `${width} x ${height}`
    }
  },

  async created () {
    this.video = await Video.$find(this.id)
  }
}
</script>
