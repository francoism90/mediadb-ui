<template>
  <section class="container fluid q-pt-lg q-pb-sm">
    <div class="fit row wrap justify-between items-start q-col-gutter-y-md">
      <div class="col-6 col-md-6 col-xs-12">
        <div class="text-h5 text-grey-5">
          {{ channel.name }}
        </div>
        <div class="text-subtitle2 text-grey-5">
          {{ Number(channel.views) | approximate }} subscribers
        </div>
      </div>

      <div class="col-auto">
        <div class="q-gutter-sm">
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
    channel: {
      type: Object,
      required: true
    }
  }
}
</script>
