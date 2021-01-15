<template>
  <q-btn
    no-caps
    color="grey-12"
    text-color="white"
    unelevated
    :dense="buttonDense"
    :icon-right="buttonIcon"
    :ripple="false"
  >
    <slot name="button-label" />

    <q-menu
      cover
      anchor="top left"
      :dark="false"
      :transition-show="null"
      :transition-hide="null"
    >
      <q-toolbar class="dropdown q-pa-md">
        <q-toolbar-title class="text-black text-weight-light">
          <slot name="toolbar-title" />
        </q-toolbar-title>

        <q-btn
          v-close-popup
          flat
          dense
          color="black"
          icon="o_close"
          size="sm"
        />
      </q-toolbar>

      <q-separator color="grey-2" />

      <slot />
    </q-menu>
  </q-btn>
</template>

<script>
export default {
  props: {
    buttonIcon: {
      type: String,
      default: 'expand_more'
    },

    buttonDense: {
      type: Boolean,
      default: false
    }
  }
}
</script>
