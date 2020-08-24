<template>
  <div class="row no-wrap justify-between items-center q-mb-sm">
    <div class="col">
      <q-btn
        v-shortkey="['space']"
        flat
        dense
        color="white"
        :icon="playingIcon"
        @click="togglePlay"
        @shortkey="togglePlay"
      />

      <q-btn
        v-if="$q.platform.is.desktop"
        v-shortkey="['arrowleft']"
        class="gt-sm"
        flat
        dense
        color="white"
        icon="replay_10"
        @click="replay"
        @shortkey="replay"
      />

      <q-btn
        v-if="$q.platform.is.desktop"
        v-shortkey="['arrowright']"
        class="gt-sm"
        flat
        dense
        color="white"
        icon="forward_10"
        @click="forward"
        @shortkey="forward"
      />

      <span class="q-px-sm text-white">
        {{ Number(currentTime) | timestamp }} / {{ Number(duration) | timestamp }}
      </span>
    </div>

    <div class="col-auto">
      <q-btn
        v-shortkey="['t']"
        flat
        dense
        color="white"
        icon="subtitles"
        @click="selectTracks"
        @shortkey="selectTracks"
      >
        <q-tooltip>Subtitles</q-tooltip>
      </q-btn>

      <q-btn
        v-if="$auth.check({'permissions': 'edit videos'})"
        v-shortkey="['s']"
        flat
        dense
        color="white"
        icon="movie_creation"
        @click="createFrameshot"
        @shortkey="createFrameshot"
      >
        <q-tooltip>Frameshot</q-tooltip>
      </q-btn>

      <q-btn
        v-if="$auth.check({'roles': 'super-admin'})"
        v-shortkey="['d']"
        flat
        dense
        color="white"
        icon="video_settings"
        @click="debugVideo"
        @shortkey="debugVideo"
      />

      <q-btn
        v-shortkey="['f']"
        flat
        dense
        color="white"
        :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
        @click="toggleFullscreen"
        @shortkey="toggleFullscreen"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentTime: {
      type: Number,
      default: 0
    },

    duration: {
      type: Number,
      default: 0
    },

    model: {
      type: Object,
      required: true
    },

    playing: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    playingIcon () {
      return this.playing ? 'pause' : 'play_arrow'
    }
  },

  methods: {
    async createFrameshot () {
      await this.$axios.patch(`videos/${this.model.id}/frameshot`, {
        timecode: this.currentTime
      })

      this.$q.notify({
        progress: true,
        message: `${this.model.name} has been frameshot.`,
        type: 'positive'
      })
    },

    debugVideo () {
      this.$root.$emit('playerExitFullscreen')

      this.$store.dispatch('dialog/open', {
        component: 'VideoDebug',
        data: {
          id: this.model.id
        }
      })
    },

    selectTracks () {
      this.$root.$emit('playerExitFullscreen')

      this.$store.dispatch('dialog/open', {
        component: 'VideoTracks',
        data: {
          id: this.model.id
        }
      })
    },

    toggleFullscreen () {
      this.$root.$emit('playerToggleFullscreen')
    },

    togglePlay () {
      this.$root.$emit('playerTogglePlay')
    },

    replay () {
      this.$root.$emit('playerSetTime', this.currentTime - 10)
    },

    forward () {
      this.$root.$emit('playerSetTime', this.currentTime + 10)
    }
  }
}
</script>
