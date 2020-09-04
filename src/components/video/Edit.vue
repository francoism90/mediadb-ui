<template>
  <q-card
    v-if="video"
    dark
    :style="{ width: '520px' }"
  >
    <q-dialog
      v-model="deleteDialog"
      persistent
    >
      <q-card dark>
        <q-card-section class="row items-center">
          <q-avatar
            icon="delete_forever"
            color="primary"
            text-color="white"
          />
          <span class="q-ml-sm">Are you sure you want to delete this video?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            v-close-popup
            flat
            label="Cancel"
            color="primary"
          />
          <q-btn
            flat
            label="Confirm"
            color="primary"
            @click.prevent="onDelete"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

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

        <q-card-section class="q-gutter-md">
          <q-input
            v-model.trim="form.name"
            dark
            square
            filled
            label="Name"
            clearable
            :error-message="getError('name')"
            :error="hasError('name')"
          />

          <q-select
            v-model="form.tags"
            dark
            square
            filled
            :error-message="getError('tags')"
            :error="hasError('tags')"
            :input-debounce="300"
            :options="tags"
            :max-values="15"
            clearable
            hide-dropdown-icon
            counter
            use-chips
            label="Tags"
            options-dark
            option-label="name"
            option-value="id"
            stack-label
            multiple
            use-input
            @filter="filterTags"
          />
        </q-card-section>

        <q-separator dark />

        <q-card-actions
          align="right"
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
          />
        </q-card-actions>
      </q-form>
    </transition>
  </q-card>
</template>

<script>
import { formHandler } from 'src/mixins/form'
import Video from 'src/models/Video'
import Tag from 'src/models/Tag'

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
      deleteDialog: false,
      video: {},
      tags: []
    }
  },

  created () {
    this.setModel()
  },

  methods: {
    async setModel () {
      this.video = await Video.$find(this.id)

      this.setForm({
        id: this.video.id,
        name: this.video.name,
        description: this.video.description,
        tags: this.video.relationships.tags
      })
    },

    async filterTags (val, update, abort) {
      this.tags = await Tag
        .where('query', val || null)
        .orderBy(val.length ? 'relevance' : 'items')
        .page(1)
        .limit(5)
        .$get()

      update()
    },

    async onSubmit () {
      try {
        // Save model changes
        const video = new Video(this.form)

        await video.save()

        // Refresh model
        await this.setModel()

        this.$q.notify({
          progress: true,
          timeout: 1500,
          position: 'top',
          message: `${this.video.name} has been updated.`,
          type: 'positive'
        })
      } catch (e) {
        this.setMessage(e.response)
        this.setErrors(e.response)
      }
    },

    async onDelete () {
      try {
        await this.video.delete()

        this.$q.notify({
          progress: true,
          position: 'top',
          message: `${this.video.name} has been deleted.`,
          type: 'positive'
        })

        this.$store.dispatch('dialog/close')
      } catch (e) {
        this.$q.notify({
          progress: true,
          position: 'top',
          message: e.response.data.message || 'Unable to delete video',
          type: 'negative'
        })
      }
    }
  }
}
</script>
