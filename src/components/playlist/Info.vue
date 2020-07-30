<template>
  <section class="container fluid q-pt-lg q-pb-sm">
    <div class="fit row wrap justify-between items-start q-col-gutter-y-md">
      <div class="col-6 col-md-6 col-xs-12">
        <div class="text-h5 text-grey-5">
          {{ data.name }}
        </div>
        <div class="text-subtitle2 text-grey-5">
          {{ Number(data.items) | approximate }} items •
          {{ Number(data.views) | approximate }} views
        </div>
      </div>

      <div class="col-auto">
        <div class="q-gutter-sm">
          <q-btn
            size="13px"
            unelevated
            color="grey-8"
            text-color="grey-4"
            label="Play All"
          />

          <q-btn
            size="13px"
            unelevated
            color="grey-8"
            text-color="grey-4"
            label="Subscribe"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    },

    meta: {
      type: Object,
      required: true
    }
  }
}
</script>
