<template>
  <q-form
    class="toolbar-input"
    @submit="onSubmit"
  >
    <q-input
      v-model.trim="query"
      dark
      clearable
      dense
      square
      filled
      input-class="text-grey-5 text-weight-light"
      :debounce="900"
      :placeholder="$q.screen.lt.sm ? 'Search' : 'Search MediaDB'"
      type="search"
    >
      <template v-slot:prepend>
        <q-icon
          name="search"
          color="grey-5"
        />
      </template>
    </q-input>
  </q-form>
</template>

<script>
export default {
  data () {
    return {
      query: '',
      type: ''
    }
  },

  watch: {
    '$route.query.q' (value = '') {
      this.query = value
    }
  },

  created () {
    this.query = this.$route.query.q || ''
  },

  methods: {
    onSubmit () {
      this.$router.push({
        name: 'search',
        query: {
          q: this.query,
          type: this.type,
          id: +new Date()
        }
      })
    }
  }
}
</script>
