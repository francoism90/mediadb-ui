<template>
  <q-page class="container fluid">
    <template v-if="ready && type && query">
      <q-btn-group class="q-py-md" unelevated>
        <q-select
          dark
          square
          dense
          v-model="model"
          dropdown-icon="keyboard_arrow_down"
          :options="types"
          option-label="label"
          option-value="value"
          options-dark
          options-sanitize
          :display-value="model.label"
          popup-content-class="dropdown"
        />
      </q-btn-group>

      <infinite
        :namespace="type.module"
        :api-route="type.apiRoute"
        :item-component="type.component"
      />
    </template>

    <template v-else>
      <div class="fixed-center text-center">
        <p><q-icon name="search" style="font-size: 4rem;" /></p>
        <p class="text-h5 q-mb-xs">Search MediaDB</p>
        <p class="text-body2">Find videos, channels, playlists and tags.</p>
      </div>
    </template>
  </q-page>
</template>

<script>
import paginateModule from 'src/store/paginate'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    Infinite: () => import('components/paginate/Infinite')
  },

  meta () {
    return {
      ready: false,
      title: 'Search'
    }
  },

  computed: {
    ...mapGetters('search', {
      query: 'getQuery',
      type: 'getType',
      types: 'getTypes'
    }),

    model: {
      get () {
        return this.type
      },

      set (value) {
        this.setQuery({ type: value.module, query: this.query })
      }
    }
  },

  created () {
    for (const type of this.types) {
      if (!this.$store.state[type.module]) {
        this.$store.registerModule(type.module, paginateModule)
      }
    }

    // Prevent init stores error
    this.ready = true
  },

  methods: {
    ...mapActions('search', {
      setQuery: 'query'
    })
  }
}
</script>
