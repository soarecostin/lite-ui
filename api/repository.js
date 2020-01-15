const qs = require('qs')

export default $axios => resource => ({
  index (params) {
    return $axios.$get(`api/${resource}`, {
      params,
      paramsSerializer: (params) => {
        return qs.stringify(params)
      }
    })
  },
  show (id) {
    return $axios.$get(`api/${resource}/${id}`)
  },
  create (payload) {
    return $axios.$post(`api/${resource}`, payload)
  },
  update (id, payload) {
    return $axios.$put(`api/${resource}/${id}`, payload)
  },
  delete (id) {
    return $axios.$delete(`api/${resource}/${id}`)
  }
})
