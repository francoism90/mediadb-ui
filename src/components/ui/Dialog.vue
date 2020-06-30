<template>
  <q-dialog v-model="dialog" v-bind="getOptions">
    <component :is="getComponent" :props="getData" />
  </q-dialog>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {
    ChannelEdit: () => import('components/channel/Edit'),
    PlayerInfo: () => import('components/player/Info'),
    PlaylistEdit: () => import('components/playlist/Edit'),
    VideoEdit: () => import('components/video/Edit'),
    VideoSave: () => import('components/video/Save')
  },

  computed: {
    ...mapGetters('dialog', [
      'isActive',
      'getComponent',
      'getData',
      'getOptions'
    ]),

    dialog: {
      get () {
        return this.isActive
      },

      set (value) {
        this.$store.commit('dialog/setActive', value)
      }
    }
  },

  watch: {
    $route: function (route) {
      this.$store.commit('dialog/setActive', false)
    }
  }
}
</script>
