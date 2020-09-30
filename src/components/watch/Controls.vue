<template>
  <div class="absolute-full player-controls">
    <div class="q-px-xl q-pt-lg absolute-top-left player-close">
      <q-btn
        v-close-popup
        dense
        round
        unelevated
        text-color="white"
        icon="arrow_back"
        size="28px"
      />
    </div>

    <div class="absolute-center player-playback">
      <q-btn
        v-shortkey="['space']"
        dense
        round
        unelevated
        size="36px"
        text-color="white"
        :loading="!metadata && waiting"
        :icon="paused ? 'play_arrow' : 'pause'"
        @click="togglePlayback"
        @shortkey="togglePlayback"
      />
    </div>

    <div
      v-if="metadata"
      class="q-px-xl q-pb-lg absolute-bottom"
    >
      <div class="full-width row no-wrap justify-between items-center content-center">
        <div class="col">
          {{ currentTime | timestamp }}
        </div>

        <div class="col-auto">
          {{ duration | timestamp }}
        </div>
      </div>

      <q-slider
        v-model="seeker"
        :style="bufferedStyle"
        :min="0.0"
        :max="duration"
        :step="0"
        color="primary"
        class="player-seeker"
      />

      <div class="full-width row no-wrap justify-between items-center content-center">
        <div class="col">
          <q-btn
            v-shortkey="['arrowleft']"
            flat
            dense
            rounded
            size="18px"
            color="white"
            icon="replay_10"
            @click="replay"
            @shortkey="replay"
          />

          <q-btn
            v-shortkey="['arrowright']"
            flat
            dense
            round
            size="18px"
            color="white"
            icon="forward_10"
            @click="forward"
            @shortkey="forward"
          />

          <q-btn
            v-if="$auth.check({ permissions: 'edit videos' })"
            v-shortkey="['r']"
            class="hidden"
            flat
            dense
            round
            size="18px"
            color="white"
            icon="movie_creation"
            @click="frameshot"
            @shortkey="frameshot"
          />
        </div>

        <div class="col-auto">
          <q-btn
            v-shortkey="['s']"
            flat
            dense
            round
            size="18px"
            color="white"
            icon="settings"
            @click="settingsModal"
            @shortkey="settingsModal"
          >
            <q-tooltip>
              Settings
            </q-tooltip>
          </q-btn>

          <q-btn
            v-shortkey="['f']"
            flat
            dense
            round
            size="18px"
            color="white"
            :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
            @click="toggleFullscreen"
            @shortkey="toggleFullscreen"
          >
            <q-tooltip>
              Fullscreen
            </q-tooltip>
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SettingsComponent from 'components/watch/Settings'
import VideoModel from 'src/models/Video'

export default {
  props: {
    video: {
      type: VideoModel,
      required: true
    },

    buffered: {
      type: TimeRanges,
      default: null
    },

    currentTime: {
      type: Number,
      default: 0
    },

    duration: {
      type: Number,
      default: 0
    },

    metadata: {
      type: Boolean,
      default: false
    },

    paused: {
      type: Boolean,
      default: true
    },

    textTracks: {
      type: TextTrackList,
      default: null
    },

    waiting: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    seeker: {
      get () {
        return this.currentTime
      },

      set (value) {
        this.$root.$emit('setCurrentTime', value)
      }
    },

    bufferedStyle () {
      return {
        '--buffered': `${this.bufferedPct}%`,
        '--buffer': `${this.bufferPct}%`
      }
    },

    bufferedPct () {
      const buffered = this.buffered
      const duration = this.duration

      if (!buffered || !buffered.length) {
        return 0
      }

      const r = buffered
      r.start(0)

      const end = r.end(0)

      return Math.round((end / duration) * 100)
    },

    bufferPct () {
      return Math.round(100 - this.bufferedPct)
    }
  },

  methods: {
    frameshot () {
      this.$root.$emit('setFrameshot', this.currentTime)
      this.$root.$emit('showControls')
    },

    replay () {
      this.$root.$emit('setCurrentTime', this.currentTime - 10)
      this.$root.$emit('showControls')
    },

    forward () {
      this.$root.$emit('setCurrentTime', this.currentTime + 10)
      this.$root.$emit('showControls')
    },

    togglePlayback () {
      this.$root.$emit('togglePlayback')
      this.$root.$emit('showControls')
    },

    toggleFullscreen () {
      this.$root.$emit('toggleFullscreen')
      this.$root.$emit('showControls')
    },

    settingsModal () {
      this.$q.dialog({
        component: SettingsComponent,
        parent: this,
        id: this.video.id,
        textTracks: this.textTracks
      })

      this.$root.$emit('showControls')
    }
  }
}
</script>
