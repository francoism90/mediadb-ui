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
        v-shortkey="['arrowleft']"
        flat
        dense
        color="white"
        icon="replay_5"
        @click="replay"
        @shortkey="replay"
      />

      <q-btn
        v-shortkey="['arrowright']"
        flat
        dense
        color="white"
        icon="forward_5"
        @click="forward"
        @shortkey="forward"
      />

      <span class="q-px-sm text-white">
        {{ Number(currentTime) | timestamp }} / {{ Number(duration) | timestamp }}
      </span>
    </div>

    <div class="col-auto">
      <q-btn
        v-shortkey="['d']"
        flat
        dense
        color="white"
        icon="video_settings"
        @click="debugMedia"
        @shortkey="debugMedia"
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
    debugMedia () {
      this.$root.$emit('playerExitFullscreen')

      this.$store.dispatch('dialog/open', {
        component: 'MediaDebug',
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
      this.$root.$emit('playerSetTime', this.currentTime - 5)
    },

    forward () {
      this.$root.$emit('playerSetTime', this.currentTime + 5)
    }
  }
}
</script>
