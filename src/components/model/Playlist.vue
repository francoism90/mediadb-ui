<template>
  <q-select
    v-model="playlists"
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
    label="Playlists"
    stack-label
    multiple
    option-label="name"
    option-value="id"
    options-dark
    options-sanitize
    use-input
    @filter="filterOptions"
    @new-value="createOption"
  >
    <template v-slot:prepend>
      <q-icon name="local_offer" />
    </template>

    <template v-slot:selected-item="scope">
      <q-chip
        dense
        square
        :tabindex="scope.tabindex"
      >
        {{ scope.opt.name }}
      </q-chip>
    </template>

    <template v-slot:selected-item="scope">
      <q-chip
        removable
        dense
        square
        :tabindex="scope.tabindex"
        @remove="scope.removeAtIndex(scope.index)"
      >
        {{ scope.opt.name }}
      </q-chip>
    </template>
  </q-select>
</template>

<script>
import { validateHandler } from 'src/mixins/form'
import paginateModule from 'src/store/paginate'

export default {
  mixins: [validateHandler],

  computed: {
    loading () {
      return this.$store.getters[this.namespace + '_playlists/isLoading']
    },

    options () {
      return this.$store.getters[this.namespace + '_playlists/getData']
    },

    playlists: {
      get () {
        return this.data.playlists
      },

      set (value) {
        this.$store.commit(this.namespace + '/setData', {
          playlists: value
        })
      }
    }
  },

  async created () {
    if (!this.$store.hasModule(this.namespace + '_playlists')) {
      this.$store.registerModule(this.namespace + '_playlists', paginateModule)
    }

    await this.setOptions()
  },

  methods: {
    async setOptions () {
      await this.$store.dispatch(this.namespace + '_playlists/create', {
        path: 'playlist',

        params: {
          'page[size]': 6,
          'filter[user]': true,
          sort: 'updated'
        }
      })
    },

    async filterOptions (val, update, abort) {
      await this.$store.dispatch(this.namespace + '_playlists/reset', {
        params: {
          'filter[query]': val || null,
          sort: val.length ? 'relevance' : 'updated'
        }
      })

      update()
    },

    createOption (val, done) {
      this.$store.commit(this.namespace + '/createOption', {
        name: 'playlists',
        value: { id: val, name: val },
        options: this.options
      })

      done(null)
    }
  }
}
</script>
