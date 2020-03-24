<template>
  <q-page>

    <div class="q-pa-md" style="max-width: 400px">

      <q-form @submit="onSubmit" class="q-gutter-md">

        <q-input
          v-model="body.email"
          filled
          type="email"
          label="Your email"
          lazy-rules
          :rules="[val => !!val || 'Field is required']"
        />

        <q-input
          v-model="body.password"
          filled
          type="password"
          label="Your password"
          lazy-rules
          :rules="[val => !!val || 'Field is required']"
        />

        <div>
          <q-btn label="Submit" type="submit" color="primary"/>
        </div>

      </q-form>

    </div>

  </q-page>
</template>

<script>
export default {
  name: 'Login',

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
        await this.$store.dispatch('user/login', this.body)

        this.$router.push(this.$route.query.redirect || '/')
      } catch (e) {
        alert(e || 'Unable to login. Please try again later.')
      }
    }
  }
}
</script>
