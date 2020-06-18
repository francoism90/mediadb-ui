<template>
  <div class="fit" @click.prevent="callback({ type: 'togglePlay' })">
    <q-menu touch-position context-menu dark square>
      <q-list bordered padding dark style="width: 260px">
        <q-item
          v-for="(entity, index) in menu"
          :key="`menu-${index}`"
          clickable
          dark
          v-close-popup
          @click.prevent="open(entity.name)"
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
  data () {
    return {
      menu: [
        { label: 'Copy Video URL', name: 'play', icon: 'play_arrow' },
        { label: 'Keyboard Shortcuts', name: 'edit', icon: 'edit' },
        { label: 'Debug Information', name: 'edit', icon: 'edit' }
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
    ])
  }
}
</script>
