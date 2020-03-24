import Vue from 'vue'
import Shortkey from 'vue-shortkey'

Vue.use(Shortkey, {
  prevent: ['input', 'textarea']
})
