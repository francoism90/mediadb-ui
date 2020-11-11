import { filter } from 'lodash'
import Model from './Model'
import Collection from './Collection'
import Tag from './Tag'

export default class Video extends Model {
  resource () {
    return 'videos'
  }

  relations () {
    return {
      'relationships.collections': Collection,
      'relationships.tags': Tag
    }
  }

  get subtitles () {
    return filter(this.tracks, { collection: 'subtitles' })
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

  like (params = {}) {
    return this.request({
      method: params.method || 'POST',
      url: `${this.endpoint()}/like`
    }).then((response) => {
      return Object.assign(this, response.data)
    })
  }
}
