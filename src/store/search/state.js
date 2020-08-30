export default function () {
  return {
    filter: null,
    query: null,
    types: [
      { key: 'collections', component: 'Collections' },
      { key: 'videos', component: 'Videos' },
      { key: 'tags', component: 'Tags' }
    ]
  }
}
