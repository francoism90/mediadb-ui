<template>
  <q-page class="container fluid">
    <q-card
      dark
      class="bg-grey-12 fixed-center"
      style="width: 350px"
    >
      <q-inner-loading
        dark
        :showing="!form"
      >
        <q-spinner
          size="50px"
          color="primary"
        />
      </q-inner-loading>

      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <q-form
          v-if="form"
          @submit="onSubmit"
        >
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">
              Login to MediaDB
            </div>
          </q-card-section>

          <q-card-section class="q-gutter-md">
            <q-input
              v-model.trim="form.email"
              dark
              filled
              clearable
              type="email"
              label="Your email"
              :error-message="getError('email')"
              :error="hasError('email')"
            />

            <q-input
              v-model.trim="form.password"
              dark
              filled
              clearable
              type="password"
              label="Your password"
              :error-message="getError('password')"
              :error="hasError('password')"
            />
          </q-card-section>

          <q-separator />

          <q-card-actions
            align="right"
          >
            <q-btn
              label="Login"
              size="md"
              color="primary"
              flat
              type="submit"
            />
          </q-card-actions>
        </q-form>
      </transition>
    </q-card>
  </q-page>
</template>

<script>
import { formHandler } from 'src/mixins/form'

export default {
  mixins: [formHandler],

  created () {
    this.setForm({
      email: '',
      password: '',
      device_name: this.$q.platform.userAgent,
      remember: true
    })
  },

  methods: {
    async onSubmit () {
      try {
        this.resetErrors()

        if (!this.$q.platform.is.cordova && !this.$q.platform.is.capacitor) {
          await this.$axios.get('sanctum/csrf-cookie')
        }

        await this.$auth
          .login({
            data: this.form,
            redirect: this.$route.query.redirect || '/',
            staySignedIn: true,
            fetchUser: true
          })
      } catch (e) {
        this.setMessage(e.response)
        this.setErrors(e.response)
      }
    }
  }
}
</script>
