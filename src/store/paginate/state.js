export default function () {
  return {
    id: +new Date(),
    ready: false,
    name: null,
    page: 1,
    options: {},
    data: [],
    meta: {
      last_page: 1,
      total: 0
    }
  }
}
