<template>
  <q-dialog
    :key="id"
    ref="dialog"
    @hide="onDialogHide"
  >
    <q-card
      class="q-dialog-plugin"
      style="width: 500px; max-width: 100vw;"
    >
      <q-inner-loading :showing="!form || !video">
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
          <q-card-section class="row no-wrap justify-between items-center">
            <div class="col text-h6 ellipsis">
              {{ video.name }}
            </div>

            <div class="col-auto">
              <q-btn
                v-close-popup
                icon="close"
                color="grey-9"
                size="12px"
                dense
                round
                unelevated
              />
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section class="q-gutter-md">
            <q-select
              v-model="form.collections"
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
              option-label="name"
              option-value="id"
              stack-label
              multiple
              use-input
              @filter="filterCollections"
            />
          </q-card-section>

          <q-separator />

          <q-card-actions
            align="right"
          >
            <q-btn
              v-close-popup
              flat
              label="New List"
              color="primary"
              @click="createCollection"
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
  </q-dialog>
</template>

<script>
import { dialogHandler } from 'src/mixins/dialog'
import { formHandler } from 'src/mixins/form'
import CollectionModel from 'src/models/Collection'
import VideoModel from 'src/models/Video'

export default {
  mixins: [dialogHandler, formHandler],

  props: {
    id: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      video: null,
      collections: [],
      userCollections: []
    }
  },

  async created () {
    this.video = null

    try {
      this.video = await VideoModel.$find(this.id)

      await this.setCollections()

      this.setForm({
        collections: this.userCollections
      })
    } catch {
      this.hide()

      this.$q.notify({
        progress: true,
        position: 'top',
        message: 'Unable to load video',
        type: 'negative'
      })
    }
  },

  methods: {
    async setCollections () {
      this.userCollections = await this.video.collections().$get()
    },

    async filterCollections (val, update, abort) {
      this.collections = await CollectionModel
        .where('type', 'user')
        .where('query', val || null)
        .orderBy(val.length ? 'relevance' : 'updated_at')
        .page(1)
        .limit(5)
        .$get()

      update()
    },

    async createCollection () {
      try {
        await this.$http.post(`videos/${this.id}/collections`, {
          collections: [
            {
              id: this.video.id,
              name: this.video.name
            }
          ]
        })
      } catch (e) {
        //
      }
    },

    async onSubmit () {
      try {
        await this.$http.put(`videos/${this.id}/collections`, {
          collections: this.form.collections
        })
      } catch (e) {
        this.setMessage(e.response)
        this.setErrors(e.response)
      }
    }
  }
}
</script>
