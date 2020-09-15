import Model from './Model'
import Tag from './Tag'

export default class Collection extends Model {
  resource () {
    return 'collections'
  }

  tags () {
    return this.hasMany(Tag)
  }

  get modelName () {
    const hideTypes = ['title']

    if (hideTypes.includes(this.type)) {
      return null
    }

    return this.relationships.model.name
  }
}
