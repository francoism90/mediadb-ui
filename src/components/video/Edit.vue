<template>
  <q-card v-if="ready" :key="data.id" dark style="width: 530px">
    <q-dialog v-model="confirm" persistent>
      <q-card dark>
        <q-card-section class="row items-center">
          <q-avatar icon="delete_forever" color="primary" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to delete this video?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Confirm" color="primary" @click.prevent="onDelete" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-toolbar>
      <q-toolbar-title class="q-mx-xs">{{ data.name }}</q-toolbar-title>
      <q-btn flat round dense icon="close" v-close-popup />
    </q-toolbar>

    <q-form @submit="onSubmit">
      <q-card-section style="max-height: 50vh" class="scroll q-gutter-y-md">
        <q-input
          ref="name"
          v-model="body.name"
          dark
          square
          filled
          label="Name"
          clearable
          counter
          :rules="[
            val => val && val.length > 0 || 'Required',
            val => val.length < 256 || 'Please use maximum 255 character',
          ]"
          lazy-rules
        >
          <template v-slot:prepend>
            <q-icon name="label" />
          </template>
        </q-input>

        <q-select
          ref="tags"
          v-model="body.tags"
          dark
          square
          filled
          :input-debounce="400"
          :max-values="15"
          :options="options"
          :loading="loading"
          @filter="filterTags"
          clearable
          counter
          use-chips
          hide-dropdown-icon
          hint="Max 15 selections"
          label="Select tags"
          stack-label
          multiple
          option-label="name"
          option-value="id"
          options-dark
          options-sanitize
          use-input
        >
          <template v-slot:prepend>
            <q-icon name="local_offer" />
          </template>

          <template v-slot:option="scope">
            <q-item
              v-bind="scope.itemProps"
              v-on="scope.itemEvents"
            >
              <q-item-section>
                <q-item-label v-html="scope.opt.name" />
                <q-item-label caption class="text-capitalize">{{ scope.opt.type }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>

          <template v-slot:selected-item="scope">
            <q-chip
              removable
              dense
              square
              @remove="scope.removeAtIndex(scope.index)"
              :tabindex="scope.tabindex"
            >
              <span>{{ scope.opt.name }}</span>&nbsp;
              <span class="text-capitalize">({{ scope.opt.type }})</span>
            </q-chip>
          </template>
        </q-select>

        <q-input
          ref="description"
          v-model="body.description"
          dark
          square
          filled
          clearable
          autogrow
          label="Description"
          hint="Markdown"
          counter
          :rules="[
            val => val.length <= 2048 || 'Please use maximum 2048 characters'
          ]"
          lazy-rules
        >
          <template v-slot:prepend>
            <q-icon name="notes" />
          </template>
        </q-input>
      </q-card-section>

      <q-card-actions align="right" class="q-mx-sm">
        <q-btn flat label="Delete" color="primary" @click="confirm = true" />
        <q-btn flat type="submit" label="Save" color="primary" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import modelModule from 'src/store/model'
import paginateModule from 'src/store/paginate'
import { mapGetters } from 'vuex'

export default {
  props: {
    props: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      confirm: false,
      body: {
        name: '',
        description: '',
        tags: []
      }
    }
  },

  created () {
    if (!this.$store.state.video_edit) {
      this.$store.registerModule('video_edit', modelModule)
    }

    if (!this.$store.state.tagger) {
      this.$store.registerModule('tagger', paginateModule)
    }

    this.setModel()
    this.setTags()
  },

  computed: {
    ...mapGetters('video_edit', {
      ready: 'isReady',
      data: 'getData'
    }),

    loading () {
      return this.$store.getters['tagger/isLoading']
    },

    options () {
      return this.$store.getters['tagger/getData']
    }
  },

  methods: {
    async setModel () {
      await this.$store.dispatch('video_edit/fetch', {
        path: 'media/' + this.props.id,
        params: {
          include: 'model,tags'
        }
      })

      // Set current models
      this.body.name = this.data.name || ''
      this.body.description = this.data.description || ''
      this.body.tags = this.data.relationships.tags || []
    },

    async setTags () {
      await this.$store.dispatch('tagger/create', {
        path: 'tags',
        params: {
          'page[size]': 5,
          sort: 'media'
        }
      })
    },

    async filterTags (val, update, abort) {
      this.$store.dispatch('tagger/reset', {
        params: {
          'filter[query]': val || null,
          sort: val.length ? null : 'media'
        }
      })

      await this.$store.dispatch('tagger/fetch')

      update() // update options
    },

    async onSubmit () {
      this.$refs.name.validate()
      this.$refs.description.validate()

      if (
        !this.$refs.name.hasError &&
        !this.$refs.description.hasError
      ) {
        // Update model
        await this.$store.dispatch('video_edit/update', {
          path: 'media/' + this.data.id,
          body: this.body
        })

        // Refresh stores
        await this.refresh()

        // Notifiy
        this.$q.notify({
          progress: true,
          timeout: 1500,
          position: 'top',
          message: `${this.data.name} has been updated.`,
          type: 'positive'
        })
      }
    },

    async onDelete () {
      // Delete model
      await this.$store.dispatch('video_edit/remove', {
        path: 'media/' + this.data.id
      })

      // Notifiy
      this.$q.notify({
        progress: true,
        position: 'top',
        message: `${this.data.name} has been removed.`,
        type: 'positive'
      })

      // Close modal
      this.$store.dispatch('dialog/close')
    },

    async refresh () {
      await this.$store.dispatch('video_edit/refresh')

      if (
        this.$store.state.video &&
        this.$store.state.video.path === `media/${this.data.id}`
      ) {
        await this.$store.dispatch('video/refresh')
      }
    }
  }
}
</script>
