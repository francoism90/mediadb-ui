<template>
  <q-page>
    <div class="container fluid">
      <q-card dark square flat class="bg-grey-12 fixed-center" style="min-width: 300px">
        <q-card-section>
          <div class="text-h6">Login to MediaDB</div>
        </q-card-section>

        <q-card-section>
          <q-form @submit="onSubmit" spellcheck="false" class="q-gutter-md">
            <q-input
              v-model="body.email"
              dark
              filled
              clearable
              type="email"
              label="Your email"
              lazy-rules
              :rules="[
                val => val && val.length > 0 || 'Required',
                val => val.length < 256 || 'Please use maximum 255 character',
              ]"
            />

            <q-input
              v-model="body.password"
              dark
              filled
              clearable
              type="password"
              label="Your password"
              lazy-rules
              :rules="[
                val => val && val.length > 0 || 'Required',
                val => val.length < 33 || 'Please use maximum 32 character',
              ]"
            />

            <div>
              <q-btn type="submit" label="Log In" color="primary" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      body: {
        email: null,
        password: null,
        remember: true
      }
    }
  },

  methods: {
    async onSubmit () {
      try {
        await this.$store.dispatch('session/login', this.body)

        this.$router.replace(this.$route.query.redirect || '/')
      } catch (e) {
        alert(e || 'Unable to login. Please try again later.')
      }
    }
  }
}
</script>
