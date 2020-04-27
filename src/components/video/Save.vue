<template>
  <q-card v-if="ready" :key="data.id" dark style="width: 530px">
    <q-toolbar>
      <q-toolbar-title class="q-mx-xs">{{ data.name }}</q-toolbar-title>
      <q-btn flat round dense icon="close" v-close-popup />
    </q-toolbar>

    <q-form @submit="onSubmit">
      <q-card-section style="max-height: 50vh" class="scroll q-gutter-y-md">
        <q-select
          ref="collect"
          v-model="body.collect"
          dark
          square
          filled
          :input-debounce="400"
          :max-values="15"
          :options="options"
          @filter="filterOptions"
          clearable
          counter
          use-input
          use-chips
          hide-dropdown-icon
          hint="Max 15 selections"
          label="Select collection"
          stack-label
          multiple
          option-label="name"
          option-value="id"
          options-dark
          options-sanitize
          @new-value="createOption"
        >
          <template v-slot:prepend>
            <q-icon name="playlist_add" />
          </template>

          <template v-slot:selected-item="scope">
            <q-chip
              removable
              dense
              square
              @remove="scope.removeAtIndex(scope.index)"
              :tabindex="scope.tabindex"
            >
              {{ scope.opt.name }}
            </q-chip>
          </template>
        </q-select>
      </q-card-section>

      <q-card-actions align="right"  class="q-mx-sm">
        <q-btn flat type="submit" label="Save" color="primary" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import { mapGetters } from 'vuex'
import modelModule from 'src/store/model'
import paginateModule from 'src/store/paginate'
import find from 'lodash/find'

export default {
  props: {
    props: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      body: {
        collect: []
      }
    }
  },

  created () {
    if (!this.$store.state.manager) {
      this.$store.registerModule('manager', modelModule)
    }

    if (!this.$store.state.user_collect) {
      this.$store.registerModule('user_collect', paginateModule)
    }

    this.setModel()
    this.setOptions()
  },

  computed: {
    ...mapGetters('manager', {
      ready: 'isReady',
      data: 'getData',
      meta: 'getMeta'
    }),

    options () {
      return this.$store.getters['user_collect/getData']
    }
  },

  methods: {
    async setModel () {
      await this.$store.dispatch('manager/fetch', {
        path: 'media/' + this.props.id,
        params: {
          include: 'model'
        }
      })

      // Set current models
      this.body.collect = this.meta.collects || []
    },

    async setOptions () {
      await this.$store.dispatch('user_collect/create', {
        path: 'collect',
        params: {
          'filter[type]': 'user',
          'page[size]': 9
        }
      })
    },

    async filterOptions (val, update, abort) {
      // Reset items
      this.$store.dispatch('user_collect/reset', {
        params: {
          'filter[query]': val || null
        }
      })

      // Fetch tags
      if (val.length) {
        await this.$store.dispatch('user_collect/fetch')
      }

      // Update options
      update()
    },

    async onSubmit () {
      this.$refs.collect.validate()

      if (!this.$refs.collect.hasError) {
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

    async refresh () {
      await this.$store.dispatch('manager/refresh')

      if (
        this.$store.state.video &&
        this.$store.state.video.path === `media/${this.data.id}`
      ) {
        await this.$store.dispatch('video/refresh')
      }
    },

    createOption (val, done) {
      const optionExists = find(this.options, { name: val })
      const collectExists = find(this.body.collect, { name: val })

      if (val.length > 0 && !optionExists && !collectExists) {
        this.body.collect.push({
          id: val,
          name: val
        })
      }

      done(null)
    }
  }
}
</script>
