import { filter, map } from 'lodash'
import Model from './Model'
import Collection from './Collection'
import Tag from './Tag'

export default class Video extends Model {
  resource () {
    return 'videos'
  }

  collections () {
    return this.hasMany(Collection)
  }

  tags () {
    return this.hasMany(Tag)
  }

  get subtitles () {
    return filter(this.tracks, { type: 'subtitles' })
  }

  get titleNames () {
    return map(this.titles, 'name')
  }
}
