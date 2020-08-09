<template>
  <nav>
    <q-btn-group
      class="q-mr-md"
      flat
    >
      <q-btn
        dense
        text-color="grey-5"
        icon="favorite_border"
      >
        <q-tooltip>Favorite</q-tooltip>
      </q-btn>

      <q-btn
        v-shortkey="['s']"
        dense
        text-color="grey-5"
        icon="photo"
        @click="createFrameshot"
        @shortkey="createFrameshot"
      >
        <q-tooltip>Frameshot</q-tooltip>
      </q-btn>

      <q-btn
        v-shortkey="['a']"
        dense
        text-color="grey-5"
        icon="playlist_add"
        @click="saveMedia"
        @shortkey="saveMedia"
      >
        <q-tooltip>Save</q-tooltip>
      </q-btn>

      <q-btn
        v-shortkey="['c']"
        dense
        text-color="grey-5"
        icon="menu_open"
        @click="editMedia"
        @shortkey="editMedia"
      >
        <q-tooltip>Edit</q-tooltip>
      </q-btn>
    </q-btn-group>

    <q-btn-group
      class="q-mr-md"
      flat
    >
      <q-btn
        dense
        text-color="grey-5"
        icon="get_app"
        @click="downloadMedia"
      >
        <q-tooltip>Download</q-tooltip>
      </q-btn>

      <q-btn
        dense
        text-color="grey-5"
        icon="flag"
      >
        <q-tooltip>Report</q-tooltip>
      </q-btn>

      <q-btn
        dense
        text-color="grey-5"
        icon="share"
      >
        <q-tooltip>Share</q-tooltip>
      </q-btn>
    </q-btn-group>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
import { openURL } from 'quasar'

export default {
  computed: {
    ...mapState('player', [
      'currentTime',
      'model'
    ])
  },

  methods: {
    async createFrameshot () {
      await this.$axios.patch(`api/v1/media/${this.model.id}/frameshot`, {
        timecode: this.currentTime
      })

      this.$q.notify({
        progress: true,
        message: `${this.model.name} has been frameshot.`,
        type: 'positive'
      })
    },

    downloadMedia () {
      openURL(this.model.download_url || '/')
    },

    editMedia () {
      this.$store.dispatch('dialog/open', {
        component: 'MediaEdit',
        data: {
          id: this.model.id
        }
      })
    },

    saveMedia () {
      this.$store.dispatch('dialog/open', {
        component: 'MediaSave',
        data: {
          id: this.model.id
        }
      })
    }
  }
}
</script>
