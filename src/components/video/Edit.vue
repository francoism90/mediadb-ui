<template>
  <q-dialog
    :key="id"
    ref="dialog"
    @hide="onDialogHide"
  >
    <q-card
      class="q-dialog-plugin"
      style="width: 500px; max-width: 100vw;"
      dark
    >
      <q-dialog
        v-model="deleteDialog"
        persistent
      >
        <q-card dark>
          <q-card-section class="q-pt-lg q-px-xl text-body1">
            Are you sure you want to delete this video?
          </q-card-section>

          <q-card-actions
            align="center"
            class="q-pb-lg"
          >
            <q-btn
              v-close-popup="3"
              no-caps
              unelevated
              rounded
              class="btn-outline btn-primary"
              type="submit"
              label="Confirm"
              @click.prevent="onDelete"
            />

            <q-btn
              v-close-popup
              no-caps
              unelevated
              rounded
              class="btn-outline btn-secondary"
              label="Cancel"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-inner-loading
        :showing="!form || !video"
        dark
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
          <q-card-section class="row no-wrap justify-between items-center content-center">
            <div class="col text-h6 ellipsis">
              Video Details
            </div>

            <div class="col-auto">
              <q-icon
                v-close-popup
                name="close"
                size="32px"
                class="cursor-pointer"
              />
            </div>
          </q-card-section>

          <q-separator dark />

          <q-card-section class="q-px-xl q-gutter-sm">
            <q-input
              v-model.trim="form.name"
              :error-message="getError('name')"
              :error="hasError('name')"
              :maxlength="255"
              label="Name"
              clearable
              counter
              dark
            />

            <q-select
              v-model="form.status"
              :error-message="getError('status')"
              :error="hasError('status')"
              :input-debounce="300"
              :options="statuses"
              option-label="label"
              option-value="value"
              clearable
              dark
              hide-dropdown-icon
              label="Visibility"
              emit-value
              map-options
            >
              <template #option="scope">
                <q-item
                  v-bind="scope.itemProps"
                  class="bg-white text-black"
                  v-on="scope.itemEvents"
                >
                  <q-item-section>
                    <q-item-label class="text-black text-weight-medium">
                      {{ scope.opt.label }}
                    </q-item-label>

                    <q-item-label class="text-grey-8">
                      {{ scope.opt.description }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>

            <q-select
              v-model="form.tags"
              :error-message="getError('tags')"
              :error="hasError('tags')"
              :input-debounce="300"
              :options="tags"
              :max-values="15"
              clearable
              hide-dropdown-icon
              counter
              dark
              use-chips
              label="Tags"
              option-label="name"
              option-value="id"
              stack-label
              multiple
              use-input
              @filter="filterTags"
            >
              <template #option="scope">
                <q-item
                  v-bind="scope.itemProps"
                  class="bg-white text-black"
                  v-on="scope.itemEvents"
                >
                  <q-item-section>
                    <q-item-label class="text-black text-weight-medium">
                      {{ scope.opt.name }}
                    </q-item-label>

                    <q-item-label class="text-grey-8 text-capitalize">
                      {{ scope.opt.type }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>

            <q-input
              v-model.trim="form.overview"
              type="textarea"
              autogrow
              label="Overview"
              clearable
              counter
              dark
              :maxlength="1024"
              :error-message="getError('name')"
              :error="hasError('name')"
            />
          </q-card-section>

          <q-card-actions
            align="center"
            class="q-pb-lg"
          >
            <q-btn
              no-caps
              unelevated
              rounded
              class="btn-outline btn-primary btn-stretch"
              type="submit"
              label="Save"
            />

            <q-btn
              no-caps
              unelevated
              rounded
              class="btn-outline btn-secondary btn-stretch"
              label="Delete"
              @click="deleteDialog = true"
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
import TagModel from 'src/models/Tag'
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
      deleteDialog: false,
      video: null,
      statuses: [
        { value: 'public', label: 'Public', description: 'Everyone can view this video' },
        { value: 'private', label: 'Private', description: 'Can only be viewed with specific rights' }
      ],
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
        status: this.video.status,
        overview: this.video.overview,
        tags: this.video.relationships.tags
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
    async filterTags (val, update, abort) {
      this.tags = await TagModel
        .where('query', val || null)
        .orderBy(val.length ? 'recommended' : 'items')
        .page(1)
        .limit(5)
        .$get()

      update()
    },

    async onDelete () {
      this.resetErrors()

      try {
        await this.video.delete()
      } catch (e) {
        this.setMessage(e.response)
        this.setErrors(e.response)
      }
    },

    async onSubmit () {
      this.resetErrors()

      try {
        const video = new VideoModel(this.form)

        await video.save()
      } catch (e) {
        this.setMessage(e.response)
        this.setErrors(e.response)
      }
    }
  }
}
</script>
