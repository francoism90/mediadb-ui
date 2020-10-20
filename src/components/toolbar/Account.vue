<template>
  <q-btn
    dense
    flat
    round
    icon="o_person"
  >
    <q-menu
      auto-close
      square
      max-width="300px"
    >
      <q-list
        bordered
        padding
        dense
      >
        <q-item>
          <q-item-section no-wrap>
            <q-item-label caption>
              Signed in as <span class="text-weight-medium">{{ $auth.user().name }}</span>
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-separator spaced />

        <q-item clickable>
          <q-item-section no-wrap>
            Your profile
          </q-item-section>
        </q-item>

        <q-item clickable>
          <q-item-section no-wrap>
            Help
          </q-item-section>
        </q-item>

        <q-separator spaced />

        <q-item
          clickable
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
