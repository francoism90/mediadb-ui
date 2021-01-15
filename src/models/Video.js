import { filter } from 'lodash'
import Model from './Model'
import Tag from './Tag'

export default class Video extends Model {
  resource () {
    return 'videos'
  }

  relations () {
    return {
      'relationships.tags': Tag
    }
  }

  get captions () {
    return filter(this.tracks, { kind: 'captions' })
  }

  frameshot () {
    return this.request({
      method: 'PUT',
      url: `${this.endpoint()}/frameshot`
    }).then((response) => {
      return Object.assign(this, response.data)
    })
  }

  favorite (params = {}) {
    return this.request({
      method: params.method || 'POST',
      url: `${this.endpoint()}/favorite`
    }).then((response) => {
      return Object.assign(this, response.data)
    })
  }
}
