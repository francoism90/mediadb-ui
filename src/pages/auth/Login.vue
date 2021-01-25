<template>
  <q-page class="container fluid">
    <q-card
      class="bg-grey-12 fixed-center"
      style="width: 400px; max-width: 100vw;"
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
          <q-card-section class="row no-wrap justify-between items-center content-center">
            <div class="col text-h6 ellipsis">
              Sign In to MediaDB
            </div>
          </q-card-section>

          <q-separator dark />

          <q-card-section class="q-px-xl q-gutter-sm">
            <q-input
              v-model.trim="form.email"
              :error-message="getError('email')"
              :error="hasError('email')"
              clearable
              dark
              label="Your email"
              type="email"
            />

            <q-input
              v-model.trim="form.password"
              :error-message="getError('password')"
              :error="hasError('password')"
              clearable
              dark
              label="Your password"
              type="password"
            />
          </q-card-section>

          <q-card-actions
            align="center"
            class="q-pb-lg"
          >
            <q-btn
              no-caps
              unelevated
              rounded
              class="btn-outline btn-primary btn-stretch"
              type="submit"
              label="Sign In"
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
