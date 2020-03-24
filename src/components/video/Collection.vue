<template>
  <q-card v-if="ready" :key="data.id" dark style="width: 700px; max-width: 80vw;">
    <q-card-section>
      <div class="text-h6">{{ data.name }}</div>
    </q-card-section>

    <q-separator />

    <form @submit.prevent.stop="onSubmit">
      <q-card-section style="max-height: 50vh" class="scroll q-gutter-lg">
        <q-select
          ref="collect"
          v-model="body.collect"
          dark
          filled
          :input-debounce="350"
          :max-values="15"
          :options="options"
          @filter="filterCollects"
          clearable
          counter
          fill-input
          use-chips
          stack-label
          hide-dropdown-icon
          hint="Max 15 selections"
          label="Select collection"
          multiple
          option-label="name"
          option-value="slug"
          options-dark
          options-sanitize
          popup-content-class="text-weight-light"
          use-input
        >
          <template v-slot:prepend>
            <q-icon name="local_offer" />
          </template>
          <template v-slot:selected-item="scope">
          <q-chip
            removable
            dense
            square
            @remove="scope.removeAtIndex(scope.index)"
            :tabindex="scope.tabindex"
            color="black-bis"
            text-color="grey-5"
          >
            {{ scope.opt.name }}
          </q-chip>
        </template>
        </q-select>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn flat type="submit" label="Save" color="primary" />
      </q-card-actions>
    </form>
  </q-card>
</template>

<script>
import modelModule from 'src/store/model'
import paginateModule from 'src/store/paginate'
import { mapGetters } from 'vuex'

export default {
  props: {
    props: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      body: {
        collect: []
      }
    }
  },

  created () {
    if (!this.$store.state.manager) {
      this.$store.registerModule('manager', modelModule)
    }

    if (!this.$store.state.user_collect) {
      this.$store.registerModule('user_collect', paginateModule)
    }

    this.setModel()
    this.setCollection()
  },

  computed: {
    ...mapGetters('manager', {
      ready: 'isReady',
      data: 'getData',
      meta: 'getMeta'
    }),

    options () {
      return this.$store.getters['user_collect/getData']
    }
  },

  methods: {
    async setModel () {
      await this.$store.dispatch('manager/fetch', {
        path: 'media/' + this.props.id,
        params: {
          include: 'model'
        }
      })

      // Set current models
      this.body.collect = this.meta.collects || []
    },

    async setCollection () {
      await this.$store.dispatch('user_collect/create', {
        path: 'collect',
        params: {
          'filter[type]': 'user',
          'page[size]': 9
        }
      })
    },

    async filterCollects (val, update, abort) {
      // Reset items
      this.$store.dispatch('user_collect/reset', {
        params: {
          'filter[query]': val || null
        }
      })

      // Fetch tags
      if (val) {
        await this.$store.dispatch('user_collect/fetch')
      }

      // Update options
      update()
    },

    async onSubmit () {
      this.$refs.collect.validate()

      if (!this.$refs.collect.hasError) {
      // Update model
        await this.$store.dispatch('manager/update', {
          path: 'media/' + this.data.id,
          body: this.body
        })

        // Refresh stores
        await this.refresh()

        // Notifiy
        this.$q.notify({
          progress: true,
          position: 'top',
          message: `${this.data.name} has been updated.`,
          type: 'positive'
        })
      }
    },

    async refresh () {
      await this.$store.dispatch('manager/refresh')

      if (
        this.$store.state.video &&
        this.$store.state.video.path === `media/${this.data.id}`
      ) {
        await this.$store.dispatch('video/refresh')
      }
    }
  }
}
</script>
