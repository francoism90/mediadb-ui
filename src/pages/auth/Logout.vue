<template>
  <q-page class="container fluid">
    <span />
  </q-page>
</template>

<script>
export default {
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.logout()
    })
  },

  beforeRouteUpdate (to, from, next) {
    this.logout()
    next()
  },

  methods: {
    async logout () {
      await this.$auth.logout({
        makeRequest: true,
        redirect: {
          name: 'home'
        }
      })
    }
  }
}
</script>
