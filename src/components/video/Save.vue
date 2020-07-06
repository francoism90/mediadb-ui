<template>
  <q-card
    v-if="ready"
    :key="data.id"
    dark
    style="width: 530px"
  >
    <q-toolbar>
      <q-toolbar-title class="q-mx-xs">
        {{ data.name }}
      </q-toolbar-title>
      <q-btn
        v-close-popup
        flat
        round
        dense
        icon="close"
      />
    </q-toolbar>

    <q-card-section
      style="max-height: 50vh"
      class="scroll q-gutter-y-md"
    >
      <model-playlist namespace="form_save" />
    </q-card-section>

    <q-card-actions
      align="right"
      class="q-mx-sm"
    >
      <q-btn
        flat
        type="submit"
        label="Save"
        color="primary"
        @click="onSubmit"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import { mapGetters } from 'vuex'
import formModule from 'src/store/form'
import modelModule from 'src/store/model'

export default {
  components: {
    ModelPlaylist: () => import('components/model/Playlist')
  },

  props: {
    props: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapGetters('model_save', {
      ready: 'isReady',
      data: 'getData',
      meta: 'getMeta'
    }),

    formData () {
      return this.$store.getters['form_save/getData']
    },

    isValid () {
      return this.$store.getters['form_save/isValid']
    }
  },

  async created () {
    if (!this.$store.hasModule('model_save')) {
      this.$store.registerModule('form_save', formModule)
      this.$store.registerModule('model_save', modelModule)
    }

    await this.$store.dispatch('model_save/fetch', {
      path: 'media/' + this.props.id
    })

    // Set data to be allowed overwritten
    this.$store.dispatch('form_save/create', {
      data: {
        playlists: this.meta.user_playlists || []
      }
    })
  },

  beforeDestroy () {
    this.$store.unregisterModule('form_save')
    this.$store.unregisterModule('model_save')
  },

  methods: {
    async onSubmit () {
      if (!this.isValid) {
        return
      }

      await this.$store.dispatch('model_save/update', {
        body: this.formData
      })

      await this.refreshStores()

      this.$q.notify({
        progress: true,
        timeout: 1500,
        position: 'top',
        message: `${this.data.name} has been updated.`,
        type: 'positive'
      })
    },

    async refreshStores () {
      if (this.$store.hasModule('video')) {
        await this.$store.dispatch('video/refresh')
      }
    }
  }
}
</script>
