export default function () {
  return {
    ready: false,
    loading: false,
    id: +new Date(),
    path: null,
    params: {
      'page[number]': 1,
      'page[size]': 9
    },
    data: [],
    meta: {}
  }
}
