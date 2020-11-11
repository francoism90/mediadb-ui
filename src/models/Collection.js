import Model from './Model'
import Tag from './Tag'

export default class Collection extends Model {
  resource () {
    return 'collections'
  }

  relations () {
    return {
      'relationships.tags': Tag
    }
  }

  subscribe (params = {}) {
    return this.request({
      method: params.method || 'POST',
      url: `${this.endpoint()}/subscribe`
    }).then((response) => {
      return Object.assign(this, response.data)
    })
  }
}
