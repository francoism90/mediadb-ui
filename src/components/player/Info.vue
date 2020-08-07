<template>
  <q-card
    v-if="media"
    dark
    style="width: 520px"
  >
    <q-inner-loading
      dark
      :showing="!media.id"
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
            {{ media.name }}
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
            :value="media.original_name || 'N/A'"
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
            :value="media.metadata.codec_name || 'N/A'"
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
            :value="media.metadata.display_aspect_ratio || 'N/A'"
            dark
            square
            readonly
            filled
            label="Aspect Ratio"
          />

          <q-input
            :value="media.metadata.probe_score || 0"
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
import Media from 'src/models/Media'

export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      media: {}
    }
  },

  computed: {
    fileSize () {
      return format.humanStorageSize(
        this.media.metadata.size || 0
      )
    },

    bitRate () {
      const bitrate = this.media.metadata.bitrate || 1024

      return Math.round(
        bitrate / 1024
      )
    },

    videoResolution () {
      const width = this.media.metadata.width || 0
      const height = this.media.metadata.height || 0

      return `${width} x ${height}`
    }
  },

  created () {
    this.setModel()
  },

  methods: {
    async setModel () {
      this.media = await Media.$find(this.data.id)
    }
  }
}
</script>
