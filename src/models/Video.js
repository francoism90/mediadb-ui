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
      tags: Tag
    }
  }

  collections () {
    return this.hasMany(Collection)
  }

  get subtitles () {
    return filter(this.tracks, { collection: 'subtitles' })
  }
}
