import Model from './Model'
import Tag from './Tag'

export default class Collection extends Model {
  resource () {
    return 'collections'
  }

  relations () {
    return {
      tags: Tag
    }
  }

  subscribe () {
    return this.request({
      method: 'POST',
      url: `${this.endpoint()}/subscribe`
    }).then((response) => {
      return Object.assign(this, response.data)
    })
  }

  unsubscribe () {
    return this.request({
      method: 'DELETE',
      url: `${this.endpoint()}/subscribe`
    }).then((response) => {
      return Object.assign(this, response.data)
    })
  }
}
