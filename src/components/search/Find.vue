<template>
  <q-form autocorrect="off" autocapitalize="off" autocomplete="off" spellcheck="false" class="toolbar-input">
    <q-input
      dark
      clearable
      dense
      square
      filled
      debounce="1000"
      v-model="query"
      @focus="onFocus"
      input-class="text-grey-5 text-weight-light"
      :placeholder="placeholder"
      type="search"
    >
      <template v-slot:prepend>
        <q-icon name="search" color="grey-5"  />
      </template>
    </q-input>
  </q-form>
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
        this.$router.push({ name: 'search' })
      }
    }
  }
}
</script>
