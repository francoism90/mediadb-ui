export default function () {
  return {
    id: +new Date(),
    name: null,
    ready: false,
    page: 1,
    options: {},
    data: [],
    meta: {
      last_page: 1,
      total: 0
    }
  }
}
