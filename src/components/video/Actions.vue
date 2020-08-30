<template>
  <q-btn-group
    unelevated
  >
    <q-btn
      icon="favorite_border"
      label="Favorite"
    />

    <q-btn
      v-if="$auth.check({'permissions': 'create collections'})"
      v-shortkey="['a']"
      icon="layers"
      label="Save"
      @click="saveVideo"
      @shortkey="saveVideo"
    />

    <q-btn
      v-if="$auth.check({'permissions': 'edit videos'})"
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
    ...mapState('video', [
      'data'
    ])
  },

  methods: {
    editVideo () {
      this.$store.dispatch('dialog/open', {
        component: 'VideoEdit',
        props: {
          id: this.data.id
        }
      })
    },

    saveVideo () {
      this.$store.dispatch('dialog/open', {
        component: 'VideoSave',
        props: {
          id: this.data.id
        }
      })
    }
  }
}
</script>
