<template>
  <q-card
    v-if="ready"
    :key="data.id"
    dark
    style="width: 530px"
  >
    <q-toolbar>
      <q-toolbar-title class="q-mx-xs">
        {{ data.name }}
      </q-toolbar-title>
      <q-btn
        v-close-popup
        flat
        round
        dense
        icon="close"
      />
    </q-toolbar>

    <q-form @submit="onSubmit">
      <q-card-section
        style="max-height: 50vh"
        class="scroll q-gutter-y-md"
      >
        <q-select
          ref="playlists"
          v-model="body.playlists"
          dark
          square
          filled
          :input-debounce="300"
          :max-values="15"
          :options="options"
          :loading="loading"
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
          @filter="filterPlaylists"
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
                <q-item-label v-text="scope.opt.name" />
              </q-item-section>
            </q-item>
          </template>

          <template v-slot:selected-item="scope">
            <q-chip
              removable
              dense
              square
              :tabindex="scope.tabindex"
              @remove="scope.removeAtIndex(scope.index)"
            >
              <span>{{ scope.opt.name }}</span>
            </q-chip>
          </template>
        </q-select>
      </q-card-section>

      <q-card-actions
        align="right"
        class="q-mx-sm"
      >
        <q-btn
          flat
          type="submit"
          label="Save"
          color="primary"
        />
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

  computed: {
    ...mapGetters('model_save', {
      ready: 'isReady',
      data: 'getData',
      meta: 'getMeta'
    }),

    loading () {
      return this.$store.getters['model_playlists/isLoading']
    },

    options () {
      return this.$store.getters['model_playlists/getData']
    }
  },

  async created () {
    if (!this.$store.hasModule('model_save')) {
      this.$store.registerModule('model_save', modelModule)
    }

    if (!this.$store.hasModule('model_playlists')) {
      this.$store.registerModule('model_playlists', paginateModule)
    }

    await this.setModel()
    await this.setPlaylists()
  },

  beforeDestroy () {
    this.$store.unregisterModule('model_save')
    this.$store.unregisterModule('model_playlists')
  },

  methods: {
    async setModel () {
      await this.$store.dispatch('model_save/fetch', {
        path: 'media/' + this.props.id
      })

      this.body.playlists = this.meta.user_playlists || []
    },

    async setPlaylists () {
      await this.$store.dispatch('model_playlists/create', {
        path: 'playlist',
        params: {
          'page[size]': 5,
          'filter[user]': true,
          sort: 'updated'
        }
      })
    },

    async filterPlaylists (val, update, abort) {
      await this.$store.dispatch('model_playlists/reset', {
        params: {
          'filter[query]': val || null,
          sort: val.length ? 'relevance' : 'updated'
        }
      })

      update() // update options
    },

    async onSubmit () {
      this.$refs.playlists.validate()

      if (!this.$refs.playlists.hasError) {
        await this.$store.dispatch('model_save/update', {
          path: 'media/' + this.data.id,
          body: this.body
        })

        await this.$store.dispatch('model_save/refresh')

        this.$q.notify({
          progress: true,
          timeout: 1500,
          position: 'top',
          message: `${this.data.name} has been updated.`,
          type: 'positive'
        })
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
