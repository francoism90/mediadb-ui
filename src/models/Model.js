import { Model as BaseModel } from 'vue-api-query'

export default class Model extends BaseModel {
  baseURL () {
    return process.env.API_URL
  }

  parameterNames () {
    return {
      include: 'include',
      filter: 'filter',
      sort: 'sort',
      fields: 'fields',
      append: 'append',
      page: 'page[number]',
      limit: 'page[size]'
    }
  }

  request (config) {
    return this.$http.request(config)
  }
}
