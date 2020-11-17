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
            <span class="q-ml-sm">Are you sure you want to delete this tag?</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              v-close-popup
              flat
              label="Cancel"
              color="primary"
            />

            <q-btn
              v-close-popup="3"
              flat
              label="Confirm"
              color="primary"
              @click.prevent="onDelete"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-inner-loading :showing="!form || !tag">
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
              Tag Details
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
              counter
              :maxlength="255"
              :error-message="getError('name')"
              :error="hasError('name')"
            />

            <q-select
              v-model="form.type"
              square
              filled
              :error-message="getError('type')"
              :error="hasError('type')"
              :input-debounce="300"
              :options="types"
              clearable
              hide-dropdown-icon
              label="Type"
              emit-value
              map-options
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
      tag: null,
      types: [
        { value: 'actor', label: 'Actor' },
        { value: 'genre', label: 'Genre' },
        { value: 'language', label: 'Language' },
        { value: 'studio', label: 'Studio' }
      ]
    }
  },

  async created () {
    this.tag = null

    try {
      this.tag = await TagModel.$find(this.id)

      this.setForm({
        id: this.tag.id,
        name: this.tag.name,
        type: this.tag.type
      })
    } catch {
      this.hide()

      this.$q.notify({
        progress: true,
        position: 'top',
        message: 'Unable to load tag',
        type: 'negative'
      })
    }
  },

  methods: {
    async onDelete () {
      this.resetErrors()

      try {
        await this.tag.delete()
      } catch (e) {
        this.setMessage(e.response)
        this.setErrors(e.response)
      }
    },

    async onSubmit () {
      this.resetErrors()

      try {
        const tag = new TagModel(this.form)

        await tag.save()
      } catch (e) {
        this.setMessage(e.response)
        this.setErrors(e.response)
      }
    }
  }
}
</script>
