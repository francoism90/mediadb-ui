<template>
  <q-btn-group
    unelevated
  >
    <q-btn
      icon="favorite_border"
      label="Favorite"
    />

    <q-btn
      v-shortkey="['a']"
      icon="layers"
      label="Save"
      @click="saveVideo"
      @shortkey="saveVideo"
    />

    <q-btn
      v-shortkey="['c']"
      icon="notes"
      label="Edit"
      @click="editVideo"
      @shortkey="editVideo"
    />
  </q-btn-group>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('player', [
      'currentTime',
      'model'
    ])
  },

  methods: {
    editVideo () {
      this.$store.dispatch('dialog/open', {
        component: 'VideoEdit',
        data: {
          id: this.model.id
        }
      })
    },

    saveVideo () {
      this.$store.dispatch('dialog/open', {
        component: 'VideoSave',
        data: {
          id: this.model.id
        }
      })
    }
  }
}
</script>
