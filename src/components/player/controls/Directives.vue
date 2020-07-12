<template>
  <div
    class="fit"
    @wheel="onWheel"
    @click.prevent="callback({ type: 'togglePlay' })"
    @dblclick.prevent="callback({ type: 'toggleFullscreen' })"
  >
    <q-menu
      auto-close
      touch-position
      context-menu
      dark
      square
    >
      <q-list
        bordered
        padding
        dark
        style="width: 260px"
      >
        <q-item
          v-for="(entity, index) in menu"
          :key="`menu-${index}`"
          clickable
          dark
          @click.prevent="callback({ type: entity.name })"
        >
          <q-item-section side>
            <q-icon :name="entity.icon" />
          </q-item-section>
          <q-item-section>{{ entity.label }}</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
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
  data () {
    return {
      menu: [
        { label: 'Copy Video URL', name: 'play', icon: 'content_copy' },
        { label: 'Open Video URL', name: 'stream', icon: 'open_in_new' },
        { label: 'Debug Information', name: 'info', icon: 'info' }
      ]
    }
  },

  methods: {
    ...mapActions('player', [
      'callback'
    ]),

    onWheel (event) {
      if (event.deltaX < 0) {
        this.callback({ type: 'rewind' })
      } else if (event.deltaX > 0) {
        this.callback({ type: 'forward' })
      }
    }
  }
}
</script>
