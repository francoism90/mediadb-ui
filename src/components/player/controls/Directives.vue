<template>
  <div class="fit" @click.prevent="callback({ type: 'togglePlay' })" @dblclick.prevent="callback({ type: 'toggleFullscreen' })">
    <q-menu auto-close touch-position context-menu dark square @before-show="setControls(true)" @hide="setControls(false)">
      <q-list bordered padding dark style="width: 260px">
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
import { mapActions, mapMutations } from 'vuex'

export default {
  data () {
    return {
      menu: [
        { label: 'Copy Video URL', name: 'play', icon: 'play_arrow' },
        { label: 'Keyboard Shortcuts', name: 'edit', icon: 'edit' },
        { label: 'Debug Information', name: 'info', icon: 'info' }
      ]
    }
  },

  props: {
    data: {
      type: Object,
      required: true
    }
  },

  methods: {
    ...mapActions('player', [
      'callback'
    ]),

    ...mapMutations('player', [
      'setControls'
    ])
  }
}
</script>
