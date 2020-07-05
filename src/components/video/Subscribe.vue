<template>
  <div class="row items-center no-wrap">
    <div class="col">
      <a
        class="text-subtitle1 text-grey-5 cursor-pointer"
        @click.prevent="openChannel"
      >
        {{ data.relationships.model.name }}
      </a>
      <div class="text-subtitle2 text-grey-6">
        {{ Number(data.relationships.model.views) | approximate }} subscribers
      </div>
    </div>

    <div class="col-auto">
      <q-btn
        unelevated
        color="grey-8"
        text-color="grey-4"
        label="Subscribe"
      />
    </div>
  </div>
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
  },

  methods: {
    openChannel () {
      this.$router.push({
        name: 'channel',
        params: {
          id: this.data.relationships.model.id
        }
      })
    }
  }
}
</script>
