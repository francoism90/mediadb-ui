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
}