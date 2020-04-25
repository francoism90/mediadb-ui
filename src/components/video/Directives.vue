<template>
  <div class="absolute-center fit row no-wrap justify-between items-stretch">
    <div
      class="col-3"
      @dblclick="callback({ type: 'currentTime', value: data.current - 10 })"
    />
    <div
      class="col-6"
      @dblclick="callback({ type: 'toggleFullscreen' })"
    />
    <div
      class="col-3"
      @dblclick="callback({ type: 'currentTime', value: data.current + 10 })"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('player', {
      data: 'getData'
    })
  },

  methods: {
    ...mapActions('player', [
      'callback'
    ])
  }
}
</script>
