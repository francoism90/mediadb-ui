<template>
  <q-card
    v-if="ready"
    :key="data.id"
    dark
    style="width: 530px"
  >
    <q-dialog
      v-model="deleteDialog"
      persistent
    >
      <model-delete />
    </q-dialog>

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
      <model-name />
      <model-tags />
      <model-channel />
      <model-description />
    </q-card-section>

    <q-card-actions
      align="right"
      class="q-mx-sm"
    >
      <q-btn
        flat
        label="Delete"
        color="primary"
        @click="deleteDialog = true"
      />
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
    ModelChannel: () => import('components/model/Channel'),
    ModelDelete: () => import('components/model/Delete'),
    ModelDescription: () => import('components/model/Description'),
    ModelName: () => import('components/model/Name'),
    ModelTags: () => import('components/model/Tags')
  },

  props: {
    props: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      deleteDialog: false
    }
  },

  computed: {
    ...mapGetters('model_edit', {
      ready: 'isReady',
      data: 'getData'
    }),

    formData () {
      return this.$store.getters['form_edit/getData']
    },

    isValid () {
      return this.$store.getters['form_edit/isValid']
    }
  },

  async created () {
    if (!this.$store.hasModule('model_edit')) {
      this.$store.registerModule('form_edit', formModule)
      this.$store.registerModule('model_edit', modelModule)
    }

    await this.$store.dispatch('model_edit/fetch', {
      path: 'media/' + this.props.id
    })

    // Set data to be allowed overwritten
    this.$store.dispatch('form_edit/create', {
      data: {
        name: this.data.name || '',
        description: this.data.description || '',
        model: this.data.relationships.model || {},
        tags: this.data.relationships.tags || []
      }
    })
  },

  beforeDestroy () {
    this.$store.unregisterModule('form_edit')
    this.$store.unregisterModule('model_edit')
  },

  methods: {
    async onSubmit () {
      if (!this.isValid) {
        return
      }

      await this.$store.dispatch('model_edit/update', {
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
