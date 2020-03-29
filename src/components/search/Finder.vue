<template>
  <q-input
    dark
    clearable
    dense
    square
    filled
    debounce="1000"
    v-model="query"
    autocomplete="off"
    class="toolbar-input"
    @focus="onFocus"
    input-class="text-grey-5 text-weight-light"
    :placeholder="placeholder"
    type="search"
  >
    <template v-slot:prepend>
      <q-icon name="search" color="grey-5"  />
    </template>
  </q-input>
</template>

<script>
export default {
  computed: {
    query: {
      get () {
        return this.$store.state.search.query
      },

      set (value) {
        this.$store.dispatch('search/query', value)
      }
    },

    placeholder () {
      return this.$q.screen.lt.sm ? 'Search MediaDB' : 'Search'
    }
  },

  methods: {
    onFocus () {
      if (this.$route.name !== 'search') {
        this.$router.replace({ name: 'search' })
      }
    }
  }
}
</script>
