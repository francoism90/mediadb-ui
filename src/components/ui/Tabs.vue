<template>
  <nav>
    <q-tabs
      inline-label
      outside-arrows
      mobile-arrows
      left-icon="o_chevron_left"
      right-icon="o_chevron_right"
      class="text-grey-5"
      active-color="primary"
      indicator-color="primary"
      align="left"
    >
      <q-route-tab
        v-for="(item, index) in items"
        :key="index"
        :label="item.label"
        :to="{ name: item.name }"
      />
    </q-tabs>

    <q-separator />
  </nav>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>
