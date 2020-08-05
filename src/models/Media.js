import Model from './Model'
import Tag from './Tag'

export default class Media extends Model {
  resource () {
    return 'media'
  }

  tags () {
    return this.hasMany(Tag)
  }
}
