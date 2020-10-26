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
}
