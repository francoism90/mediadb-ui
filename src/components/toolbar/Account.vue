<template>
  <q-btn
    dense
    flat
    unelevated
    icon="o_person"
    :ripple="false"
  >
    <q-menu
      auto-close
      cover
      anchor="top right"
      :dark="false"
      :transition-show="null"
      :transition-hide="null"
    >
      <q-toolbar class="dropdown q-pa-md">
        <q-toolbar-title
          v-if="$auth.user() && $auth.user().name"
          class="text-black text-weight-light"
        >
          {{ $auth.user().name }}
        </q-toolbar-title>

        <q-btn
          v-close-popup
          flat
          dense
          color="black"
          icon="o_close"
          size="xs"
        />
      </q-toolbar>

      <q-separator color="grey-2" />

      <q-list
        :dark="false"
        class="text-black text-weight-light"
      >
        <q-item
          clickable
          :dark="false"
        >
          <q-item-section no-wrap>
            Settings
          </q-item-section>
        </q-item>

        <q-item
          clickable
          :dark="false"
          @click="logout"
        >
          <q-item-section no-wrap>
            Sign out
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script>
export default {
  methods: {
    async logout () {
      await this.$auth.logout({
        makeRequest: true,
        redirect: {
          name: 'login'
        }
      })
    }
  }
}
</script>
