<template>
  <q-page class="container fluid">
    <q-card
      class="bg-grey-12 fixed-center"
      style="width: 350px; max-width: 100vw;"
      dark
    >
      <q-inner-loading
        :showing="!form"
        dark
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
              Sign In to MediaDB
            </div>
          </q-card-section>

          <q-card-section class="q-gutter-md">
            <q-input
              v-model.trim="form.email"
              filled
              clearable
              dark
              type="email"
              label="Your email"
              :error-message="getError('email')"
              :error="hasError('email')"
            />

            <q-input
              v-model.trim="form.password"
              filled
              clearable
              dark
              type="password"
              label="Your password"
              :error-message="getError('password')"
              :error="hasError('password')"
            />
          </q-card-section>

          <q-separator dark />

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

  computed: {
    redirect () {
      const redirect = this.$auth.redirect()
      const denyRedirects = ['login', 'logout', 'register']

      if (!redirect || denyRedirects.includes(redirect.from.name)) {
        return '/'
      }

      return redirect.from.fullPath
    }
  },

  created () {
    this.setForm({
      email: '',
      password: '',
      device_name: this.$q.platform.userAgent,
      remember: true
    })
  },

  meta () {
    return {
      title: 'Sign In'
    }
  },

  methods: {
    async onSubmit () {
      this.resetErrors()

      try {
        if (!this.$q.platform.is.cordova && !this.$q.platform.is.capacitor) {
          await this.$http.get('sanctum/csrf-cookie')
        }

        await this.$auth.login({
          data: this.form,
          redirect: this.redirect,
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
