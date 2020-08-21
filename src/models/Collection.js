import Model from './Model'
import Tag from './Tag'

export default class Collection extends Model {
  resource () {
    return 'collections'
  }

  tags () {
    return this.hasMany(Tag)
  }
}
