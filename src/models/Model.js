import { Model as BaseModel } from 'vue-api-query'

export default class Model extends BaseModel {
  // define a base url for a REST API
  baseURL () {
    return process.env.API_URL + '/api/v1'
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

  // implement a default request method
  request (config) {
    return this.$http.request(config)
  }
}
