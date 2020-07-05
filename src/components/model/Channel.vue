<template>
  <q-select
    v-model="channel"
    dark
    square
    filled
    :error="$v.channel.$invalid"
    :input-debounce="300"
    :options="options"
    :loading="loading"
    @filter="filterOptions"
    clearable
    use-chips
    hide-dropdown-icon
    label="Channel"
    stack-label
    option-label="name"
    option-value="id"
    options-dark
    options-sanitize
    use-input
  >
    <template v-slot:prepend>
      <q-icon name="live_tv" />
    </template>

    <template v-slot:error>
      <span v-if="!$v.channel.required">Field is required</span>
    </template>

    <template v-slot:selected-item="scope">
      <q-chip dense square :tabindex="scope.tabindex">
        <span>{{ scope.opt.name }}</span>
      </q-chip>
    </template>
  </q-select>
</template>

<script>
import { validateHandler } from 'src/mixins/form'
import { required } from 'vuelidate/lib/validators'
import paginateModule from 'src/store/paginate'

export default {
  mixins: [validateHandler],

  validations: {
    channel: {
      required
    }
  },

  computed: {
    loading () {
      return this.$store.getters[this.namespace + '_channel/isLoading']
    },

    options () {
      return this.$store.getters[this.namespace + '_channel/getData']
    },

    channel: {
      get () {
        return this.data.model
      },

      set (value) {
        this.$store.commit(this.namespace + '/setData', {
          model: value
        })

        this.validate('channel')
      }
    }
  },

  async created () {
    if (!this.$store.hasModule(this.namespace + '_channel')) {
      this.$store.registerModule(this.namespace + '_channel', paginateModule)
    }

    await this.setOptions()
  },

  methods: {
    async setOptions () {
      await this.$store.dispatch(this.namespace + '_channel/create', {
        path: 'channel',
        params: {
          'page[size]': 5,
          sort: 'updated'
        }
      })
    },

    async filterOptions (val, update, abort) {
      await this.$store.dispatch(this.namespace + '_channel/reset', {
        params: {
          'filter[query]': val || null,
          sort: val.length ? 'relevance' : 'updated'
        }
      })

      update()
    }
  }
}
</script>
