<template>
  <div class="absolute-full player-controls">
    <div class="q-px-xl q-pt-lg absolute-top-left player-close">
      <q-btn
        v-close-popup
        dense
        round
        unelevated
        text-color="white"
        icon="o_arrow_back"
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
        :loading="!metadata || waiting"
        :icon="paused ? 'o_play_arrow' : 'o_pause'"
        @click="togglePlay"
        @shortkey="togglePlay"
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

      <div
        class="player-tooltip"
      >
        <span class="q-py-xs q-px-sm text-caption bg-grey-11">
          hover
        </span>
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
            icon="o_replay_10"
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
            icon="o_forward_10"
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
            icon="o_movie_creation"
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
            icon="o_settings"
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
            :icon="fullscreen ? 'o_fullscreen_exit' : 'o_fullscreen'"
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
import { createHelpers } from 'vuex-map-fields'
import SettingsComponent from 'components/watch/Settings'
import VideoModel from 'src/models/Video'

const { mapFields } = createHelpers({
  getterType: 'player/getState',
  mutationType: 'player/setState'
})

export default {
  props: {
    video: {
      type: VideoModel,
      required: true
    }
  },

  computed: {
    ...mapFields({
      controls: 'controls',
      fullscreen: 'fullscreen',
      playbackRate: 'playbackRate',
      settings: 'settings',
      buffered: 'data.buffered',
      currentTime: 'data.currentTime',
      duration: 'data.duration',
      error: 'data.error',
      metadata: 'data.metadata',
      paused: 'data.paused',
      play: 'data.play',
      seekTime: 'data.seekTime',
      waiting: 'data.waiting'
    }),

    seeker: {
      get () {
        return this.currentTime
      },

      set (value = 0) {
        this.seekTime = value
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
    async frameshot () {
      await this.$http.patch(`videos/${this.video.id}/frameshot`, {
        timecode: this.currentTime
      })
    },

    replay () {
      this.seekTime = this.currentTime - 10
    },

    forward () {
      this.seekTime = this.currentTime + 10
    },

    toggleFullscreen () {
      this.fullscreen = !this.fullscreen
    },

    togglePlay () {
      this.play = !this.play
    },

    settingsModal () {
      this.$q.dialog({
        component: SettingsComponent,
        parent: this,
        id: this.video.id,
        playbackRate: this.playbackRate,
        textTracks: this.textTracks
      })
    }
  }
}
</script>
