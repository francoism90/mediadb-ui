<template>
  <q-form
    class="toolbar-input"
    @submit="onSubmit"
  >
    <q-input
      v-model="query"
      type="search"
      placeholder="Search"
      clearable
      dense
      square
      filled
      input-class="text-grey-5"
    >
      <template #prepend>
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

  watch: {
    '$route' () {
      this.setQuery()
    }
  },

  created () {
    this.setQuery()
  },

  methods: {
    setQuery () {
      if (this.$route.name === 'search') {
        this.query = this.$route.query.q || this.query
      }
    },

    onSubmit () {
      this.$router.push({
        name: 'search',
        query: {
          q: this.query
        }
      })
    }
  }
}
</script>
