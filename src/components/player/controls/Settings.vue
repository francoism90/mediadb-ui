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
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },

  methods: {
    callback (value) {
      this.$root.$emit('player_event', value)
    }
  }
}
</script>
