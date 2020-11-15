<template>
  <div class="account-title account-title-details">
    <div class="q-pt-lg text-h4 text-white ellipsis-2-lines">
      {{ $auth.user().name }}
    </div>

    <div class="text-subtitle1 text-grey-3 ellipsis-2-lines">
      Joined {{ String($auth.user().created_at) | datestamp }}
    </div>

    <div class="q-pt-lg q-gutter-sm">
      <q-btn
        flat
        dense
        class="transparent-1 q-pr-sm"
        text-color="primary"
        size="13px"
        icon="o_exit_to_app"
        label="Logout"
        @click="logout"
      />
    </div>
  </div>
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
