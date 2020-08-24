<template>
  <q-dialog
    v-model="dialog"
    v-bind="getOptions"
  >
    <component
      :is="getComponent"
      :data="getData"
    />
  </q-dialog>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {
    CollectionEdit: () => import('components/collection/Edit'),
    VideoDebug: () => import('components/video/Debug'),
    VideoEdit: () => import('components/video/Edit'),
    VideoSave: () => import('components/video/Save'),
    VideoTracks: () => import('components/video/Tracks')
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
