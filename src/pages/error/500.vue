<template>
  <q-page class="container">
    <q-card
      class="transparent"
      dark
    >
      <q-card-section class="text-h1">
        500
      </q-card-section>

      <q-card-section class="q-pt-none text-body1">
        Looks like something went wrong,<br>
        please try again later.
      </q-card-section>

      <q-card-actions align="center">
        <q-btn
          color="grey-10"
          size="16px"
          unelevated
          round
          icon="o_refresh"
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
      title: '500 - Server Error'
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
