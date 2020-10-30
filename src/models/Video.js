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
      collections: Collection,
      tags: Tag
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

  favorite () {
    return this.request({
      method: 'POST',
      url: `${this.endpoint()}/favorite`
    }).then((response) => {
      return Object.assign(this, response.data)
    })
  }

  unfavorite () {
    return this.request({
      method: 'DELETE',
      url: `${this.endpoint()}/favorite`
    }).then((response) => {
      return Object.assign(this, response.data)
    })
  }
}
