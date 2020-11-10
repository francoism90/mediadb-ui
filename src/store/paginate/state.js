export default function () {
  return {
    id: null,
    name: null,
    ready: false,
    page: 1,
    options: {
      sorter: null,
      query: null
    },
    data: [],
    meta: {
      last_page: 1,
      total: 0
    }
  }
}
