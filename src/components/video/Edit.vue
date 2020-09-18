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
      <q-dialog
        v-model="deleteDialog"
        persistent
      >
        <q-card>
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
              v-close-popup
              flat
              label="Confirm"
              color="primary"
              @click.prevent="onDelete"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>

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
            <q-input
              v-model.trim="form.name"
              square
              filled
              label="Name"
              clearable
              :error-message="getError('name')"
              :error="hasError('name')"
            />

            <q-select
              v-model="form.tags"
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
              option-label="name"
              option-value="id"
              stack-label
              multiple
              use-input
              @filter="filterTags"
            />
          </q-card-section>

          <q-separator />

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
  </q-dialog>
</template>

<script>
import { dialogHandler } from 'src/mixins/dialog'
import { formHandler } from 'src/mixins/form'
import VideoModel from 'src/models/Video'
import TagModel from 'src/models/Tag'

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
      deleteDialog: false,
      video: null,
      tags: []
    }
  },

  async created () {
    this.video = null

    try {
      this.video = await VideoModel.$find(this.id)

      this.setForm({
        id: this.video.id,
        name: this.video.name,
        description: this.video.description,
        tags: this.video.relationships.tags
      })
    } catch {
      //
    }
  },

  methods: {
    async filterTags (val, update, abort) {
      this.tags = await TagModel
        .where('query', val || null)
        .orderBy(val.length ? 'relevance' : 'items')
        .page(1)
        .limit(5)
        .$get()

      update()
    },

    async onDelete () {
      try {
        await this.video.delete()

        this.$q.notify({
          progress: true,
          timeout: 1500,
          position: 'top',
          message: `${this.video.name} has been deleted.`,
          type: 'positive'
        })

        this.$root.$emit('dialogOk')
      } catch (e) {
        this.$q.notify({
          progress: true,
          position: 'top',
          message: e.response.data.message || 'Unable to delete video',
          type: 'negative'
        })
      }
    },

    async onSubmit () {
      try {
        const video = new VideoModel(this.form)

        this.video = await video.save()

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
    }
  }
}
</script>
