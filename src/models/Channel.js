import Model from './Model'
import Tag from './Tag'

export default class Channel extends Model {
  resource () {
    return 'channel'
  }

  tags () {
    return this.hasMany(Tag)
  }
}
