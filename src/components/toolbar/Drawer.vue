<template>
  <div>
    <template v-if="$route.name === 'home'">
      <q-icon
        name="account_circle"
        size="28px"
        class="cursor-pointer"
        @click="drawer = !drawer"
      />

      <router-link
        :to="{ name: 'home' }"
        class="gt-sm q-mx-sm text-weight-medium text-grey-5"
      >
        MediaDB
      </router-link>
    </template>

    <template v-else>
      <q-icon
        name="arrow_back"
        size="28px"
        class="cursor-pointer"
        @click="$router.back()"
      />
    </template>

    <q-drawer
      v-model="drawer"
      :width="240"
      behavior="mobile"
      content-class="bg-grey-12"
    >
      <q-scroll-area class="drawer-container">
        <q-separator
          color="grey-10"
          inset
        />

        <q-list
          class="text-body1 text-weight-medium"
          padding
        >
          <q-item
            v-ripple
            clickable
          >
            <q-item-section side>
              <q-icon name="account_box" />
            </q-item-section>

            <q-item-section>
              My Profile
            </q-item-section>
          </q-item>

          <q-item
            v-ripple
            clickable
          >
            <q-item-section side>
              <q-icon name="settings" />
            </q-item-section>

            <q-item-section>
              Settings
            </q-item-section>
          </q-item>

          <q-item
            v-ripple
            clickable
            :to="{ name: 'logout' }"
          >
            <q-item-section side>
              <q-icon name="o_exit_to_app" />
            </q-item-section>

            <q-item-section>
              Sign out
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <div class="absolute-top drawer-avatar">
        <div class="absolute-center bg-transparent full-width">
          <q-icon
            size="56px"
            class="q-mb-sm"
            name="account_circle"
          />

          <div class="text-body1 text-weight-bold">
            {{ $auth.user().name }}
          </div>
        </div>
      </div>
    </q-drawer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      drawer: false
    }
  }
}
</script>
