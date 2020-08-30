<template>
  <div class="toolbar-input">
    <q-input
      v-model.trim="queryModel"
      dark
      clearable
      dense
      square
      filled
      input-class="text-grey-5 text-weight-light"
      :debounce="900"
      :placeholder="$q.screen.lt.sm ? 'Search' : 'Search MediaDB'"
      type="search"
      @focus="onFocus"
    >
      <template v-slot:prepend>
        <q-icon
          name="search"
          color="grey-5"
        />
      </template>
    </q-input>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('search', [
      'query',
      'types'
    ]),

    queryModel: {
      get () {
        return this.query
      },

      set (value) {
        this.resetStates()

        this.setQuery({
          type: null,
          query: value
        })
      }
    }
  },

  methods: {
    ...mapActions('search', [
      'setQuery'
    ]),

    resetStates () {
      for (const type of this.types) {
        if (this.$store.hasModule(['search', type.key])) {
          this.$store.dispatch(`search/${type.key}/resetState`)
        }
      }
    },

    onFocus () {
      if (this.$route.name !== 'search') {
        this.$router.push({ name: 'search' })
      }
    }
  }
}
</script>
