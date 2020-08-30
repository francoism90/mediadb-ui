<template>
  <q-card
    v-if="video"
    dark
    style="width: 520px"
  >
    <q-inner-loading
      dark
      :showing="!video.id"
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
            {{ video.name }}
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
import Video from 'src/models/Video'

export default {
  mixins: [formHandler],

  props: {
    id: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      video: {},
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
      this.video = await Video.$find(this.id)
    },

    async setCollections () {
      this.userCollections = await Collection
        .where('type', 'user')
        .where('video', this.id)
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
        .where('type', 'user')
        .where('query', val || null)
        .orderBy(val.length ? 'relevance' : 'updated_at')
        .page(1)
        .limit(5)
        .$get()

      update()
    },

    async onSubmit () {
      try {
        // Save collection changes
        await this.$axios.put(`videos/${this.id}/save`, {
          collections: this.form.collections
        })

        // Refresh collection
        await this.setCollections()

        this.$q.notify({
          progress: true,
          timeout: 1500,
          position: 'top',
          message: `${this.video.name} has been saved.`,
          type: 'positive'
        })
      } catch (e) {
        this.setMessage(e.response)
        this.setErrors(e.response)
      }
    }
  }
}
</script>
