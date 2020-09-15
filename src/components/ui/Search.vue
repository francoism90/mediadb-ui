<template>
  <q-form
    class="toolbar-input"
    @submit="onSubmit"
  >
    <q-input
      v-model="query"
      :placeholder="$q.screen.lt.sm ? 'Search' : 'Search MediaDB'"
      clearable
      dense
      square
      filled
      input-class="text-grey-5 text-weight-light"
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
      query: ''
    }
  },

  methods: {
    onSubmit () {
      this.$router.push({
        name: 'search',
        query: {
          q: this.query,
          id: +new Date()
        }
      })
    }
  }
}
</script>
