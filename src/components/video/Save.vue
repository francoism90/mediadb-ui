<template>
  <q-card v-if="ready" :key="data.id" dark style="width: 530px">
    <q-toolbar>
      <q-toolbar-title class="q-mx-xs">{{ data.name }}</q-toolbar-title>
      <q-btn flat round dense icon="close" v-close-popup />
    </q-toolbar>

    <q-form @submit="onSubmit">
      <q-card-section style="max-height: 50vh" class="scroll q-gutter-y-md">
        <q-select
          ref="playlists"
          v-model="body.playlists"
          dark
          square
          filled
          :input-debounce="400"
          :max-values="15"
          :options="options"
          :loading="loading"
          @filter="filterPlaylists"
          clearable
          counter
          use-chips
          hide-dropdown-icon
          hint="Max 15 selections"
          label="Select playlists"
          stack-label
          multiple
          option-label="name"
          option-value="id"
          options-dark
          options-sanitize
          use-input
          @new-value="createOption"
        >
          <template v-slot:prepend>
            <q-icon name="playlist_add" />
          </template>

          <template v-slot:option="scope">
            <q-item
              v-bind="scope.itemProps"
              v-on="scope.itemEvents"
            >
              <q-item-section>
                <q-item-label v-html="scope.opt.name" />
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
              <span>{{ scope.opt.name }}</span>
            </q-chip>
          </template>
        </q-select>
      </q-card-section>

      <q-card-actions align="right" class="q-mx-sm">
        <q-btn flat type="submit" label="Save" color="primary" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import { mapGetters } from 'vuex'
import find from 'lodash/find'
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
      body: {
        playlists: []
      }
    }
  },

  created () {
    if (!this.$store.state.video_save) {
      this.$store.registerModule('video_save', modelModule)
    }

    if (!this.$store.state.saver) {
      this.$store.registerModule('saver', paginateModule)
    }

    this.setModel()
    this.setPlaylists()
  },

  computed: {
    ...mapGetters('video_save', {
      ready: 'isReady',
      data: 'getData',
      meta: 'getMeta'
    }),

    loading () {
      return this.$store.getters['saver/isLoading']
    },

    options () {
      return this.$store.getters['saver/getData']
    }
  },

  methods: {
    async setModel () {
      await this.$store.dispatch('video_save/fetch', {
        path: 'media/' + this.props.id
      })

      // Set current models
      this.body.playlists = this.meta.user_playlists || []
    },

    async setPlaylists () {
      await this.$store.dispatch('saver/create', {
        path: 'playlist',
        params: {
          'page[size]': 5,
          'filter[user]': true,
          sort: '-updated_at'
        }
      })
    },

    async filterPlaylists (val, update, abort) {
      this.$store.dispatch('saver/reset', {
        params: {
          'filter[query]': val || null,
          sort: val.length ? null : '-updated_at'
        }
      })

      await this.$store.dispatch('saver/fetch')

      update() // update options
    },

    async onSubmit () {
      this.$refs.playlists.validate()

      if (!this.$refs.playlists.hasError) {
      // Update model
        await this.$store.dispatch('video_save/update', {
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

    async refresh () {
      await this.$store.dispatch('video_save/refresh')

      if (
        this.$store.state.video &&
        this.$store.state.video.path === `playlist/${this.data.id}`
      ) {
        await this.$store.dispatch('video/refresh')
      }
    },

    createOption (val, done) {
      const optionExists = find(this.options, { name: val })
      const playlistExists = find(this.body.playlists, { name: val })

      if (val.length > 0 && !optionExists && !playlistExists) {
        this.body.playlists.push({
          id: val,
          name: val
        })
      }

      done(null)
    }
  }
}
</script>
