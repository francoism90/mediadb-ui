<template>
  <div class="toolbar-input">
    <q-input
      dark
      clearable
      dense
      square
      filled
      debounce="950"
      v-model="model"
      @focus="onFocus"
      input-class="text-grey-5 text-weight-light"
      :placeholder="placeholder"
      type="search"
    >
      <template v-slot:prepend>
        <q-icon name="search" color="grey-5"  />
      </template>
    </q-input>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('search', {
      query: 'getQuery'
    }),

    model: {
      get () {
        return this.query
      },

      set (value) {
        this.setQuery({ query: value })
      }
    },

    placeholder () {
      return this.$q.screen.lt.sm ? 'Search MediaDB' : 'Search'
    }
  },

  methods: {
    ...mapActions('search', {
      setQuery: 'query'
    }),

    onFocus () {
      if (this.$route.name !== 'search') {
        this.$router.push({ name: 'search' })
      }
    }
  }
}
</script>
