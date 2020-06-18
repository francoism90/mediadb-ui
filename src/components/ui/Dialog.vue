<template>
  <q-dialog v-model="dialog" v-bind="getProps">
    <component :is="getComponent" :props="getData" />
  </q-dialog>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {
    PlaylistEdit: () => import('components/playlist/Edit'),
    VideoEdit: () => import('components/video/Edit'),
    VideoSave: () => import('components/video/Save')
  },

  computed: {
    ...mapGetters('dialog', [
      'getComponent',
      'getModel',
      'getData',
      'getProps'
    ]),

    dialog: {
      get () {
        return this.getModel
      },

      set (value) {
        this.$store.commit('dialog/setModel', value)
      }
    }
  },

  watch: {
    $route: function (route) {
      this.$store.commit('dialog/setModel', false)
    }
  }
}
</script>
