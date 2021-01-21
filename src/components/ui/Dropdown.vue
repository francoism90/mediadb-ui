<template>
  <q-menu
    :transition-show="null"
    :transition-hide="null"
    cover
    anchor="top left"
    content-class="dropdown"
    max-height="600px"
    max-width="300px"
  >
    <q-toolbar class="dropdown-toolbar q-pa-md">
      <q-toolbar-title class="text-black text-weight-regular">
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

    <q-separator />

    <slot />
  </q-menu>
</template>
