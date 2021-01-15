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
      title: '403 - Forbidden'
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
