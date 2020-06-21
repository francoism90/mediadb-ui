<template>
  <q-page class="container fluid">
    <template v-if="type && query">
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
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    Infinite: () => import('components/paginate/Infinite')
  },

  meta () {
    return {
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

  methods: {
    ...mapActions('search', {
      setQuery: 'query'
    })
  }
}
</script>
