<template>
  <q-page class="container">
    <q-card
      class="transparent"
      dark
    >
      <q-card-section class="text-h1">
        429
      </q-card-section>

      <q-card-section class="q-pt-none">
        You have triggered an abuse detection mechanism.
      </q-card-section>

      <q-card-section class="q-pt-none text-body1">
        Please wait a few minutes before you try again;<br>
        in some cases this may take up to an hour.
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
      title: '429 - Rate Limit'
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
