<template>
  <q-card
    v-if="media"
    dark
    style="width: 520px"
  >
    <q-inner-loading
      dark
      :showing="!media.id"
    >
      <q-spinner
        size="50px"
        color="primary"
      />
    </q-inner-loading>

    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <q-form
        v-if="form"
        @submit="onSubmit"
      >
        <q-card-section class="row items-center">
          <div class="text-h6">
            {{ media.name }}
          </div>
          <q-space />
          <q-btn
            v-close-popup
            icon="close"
            round
            unelevated
            color="grey-9"
            dense
            size="12px"
          />
        </q-card-section>

        <q-separator dark />

        <q-card-section>
          <q-select
            v-model="form.collections"
            dark
            square
            filled
            :error-message="getError('collections')"
            :error="hasError('collections')"
            :input-debounce="300"
            :options="collections"
            :max-values="25"
            clearable
            hide-dropdown-icon
            counter
            use-chips
            label="Collections"
            options-dark
            option-label="name"
            option-value="id"
            stack-label
            multiple
            use-input
            @filter="filterCollections"
          />
        </q-card-section>

        <q-separator dark />

        <q-card-actions
          align="right"
        >
          <q-btn
            flat
            type="submit"
            label="Save"
            color="primary"
          />
        </q-card-actions>
      </q-form>
    </transition>
  </q-card>
</template>

<script>
import { formHandler } from 'src/mixins/form'
import Collection from 'src/models/Collection'
import Media from 'src/models/Media'

export default {
  mixins: [formHandler],

  props: {
    data: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      media: {},
      collections: [],
      userCollections: []
    }
  },

  created () {
    this.setModel()
    this.setCollections()
  },

  methods: {
    async setModel () {
      this.media = await Media.$find(this.data.id)
    },

    async setCollections () {
      this.userCollections = await Collection
        .where('type', 'user')
        .where('media', this.data.id)
        .orderBy('name')
        .page(1)
        .limit(30)
        .$get()

      this.setForm({
        collections: this.userCollections
      })
    },

    async filterCollections (val, update, abort) {
      this.collections = await Collection
        .where('query', val || null)
        .orderBy(val.length ? 'relevance' : 'updated')
        .page(1)
        .limit(5)
        .$get()

      update()
    },

    async onSubmit () {
      try {
        // Save collection changes
        await this.$axios.put(`api/v1/media/${this.data.id}/save`, {
          collections: this.form.collections
        })

        // Refresh collection
        await this.setCollections()

        this.$q.notify({
          progress: true,
          timeout: 1500,
          position: 'top',
          message: `${this.media.name} has been saved.`,
          type: 'positive'
        })
      } catch (e) {
        this.setMessage(e.response.data.message || '')
        this.setErrors(e.response.data.errors || [])
      }
    }
  }
}
</script>
