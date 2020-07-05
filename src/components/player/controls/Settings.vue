<template>
  <div class="settings">
    <q-btn
      flat
      dense
      color="white"
      :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
      @click="callback({ type: 'toggleFullscreen' })"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },

  methods: {
    ...mapActions('player', [
      'callback'
    ])
  }
}
</script>
