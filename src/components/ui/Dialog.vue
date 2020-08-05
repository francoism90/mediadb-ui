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
    ChannelEdit: () => import('components/channel/Edit'),
    CollectionEdit: () => import('components/collection/Edit'),
    MediaEdit: () => import('components/media/Edit'),
    MediaSave: () => import('components/media/Save')
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
