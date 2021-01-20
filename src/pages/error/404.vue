<template>
  <q-page class="container">
    <q-card class="transparent">
      <q-card-section class="text-h1">
        404
      </q-card-section>

      <q-card-section class="q-pt-none text-body1">
        The requested URL was not found.
      </q-card-section>

      <q-card-actions align="center">
        <q-btn
          color="grey-10"
          size="16px"
          unelevated
          round
          icon="o_arrow_back"
          @click="$router.back()"
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
export default {
  meta () {
    return {
      title: '404 - Not Found'
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 50px auto;
  text-align: center;
}
</style>
