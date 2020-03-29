<template>
  <q-card v-if="ready" :key="data.id" dark style="width: 700px; max-width: 80vw;">
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

    <q-card-section>
      <div class="text-h6">{{ data.name }}</div>
    </q-card-section>

    <q-separator />

    <form @submit.prevent.stop="onSubmit">
      <q-card-section style="max-height: 50vh" class="scroll q-gutter-lg">
        <q-input
          ref="name"
          v-model="body.name"
          dark
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
          filled
          :input-debounce="300"
          :max-values="15"
          :options="options"
          @filter="filterTags"
          clearable
          counter
          use-chips
          stack-label
          hide-dropdown-icon
          hint="Max 15 selections"
          label="Select tags"
          multiple
          option-label="name"
          option-value="slug"
          options-dark
          options-sanitize
          popup-content-class="text-weight-light"
          use-input
        >
          <template v-slot:prepend>
            <q-icon name="local_offer" />
          </template>
          <template v-slot:selected-item="scope">
          <q-chip
            removable
            dense
            square
            @remove="scope.removeAtIndex(scope.index)"
            :tabindex="scope.tabindex"
            color="black-bis"
            text-color="grey-5"
          >
            {{ scope.opt.name }}
          </q-chip>
        </template>
        </q-select>

        <q-input
          ref="description"
          v-model="body.description"
          dark
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

      <q-separator />

      <q-card-actions align="right">
        <q-btn flat label="Delete" color="primary" @click="confirm = true" />
        <q-btn flat type="submit" label="Save" color="primary" />
      </q-card-actions>
    </form>
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
    if (!this.$store.state.manager) {
      this.$store.registerModule('manager', modelModule)
    }

    if (!this.$store.state.tags) {
      this.$store.registerModule('tags', paginateModule)
    }

    this.setModel()
    this.setTags()
  },

  computed: {
    ...mapGetters('manager', {
      ready: 'isReady',
      data: 'getData'
    }),

    options () {
      return this.$store.getters['tags/getData']
    }
  },

  methods: {
    async setModel () {
      await this.$store.dispatch('manager/fetch', {
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
      await this.$store.dispatch('tags/create', {
        path: 'tags',
        params: {
          'page[size]': 9
        }
      })
    },

    async filterTags (val, update, abort) {
      // Reset items
      this.$store.dispatch('tags/reset', {
        params: {
          'filter[query]': val
        }
      })

      // Fetch tags
      if (val) {
        await this.$store.dispatch('tags/fetch')
      }

      // Update options
      update()
    },

    async onSubmit () {
      this.$refs.name.validate()
      this.$refs.description.validate()

      if (
        !this.$refs.name.hasError &&
        !this.$refs.description.hasError
      ) {
        // Update model
        await this.$store.dispatch('manager/update', {
          path: 'media/' + this.data.id,
          body: this.body
        })

        // Refresh stores
        await this.refresh()

        // Notifiy
        this.$q.notify({
          progress: true,
          position: 'top',
          message: `${this.data.name} has been updated.`,
          type: 'positive'
        })
      }
    },

    async onDelete () {
      // Delete model
      await this.$store.dispatch('manager/remove', {
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
      await this.$store.dispatch('manager/refresh')

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
