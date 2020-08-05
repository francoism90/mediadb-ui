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
        <q-spinner-dots
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

          <q-card-section class="q-pb-none">
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
      remember: false
    })
  },

  methods: {
    async onSubmit () {
      try {
        // Reset errors
        this.resetErrors()

        // Initialize session store
        await this.$store.dispatch('session/login', this.form)

        // Redirect to requested path
        this.$router.replace(this.$route.query.redirect || '/')
      } catch (e) {
        this.setMessage(e.response.data.message || '')
        this.setErrors(e.response.data.errors || [])
      }
    }
  }
}
</script>
