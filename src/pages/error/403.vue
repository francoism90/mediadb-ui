<template>
  <q-page class="container">
    <q-card flat>
      <q-card-section class="text-h1 text-weight-thin">
        403
      </q-card-section>

      <q-card-section class="q-pt-none">
        You don't have permission to access the requested URL.
      </q-card-section>

      <q-card-actions align="center">
        <q-btn
          color="grey-10"
          size="16px"
          unelevated
          round
          icon="o_arrow_back"
          :to="{ path: returnPath }"
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
export default {
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.setReturn(from)
    })
  },

  beforeRouteUpdate (to, from, next) {
    this.setReturn(from)
    next()
  },

  data () {
    return {
      returnPath: null
    }
  },

  meta () {
    return {
      title: '403'
    }
  },

  methods: {
    setReturn (route = {}) {
      this.returnPath = route.name !== '403' ? route.fullPath : '/'
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 50px auto;
  width: 600px;
  max-width: 100vw;
  text-align: center;
}
</style>
