<template>
  <q-card v-if="ready" :key="data.id" dark style="width: 530px">
    <q-dialog v-model="confirm" persistent>
      <q-card dark>
        <q-card-section class="row items-center">
          <q-avatar icon="delete_forever" color="primary" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to delete this channel?</span>
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
          :input-debounce="300"
          :max-values="15"
          :options="options"
          :loading="loading"
          @filter="FilterOptions"
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
import { mapGetters } from 'vuex'
import modelModule from 'src/store/model'
import paginateModule from 'src/store/paginate'

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
    if (!this.$store.hasModule('model_edit')) {
      this.$store.registerModule('model_edit', modelModule)
    }

    if (!this.$store.hasModule('selector')) {
      this.$store.registerModule('selector', paginateModule)
    }

    this.setModel()
    this.setOptions()
  },

  beforeDestroy () {
    this.$store.unregisterModule('model_edit')
    this.$store.unregisterModule('selector')
  },

  computed: {
    ...mapGetters('model_edit', {
      ready: 'isReady',
      data: 'getData'
    }),

    loading () {
      return this.$store.getters['selector/isLoading']
    },

    options () {
      return this.$store.getters['selector/getData']
    }
  },

  methods: {
    async setModel () {
      await this.$store.dispatch('model_edit/fetch', {
        path: 'channel/' + this.props.id
      })

      this.body.name = this.data.name || ''
      this.body.description = this.data.description || ''
      this.body.tags = this.data.relationships.tags || []
    },

    async setOptions () {
      await this.$store.dispatch('selector/create', {
        path: 'tags',
        params: {
          'page[size]': 5,
          sort: 'media'
        }
      })
    },

    async FilterOptions (val, update, abort) {
      await this.$store.dispatch('selector/reset', {
        params: {
          'filter[query]': val || null,
          sort: val.length ? null : 'media'
        }
      })

      update() // update options
    },

    async onSubmit () {
      this.$refs.name.validate()
      this.$refs.description.validate()

      if (
        !this.$refs.name.hasError &&
        !this.$refs.description.hasError
      ) {
        await this.$store.dispatch('model_edit/update', {
          path: 'channel/' + this.data.id,
          body: this.body
        })

        await this.refreshStores()

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
      await this.$store.dispatch('model_edit/remove', {
        path: 'channel/' + this.data.id
      })

      this.$q.notify({
        progress: true,
        position: 'top',
        message: `${this.data.name} has been removed.`,
        type: 'positive'
      })

      this.$store.dispatch('dialog/close')
    },

    async refreshStores () {
      await this.$store.dispatch('model_edit/refresh')

      if (this.$store.hasModule('channel')) {
        await this.$store.dispatch('channel/refresh')
      }
    }
  }
}
</script>
